import { Router } from 'express';
import { body, param, validationResult } from 'express-validator';
import multer from 'multer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { prisma } from '../prisma.js';
import { auth } from '../middleware/auth.js';
import { sellerAuth } from '../middleware/sellerAuth.js';

const router = Router();
router.use(auth);

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads/products'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `seller_${Date.now()}${ext}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('이미지 파일만 업로드 가능합니다.'));
  },
});

function handleValidation(req, res) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return null;
  res.status(400).json({ error: errors.array()[0]?.msg || '입력값이 올바르지 않습니다.', code: 'VALIDATION_ERROR' });
  return true;
}

// GET /api/seller/me — 내 셀러 프로필 조회
router.get('/me', async (req, res, next) => {
  try {
    const profile = await prisma.sellerProfile.findUnique({
      where: { userId: req.user.id },
    });
    if (!profile) return res.status(404).json({ error: '사업자 프로필이 없습니다.', code: 'NOT_FOUND' });
    res.json(profile);
  } catch (err) { next(err); }
});

// POST /api/seller/apply — 사업자 신청
router.post(
  '/apply',
  [
    body('bizName').isString().trim().notEmpty().withMessage('상호명을 입력해주세요.'),
    body('bizNumber').isString().trim().notEmpty().withMessage('사업자등록번호를 입력해주세요.'),
    body('ceoName').isString().trim().notEmpty().withMessage('대표자명을 입력해주세요.'),
    body('phone').isString().trim().notEmpty().withMessage('연락처를 입력해주세요.'),
    body('address').isString().trim().notEmpty().withMessage('사업장 주소를 입력해주세요.'),
  ],
  async (req, res, next) => {
    if (handleValidation(req, res)) return;
    try {
      const existing = await prisma.sellerProfile.findUnique({ where: { userId: req.user.id } });
      if (existing) {
        return res.status(409).json({ error: '이미 사업자 신청 이력이 있습니다.', code: 'CONFLICT', status: existing.status });
      }
      const profile = await prisma.sellerProfile.create({
        data: {
          userId: req.user.id,
          bizName: req.body.bizName,
          bizNumber: req.body.bizNumber,
          ceoName: req.body.ceoName,
          phone: req.body.phone,
          address: req.body.address,
        },
      });
      res.status(201).json(profile);
    } catch (err) { next(err); }
  }
);

// PATCH /api/seller/me — 사업자 정보 수정 (APPROVED 상태만)
router.patch(
  '/me',
  [
    body('bizName').optional().isString().trim().notEmpty(),
    body('phone').optional().isString().trim().notEmpty(),
    body('address').optional().isString().trim().notEmpty(),
  ],
  async (req, res, next) => {
    if (handleValidation(req, res)) return;
    try {
      const profile = await prisma.sellerProfile.findUnique({ where: { userId: req.user.id } });
      if (!profile) return res.status(404).json({ error: '사업자 프로필이 없습니다.', code: 'NOT_FOUND' });
      const data = {};
      if (req.body.bizName) data.bizName = req.body.bizName;
      if (req.body.phone)   data.phone   = req.body.phone;
      if (req.body.address) data.address = req.body.address;
      const updated = await prisma.sellerProfile.update({ where: { id: profile.id }, data });
      res.json(updated);
    } catch (err) { next(err); }
  }
);

// GET /api/seller/products — 내 상품 목록 (페이지네이션, isActive 필터)
router.get('/products', sellerAuth, async (req, res, next) => {
  try {
    const page  = Number(req.query.page)  || 1;
    const limit = Number(req.query.limit) || 20;
    const { isActive } = req.query;

    const where = { sellerId: req.user.id };
    if (isActive === 'true')  where.isActive = true;
    if (isActive === 'false') where.isActive = false;

    const [total, items] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: { category: { select: { id: true, name: true } } },
      }),
    ]);
    res.json({ items, page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) });
  } catch (err) { next(err); }
});

