const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const interests = [
  'Bridge Club', 'Classical Music', 'Jazz', 'Opera',
  'Gardening', 'Hiking', 'Bird Watching', 'Yoga',
  'Reading', 'History', 'Philosophy', 'Poetry',
  'Cooking', 'Wine Tasting', 'Traveling', 'Photography',
  'Theater', 'Art & Painting', 'Volunteering', 'Dancing',
  'Tennis', 'Golf', 'Swimming', 'Cycling',
  'Knitting & Crafts', 'Chess', 'Board Games', 'Genealogy',
];

async function main() {
  for (const name of interests) {
    await prisma.interest.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
  console.log(`Seeded ${interests.length} interests.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
