// =============================================================
// SeniorMall - Prisma seed
// - 3 categories: 건강 / 생활 / 식품
// - 10 products distributed across categories
// - 2 users: regular (USER) + admin (ADMIN)
// =============================================================

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function upsertCategory(name, slug) {
  return prisma.category.upsert({
    where: { slug },
    update: { name },
    create: { name, slug },
  });
}

async function upsertProduct(data) {
  // Find by unique combo of name+categoryId — fall back to create if missing
  const existing = await prisma.product.findFirst({
    where: { name: data.name, categoryId: data.categoryId },
  });
  if (existing) {
    return prisma.product.update({ where: { id: existing.id }, data });
  }
  return prisma.product.create({ data });
}

async function upsertUser({ email, password, name, phone, address, role, birthDate }) {
  const passwordHash = await bcrypt.hash(password, 10);
  return prisma.user.upsert({
    where: { email },
    update: { passwordHash, name, phone, address, role, birthDate },
    create: { email, passwordHash, name, phone, address, role, birthDate },
  });
}

async function main() {
  const health = await upsertCategory('건강', 'health');
  const living = await upsertCategory('생활', 'living');
  const food = await upsertCategory('식품', 'food');

  const products = [
    // 건강 (4)
    {
      name: '가정용 자동 혈압측정기',
      description: '팔뚝형 자동 측정. 큰 숫자 LCD로 노안에도 또렷하게 보입니다. 측정값 60회 저장.',
      price: 45000,
      stock: 25,
      imageUrl: '/uploads/products/product1.jpg',
      categoryId: health.id,
    },
    {
      name: '시니어 종합비타민 90정',
      description: '50대 이상 영양 균형을 위한 멀티비타민/미네랄. 3개월분.',
      price: 28000,
      stock: 50,
      imageUrl: '/uploads/products/product2.jpg',
      categoryId: health.id,
    },
    {
      name: '무릎 보호대 (좌우 1쌍)',
      description: '계단 오르내림과 산책 시 무릎 부담을 줄여주는 압박형 보호대.',
      price: 19500,
      stock: 40,
      imageUrl: '/uploads/products/product3.jpg',
      categoryId: health.id,
    },
    {
      name: '휴대용 LED 돋보기 3배율',
      description: '신문 보기, 약 봉투 확인에 편리한 LED 조명 돋보기. 손잡이형.',
      price: 12000,
      stock: 60,
      imageUrl: '/uploads/products/product4.jpg',
      categoryId: health.id,
    },

    // 생활 (3)
    {
      name: '진공 보온병 500ml',
      description: '6시간 보온/보냉 유지. 원터치 마개로 한 손 개폐 가능.',
      price: 22000,
      stock: 35,
      imageUrl: '/uploads/products/product5.jpg',
      categoryId: living.id,
    },
    {
      name: '미끄럼방지 욕실매트',
      description: '흡착력 강화 바닥재로 욕실 낙상을 예방합니다. 60x40cm.',
      price: 16000,
      stock: 30,
      invalid: undefined,
      imageUrl: '/uploads/products/product6.jpg',
      categoryId: living.id,
    },
    {
      name: '눈에 편한 LED 스탠드',
      description: '플리커프리 LED, 3단계 밝기 조절. 책 읽기 좋은 따뜻한 색온도.',
      price: 39000,
      stock: 20,
      imageUrl: '/uploads/products/product7.jpg',
      categoryId: living.id,
    },

    // 식품 (3)
    {
      name: '간편 영양죽 8팩 세트',
      description: '전복죽, 호박죽, 야채죽 등 8종 모음. 데우기만 하면 한 끼 완성.',
      price: 32000,
      stock: 45,
      imageUrl: '/uploads/products/product8.jpg',
      categoryId: food.id,
    },
    {
      name: '국내산 흑마늘 진액 30포',
      description: '저온 숙성 흑마늘 100% 추출. 한 달 분량 스틱형 파우치.',
      price: 38000,
      stock: 25,
      imageUrl: '/uploads/products/product9.jpg',
      categoryId: food.id,
    },
    {
      name: '하루 견과류 30봉',
      description: '아몬드, 호두, 캐슈너트 등 1일 1봉 소포장. 산패 걱정 없음.',
      price: 21000,
      stock: 70,
      imageUrl: '/uploads/products/product10.jpg',
      categoryId: food.id,
    },
  ];

  for (const p of products) {
    // Drop accidental invalid keys before insert (e.g., the `invalid` placeholder above)
    const clean = { ...p };
    delete clean.invalid;
    await upsertProduct(clean);
  }

  const regular = await upsertUser({
    email: 'user@test.com',
    password: 'test1234',
    name: '홍길동',
    phone: '010-1234-5678',
    address: '서울시 강남구 테헤란로 1',
    role: 'USER',
    birthDate: new Date('1958-03-15'),
  });

  const admin = await upsertUser({
    email: 'admin@test.com',
    password: 'admin1234',
    name: '관리자',
    phone: '010-0000-0000',
    address: '서울시 종로구 1',
    role: 'ADMIN',
    birthDate: new Date('1970-07-20'),
  });

  // eslint-disable-next-line no-console
  console.log('[seed] categories: 3, products: 10');
  // eslint-disable-next-line no-console
  console.log(`[seed] users: ${regular.email} (USER), ${admin.email} (ADMIN)`);
}

main()
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
