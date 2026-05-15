const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

const prisma = new PrismaClient();

// GET /api/messages/:matchId
router.get('/:matchId', auth, async (req, res, next) => {
  try {
    const matchId = parseInt(req.params.matchId);
    const match = await prisma.match.findUnique({ where: { id: matchId } });
    if (!match || (match.userId1 !== req.user.id && match.userId2 !== req.user.id)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const messages = await prisma.message.findMany({
      where: { matchId },
      orderBy: { createdAt: 'asc' },
    });
    res.json(messages);
  } catch (err) {
    next(err);
  }
});

// POST /api/messages/:matchId
router.post('/:matchId', auth, async (req, res, next) => {
  try {
    const matchId = parseInt(req.params.matchId);
    const { type, content } = req.body;
    const match = await prisma.match.findUnique({ where: { id: matchId } });
    if (!match || (match.userId1 !== req.user.id && match.userId2 !== req.user.id)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const message = await prisma.message.create({
      data: { matchId, senderId: req.user.id, type: type || 'TEXT', content },
    });
    res.status(201).json(message);
  } catch (err) {
    next(err);
  }
});

// POST /api/messages/:matchId/audio — upload a voice note
router.post('/:matchId/audio', auth, upload.single('audio'), async (req, res, next) => {
  try {
    const matchId = parseInt(req.params.matchId);
    const match = await prisma.match.findUnique({ where: { id: matchId } });
    if (!match || (match.userId1 !== req.user.id && match.userId2 !== req.user.id)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    if (!req.file) return res.status(400).json({ error: 'No audio file provided' });

    const audioUrl = `/uploads/${req.file.filename}`;
    const message = await prisma.message.create({
      data: { matchId, senderId: req.user.id, type: 'VOICE_NOTE', content: audioUrl },
    });
    res.status(201).json(message);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
