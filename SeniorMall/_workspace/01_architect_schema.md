# 01. SeniorMall — 데이터베이스 스키마

> ORM: Prisma 5.x / DB: PostgreSQL 15+
> 위치: `prisma/schema.prisma`

---

## 1. ERD (텍스트)

```
User ─┬─< Cart (1:1, optional)         Cart ─< CartItem >─ Product
      ├─< Order (1:N)                  Order ─< OrderItem >─ Product
      └─< Review (1:N)                 Product >─ Category (N:1)
                                        Product ─< Review (1:N)
```

**관계 상세**
- `User 1 ─ 0..1 Cart` — 사용자당 활성 장바구니 하나 (없을 수 있음)
- `Cart 1 ─ N CartItem` — 장바구니 라인 아이템
- `CartItem N ─ 1 Product`
- `User 1 ─ N Order` — 주문 이력
- `Order 1 ─ N OrderItem` — 주문 시점에 상품 정보 스냅샷 저장 (가격 변동 대응)
- `OrderItem N ─ 1 Product` — 옵셔널(상품 삭제 후에도 주문은 유지)
- `Category 1 ─ N Product`
- `Product 1 ─ N Review`
- `User 1 ─ N Review` (한 사용자가 같은 상품에 여러 리뷰 가능 — MVP는 unique 제약 없음)

---

## 2. `prisma/schema.prisma` 전문

```prisma
// =============================================================
// SeniorMall - Prisma Schema
// =============================================================

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// -------------------------------------------------------------
// Enums
// -------------------------------------------------------------

enum Role {
  USER
  ADMIN
}

enum OrderStatus {
  PENDING      // 주문 생성, 결제 전 (MVP 기본값)
  PAID         // 결제 완료 (추후 PG 연동 시)
  SHIPPED      // 배송 중
  DELIVERED    // 배송 완료
  CANCELLED    // 취소
}

// -------------------------------------------------------------
// User
// -------------------------------------------------------------

model User {
  id           Int      @id @default(autoincrement())
  email        String   @unique
  passwordHash String   // bcryptjs 해시
  name         String
  phone        String?
  address      String?
  role         Role     @default(USER)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  cart    Cart?
  orders  Order[]
  reviews Review[]

  @@index([email])
}

// -------------------------------------------------------------
// Category
// -------------------------------------------------------------

model Category {
  id        Int      @id @default(autoincrement())
  name      String   @unique          // "건강", "생활", "식품"
  slug      String   @unique          // "health", "living", "food"
  createdAt DateTime @default(now())

  products Product[]
}

// -------------------------------------------------------------
// Product
// -------------------------------------------------------------

model Product {
  id          Int      @id @default(autoincrement())
  name        String
  description String   @db.Text
  price       Int                     // 원화 정수 (소수점 없음)
  stock       Int      @default(0)
  imageUrl    String?                 // /uploads/xxxx.jpg
  categoryId  Int
  isActive    Boolean  @default(true) // soft delete 대용
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  category   Category    @relation(fields: [categoryId], references: [id])
  cartItems  CartItem[]
  orderItems OrderItem[]
  reviews    Review[]

  @@index([name])                     // 상품명 검색
  @@index([categoryId])               // 카테고리 필터
  @@index([isActive, createdAt])      // 노출 목록 정렬
}

// -------------------------------------------------------------
// Cart / CartItem
// -------------------------------------------------------------

model Cart {
  id        Int      @id @default(autoincrement())
  userId    Int      @unique          // 1:1
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user  User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  items CartItem[]
}

model CartItem {
  id        Int @id @default(autoincrement())
  cartId    Int
  productId Int
  quantity  Int @default(1)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  cart    Cart    @relation(fields: [cartId], references: [id], onDelete: Cascade)
  product Product @relation(fields: [productId], references: [id])

  @@unique([cartId, productId])       // 동일 상품은 수량만 증가
  @@index([cartId])
}

// -------------------------------------------------------------
// Order / OrderItem
// -------------------------------------------------------------

model Order {
  id              Int         @id @default(autoincrement())
  userId          Int
  status          OrderStatus @default(PENDING)
  totalAmount     Int                  // 결제 금액 (원)
  shippingName    String
  shippingPhone   String
  shippingAddress String
  memo            String?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  user  User        @relation(fields: [userId], references: [id])
  items OrderItem[]

  @@index([userId, createdAt(sort: Desc)])   // 마이페이지 주문이력
  @@index([status])                          // 관리자 상태별 조회
}

model OrderItem {
  id        Int @id @default(autoincrement())
  orderId   Int
  productId Int?                       // 상품 삭제 시에도 주문 유지
  // 주문 시점 스냅샷 (가격/이름 변동 대응)
  name      String
  price     Int
  quantity  Int

  order   Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product Product? @relation(fields: [productId], references: [id], onDelete: SetNull)

  @@index([orderId])
}

// -------------------------------------------------------------
// Review
// -------------------------------------------------------------

model Review {
  id        Int      @id @default(autoincrement())
  userId    Int
  productId Int
  rating    Int                        // 1..5
  content   String   @db.Text
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user    User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@index([productId, createdAt(sort: Desc)])
  @@index([userId])
}
```

