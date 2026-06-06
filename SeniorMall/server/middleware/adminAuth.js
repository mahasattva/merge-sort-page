export function adminAuth(req, res, next) {
  if (req.user?.role !== 'ADMIN') {
    return res.status(403).json({ error: '관리자만 접근할 수 있습니다.', code: 'FORBIDDEN' });
  }
  next();
}
