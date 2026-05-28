# 01. SeniorMall — REST API 명세

> Base URL: `http://localhost:3001/api`
> 인증: `Authorization: Bearer <accessToken>`
> 모든 응답은 JSON. 날짜는 ISO 8601 문자열.

---

## 0. 공통 규약

### 인증 레벨
- **Public** — 인증 불필요
- **Auth** — 유효한 access token 필수
- **Admin** — `role === 'ADMIN'` 인 사용자만

### 표준 에러 응답
```json
{
  "error": "사용자에게 노출할 메시지",
  "code": "MACHINE_READABLE_CODE"
}
```

| HTTP | code 예시 | 의미 |
|------|-----------|------|
| 400 | `VALIDATION_ERROR` | 입력값 검증 실패 |
| 401 | `UNAUTHORIZED` | 토큰 없음/만료 |
| 403 | `FORBIDDEN` | 권한 부족 (예: 관리자 아님) |
| 404 | `NOT_FOUND` | 리소스 없음 |
| 409 | `CONFLICT` | 중복 (이메일 등) |
| 422 | `OUT_OF_STOCK` | 재고 부족 |
| 500 | `INTERNAL_ERROR` | 서버 오류 |

### 페이지네이션
- 쿼리: `?page=1&limit=20`
- 응답: `{ items: [...], page, limit, total }`

---

## 1. Auth — `/api/auth/*` (4개)

### 1.1 POST `/api/auth/register` — Public
회원가입.

**Request**
```json
{ "email": "user@example.com", "password": "password123", "name": "홍길동", "phone": "010-1234-5678" }
```

**Response 201**
```json
{
  "user": { "id": 1, "email": "user@example.com", "name": "홍길동", "role": "USER" },
  "accessToken": "eyJ...",
  "refreshToken": "eyJ..."
}
```

**Errors**: 400 `VALIDATION_ERROR`, 409 `EMAIL_TAKEN`

---

### 1.2 POST `/api/auth/login` — Public
로그인.

**Request**
```json
{ "email": "user@example.com", "password": "password123" }
```

**Response 200**
```json
{
  "user": { "id": 1, "email": "...", "name": "...", "role": "USER" },
  "accessToken": "eyJ...",
  "refreshToken": "eyJ..."
}
```

**Errors**: 401 `INVALID_CREDENTIALS`

---

### 1.3 POST `/api/auth/refresh` — Public (refresh token 필요)
access token 재발급.

**Request**
```json
{ "refreshToken": "eyJ..." }
```

**Response 200**
```json
{ "accessToken": "eyJ..." }
```

**Errors**: 401 `INVALID_REFRESH_TOKEN`

---

### 1.4 POST `/api/auth/logout` — Auth
로그아웃 (클라이언트 토큰 폐기 신호용; MVP는 서버 측 블랙리스트 없음).

**Response 204** (no content)

---

## 2. Products — `/api/products/*` (5개)

### 2.1 GET `/api/products` — Public
상품 목록. 검색/필터/페이지네이션 지원.

**Query**
- `q` (옵션) — 상품명 부분일치
- `categoryId` (옵션)
- `page` (기본 1), `limit` (기본 20, 최대 100)
- `sort` (옵션) — `latest` (기본) | `priceAsc` | `priceDesc`

**Response 200**
```json
{
  "items": [
    { "id": 1, "name": "혈압측정기", "price": 45000, "imageUrl": "/uploads/xx.jpg",
      "stock": 10, "categoryId": 1, "category": { "id": 1, "name": "건강" } }
  ],
  "page": 1, "limit": 20, "total": 10
}
```

---

### 2.2 GET `/api/products/:id` — Public
상품 상세 (리뷰 포함).

**Response 200**
```json
{
  "id": 1, "name": "혈압측정기", "description": "...", "price": 45000,
  "stock": 10, "imageUrl": "/uploads/xx.jpg",
  "category": { "id": 1, "name": "건강" },
  "reviews": [
    { "id": 1, "rating": 5, "content": "...", "userName": "홍길동", "createdAt": "..." }
  ],
  "avgRating": 4.5, "reviewCount": 12
}
```

**Errors**: 404 `NOT_FOUND`

---

### 2.3 POST `/api/products/:id/reviews` — Auth
리뷰 작성.

**Request**
```json
{ "rating": 5, "content": "사용하기 편합니다." }
```