---

## 3. 주요 인덱스 설계 근거

| 인덱스 | 사용처 | 근거 |
|--------|--------|------|
| `User.email` (unique) | 로그인 조회 | 단일 키 lookup |
| `Product.name` | 검색 `?q=` 처리 | `LIKE '%q%'`은 인덱스 부분 활용, 그래도 정렬·정확매칭에 유리 |
| `Product.categoryId` | 카테고리 필터 | `/api/products?categoryId=1` 핵심 경로 |
| `Product(isActive, createdAt)` | 목록 페이지 정렬 | 활성 상품 최신순 |
| `CartItem(cartId, productId)` unique | 중복 라인 방지 | 같은 상품 추가 시 quantity 증가 로직 |
| `Order(userId, createdAt desc)` | 마이페이지 주문이력 | 사용자별 최신순 페이지네이션 |
| `Order.status` | 관리자 패널 필터 | 상태별 작업 큐 |
| `Review(productId, createdAt desc)` | 상품 상세의 리뷰 목록 | 상품 페이지에서 최신순 |

---

## 4. 마이그레이션 & 시드

```bash
# 최초 1회
npx prisma migrate dev --name init

# 시드 데이터 (상품 10 / user 1 / admin 1)
node prisma/seed.js
```

### 시드 데이터 명세 (`prisma/seed.js`)

**카테고리 (3개)**
- 건강 (health)
- 생활 (living)
- 식품 (food)

**상품 (10개)** — 카테고리별 분배
- 건강 4개: 혈압측정기, 종합비타민, 무릎보호대, 돋보기
- 생활 3개: 보온병, 미끄럼방지매트, LED 스탠드
- 식품 3개: 영양죽 세트, 흑마늘진액, 견과류 모음

**사용자**
- 일반: `user@test.com` / `password123` / 이름 "홍길동"
- 관리자: `admin@seniormall.kr` / `admin1234` / role `ADMIN`

---

## 5. 데이터 무결성 정책

- **가격**: `Int` (원화 정수) — 부동소수 오차 회피
- **재고**: 주문 생성 시 트랜잭션으로 `stock` 차감, 0 미만 불가
- **삭제**:
  - 상품 삭제는 `isActive=false` 소프트 삭제 (주문 이력 보존)
  - 사용자 삭제는 `onDelete: Cascade`로 Cart/Review 함께 제거, Order는 보존
- **주문 스냅샷**: `OrderItem.name` / `price`를 별도 컬럼에 저장 — 상품 정보가 바뀌어도 과거 주문 금액 불변

---

## 6. 다음 단계

- Backend 빌더는 본 스키마를 `prisma/schema.prisma`로 그대로 사용
- `npm run db:migrate && npm run db:seed`로 초기화
- API 라우터는 `01_architect_api_spec.md` 참조
