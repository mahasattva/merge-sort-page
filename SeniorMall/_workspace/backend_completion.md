# Backend 구현 완료

> 산출 위치: `/Users/mahasattva/SeniorMall/`
> 작성자: senior-mall-backend
> 기준 문서: `01_architect_schema.md`, `01_architect_api_spec.md`, `01_architect_tech_stack.md`

---

## 생성된 파일 목록

```
SeniorMall/
├── .env.example                    # DATABASE_URL, JWT_SECRET, JWT_REFRESH_SECRET, PORT, CLIENT_URL
├── .gitignore                      # node_modules, .env, uploads, migrations 등
├── prisma/
│   ├── schema.prisma               # 아키텍트 스키마 그대로 (User/Category/Product/Cart/CartItem/Order/OrderItem/Review)
│   └── seed.js                     # 카테고리 3, 상품 10, 사용자 2명 (upsert 기반 idempotent)
└── server/
    ├── index.js                    # Express 진입점 (CORS, JSON, /uploads static, 라우트 마운트, 전역 에러 핸들러)
    ├── package.json                # type=module, dev/start 스크립트, 명세 패키지 정확히 고정
    ├── prisma.js                   # 공유 PrismaClient 인스턴스
    ├── middleware/
    │   ├── auth.js                 # JWT 검증, req.user = { id, role }
    │   └── adminOnly.js            # role === 'ADMIN' 가드
    ├── routes/
    │   ├── auth.js                 # register, login, refresh, logout
    │   ├── products.js             # list, detail, search, suggest, reviews(GET/POST)
    │   ├── categories.js           # list, by slug, slug/products
    │   ├── cart.js                 # GET, POST items, PATCH item, DELETE item
    │   ├── orders.js               # 생성(트랜잭션), list, detail, cancel(PATCH+POST)
    │   └── users.js                # me GET, me PATCH (비밀번호 변경 포함)
    └── uploads/                    # multer 정적 서빙 디렉토리 (.gitkeep 포함)
```

---

## API 엔드포인트 목록

### Auth (`/api/auth`)
- `POST /api/auth/register` — Public, 이메일/비밀번호/이름 검증 → bcrypt(10) 해싱 → access+refresh 토큰 발급
- `POST /api/auth/login` — Public, 자격 비교 → 토큰 발급
- `POST /api/auth/refresh` — Public(+refreshToken), 새 access 토큰 발급
- `POST /api/auth/logout` — Auth, 204 No Content

### Products (`/api/products`)
- `GET /api/products` — Public, `q`/`categoryId`/`page`/`limit`/`sort` 지원, 응답 `{ items, products, page, limit, total, totalPages }`
- `GET /api/products/search` — Public, `q` 필수, 페이지네이션
- `GET /api/products/search/suggest` — Public, 2자 이상 `q` 필수, 상위 10개 상품명 반환
- `GET /api/products/:id` — Public, 상세 + reviews + avgRating/reviewCount
- `GET /api/products/:id/reviews` — Public, 페이지네이션
- `POST /api/products/:id/reviews` — Auth, rating(1~5) + content

### Categories (`/api/categories`)
- `GET /api/categories` — Public, `productCount` 포함 목록
- `GET /api/categories/:slug` — Public, 카테고리 정보 + 활성 상품
- `GET /api/categories/:slug/products` — Public, 페이지네이션 + 정렬

### Cart (`/api/cart`) — 전 엔드포인트 Auth
- `GET /api/cart` — 카트 없으면 lazy 생성, 통일 응답 shape
- `POST /api/cart/items` — 이미 있으면 수량 합산, 재고 체크
- `PATCH /api/cart/items/:itemId` — quantity=0이면 삭제
- `DELETE /api/cart/items/:itemId`

### Orders (`/api/orders`) — 전 엔드포인트 Auth
- `POST /api/orders` — 트랜잭션: 카트 검증 → OrderItem 스냅샷 생성 → stock 차감 → 카트 비움
- `GET /api/orders` — 내 주문 목록 (status 필터, 페이지네이션)
- `GET /api/orders/:id` — 본인 주문만 (ADMIN은 모두 조회 가능)
- `PATCH /api/orders/:id/cancel` / `POST /api/orders/:id/cancel` — PENDING/PAID만 가능, stock 복원

### Users (`/api/users`) — 전 엔드포인트 Auth
- `GET /api/users/me`
- `PATCH /api/users/me` — name/phone/address, 또는 currentPassword+newPassword 조합

### Misc
- `GET /api/health` — 라이브니스 체크
- `GET /uploads/*` — multer 업로드 정적 서빙

---

## 주요 구현 사항

### 표준 에러 응답
- 전 엔드포인트 `{ error, code }` 형식으로 통일
- 코드: `VALIDATION_ERROR`, `UNAUTHORIZED`, `FORBIDDEN`, `NOT_FOUND`, `CONFLICT`/`EMAIL_TAKEN`, `INVALID_CREDENTIALS`, `INVALID_REFRESH_TOKEN`, `INVALID_PASSWORD`, `OUT_OF_STOCK`, `EMPTY_CART`, `CANNOT_CANCEL`, `INTERNAL_ERROR`
- 라우터 단에서 검증 실패 시 400 + `VALIDATION_ERROR` 즉시 반환 (`handleValidation` 헬퍼)
- 전역 에러 핸들러는 500 이상만 stderr에 기록, 그 외는 status/code/publicMessage 그대로 노출

