import { Router } from 'express';
import { body, param, query, validationResult } from 'express-validator';

import { prisma } from '../prisma.js';
import { auth } from '../middleware/auth.js';

const router = Router();

function handleValidation(req, res) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return null;
  res.status(400).json({
    error: errors.array()[0]?.msg || '입력값이 올바르지 않습니다.',
    code: 'VALIDATION_ERROR',
  });
  return true;
}

function buildOrderBy(sort) {
  switch (sort) {
    case 'priceAsc':
      return { price: 'asc' };
    case 'priceDesc':
      return { price: 'desc' };
    case 'latest':
    default:
      return { createdAt: 'desc' };
  }
}

// GET /api/products
router.get(
  '/',
  [
    query('page').optional().toInt().isInt({ min: 1 }),
    query('limit').optional().toInt().isInt({ min: 1, max: 100 }),
    query('categoryId').optional().toInt().isInt(),
    query('q').optional().isString(),
    query('sort').optional().isIn(['latest', 'priceAsc', 'priceDesc']),
  ],
  async (req, res, next) => {
    if (handleValidation(req, res)) return;
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;
    const { categoryId, q, sort } = req.query;

    const where = { isActive: true };
    if (categoryId) where.categoryId = Number(categoryId);
    if (q) where.name = { contains: q, mode: 'insensitive' };

    try {
      const [total, items] = await Promise.all([
        prisma.product.count({ where }),
        prisma.product.findMany({
          where,
          orderBy: buildOrderBy(sort),
          skip: (page - 1) * limit,
          take: limit,
          include: { category: { select: { id: true, name: true } } },
        }),
      ]);
      const totalPages = Math.max(1, Math.ceil(total / limit));
      // Spec field names: items / page / limit / total ; we additionally expose `products` and `totalPages` for convenience.
      res.json({ items, products: items, page, limit, total, totalPages });
    } catch (err) {
      next(err);
    }
  }
);

// GET /api/products/search/suggest — must be declared BEFORE `/:id` to avoid route collision
router.get(
  '/search/suggest',
  [query('q').isString().isLength({ min: 2 }).withMessage('검색어는 2자 이상이어야 합니다.')],
  async (req, res, next) => {
    if (handleValidation(req, res)) return;
    try {
      const rows = await prisma.product.findMany({
        where: { isActive: true, name: { contains: req.query.q, mode: 'insensitive' } },
        select: { name: true },
        take: 10,
        orderBy: { createdAt: 'desc' },
      });
      res.json({ suggestions: rows.map((r) => r.name) });
    } catch (err) {
      next(err);
    }
  }
);

// GET /api/products/search — alias of GET / with q
router.get(
  '/search',
  [query('q').isString().notEmpty().withMessage('검색어가 필요합니다.')],
  async (req, res, next) => {
    if (handleValidation(req, res)) return;
    const page = Number(req.query.page) || 1;
    const limit = Math.min(Number(req.query.limit) || 20, 100);
    try {
      const where = { isActive: true, name: { contains: req.query.q, mode: 'insensitive' } };
      const [total, items] = await Promise.all([
        prisma.product.count({ where }),
        prisma.product.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
          include: { category: { select: { id: true, name: true } } },
          orderBy: { createdAt: 'desc' },
        }),
      ]);
      res.json({ items, products: items, page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) });
    } catch (err) {
      next(err);
    }
  }
);

// GET /api/products/:id
router.get('/:id', [param('id').toInt().isInt()], async (req, res, next) => {
  if (handleValidation(req, res)) return;
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        category: { select: { id: true, name: true } },
        reviews: {
          orderBy: { createdAt: 'desc' },
          take: 20,
          include: { user: { select: { name: true } } },
        },
      },
    });
    if (!product || !product.isActive) {
      return res.status(404).json({ error: '상품을 찾을 수 없습니다.', code: 'NOT_FOUND' });
    }

    const agg = await prisma.review.aggregate({
      where: { productId: product.id },
      _avg: { rating: true },
      _count: { _all: true },
    });

    const reviews = product.reviews.map((r) => ({
      id: r.id,
      rating: r.rating,
      content: r.content,
      userName: r.user?.name || '익명',
      createdAt: r.createdAt,
    }));

    res.json({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      imageUrl: product.imageUrl,
      categoryId: product.categoryId,
      category: product.category,
      reviews,
      avgRating: agg._avg.rating ? Number(agg._avg.rating.toFixed(2)) : 0,
      reviewCount: agg._count._all,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id/reviews
router.get(
  '/:id/reviews',
  [
    param('id').toInt().isInt(),
    query('page').optional().toInt().isInt({ min: 1 }),
    query('limit').optional().toInt().isInt({ min: 1, max: 100 }),
  ],
  async (req, res, next) => {
    if (handleValidation(req, res)) return;
    const productId = Number(req.params.id);
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;
    try {
      const [total, rows] = await Promise.all([
        prisma.review.count({ where: { productId } }),
        prisma.review.findMany({
          where: { productId },
          orderBy: { createdAt: 'desc' },
          skip: (page - 1) * limit,
          take: limit,
          include: { user: { select: { name: true } } },
        }),
      ]);
      const items = rows.map((r) => ({
        id: r.id,
        rating: r.rating,
        content: r.content,
        userName: r.user?.name || '익명',
        createdAt: r.createdAt,
      }));
      res.json({ items, page, limit, total });
    } catch (err) {
      next(err);
    }
  }
);

// POST /api/products/:id/reviews — Auth
router.post(
  '/:id/reviews',
  auth,
  [
    param('id').toInt().isInt(),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('평점은 1~5 사이여야 합니다.'),
    body('content').isString().trim().notEmpty().withMessage('리뷰 내용을 입력해주세요.'),
  ],
  async (req, res, next) => {
    if (handleValidation(req, res)) return;
    const productId = Number(req.params.id);
    try {
      const product = await prisma.product.findUnique({ where: { id: productId } });
      if (!product) {
        return res.status(404).json({ error: '상품을 찾을 수 없습니다.', code: 'NOT_FOUND' });
      }
      const review = await prisma.review.create({
        data: {
          productId,
          userId: req.user.id,
          rating: req.body.rating,
          content: req.body.content,
        },
        include: { user: { select: { name: true } } },
      });
      res.status(201).json({
        id: review.id,
        rating: review.rating,
        content: review.content,
        userName: review.user?.name || '익명',
        createdAt: review.createdAt,
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
