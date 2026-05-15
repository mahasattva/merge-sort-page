const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const prisma = new PrismaClient();

// POST /api/reports
router.post('/', auth, async (req, res, next) => {
  try {
    const { reportedUserId, reason, notes } = req.body;
    const report = await prisma.safetyReport.create({
      data: {
        reporterId: req.user.id,
        reportedUserId,
        reason,
        notes: notes || '',
      },
    });
    res.status(201).json(report);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
