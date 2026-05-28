import { Router } from 'express';
import { param, query, validationResult } from 'express-validator';

import { prisma } from '../prisma.js';

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

// GET /api/categories
router.get('/', async (_req, res, next) => {
  try {
    const rows = await prisma.category.findMany({
      orderBy: { id: 'asc' },
      include: { _count: { select: { products: { where: { isActive: true } } } } },
    });
    res.json(
      rows.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        productCount: c._count.products,
      }))
    );
  } catch (err) {
    next(err);
  }
});

// GET /api/categories/:slug — base info + small product preview
router.get('/:slug', [param('slug').isString().notEmpty()], async (req, res, next) => {
  if (handleValidation(req, res)) return;
  try {
    const category = await prisma.category.findUnique({
      where: { slug: req.params.slug },
      include: {
        products: {
          where: { isActive: true },
          orderBy: { createdAt: 'desc' },
          include: { category: { select: { id: true, name: true } } },
        },
      },
    });
    if (!category) {
      return res.status(404).json({ error: '카테고리를 찾을 수 없습니다.', code: 'NOT_FOUND' });
    }
    res.json({
      id: category.id,
      name: category.name,
      slug: category.slug,
      products: category.products,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/categories/:slug/products — paginated product list scoped to a category
router.get(
  '/:slug/products',
  [
    param('slug').isString().notEmpty(),
    query('page').optional().toInt().isInt({ min: 1 }),
    query('limit').optional().toInt().isInt({ min: 1, max: 100 }),
    query('sort').optional().isIn(['latest', 'priceAsc', 'priceDesc']),
  ],
  async (req, res, next) => {
    if (handleValidation(req, res)) return;
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;
    const sort = req.query.sort || 'latest';

    const orderBy =
      sort === 'priceAsc' ? { price: 'asc' }
      : sort === 'priceDesc' ? { price: 'desc' }
      : { createdAt: 'desc' };

    try {
      const category = await prisma.category.findUnique({ where: { slug: req.params.slug } });
      if (!category) {
        return res.status(404).json({ error: '카테고리를 찾을 수 없습니다.', code: 'NOT_FOUND' });
      }
      const where = { isActive: true, categoryId: category.id };
      const [total, items] = await Promise.all([
        prisma.product.count({ where }),
        prisma.product.findMany({
          where,
          orderBy,
          skip: (page - 1) * limit,
          take: limit,
          include: { category: { select: { id: true, name: true } } },
        }),
      ]);
      res.json({
        category: { id: category.id, name: category.name, slug: category.slug },
        items,
        page,
        limit,
        total,
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