**Response 201** — 생성된 리뷰 객체
```json
{ "id": 13, "rating": 5, "content": "...", "userName": "홍길동", "createdAt": "..." }
```

**Errors**: 400 `VALIDATION_ERROR` (rating 1~5 아님), 404 `NOT_FOUND`

---

### 2.4 GET `/api/products/:id/reviews` — Public
상품의 리뷰 목록 (페이지네이션).

**Query**: `page`, `limit`

**Response 200**
```json
{ "items": [...], "page": 1, "limit": 20, "total": 12 }
```

---

### 2.5 GET `/api/products/search/suggest` — Public
검색 자동완성 (상품명 상위 N개).

**Query**: `q` (필수, 2자 이상)

**Response 200**
```json
{ "suggestions": ["혈압측정기", "혈압계"] }
```

---

## 3. Categories — `/api/categories/*` (2개)

### 3.1 GET `/api/categories` — Public
전체 카테고리 목록.

**Response 200**
```json
[
  { "id": 1, "name": "건강", "slug": "health", "productCount": 4 },
  { "id": 2, "name": "생활", "slug": "living", "productCount": 3 },
  { "id": 3, "name": "식품", "slug": "food", "productCount": 3 }
]
```

---

### 3.2 GET `/api/categories/:slug/products` — Public
slug로 카테고리 + 상품 목록 조회.

**Query**: `page`, `limit`, `sort`

**Response 200**
```json
{
  "category": { "id": 1, "name": "건강", "slug": "health" },
  "items": [...], "page": 1, "limit": 20, "total": 4
}
```

**Errors**: 404 `NOT_FOUND`

---

## 4. Cart — `/api/cart/*` (4개)

> 모든 cart 엔드포인트는 **Auth** 필수.

### 4.1 GET `/api/cart` — Auth
내 장바구니 조회. 없으면 빈 카트를 lazy 생성.

**Response 200**
```json
{
  "id": 5,
  "items": [
    { "id": 11, "productId": 1, "name": "혈압측정기", "price": 45000,
      "quantity": 2, "imageUrl": "/uploads/xx.jpg", "subtotal": 90000 }
  ],
  "totalAmount": 90000,
  "itemCount": 1
}
```

---

### 4.2 POST `/api/cart/items` — Auth
상품 추가 (이미 있으면 수량 합산).

**Request**
```json
{ "productId": 1, "quantity": 1 }
```

**Response 201** — 갱신된 카트 전체 (4.1 응답과 동일 shape)

**Errors**: 404 `NOT_FOUND` (상품), 422 `OUT_OF_STOCK`

---

### 4.3 PATCH `/api/cart/items/:itemId` — Auth
수량 변경. `quantity: 0`이면 삭제.

**Request**
```json
{ "quantity": 3 }
```

**Response 200** — 갱신된 카트 전체

**Errors**: 404 `NOT_FOUND`, 422 `OUT_OF_STOCK`

---

### 4.4 DELETE `/api/cart/items/:itemId` — Auth
라인 아이템 삭제.

**Response 200** — 갱신된 카트 전체

**Errors**: 404 `NOT_FOUND`

---

## 5. Orders — `/api/orders/*` (4개)

### 5.1 POST `/api/orders` — Auth
주문 생성 (장바구니 → 주문 변환). 트랜잭션 안에서:
1. 장바구니 라인을 OrderItem 스냅샷으로 복사
2. 각 상품 `stock` 차감
3. `Cart` 비우기
4. `Order` 반환 (status: `PENDING`)

**Request**
```json
{
  "shippingName": "홍길동",
  "shippingPhone": "010-1234-5678",
  "shippingAddress": "서울시 강남구 ...",
  "memo": "부재 시 경비실에 맡겨주세요"
}
```

**Response 201**
```json
{
  "id": 7, "status": "PENDING", "totalAmount": 90000,
  "items": [
    { "id": 21, "productId": 1, "name": "혈압측정기", "price": 45000, "quantity": 2 }
  ],
  "shippingName": "홍길동", "shippingPhone": "...", "shippingAddress": "...",
  "createdAt": "2026-05-27T..."
}
```

**Errors**: 400 `EMPTY_CART`, 422 `OUT_OF_STOCK`

---

### 5.2 GET `/api/orders` — Auth
내 주문 이력 (최신순).

**Query**: `page`, `limit`, `status` (옵션)

