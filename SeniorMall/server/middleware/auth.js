import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'change-me-access-secret';

// Verify `Authorization: Bearer <token>` and attach { id, role } to req.user.
export function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: '인증 토큰이 필요합니다.', code: 'UNAUTHORIZED' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { id: payload.sub, role: payload.role };
    return next();
  } catch {
    return res.status(401).json({ error: '토큰이 유효하지 않거나 만료되었습니다.', code: 'UNAUTHORIZED' });
  }
}