// POST /api/seller/products — 상품 등록
router.post(
  '/products',
  sellerAuth,
  upload.single('image'),
  [
    body('name').isString().trim().notEmpty().withMessage('상품명을 입력해주세요.'),
    body('description').isString().trim().notEmpty().withMessage('상품 설명을 입력해주세요.'),
    body('price').toInt().isInt({ min: 0 }).withMessage('가격을 올바르게 입력해주세요.'),
    body('stock').toInt().isInt({ min: 0 }).withMessage('재고를 올바르게 입력해주세요.'),
    body('categoryId').toInt().isInt({ min: 1 }).withMessage('카테고리를 선택해주세요.'),
  ],
  async (req, res, next) => {
    if (handleValidation(req, res)) return;
    try {
      const imageUrl = req.file ? `/uploads/products/${req.file.filename}` : null;
      const product = await prisma.product.create({
        data: {
          name:        req.body.name,
          description: req.body.description,
          price:       Number(req.body.price),
          stock:       Number(req.body.stock),
          categoryId:  Number(req.body.categoryId),
          sellerId:    req.user.id,
          imageUrl,
          isActive:    true,
        },
        include: { category: { select: { id: true, name: true } } },
      });
      res.status(201).json(product);
    } catch (err) { next(err); }
  }
);

// PATCH /api/seller/products/:id — 상품 수정
router.patch(
  '/products/:id',
  sellerAuth,
  upload.single('image'),
  [param('id').toInt().isInt()],
  async (req, res, next) => {
    if (handleValidation(req, res)) return;
    try {
      const product = await prisma.product.findFirst({
        where: { id: Number(req.params.id), sellerId: req.user.id },
      });
      if (!product) return res.status(404).json({ error: '상품을 찾을 수 없습니다.', code: 'NOT_FOUND' });

      const data = {};
      if (req.body.name)           data.name        = req.body.name;
      if (req.body.description)    data.description = req.body.description;
      if (req.body.price  != null) data.price       = Number(req.body.price);
      if (req.body.stock  != null) data.stock       = Number(req.body.stock);
      if (req.body.categoryId)     data.categoryId  = Number(req.body.categoryId);
      if (req.body.isActive != null) data.isActive  = req.body.isActive === 'true' || req.body.isActive === true;
      if (req.file) data.imageUrl = `/uploads/products/${req.file.filename}`;

      const updated = await prisma.product.update({
        where: { id: product.id },
        data,
        include: { category: { select: { id: true, name: true } } },
      });
      res.json(updated);
    } catch (err) { next(err); }
  }
);

// DELETE /api/seller/products/:id — 상품 비활성화 (소프트 삭제)
router.delete('/products/:id', sellerAuth, [param('id').toInt().isInt()], async (req, res, next) => {
  if (handleValidation(req, res)) return;
  try {
    const product = await prisma.product.findFirst({
      where: { id: Number(req.params.id), sellerId: req.user.id },
    });
    if (!product) return res.status(404).json({ error: '상품을 찾을 수 없습니다.', code: 'NOT_FOUND' });
    await prisma.product.update({ where: { id: product.id }, data: { isActive: false } });
    res.status(204).send();
  } catch (err) { next(err); }
});

