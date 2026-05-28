import { Router } from 'express';
import { body, param, query, validationResult } from 'express-validator';

import { prisma } from '../prisma.js';
import { auth } from '../middleware/auth.js';

const router = Router();
router.use(auth);

function handleValidation(req, res) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return null;
  res.status(400).json({
    error: errors.array()[0]?.msg || '입력값이 올바르지 않습니다.',
    code: 'VALIDATION_ERROR',
  });
  return true;
}

function formatOrder(order) {
  return {
    id: order.id,
    status: order.status,
    totalAmount: order.totalAmount,
    shippingName: order.shippingName,
    shippingPhone: order.shippingPhone,
    shippingAddress: order.shippingAddress,
    memo: order.memo,
    items: (order.items || []).map((it) => ({
      id: it.id,
      productId: it.productId,
      name: it.name,
      price: it.price,
      quantity: it.quantity,
    })),
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };
}

// POST /api/orders — cart -> order conversion (transactional)
router.post(
  '/',
  [
    body('shippingName').isString().trim().notEmpty().withMessage('수령인 이름을 입력해주세요.'),
    body('shippingPhone').isString().trim().notEmpty().withMessage('수령인 연락처를 입력해주세요.'),
    body('shippingAddress').isString().trim().notEmpty().withMessage('배송지를 입력해주세요.'),
    body('memo').optional().isString(),
  ],
  async (req, res, next) => {
    if (handleValidation(req, res)) return;
    const { shippingName, shippingPhone, shippingAddress, memo } = req.body;
    try {
      const order = await prisma.$transaction(async (tx) => {
        const cart = await tx.cart.findUnique({
          where: { userId: req.user.id },
          include: { items: { include: { product: true } } },
        });
        if (!cart || cart.items.length === 0) {
          const e = new Error('장바구니가 비어 있습니다.');
          e.status = 400;
          e.code = 'EMPTY_CART';
          throw e;
        }

        // Stock validation snapshot
        for (const it of cart.items) {
          if (!it.product.isActive) {
            const e = new Error(`판매 중지된 상품이 포함되어 있습니다: ${it.product.name}`);
            e.status = 422;
            e.code = 'OUT_OF_STOCK';
            throw e;
          }
          if (it.quantity > it.product.stock) {
            const e = new Error(`재고가 부족합니다: ${it.product.name}`);
            e.status = 422;
            e.code = 'OUT_OF_STOCK';
            throw e;
          }
        }

        const totalAmount = cart.items.reduce(
          (sum, it) => sum + it.product.price * it.quantity,
          0
        );

        const created = await tx.order.create({
          data: {
            userId: req.user.id,
            status: 'PENDING',
            totalAmount,
            shippingName,
            shippingPhone,
            shippingAddress,
            memo: memo || null,
            items: {
              create: cart.items.map((it) => ({
                productId: it.productId,
                name: it.product.name,
                price: it.product.price,
                quantity: it.quantity,
              })),
            },
          },
          include: { items: true },
        });

        // Decrement stock per line
        for (const it of cart.items) {
          await tx.product.update({
            where: { id: it.productId },
            data: { stock: { decrement: it.quantity } },
          });
        }

        // Empty the cart
        await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

        return created;
      });

      res.status(201).json(formatOrder(order));
    } catch (err) {
      if (err.status) {
        return res.status(err.status).json({ error: err.message, code: err.code });
      }
      next(err);
    }
  }
);

// GET /api/orders — paginated list of my orders
router.get(
  '/',
  [
    query('page').optional().toInt().isInt({ min: 1 }),
    query('limit').optional().toInt().isInt({ min: 1, max: 100 }),
    query('status').optional().isIn(['PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED']),
  ],
  async (req, res, next) => {
    if (handleValidation(req, res)) return;
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;
    const where = { userId: req.user.id };
    if (req.query.status) where.status = req.query.status;

    try {
      const [total, rows] = await Promise.all([
        prisma.order.count({ where }),
        prisma.order.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          skip: (page - 1) * limit,
          take: limit,
          include: { items: true },
        }),
      ]);
      const items = rows.map((o) => ({
        id: o.id,
        status: o.status,
        totalAmount: o.totalAmount,
        itemCount: o.items.length,
        createdAt: o.createdAt,
      }));
      res.json({ items, page, limit, total });
    } catch (err) {
      next(err);
    }
  }
);

// GET /api/orders/:id
router.get('/:id', [param('id').toInt().isInt()], async (req, res, next) => {
  if (handleValidation(req, res)) return;
  try {
    const order = await prisma.order.findUnique({
      where: { id: Number(req.params.id) },
      include: { items: true },
    });
    if (!order) {
      return res.status(404).json({ error: '주문을 찾을 수 없습니다.', code: 'NOT_FOUND' });
    }
    if (order.userId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({ error: '권한이 없습니다.', code: 'FORBIDDEN' });
    }
    res.json(formatOrder(order));
  } catch (err) {
    next(err);
  }
});

// Cancel handler — used by both PATCH and POST routes below
async function cancelOrder(req, res, next) {
  try {
    const orderId = Number(req.params.id);
    const result = await prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: { id: orderId },
        include: { items: true },
      });
      if (!order) {
        const e = new Error('주문을 찾을 수 없습니다.');
        e.status = 404;
        e.code = 'NOT_FOUND';
        throw e;
      }
      if (order.userId !== req.user.id && req.user.role !== 'ADMIN') {
        const e = new Error('권한이 없습니다.');
        e.status = 403;
        e.code = 'FORBIDDEN';
        throw e;
      }
      if (!['PENDING', 'PAID'].includes(order.status)) {
        const e = new Error('이미 배송되었거나 취소된 주문입니다.');
        e.status = 409;
        e.code = 'CANNOT_CANCEL';
        throw e;
      }
      // Restore stock for each line that still maps to a product
      for (const it of order.items) {
        if (it.productId) {
          await tx.product.update({
            where: { id: it.productId },
            data: { stock: { increment: it.quantity } },
          });
        }
      }
      return tx.order.update({
        where: { id: orderId },
        data: { status: 'CANCELLED' },
        include: { items: true },
      });
    });
    res.json(formatOrder(result));
  } catch (err) {
    if (err.status) {
      return res.status(err.status).json({ error: err.message, code: err.code });
    }
    next(err);
  }
}

// PATCH /api/orders/:id/cancel (also exposed as POST per api_spec.md 5.4)
router.patch('/:id/cancel', [param('id').toInt().isInt()], cancelOrder);
router.post('/:id/cancel', [param('id').toInt().isInt()], cancelOrder);

export default router;
