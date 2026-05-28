import { Router } from 'express';
import { body, param, validationResult } from 'express-validator';

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

// Always ensure a cart exists for the user (lazy creation).
async function getOrCreateCart(userId) {
  let cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) {
    cart = await prisma.cart.create({ data: { userId } });
  }
  return cart;
}

// Build the standardized cart response shape.
async function buildCartResponse(userId) {
  const cart = await getOrCreateCart(userId);
  const items = await prisma.cartItem.findMany({
    where: { cartId: cart.id },
    orderBy: { createdAt: 'asc' },
    include: { product: true },
  });

  const mapped = items.map((it) => ({
    id: it.id,
    productId: it.productId,
    name: it.product.name,
    price: it.product.price,
    quantity: it.quantity,
    imageUrl: it.product.imageUrl,
    stock: it.product.stock,
    subtotal: it.product.price * it.quantity,
  }));

  const totalAmount = mapped.reduce((sum, i) => sum + i.subtotal, 0);
  return { id: cart.id, items: mapped, totalAmount, itemCount: mapped.length };
}

// GET /api/cart
router.get('/', async (req, res, next) => {
  try {
    res.json(await buildCartResponse(req.user.id));
  } catch (err) {
    next(err);
  }
});

// POST /api/cart/items
router.post(
  '/items',
  [
    body('productId').isInt({ min: 1 }).withMessage('productId가 올바르지 않습니다.'),
    body('quantity').optional().isInt({ min: 1 }).withMessage('quantity는 1 이상이어야 합니다.'),
  ],
  async (req, res, next) => {
    if (handleValidation(req, res)) return;
    const productId = Number(req.body.productId);
    const quantity = Number(req.body.quantity || 1);
    try {
      const product = await prisma.product.findUnique({ where: { id: productId } });
      if (!product || !product.isActive) {
        return res.status(404).json({ error: '상품을 찾을 수 없습니다.', code: 'NOT_FOUND' });
      }

      const cart = await getOrCreateCart(req.user.id);
      const existing = await prisma.cartItem.findUnique({
        where: { cartId_productId: { cartId: cart.id, productId } },
      });
      const nextQty = (existing?.quantity || 0) + quantity;
      if (nextQty > product.stock) {
        return res.status(422).json({ error: '재고가 부족합니다.', code: 'OUT_OF_STOCK' });
      }

      if (existing) {
        await prisma.cartItem.update({
          where: { id: existing.id },
          data: { quantity: nextQty },
        });
      } else {
        await prisma.cartItem.create({
          data: { cartId: cart.id, productId, quantity },
        });
      }

      res.status(201).json(await buildCartResponse(req.user.id));
    } catch (err) {
      next(err);
    }
  }
);

// PATCH /api/cart/items/:itemId — quantity: 0 deletes the line
router.patch(
  '/items/:itemId',
  [
    param('itemId').toInt().isInt({ min: 1 }),
    body('quantity').isInt({ min: 0 }).withMessage('quantity는 0 이상이어야 합니다.'),
  ],
  async (req, res, next) => {
    if (handleValidation(req, res)) return;
    const itemId = Number(req.params.itemId);
    const quantity = Number(req.body.quantity);
    try {
      const item = await prisma.cartItem.findUnique({
        where: { id: itemId },
        include: { cart: true, product: true },
      });
      if (!item || item.cart.userId !== req.user.id) {
        return res.status(404).json({ error: '카트 아이템을 찾을 수 없습니다.', code: 'NOT_FOUND' });
      }
      if (quantity === 0) {
        await prisma.cartItem.delete({ where: { id: itemId } });
      } else {
        if (quantity > item.product.stock) {
          return res.status(422).json({ error: '재고가 부족합니다.', code: 'OUT_OF_STOCK' });
        }
        await prisma.cartItem.update({ where: { id: itemId }, data: { quantity } });
      }
      res.json(await buildCartResponse(req.user.id));
    } catch (err) {
      next(err);
    }
  }
);

// DELETE /api/cart/items/:itemId
router.delete(
  '/items/:itemId',
  [param('itemId').toInt().isInt({ min: 1 })],
  async (req, res, next) => {
    if (handleValidation(req, res)) return;
    const itemId = Number(req.params.itemId);
    try {
      const item = await prisma.cartItem.findUnique({
        where: { id: itemId },
        include: { cart: true },
      });
      if (!item || item.cart.userId !== req.user.id) {
        return res.status(404).json({ error: '카트 아이템을 찾을 수 없습니다.', code: 'NOT_FOUND' });
      }
      await prisma.cartItem.delete({ where: { id: itemId } });
      res.json(await buildCartResponse(req.user.id));
    } catch (err) {
      next(err);
    }
  }
);

export default router;
