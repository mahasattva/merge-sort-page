// Must run after `auth` — assumes req.user is populated.
export function adminOnly(req, res, next) {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: '관리자 권한이 필요합니다.', code: 'FORBIDDEN' });
  }
  next();
}
