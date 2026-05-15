const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const prisma = new PrismaClient();

// GET /api/groups
router.get('/', auth, async (req, res, next) => {
  try {
    const groups = await prisma.group.findMany({ include: { interest: true, _count: { select: { memberships: true } } } });
    res.json(groups);
  } catch (err) {
    next(err);
  }
});

// POST /api/groups/:id/join
router.post('/:id/join', auth, async (req, res, next) => {
  try {
    const groupId = parseInt(req.params.id);
    await prisma.groupMembership.upsert({
      where: { groupId_userId: { groupId, userId: req.user.id } },
      update: {},
      create: { groupId, userId: req.user.id },
    });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

// POST /api/groups/:id/leave
router.post('/:id/leave', auth, async (req, res, next) => {
  try {
    const groupId = parseInt(req.params.id);
    await prisma.groupMembership.delete({
      where: { groupId_userId: { groupId, userId: req.user.id } },
    });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