### 인증/인가
- JWT access TTL 1h, refresh TTL 7d (스택 명세 그대로)
- 토큰 페이로드: `{ sub: userId, role }` → `req.user = { id, role }`
- `JWT_SECRET`/`JWT_REFRESH_SECRET`을 분리해 부분 무효화 가능
- bcryptjs rounds=10 (보안 vs 시니어 로그인 속도 트레이드오프)

### 트랜잭션
- `POST /api/orders`: `prisma.$transaction`으로 카트 검증 → OrderItem 스냅샷(productName/productPrice/quantity) 생성 → stock 차감 → CartItem 삭제를 원자적으로 처리
- 트랜잭션 중 `OUT_OF_STOCK`/`EMPTY_CART` 발생 시 throw → 라우터에서 status/code 매핑하여 응답
- 주문 취소도 트랜잭션 내에서 stock을 복원

### 입력 검증
- 모든 라우트에 `express-validator` 적용 (body/param/query)
- 페이지네이션: `page` 기본 1, `limit` 기본 20, 최대 100
- 라우팅 순서 주의: `/search/suggest`와 `/search`를 `/:id`보다 먼저 선언 (정규표현식 충돌 회피)

### 카트 응답 정규화
- 모든 카트 변경 API가 동일한 `{ id, items[], totalAmount, itemCount }` shape를 반환 → 프론트엔드가 응답마다 재페치 불필요

### 상품 응답 호환성
- API 스펙은 `items`, 사용자 지정은 `products` — 두 키를 모두 노출해 양쪽 호환

### 정적 서빙
- `/uploads`는 `server/uploads/`에서 서빙 (multer는 admin 라우트 도입 시 storage만 추가하면 됨)

### 누락 라우트 안내
- 본 작업 범위는 사용자 지시(auth/products/categories/cart/orders/users)만 포함
- API 스펙 §7의 admin 라우트(`/api/admin/*`)는 별도 작업으로 추가 가능 — middleware/adminOnly.js를 이미 준비

---

## 시드 데이터

### 카테고리 (3)
| name | slug |
|---|---|
| 건강 | health |
| 생활 | living |
| 식품 | food |

### 상품 (10)
- 건강 (4): 가정용 자동 혈압측정기 ₩45,000 / 시니어 종합비타민 90정 ₩28,000 / 무릎 보호대 ₩19,500 / 휴대용 LED 돋보기 ₩12,000
- 생활 (3): 진공 보온병 500ml ₩22,000 / 미끄럼방지 욕실매트 ₩16,000 / 눈에 편한 LED 스탠드 ₩39,000
- 식품 (3): 간편 영양죽 8팩 ₩32,000 / 국내산 흑마늘 진액 30포 ₩38,000 / 하루 견과류 30봉 ₩21,000

각 상품은 현실적인 재고(20~70)와 시니어 친화 설명이 부여됨. upsert 기반이므로 재실행해도 중복 생성 없음.

### 사용자 (2)
| email | password | name | role |
|---|---|---|---|
| user@test.com | test1234 | 홍길동 | USER |
| admin@test.com | admin1234 | 관리자 | ADMIN |

---

## 환경변수 (.env.example)
- `DATABASE_URL` — PostgreSQL 접속 문자열
- `JWT_SECRET` — access 토큰 서명용
- `JWT_REFRESH_SECRET` — refresh 토큰 서명용
- `PORT=3001` — 기본값
- `CLIENT_URL=http://localhost:5173` — CORS allow-origin

---

## 실행 가이드

```bash
# 의존성 설치
cd server && npm install
cd .. && npx prisma generate    # @prisma/client 생성

# DB 마이그레이션
DATABASE_URL=... npx prisma migrate dev --name init

# 시드
DATABASE_URL=... node prisma/seed.js

# 서버 기동 (Node 20+)
cd server && node --env-file=../.env --watch index.js
# 또는 npm run dev (env는 별도 로딩 필요)
```

> 참고: 사용자가 지정한 `server/package.json` 의존성에는 `dotenv`가 빠져 있습니다. 환경변수는 (a) 셸 export, (b) Node 20의 `--env-file=.env` 플래그, (c) 추후 dotenv 추가 — 셋 중 한 가지 방식으로 주입하면 됩니다.

---

## 알려진 제약

- 결제 PG 연동 없음(MVP) — 주문은 `PENDING` 상태로 종료
- 이미지 업로드 라우트(admin) 미구현 — 본 작업 범위 외
- refresh token 블랙리스트 없음 — 토큰 폐기는 클라이언트 측 삭제로 처리
- Prisma 마이그레이션 폴더는 .gitignore 처리 — 실제 운영 전환 시 정책 재검토 필요