// GET /api/seller/stats — 셀러 상품 및 주문 통계
router.get('/stats', sellerAuth, async (req, res, next) => {
  try {
    const myProducts = await prisma.product.findMany({
      where: { sellerId: req.user.id },
      select: { id: true },
    });
    const myProductIds = myProducts.map((p) => p.id);

    const [productCount, activeCount, profile] = await Promise.all([
      prisma.product.count({ where: { sellerId: req.user.id } }),
      prisma.product.count({ where: { sellerId: req.user.id, isActive: true } }),
      prisma.sellerProfile.findUnique({ where: { userId: req.user.id } }),
    ]);

    let orderCount = 0, pendingShipCount = 0, totalRevenue = 0;
    if (myProductIds.length > 0) {
      const orderIds = (await prisma.orderItem.findMany({
        where: { productId: { in: myProductIds } },
        select: { orderId: true },
        distinct: ['orderId'],
      })).map((o) => o.orderId);

      if (orderIds.length > 0) {
        [orderCount, pendingShipCount] = await Promise.all([
          prisma.order.count({ where: { id: { in: orderIds } } }),
          prisma.order.count({ where: { id: { in: orderIds }, status: 'PAID' } }),
        ]);

        const delivered = await prisma.orderItem.findMany({
          where: {
            productId: { in: myProductIds },
            order: { status: 'DELIVERED' },
          },
          select: { price: true, quantity: true },
        });
        totalRevenue = delivered.reduce((sum, i) => sum + i.price * i.quantity, 0);
      }
    }

    res.json({
      productCount,
      activeCount,
      inactiveCount: productCount - activeCount,
      orderCount,
      pendingShipCount,
      totalRevenue,
      bizName: profile?.bizName ?? '',
    });
  } catch (err) { next(err); }
});

// GET /api/seller/orders — 셀러 상품이 포함된 주문 목록
router.get('/orders', sellerAuth, async (req, res, next) => {
  try {
    const page   = Number(req.query.page)   || 1;
    const limit  = Number(req.query.limit)  || 20;
    const { status } = req.query;

    const myProducts = await prisma.product.findMany({
      where: { sellerId: req.user.id },
      select: { id: true },
    });
    const myProductIds = myProducts.map((p) => p.id);

    if (myProductIds.length === 0) {
      return res.json({ items: [], page, limit, total: 0, totalPages: 1 });
    }

    const orderIdsWithMyItems = await prisma.orderItem.findMany({
      where: { productId: { in: myProductIds } },
      select: { orderId: true },
      distinct: ['orderId'],
    });
    const orderIds = orderIdsWithMyItems.map((o) => o.orderId);

    const where = { id: { in: orderIds } };
    if (status) where.status = status;

    const [total, orders] = await Promise.all([
      prisma.order.count({ where }),
      prisma.order.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          items: {
            where: { productId: { in: myProductIds } },
            select: {
              id: true,
              name: true,
              price: true,
              quantity: true,
              productId: true,
            },
          },
          user: { select: { name: true, phone: true } },
        },
      }),
    ]);

    const items = orders.map((o) => ({
      id: o.id,
      status: o.status,
      totalAmount: o.totalAmount,
      shippingName: o.shippingName,
      shippingPhone: o.shippingPhone,
      shippingAddress: o.shippingAddress,
      memo: o.memo,
      createdAt: o.createdAt,
      buyerName: o.user?.name ?? '익명',
      myItems: o.items,
      myTotal: o.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }));

    res.json({ items, page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) });
  } catch (err) { next(err); }
});

// PATCH /api/seller/orders/:id/status — 주문 상태 변경 (PAID→SHIPPED, SHIPPED→DELIVERED)
router.patch('/orders/:id/status', sellerAuth, async (req, res, next) => {
  try {
    const orderId  = Number(req.params.id);
    const { status } = req.body;

    const ALLOWED = { PAID: 'SHIPPED', SHIPPED: 'DELIVERED' };

    const myProducts = await prisma.product.findMany({
      where: { sellerId: req.user.id },
      select: { id: true },
    });
    const myProductIds = myProducts.map((p) => p.id);

    const hasMyItem = await prisma.orderItem.findFirst({
      where: { orderId, productId: { in: myProductIds } },
    });
    if (!hasMyItem) {
      return res.status(403).json({ error: '이 주문에 대한 권한이 없습니다.', code: 'FORBIDDEN' });
    }

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) return res.status(404).json({ error: '주문을 찾을 수 없습니다.', code: 'NOT_FOUND' });

    if (!ALLOWED[order.status] || ALLOWED[order.status] !== status) {
      return res.status(409).json({
        error: `${order.status} 상태에서 ${status}로 변경할 수 없습니다.`,
        code: 'INVALID_TRANSITION',
      });
    }

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
    res.json({ id: updated.id, status: updated.status });
  } catch (err) { next(err); }
});

export default router;
