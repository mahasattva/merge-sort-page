# 01. SeniorMall — 기술 스택 결정사항

> 입력: `_workspace/00_input/requirements.md`
> 산출: 본 문서는 Backend / Frontend 빌더가 환경을 셋업할 때 그대로 사용한다.

---

## 1. 최종 결정사항 (Stack Lock-in)

| 영역 | 선택 | 버전 | 비고 |
|------|------|------|------|
| Frontend | React + Vite | React 18.x / Vite 5.x | SPA, HMR 빠름 |
| Styling | CSS Modules + CSS Variables | — | 시니어 접근성 토큰 중앙 관리 |
| Routing | react-router-dom | 6.x | 선언적 라우팅 |
| HTTP Client | axios | 1.x | 인터셉터로 JWT 첨부 |
| Backend | Node.js + Express | Node 20 LTS / Express 4.x | 검증된 조합 |
| ORM | Prisma | 5.x | 타입 안전, 마이그레이션 명확 |
| DB | PostgreSQL | 15+ | 관계형, JSON 컬럼 지원 |
| Auth | JWT (access 1h + refresh 7d) | jsonwebtoken 9.x | stateless, 시니어 재로그인 부담↓ |
| 해싱 | bcryptjs | 2.x | 순수 JS — 설치 트러블 없음 |
| 검증 | express-validator | 7.x | 라우터 인라인 검증 |
| 업로드 | multer | 1.x | 로컬 디스크 저장 (MVP) |
| CORS | cors | 2.x | client(5173) ↔ server(3001) |

---

## 2. 선택 근거

### React 18 + Vite
- 시니어 UI는 빈번한 리렌더가 없는 단순 화면 — React로 충분, SSR 불요
- Vite는 dev 부팅이 빨라 빌더 에이전트가 빠른 피드백 루프를 돈다
- CRA 대비 ESM 기반으로 의존성 무게가 가볍다

### CSS Modules + CSS 변수
- Tailwind 도입 시 시니어 접근성 토큰(48px touch target 등)이 클래스 곳곳에 분산됨
- CSS 변수로 `--font-size-base`, `--btn-min-height` 등을 중앙 관리하면 일괄 조정 가능
- 컴포넌트별 스타일 격리는 CSS Modules로 충분

### Express 4 (vs Fastify/Koa)
- 생태계 압도적, multer / express-validator / cors 모두 1급 호환
- MVP 규모에서 성능 차이는 무시 가능

### Prisma + PostgreSQL
- 스키마 파일 한 곳에서 모델 + 마이그레이션 + 타입 생성
- SQLite로 시작했다가 운영 전환할 때 PG로 가는 비용보다 처음부터 PG가 저렴
- 시드 스크립트(`prisma/seed.js`)로 상품 10개 + 사용자 2명 자동 주입

### JWT (access 1h + refresh 7d)
- Stateless — 세션 스토어 불필요
- refresh 7d로 시니어가 매일 재로그인하지 않도록
- 시크릿은 `JWT_SECRET`, `JWT_REFRESH_SECRET` 두 개로 분리 (탈취 시 부분 무효화 가능)

### bcryptjs (vs bcrypt native)
- 네이티브 빌드 없음 — CI/macOS/Linux 환경 모두 동일 동작
- 시니어몰 MVP 규모에서 성능 차이 무시 가능

### multer 로컬 저장
- MVP에서는 S3/Cloudinary 추가 비용 회피
- `server/uploads/` 디렉토리에 저장, 정적 서빙
- 추후 S3 어댑터로 교체 가능하도록 storage 객체만 갈아끼우는 구조

---

## 3. 디렉토리 구조

```
SeniorMall/
├── server/                       # Express 백엔드
│   ├── index.js                  # 앱 진입점 (포트 3001)
│   ├── package.json
│   ├── middleware/
│   │   ├── auth.js               # JWT 검증
│   │   ├── admin.js              # role==='ADMIN' 가드
│   │   ├── upload.js             # multer 설정
│   │   └── errorHandler.js       # 통일 에러 응답
│   ├── routes/
│   │   ├── auth.js               # /api/auth/*
│   │   ├── products.js           # /api/products/*
│   │   ├── categories.js         # /api/categories/*
│   │   ├── cart.js               # /api/cart/*
│   │   ├── orders.js             # /api/orders/*
│   │   ├── users.js              # /api/users/me
│   │   └── admin.js              # /api/admin/*
│   ├── services/                 # 비즈니스 로직 (라우터에서 분리)
│   │   ├── auth.service.js
│   │   ├── cart.service.js
│   │   └── order.service.js
│   ├── utils/
│   │   ├── jwt.js                # sign / verify
│   │   └── errors.js             # AppError 클래스
│   └── uploads/                  # multer 업로드 (gitignore)
│
├── client/                       # React 프론트엔드
│   ├── index.html
│   ├── vite.config.js            # proxy /api → :3001
│   ├── package.json
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── styles/
│       │   ├── tokens.css        # CSS 변수 (접근성 토큰)
│       │   └── global.css
│       ├── api/
│       │   └── client.js         # axios 인스턴스
│       ├── context/
│       │   ├── AuthContext.jsx
│       │   └── CartContext.jsx
│       ├── components/
│       │   ├── Button.jsx
│       │   ├── Input.jsx
│       │   ├── ProductCard.jsx
│       │   ├── Nav.jsx
│       │   └── Modal.jsx
│       └── pages/
│           ├── HomePage.jsx
│           ├── ProductListPage.jsx
│           ├── ProductDetailPage.jsx
│           ├── CartPage.jsx
│           ├── CheckoutPage.jsx
│           ├── LoginPage.jsx
│           ├── RegisterPage.jsx
│           ├── MyPage.jsx
│           ├── OrderListPage.jsx
│           └── admin/
│               ├── AdminProductsPage.jsx
│               └── AdminOrdersPage.jsx
│
├── prisma/
│   ├── schema.prisma             # 모델 정의
│   ├── seed.js                   # 시드 데이터 (상품 10, user 1, admin 1)
│   └── migrations/
│
├── _workspace/                   # 에이전트 산출물
├── .env.example
├── .gitignore
├── package.json                  # 루트: 워크스페이스 스크립트
└── README.md
```

