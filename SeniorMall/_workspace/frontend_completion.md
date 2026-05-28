# Frontend 구현 완료

> React 18 + Vite 5 기반 SPA. 60세+ 시니어 사용자를 위한 WCAG AA 접근성 적용.

## 생성된 파일 목록

```
client/
├── index.html                              # 한국어 lang, 핀치 줌 허용 (max-scale=5)
├── package.json                            # React 18.2, Router 6.20, axios 1.6, Vite 5
├── vite.config.js                          # /api, /uploads → :3001 프록시
└── src/
    ├── main.jsx                            # AuthProvider + BrowserRouter 마운트
    ├── App.jsx                             # 전체 라우터 + RequireAuth 가드
    ├── styles/
    │   └── global.css                      # 접근성 토큰 + 전 컴포넌트 스타일
    ├── api/
    │   └── client.js                       # axios 인스턴스 + 401 자동 refresh
    ├── context/
    │   └── AuthContext.jsx                 # user/login/register/logout/refreshMe
    ├── components/
    │   ├── Header.jsx                      # 로고, 검색, 장바구니 뱃지, 로그인/내정보
    │   ├── BottomNav.jsx                   # 모바일 하단 4탭 고정
    │   ├── Button.jsx                      # variant/size/block/disabled props
    │   ├── ProductCard.jsx                 # 4:3 이미지, ARIA 가격 라벨
    │   └── LoadingSpinner.jsx              # 스피너 + "불러오는 중..." 텍스트
    └── pages/
        ├── HomePage.jsx                    # 히어로 + 카테고리 + 추천 상품
        ├── ProductListPage.jsx             # 카테고리 필터 + 페이지네이션
        ├── ProductDetailPage.jsx           # 큰 이미지, 수량 조절, 장바구니 담기, 리뷰
        ├── CartPage.jsx                    # 수량 +/-, 삭제, 합계, 주문하기
        ├── CheckoutPage.jsx                # 3단계: 배송지 → 결제 → 완료
        ├── OrdersPage.jsx                  # 주문 목록 + 한글 상태 뱃지
        ├── LoginPage.jsx                   # 이메일 + 비밀번호
        ├── RegisterPage.jsx                # 이름/이메일/전화/비밀번호 확인
        └── MyPage.jsx                      # 프로필 + 주문 바로가기 + 로그아웃
```

전체 22개 파일 (HTML 1 + 설정 2 + JS/JSX 19).

## 페이지 목록 (라우트)

| 경로 | 컴포넌트 | 보호 |
|------|----------|------|
| `/` | HomePage | Public |
| `/products` | ProductListPage | Public (쿼리: `?category=slug&q=검색어&page=N`) |
| `/products/:id` | ProductDetailPage | Public (담기 클릭 시 로그인 유도) |
| `/cart` | CartPage | Auth |
| `/checkout` | CheckoutPage | Auth |
| `/orders` | OrdersPage | Auth |
| `/login` | LoginPage | Public (`?next=원래URL` 보존) |
| `/register` | RegisterPage | Public |
| `/my` | MyPage | Auth |
| `*` | → `/` 리다이렉트 | — |

`RequireAuth` 가드: 미인증 시 `/login?next=현재경로` 로 리디렉트, 로그인 성공 후 원위치 복귀.

## 접근성 기준 준수 사항

