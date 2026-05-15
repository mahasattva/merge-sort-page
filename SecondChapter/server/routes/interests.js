const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const prisma = new PrismaClient();

// GET /api/interests
router.get('/', auth, async (req, res, next) => {
  try {
    const interests = await prisma.interest.findMany({ orderBy: { name: 'asc' } });
    res.json(interests);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
