const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const prisma = new PrismaClient();

const USER_FIELDS = { id: true, name: true, age: true, location: true, photoUrl: true };

// POST /api/matches — initiate or accept a match
router.post('/', auth, async (req, res, next) => {
  try {
    const { targetUserId } = req.body;
    if (!targetUserId) return res.status(400).json({ error: 'targetUserId required' });

    const [userId1, userId2] = [req.user.id, targetUserId].sort((a, b) => a - b);
    const existing = await prisma.match.findUnique({ where: { userId1_userId2: { userId1, userId2 } } });

    if (existing) {
      // Only the other person can accept a pending match
      if (existing.status === 'PENDING' && existing.initiatorId !== req.user.id) {
        const updated = await prisma.match.update({
          where: { id: existing.id },
          data: { status: 'ACCEPTED' },
        });
        return res.json(updated);
      }
      return res.json(existing);
    }

    const match = await prisma.match.create({
      data: { userId1, userId2, initiatorId: req.user.id },
    });
    res.status(201).json(match);
  } catch (err) {
    next(err);
  }
});

// GET /api/matches — accepted connections + incoming pending requests
router.get('/', auth, async (req, res, next) => {
  try {
    const myId = req.user.id;

    const [accepted, pending] = await Promise.all([
      prisma.match.findMany({
        where: { status: 'ACCEPTED', OR: [{ userId1: myId }, { userId2: myId }] },
        include: { user1: { select: USER_FIELDS }, user2: { select: USER_FIELDS } },
        orderBy: { createdAt: 'desc' },
      }),
      // Incoming requests: PENDING matches started by someone else
      prisma.match.findMany({
        where: {
          status: 'PENDING',
          OR: [{ userId1: myId }, { userId2: myId }],
          NOT: { initiatorId: myId },
        },
        include: { user1: { select: USER_FIELDS }, user2: { select: USER_FIELDS } },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    res.json({ accepted, pending });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