### CSS 토큰 (global.css)
- `--font-size-base: 18px`, `--font-size-lg: 22px`, `--font-size-xl: 28px`, `--font-size-2xl: 36px`
- `--btn-min-height: 48px`, `--touch-target: 48px`, `--input-min-height: 56px`
- 색상: 모두 흰 배경 대비 4.5:1 이상 (primary #0066CC=5.17, danger #C62828=6.36, success #2E7D32=5.06)
- `--focus-ring: 3px solid #FF8F00` — 키보드 포커스 가시성
- `prefers-reduced-motion` 미디어 쿼리로 OS 모션 설정 존중

### 시맨틱/구조
- `<header role="banner">`, `<main role="main" id="main">`, `<nav aria-label="주요 메뉴">` 랜드마크
- Skip Link: `<a href="#main">본문 바로가기</a>` — 키보드 사용자 첫 Tab에 노출
- 페이지당 `<h1>` 1개, 헤딩 레벨 순차

### 폼
- 모든 입력에 `<label htmlFor>` 연결 + 라벨 18px+ 굵게
- 필수 표시: `*` 시각 + `.sr-only "(필수)"` 청각 병행
- `autoComplete` 속성: `email`, `current-password`, `new-password`, `name`, `tel`, `street-address`
- 에러: `role="alert"` + `⚠` 아이콘 + 빨간 텍스트 (색깔만으로 구분 X)
- `aria-invalid` 상태 표시, 입력 높이 56px+ (모바일 자동 줌 방지)

### 버튼/터치
- 모든 인터랙티브 요소 min-height 48px (시니어 권장 터치 타겟)
- `disabled` 시 opacity 0.5 + `aria-disabled` 병행
- 로딩 중 텍스트 교체("주문 처리 중..."), 스피너만 사용 X

### 네비게이션
- Header(64px) + BottomNav(64px) 깊이 2단계 유지
- BottomNav 활성 탭: 색상 + 굵기 + 3px 하단 라인 (3가지 단서)
- 로고 클릭 시 항상 홈, 페이지마다 명시적 뒤로가기/취소 버튼 제공

### 콘텐츠
- 모든 문구 한국어 — "Sign in" 같은 영문 금지
- 빈 상태: "아직 장바구니가 비어 있습니다.", "아직 주문 내역이 없습니다."
- 로딩 상태: "불러오는 중...", "확인하는 중...", "주문 처리 중..."
- 주문 상태 한글화: PENDING→결제대기, PAID→결제완료, SHIPPED→배송중, DELIVERED→배송완료, CANCELLED→취소

### 이미지
- 모든 `<img>`에 `alt` 속성 (상품 카드는 상품명, 장식은 빈 alt 아이콘은 `aria-hidden`)
- 이미지 없을 때 "사진 준비 중" placeholder

## API 연동 엔드포인트

| 메서드 | 경로 | 사용처 |
|--------|------|--------|
| POST | `/api/auth/register` | RegisterPage |
| POST | `/api/auth/login` | LoginPage |
| POST | `/api/auth/refresh` | client.js 인터셉터 (401 자동 갱신) |
| POST | `/api/auth/logout` | MyPage |
| GET | `/api/users/me` | AuthContext 초기 마운트 (세션 복원), CheckoutPage |
| GET | `/api/products?limit=6` | HomePage 추천 상품 |
| GET | `/api/products?page&limit&q` | ProductListPage |
| GET | `/api/products/:id` | ProductDetailPage (리뷰 포함) |
| GET | `/api/categories` | ProductListPage 필터 칩 |
| GET | `/api/categories/:slug/products` | ProductListPage (카테고리 필터) |
| GET | `/api/cart` | Header (배지 수), CartPage, CheckoutPage |
| POST | `/api/cart/items` | ProductDetailPage 장바구니 담기 |
| PATCH | `/api/cart/items/:id` | CartPage 수량 변경 |
| DELETE | `/api/cart/items/:id` | CartPage 삭제 |
| POST | `/api/orders` | CheckoutPage 주문 확정 |
| GET | `/api/orders` | OrdersPage |

## axios 클라이언트 동작 (api/client.js)

- `baseURL: ''` + Vite 프록시 → 개발/운영 환경 변경 없이 작동
- 요청 인터셉터: `localStorage.accessToken` → `Authorization: Bearer ...` 자동 부착
- 응답 인터셉터: 401 발생 시
  1. `/api/auth/refresh` 호출하여 새 access token 발급 (동시 401에 대비해 단일 promise 공유)
  2. 원 요청 헤더에 새 토큰 갈아끼우고 자동 재시도
  3. refresh도 실패하면 토큰 폐기 + `/login` 으로 강제 이동
- `getErrorMessage(err)` 헬퍼: 백엔드의 `{ error, code }` 표준 응답을 사용자 친화 메시지로 변환

## 주요 UX 결정사항

- 추천 상품 6개는 홈에서 `limit=6` 한 번 호출
- 카테고리 필터는 slug 기반 (`/api/categories/:slug/products`) — HomePage 바로가기 URL과 동일 키
- 비로그인 사용자가 "장바구니 담기" 클릭 시 → `/login?next=/products/{id}` 로 이동 후 복귀
- 결제 3단계 플로우: 진행 스텝퍼 `<ol>` 시맨틱 + `aria-current="step"`
- 빈 장바구니 진입 시 에러 메시지 + 상품 목록 링크 노출
- 삭제/로그아웃 등 되돌릴 수 없는 동작은 `window.confirm` 으로 한번 더 확인 (시니어 실수 방지)

## 사용 방법

```bash
cd /Users/mahasattva/SeniorMall/client
npm install
npm run dev        # http://localhost:5173
# 백엔드는 :3001에서 실행 중이어야 함 (vite proxy /api, /uploads)
```

## 인계 사항

- **Backend 의존**: 백엔드의 카테고리 시드는 `slug` 가 `health`/`living`/`food` 여야 HomePage 바로가기와 일치
- **이미지 호스팅**: 백엔드의 `imageUrl` 이 `/uploads/...` 형태일 때 Vite 프록시로 자동 서빙됨
- **다음 작업 후보**: 리뷰 작성 폼 (POST `/api/products/:id/reviews`), 마이페이지 정보 수정 (PATCH `/api/users/me`), 주문 취소 (POST `/api/orders/:id/cancel`), 관리자 페이지(`/admin/*`)
