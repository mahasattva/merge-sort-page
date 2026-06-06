import { Router } from 'express';
import { body, query, param, validationResult } from 'express-validator';

import { prisma } from '../prisma.js';
import { auth } from '../middleware/auth.js';
import { adminAuth } from '../middleware/adminAuth.js';

const router = Router();

// 모든 admin 엔드포인트에 인증 + 관리자 권한 적용
router.use(auth);
router.use(adminAuth);

function handleValidation(req, res) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return null;
  res.status(400).json({
    error: errors.array()[0]?.msg || '입력값이 올바르지 않습니다.',
    code: 'VALIDATION_ERROR',
  });
  return true;
}

// passwordHash를 제외한 사용자 공개 필드 선택자
const USER_SELECT = {
  id: true,
  email: true,
  name: true,
  phone: true,
  address: true,
  birthDate: true,
  role: true,
  createdAt: true,
};

// GET /api/admin/stats
router.get('/stats', async (req, res, next) => {
  try {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const [userCount, orderCount, revenueAgg, thisMonthAgg, thisMonthOrderCount] =
      await Promise.all([
        prisma.user.count(),
        prisma.order.count(),
        prisma.order.aggregate({ _sum: { totalAmount: true } }),
        prisma.order.aggregate({
          where: { createdAt: { gte: monthStart } },
          _sum: { totalAmount: true },
        }),
        prisma.order.count({ where: { createdAt: { gte: monthStart } } }),
      ]);

    res.json({
      userCount,
      orderCount,
      totalRevenue: revenueAgg._sum.totalAmount ?? 0,
      thisMonthRevenue: thisMonthAgg._sum.totalAmount ?? 0,
      thisMonthOrders: thisMonthOrderCount,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/admin/users
router.get(
  '/users',
  [
    query('page').optional().isInt({ min: 1 }).withMessage('page는 1 이상의 정수여야 합니다.'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('limit는 1~100 사이여야 합니다.'),
    query('q').optional().isString(),
    query('role').optional().isIn(['USER', 'ADMIN']).withMessage('role은 USER 또는 ADMIN이어야 합니다.'),
  ],
  async (req, res, next) => {
    if (handleValidation(req, res)) return;

    const page = parseInt(req.query.page ?? '1', 10);
    const limit = parseInt(req.query.limit ?? '20', 10);
    const skip = (page - 1) * limit;
    const q = req.query.q?.trim();
    const role = req.query.role;

    const where = {};
    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { email: { contains: q, mode: 'insensitive' } },
      ];
    }
    if (role) {
      where.role = role;
    }

    try {
      const [users, total] = await Promise.all([
        prisma.user.findMany({
          where,
          select: {
            ...USER_SELECT,
            _count: { select: { orders: true } },
            orders: { select: { totalAmount: true } },
          },
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit,
        }),
        prisma.user.count({ where }),
      ]);

      const items = users.map(u => {
        const { _count, orders, ...rest } = u;
        return {
          ...rest,
          orderCount: _count.orders,
          totalSpent: orders.reduce((sum, o) => sum + o.totalAmount, 0),
        };
      });

      res.json({
        items,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      });
    } catch (err) {
      next(err);
    }
  }
);

// GET /api/admin/users/:id
router.get(
  '/users/:id',
  [param('id').isInt({ min: 1 }).withMessage('유효한 사용자 ID가 필요합니다.')],
  async (req, res, next) => {
    if (handleValidation(req, res)) return;

    const userId = parseInt(req.params.id, 10);

    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          ...USER_SELECT,
          _count: { select: { orders: true } },
          orders: {
            select: { totalAmount: true },
          },
        },
      });

      if (!user) {
        return res.status(404).json({ error: '사용자를 찾을 수 없습니다.', code: 'NOT_FOUND' });
      }

      const recentOrders = await prisma.order.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          status: true,
          totalAmount: true,
          createdAt: true,
          items: { select: { name: true, quantity: true, price: true } },
        },
      });

      const { _count, orders, ...rest } = user;

      res.json({
        ...rest,
        orderCount: _count.orders,
        totalSpent: orders.reduce((sum, o) => sum + o.totalAmount, 0),
        recentOrders,
      });
    } catch (err) {
      next(err);
    }
  }
);