**Response 200**
```json
{
  "items": [
    { "id": 7, "status": "PENDING", "totalAmount": 90000,
      "itemCount": 1, "createdAt": "..." }
  ],
  "page": 1, "limit": 20, "total": 3
}
```

---

### 5.3 GET `/api/orders/:id` — Auth
내 주문 상세. 본인 주문만 조회 가능.

**Response 200** — 5.1 응답과 동일 shape

**Errors**: 403 `FORBIDDEN`, 404 `NOT_FOUND`

---

### 5.4 POST `/api/orders/:id/cancel` — Auth
주문 취소 (PENDING / PAID 상태만 가능). 재고 복원.

**Response 200**
```json
{ "id": 7, "status": "CANCELLED", "...": "..." }
```

**Errors**: 403 `FORBIDDEN`, 404 `NOT_FOUND`, 409 `CANNOT_CANCEL` (이미 배송/완료)

---

## 6. Users — `/api/users/*` (2개)

### 6.1 GET `/api/users/me` — Auth
내 정보 조회.

**Response 200**
```json
{ "id": 1, "email": "...", "name": "홍길동", "phone": "...", "address": "...", "role": "USER", "createdAt": "..." }
```

---

### 6.2 PATCH `/api/users/me` — Auth
내 정보 수정. (비밀번호 변경은 `currentPassword`+`newPassword`)

**Request** (모든 필드 옵션)
```json
{
  "name": "홍길동",
  "phone": "010-...",
  "address": "서울시 ...",
  "currentPassword": "old",
  "newPassword": "new"
}
```

**Response 200** — 갱신된 user (6.1과 동일 shape)

**Errors**: 401 `INVALID_PASSWORD`, 400 `VALIDATION_ERROR`

---

## 7. Admin — `/api/admin/*` (4개)

> 모든 admin 엔드포인트는 **Admin** 필수.

### 7.1 POST `/api/admin/products` — Admin
상품 등록. `multipart/form-data` (이미지 업로드 포함).

**Request (form-data)**
- `name` (text)
- `description` (text)
- `price` (text, 정수)
- `stock` (text, 정수)
- `categoryId` (text)
- `image` (file, 옵션)

**Response 201** — 생성된 product

**Errors**: 400 `VALIDATION_ERROR`

---

### 7.2 PATCH `/api/admin/products/:id` — Admin
상품 수정. `multipart/form-data`. 변경 필드만 전송. `image` 누락 시 기존 이미지 유지.

**Response 200** — 갱신된 product

**Errors**: 404 `NOT_FOUND`

---

### 7.3 DELETE `/api/admin/products/:id` — Admin
상품 소프트 삭제 (`isActive=false`).

**Response 204** (no content)

**Errors**: 404 `NOT_FOUND`

---

### 7.4 GET `/api/admin/orders` — Admin
전체 주문 목록 (페이지네이션, 상태 필터).

**Query**: `page`, `limit`, `status`, `userId` (옵션)

**Response 200**
```json
{
  "items": [
    { "id": 7, "status": "PENDING", "totalAmount": 90000,
      "user": { "id": 1, "name": "홍길동", "email": "..." },
      "itemCount": 1, "createdAt": "..." }
  ],
  "page": 1, "limit": 20, "total": 12
}
```

### 7.5 (보조) PATCH `/api/admin/orders/:id/status` — Admin
> 위 4개 핵심 외 보조 엔드포인트 — 상태 전이용. 필요 시 구현.

---

## 8. 엔드포인트 요약 매트릭스

| 그룹 | 개수 | 메서드 분포 |
|------|------|------------|
| auth | 4 | POST x4 |
| products | 5 | GET x4, POST x1 |
| categories | 2 | GET x2 |
| cart | 4 | GET x1, POST x1, PATCH x1, DELETE x1 |
| orders | 4 | POST x2, GET x2 |
| users | 2 | GET x1, PATCH x1 |
| admin | 4 | POST x1, PATCH x1, DELETE x1, GET x1 |
| **합계** | **25** | — |

---

## 9. 빌더 인계 사항

- **Backend**: 라우터를 그룹별 파일로 분리(`server/routes/*.js`). express-validator로 모든 입력 검증
- **Frontend**: `client/src/api/client.js`에 axios 인스턴스 + 인터셉터(401 시 refresh 후 재시도)
- **계약 안정성**: 본 문서는 v1. 변경 시 본 파일 수정 + 양 빌더에 알림
