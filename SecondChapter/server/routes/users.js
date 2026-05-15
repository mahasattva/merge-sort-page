const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const prisma = new PrismaClient();

// GET /api/users/me
router.get('/me', auth, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { interests: { include: { interest: true } }, lifeChapterPrompts: true },
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// PUT /api/users/me
router.put('/me', auth, async (req, res, next) => {
  try {
    const { name, age, location, bio, photoUrl, lifestyleType } = req.body;
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { name, age, location, bio, photoUrl, lifestyleType },
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// PUT /api/users/me/interests
router.put('/me/interests', auth, async (req, res, next) => {
  try {
    const { interestIds } = req.body; // array of interestId numbers
    await prisma.userInterest.deleteMany({ where: { userId: req.user.id } });
    await prisma.userInterest.createMany({
      data: interestIds.map((id) => ({ userId: req.user.id, interestId: id })),
    });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

// PUT /api/users/me/prompts
router.put('/me/prompts', auth, async (req, res, next) => {
  try {
    const { prompts } = req.body; // [{ questionKey, answer }]
    for (const { questionKey, answer } of prompts) {
      await prisma.lifeChapterPrompt.upsert({
        where: { userId_questionKey: { userId: req.user.id, questionKey } },
        update: { answer },
        create: { userId: req.user.id, questionKey, answer },
      });
    }
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

const ICEBREAKERS = {
  'Classical Music':  'Since you both love classical music, who is your favorite composer?',
  'Jazz':             'Since you both love jazz, who is your favorite musician?',
  'Opera':            'Since you both enjoy opera, what is your favorite opera or aria?',
  'Gardening':        'Since you both enjoy gardening, what are you growing this season?',
  'Hiking':           'Since you both love hiking, what is the most memorable trail you have been on?',
  'Bird Watching':    'Since you both enjoy bird watching, what is the most interesting bird you have spotted?',
  'Reading':          'Since you both love reading, what book has stayed with you the longest?',
  'History':          'Since you both love history, which historical era fascinates you most?',
  'Philosophy':       'Since you both enjoy philosophy, which thinker has influenced you most?',
  'Poetry':           'Since you both enjoy poetry, do you have a favorite poem or poet?',
  'Cooking':          'Since you both enjoy cooking, what is your signature dish?',
  'Wine Tasting':     'Since you both enjoy wine, what is a favorite region or variety you would recommend?',
  'Traveling':        'Since you both love to travel, what is the most memorable place you have visited?',
  'Photography':      'Since you both enjoy photography, what subject do you most love to photograph?',
  'Theater':          'Since you both enjoy theater, what is a production that has really moved you?',
  'Art & Painting':   'Since you both love art, do you have a favorite artist or movement?',
  'Volunteering':     'Since you both value volunteering, what cause is closest to your heart?',
  'Dancing':          'Since you both enjoy dancing, what is your favorite style?',
  'Tennis':           'Since you both play tennis, how long have you been playing?',
  'Golf':             'Since you both enjoy golf, what is your favorite course you have played?',
  'Swimming':         'Since you both enjoy swimming, do you prefer open water or the pool?',
  'Cycling':          'Since you both enjoy cycling, what is a favorite route you have ridden?',
  'Yoga':             'Since you both practice yoga, how has it shaped your day-to-day life?',
  'Knitting & Crafts':'Since you both enjoy crafts, what project are you working on right now?',
  'Chess':            'Since you both enjoy chess, how did you first learn to play?',
  'Board Games':      'Since you both enjoy board games, what is your favorite game to play?',
  'Bridge Club':      'Since you both enjoy bridge, how long have you been playing?',
  'Genealogy':        'Since you both enjoy genealogy, what is the most surprising thing you have discovered about your family history?',
};

// GET /api/users/discover — returns scored compatibility cards
router.get('/discover', auth, async (req, res, next) => {
  try {
    const me = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { interests: true },
    });
    const myInterestIds = me.interests.map((i) => i.interestId);

    // Exclude users already matched with (any status)
    const existingMatches = await prisma.match.findMany({
      where: { OR: [{ userId1: req.user.id }, { userId2: req.user.id }] },
      select: { userId1: true, userId2: true },
    });
    const matchedIds = new Set(
      existingMatches.flatMap((m) => [m.userId1, m.userId2]).filter((id) => id !== req.user.id)
    );

    const candidates = await prisma.user.findMany({
      where: {
        id: { not: req.user.id, notIn: [...matchedIds] },
        interests: { some: { interestId: { in: myInterestIds } } },
      },
      include: { interests: { include: { interest: true } }, lifeChapterPrompts: true },
      take: 30,
    });

    const results = candidates.map((candidate) => {
      const candidateInterestIds = candidate.interests.map((ui) => ui.interestId);
      const sharedIds = myInterestIds.filter((id) => candidateInterestIds.includes(id));
      const sharedInterests = candidate.interests
        .filter((ui) => sharedIds.includes(ui.interestId))
        .map((ui) => ui.interest.name);

      // Score: up to 60pts for shared interests, 20pts lifestyle match, 20pts full prompts
      const interestScore = Math.min(sharedIds.length * 20, 60);
      const lifestyleMatch = candidate.lifestyleType === me.lifestyleType;
      const lifestyleScore = lifestyleMatch ? 20 : 0;
      const promptScore = candidate.lifeChapterPrompts.length >= 3 ? 20 : 0;
      const compatibilityScore = Math.min(interestScore + lifestyleScore + promptScore, 100);

      const icebreaker = sharedInterests.length > 0
        ? (ICEBREAKERS[sharedInterests[0]] || `Since you both enjoy ${sharedInterests[0]}, what do you love most about it?`)
        : null;

      return {
        id: candidate.id,
        name: candidate.name,
        age: candidate.age,
        location: candidate.location,
        bio: candidate.bio,
        lifestyleType: candidate.lifestyleType,
        sharedInterests,
        allInterests: candidate.interests.map((ui) => ui.interest.name),
        compatibilityScore,
        lifestyleMatch,
        icebreaker,
        promptPreview: candidate.lifeChapterPrompts[0] || null,
      };
    });

    results.sort((a, b) => b.compatibilityScore - a.compatibilityScore);
    res.json(results);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