// PATCH /api/admin/users/:id
router.patch(
  '/users/:id',
  [
    param('id').isInt({ min: 1 }).withMessage('유효한 사용자 ID가 필요합니다.'),
    body('name').optional().isString().trim().notEmpty().withMessage('이름은 비어있을 수 없습니다.'),
    body('phone').optional().isString(),
    body('address').optional().isString(),
    body('birthDate').optional({ nullable: true }).isISO8601().withMessage('생년월일 형식이 올바르지 않습니다.'),
    body('role').optional().isIn(['USER', 'ADMIN']).withMessage('role은 USER 또는 ADMIN이어야 합니다.'),
  ],
  async (req, res, next) => {
    if (handleValidation(req, res)) return;

    const userId = parseInt(req.params.id, 10);
    const { name, phone, address, birthDate, role } = req.body;

    // 자기 자신의 role 변경 방지
    if (role !== undefined && userId === req.user.id) {
      return res.status(400).json({
        error: '본인의 권한은 변경할 수 없습니다.',
        code: 'FORBIDDEN_SELF_ROLE_CHANGE',
      });
    }

    try {
      const existing = await prisma.user.findUnique({ where: { id: userId }, select: { id: true } });
      if (!existing) {
        return res.status(404).json({ error: '사용자를 찾을 수 없습니다.', code: 'NOT_FOUND' });
      }

      const data = {};
      if (typeof name === 'string') data.name = name;
      if (typeof phone === 'string') data.phone = phone;
      if (typeof address === 'string') data.address = address;
      if (typeof birthDate !== 'undefined') {
        data.birthDate = birthDate ? new Date(birthDate) : null;
      }
      if (typeof role === 'string') data.role = role;

      const updated = await prisma.user.update({
        where: { id: userId },
        select: USER_SELECT,
        data,
      });

      res.json(updated);
    } catch (err) {
      next(err);
    }
  }
);

// DELETE /api/admin/users/:id
router.delete(
  '/users/:id',
  [param('id').isInt({ min: 1 }).withMessage('유효한 사용자 ID가 필요합니다.')],
  async (req, res, next) => {
    if (handleValidation(req, res)) return;

    const userId = parseInt(req.params.id, 10);

    // 본인 삭제 방지
    if (userId === req.user.id) {
      return res.status(400).json({
        error: '본인 계정은 삭제할 수 없습니다.',
        code: 'FORBIDDEN_SELF_DELETE',
      });
    }

    try {
      const existing = await prisma.user.findUnique({ where: { id: userId }, select: { id: true } });
      if (!existing) {
        return res.status(404).json({ error: '사용자를 찾을 수 없습니다.', code: 'NOT_FOUND' });
      }

      await prisma.user.delete({ where: { id: userId } });
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
);

// ─── 셀러 신청 관리 ────────────────────────────────────────────

// GET /api/admin/sellers
router.get('/sellers', async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const where = status ? { status } : {};
    const [total, items] = await Promise.all([
      prisma.sellerProfile.count({ where }),
      prisma.sellerProfile.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
        include: { user: { select: { id: true, email: true, name: true } } },
      }),
    ]);
    res.json({ items, page: Number(page), limit: Number(limit), total, totalPages: Math.max(1, Math.ceil(total / Number(limit))) });
  } catch (err) { next(err); }
});

// PATCH /api/admin/sellers/:id/approve
router.patch('/sellers/:id/approve', async (req, res, next) => {
  try {
    const profile = await prisma.sellerProfile.findUnique({ where: { id: Number(req.params.id) } });
    if (!profile) return res.status(404).json({ error: '신청을 찾을 수 없습니다.', code: 'NOT_FOUND' });

    const [updated] = await prisma.$transaction([
      prisma.sellerProfile.update({ where: { id: profile.id }, data: { status: 'APPROVED', rejectNote: null } }),
      prisma.user.update({ where: { id: profile.userId }, data: { role: 'SELLER' } }),
    ]);
    res.json(updated);
  } catch (err) { next(err); }
});

// PATCH /api/admin/sellers/:id/reject
router.patch('/sellers/:id/reject', async (req, res, next) => {
  try {
    const note = typeof req.body?.note === 'string' ? req.body.note.trim() : null;
    const profile = await prisma.sellerProfile.findUnique({ where: { id: Number(req.params.id) } });
    if (!profile) return res.status(404).json({ error: '신청을 찾을 수 없습니다.', code: 'NOT_FOUND' });

    const [updated] = await prisma.$transaction([
      prisma.sellerProfile.update({ where: { id: profile.id }, data: { status: 'REJECTED', rejectNote: note } }),
      prisma.user.update({ where: { id: profile.userId }, data: { role: 'USER' } }),
    ]);
    res.json(updated);
  } catch (err) { next(err); }
});

export default router;