---

## 4. 환경변수 (.env.example 기준)

| 키 | 예시 | 용도 | 필수 |
|----|------|------|------|
| `DATABASE_URL` | `postgresql://user:pass@localhost:5432/seniormall` | Prisma DB 접속 | Y |
| `JWT_SECRET` | `change-me-access-secret` | access token 서명 | Y |
| `JWT_REFRESH_SECRET` | `change-me-refresh-secret` | refresh token 서명 | Y |
| `PORT` | `3001` | Express 리스닝 포트 | N (기본 3001) |
| `CLIENT_URL` | `http://localhost:5173` | CORS 허용 origin | Y |

**규칙**
- 시크릿 값은 절대 커밋 금지 (`.env`는 `.gitignore`)
- `.env.example`은 키만 노출, 값은 placeholder
- 운영 환경 시크릿은 32바이트 이상 랜덤 (`openssl rand -hex 32`)

---

## 5. 포트 배정

| 서비스 | 포트 | 비고 |
|--------|------|------|
| Express (server) | **3001** | API: `http://localhost:3001/api/*` |
| Vite (client) | **5173** | Vite 기본값, 변경 없음 |
| PostgreSQL | 5432 | 로컬 기본값 |

**Vite proxy 설정** (`client/vite.config.js`)
```js
server: {
  port: 5173,
  proxy: {
    '/api': { target: 'http://localhost:3001', changeOrigin: true },
    '/uploads': { target: 'http://localhost:3001', changeOrigin: true }
  }
}
```

---

## 6. 패키지 목록

### server/package.json — dependencies
```
express                ^4.19.0
@prisma/client         ^5.20.0
bcryptjs               ^2.4.3
jsonwebtoken           ^9.0.2
cors                   ^2.8.5
multer                 ^1.4.5-lts.1
express-validator      ^7.2.0
dotenv                 ^16.4.5
```

### server/package.json — devDependencies
```
prisma                 ^5.20.0
nodemon                ^3.1.0
```

### client/package.json — dependencies
```
react                  ^18.3.0
react-dom              ^18.3.0
react-router-dom       ^6.26.0
axios                  ^1.7.0
```

### client/package.json — devDependencies
```
vite                   ^5.4.0
@vitejs/plugin-react   ^4.3.0
```

### 루트 package.json — scripts (워크스페이스 진입점)
```
"dev":          concurrent server + client
"dev:server":   cd server && nodemon index.js
"dev:client":   cd client && vite
"db:migrate":   prisma migrate dev
"db:seed":      node prisma/seed.js
"db:reset":     prisma migrate reset
```

---

## 7. 합리적 가정 (요구사항 보완)

| 항목 | 가정 | 근거 |
|------|------|------|
| 결제 | 주문 `PENDING` 상태로 생성 후 종료 (실제 PG 연동 X) | 요구사항 "주문 생성까지" |
| 이미지 호스팅 | 로컬 디스크 + Express static 서빙 | 요구사항 "multer 로컬 저장" |
| 검색 | DB `LIKE` 검색 (Elasticsearch X) | MVP 규모, 상품 10개 |
| 캐싱 | 미적용 (Redis X) | MVP, 트래픽 낮음 |
| 다국어 | 한국어 단일 | 시니어 대상, 국내 한정 |
| 회원 탈퇴 | MVP에서 미구현, soft delete 필드만 스키마에 예약 | 요구사항 미언급 |

---

## 8. 다음 단계 (빌더 인계 사항)

- **Backend 빌더**: 본 문서 + `01_architect_schema.md` + `01_architect_api_spec.md`로 작업 시작
- **Frontend 빌더**: 본 문서 + `01_architect_api_spec.md` + `01_architect_accessibility.md`로 작업 시작
- 두 빌더는 API 스펙을 contract로 삼아 병렬 작업
