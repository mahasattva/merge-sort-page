import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';

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

function publicProfile(u) {
  return {
    id: u.id,
    email: u.email,
    name: u.name,
    phone: u.phone,
    address: u.address,
    role: u.role,
    createdAt: u.createdAt,
  };
}

// GET /api/users/me
router.get('/me', async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다.', code: 'NOT_FOUND' });
    }
    res.json(publicProfile(user));
  } catch (err) {
    next(err);
  }
});

// PATCH /api/users/me
router.patch(
  '/me',
  [
    body('name').optional().isString().trim().notEmpty(),
    body('phone').optional().isString(),
    body('address').optional().isString(),
    body('currentPassword').optional().isString(),
    body('newPassword').optional().isString().isLength({ min: 6 }).withMessage('새 비밀번호는 6자 이상이어야 합니다.'),
  ],
  async (req, res, next) => {
    if (handleValidation(req, res)) return;
    const { name, phone, address, currentPassword, newPassword } = req.body;
    try {
      const user = await prisma.user.findUnique({ where: { id: req.user.id } });
      if (!user) {
        return res.status(404).json({ error: '사용자를 찾을 수 없습니다.', code: 'NOT_FOUND' });
      }

      const data = {};
      if (typeof name === 'string') data.name = name;
      if (typeof phone === 'string') data.phone = phone;
      if (typeof address === 'string') data.address = address;

      if (newPassword) {
        if (!currentPassword) {
          return res.status(400).json({ error: '현재 비밀번호를 입력해주세요.', code: 'VALIDATION_ERROR' });
        }
        const ok = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!ok) {
          return res.status(401).json({ error: '현재 비밀번호가 일치하지 않습니다.', code: 'INVALID_PASSWORD' });
        }
        data.passwordHash = await bcrypt.hash(newPassword, 10);
      }

      const updated = await prisma.user.update({ where: { id: user.id }, data });
      res.json(publicProfile(updated));
    } catch (err) {
      next(err);
    }
  }
);

export default router;
