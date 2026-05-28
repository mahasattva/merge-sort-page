import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';

import { prisma } from '../prisma.js';
import { auth } from '../middleware/auth.js';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'change-me-access-secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'change-me-refresh-secret';
const ACCESS_TTL = '1h';
const REFRESH_TTL = '7d';

function signTokens(user) {
  const payload = { sub: user.id, role: user.role };
  return {
    accessToken: jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TTL }),
    refreshToken: jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TTL }),
  };
}

function publicUser(u) {
  return { id: u.id, email: u.email, name: u.name, role: u.role };
}

function handleValidation(req, res) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return null;
  res.status(400).json({
    error: errors.array()[0]?.msg || '입력값이 올바르지 않습니다.',
    code: 'VALIDATION_ERROR',
  });
  return true;
}

// POST /api/auth/register
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('이메일 형식이 올바르지 않습니다.'),
    body('password').isLength({ min: 6 }).withMessage('비밀번호는 6자 이상이어야 합니다.'),
    body('name').isString().trim().notEmpty().withMessage('이름을 입력해주세요.'),
    body('phone').optional().isString(),
  ],
  async (req, res, next) => {
    if (handleValidation(req, res)) return;
    const { email, password, name, phone } = req.body;
    try {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        return res.status(409).json({ error: '이미 사용 중인 이메일입니다.', code: 'EMAIL_TAKEN' });
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { email, passwordHash, name, phone: phone || null },
      });
      const tokens = signTokens(user);
      res.status(201).json({ user: publicUser(user), ...tokens });
    } catch (err) {
      next(err);
    }
  }
);

// POST /api/auth/login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('이메일 형식이 올바르지 않습니다.'),
    body('password').isString().notEmpty().withMessage('비밀번호를 입력해주세요.'),
  ],
  async (req, res, next) => {
    if (handleValidation(req, res)) return;
    const { email, password } = req.body;
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: '이메일 또는 비밀번호가 일치하지 않습니다.', code: 'INVALID_CREDENTIALS' });
      }
      const ok = await bcrypt.compare(password, user.passwordHash);
      if (!ok) {
        return res.status(401).json({ error: '이메일 또는 비밀번호가 일치하지 않습니다.', code: 'INVALID_CREDENTIALS' });
      }
      const tokens = signTokens(user);
      res.json({ user: publicUser(user), ...tokens });
    } catch (err) {
      next(err);
    }
  }
);

// POST /api/auth/refresh
router.post(
  '/refresh',
  [body('refreshToken').isString().notEmpty().withMessage('refreshToken이 필요합니다.')],
  async (req, res) => {
    if (handleValidation(req, res)) return;
    try {
      const payload = jwt.verify(req.body.refreshToken, JWT_REFRESH_SECRET);
      const accessToken = jwt.sign(
        { sub: payload.sub, role: payload.role },
        JWT_SECRET,
        { expiresIn: ACCESS_TTL }
      );
      res.json({ accessToken });
    } catch {
      res.status(401).json({ error: 'refresh token이 유효하지 않습니다.', code: 'INVALID_REFRESH_TOKEN' });
    }
  }
);

// POST /api/auth/logout — stateless: client just discards tokens
router.post('/logout', auth, (_req, res) => {
  res.status(204).end();
});

export default router;
