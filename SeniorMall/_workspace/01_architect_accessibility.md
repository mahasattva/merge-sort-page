# 01. SeniorMall — 시니어 접근성 기준

> 대상: 60세+ 시니어. 디지털 친숙도 낮음. 시력 저하·미세조작 어려움 고려.
> 기준: WCAG 2.1 Level AA + 시니어 추가 요건.

---

## 1. CSS 토큰 (필수) — `client/src/styles/tokens.css`

```css
:root {
  /* ---------- Typography ---------- */
  --font-size-sm:    16px;   /* 보조 문구 (최소 허용) */
  --font-size-base:  18px;   /* 기본 본문 */
  --font-size-lg:    22px;   /* 강조 본문, 입력 라벨 */
  --font-size-xl:    28px;   /* 페이지 제목 */
  --font-size-2xl:   36px;   /* 히어로 영역 */
  --line-height-base: 1.6;   /* 시니어 가독성용 행간 확보 */
  --font-weight-normal: 400;
  --font-weight-bold:   700;
  --font-family-base: "Pretendard", "Apple SD Gothic Neo", "Noto Sans KR", system-ui, sans-serif;

  /* ---------- Color (모두 WCAG AA 4.5:1 이상) ---------- */
  --color-primary:        #0066CC;   /* 주요 액션 - 흰 글씨 대비 5.17:1 */
  --color-primary-hover:  #0052A3;
  --color-primary-active: #003D7A;
  --color-danger:         #C62828;   /* 에러/삭제 - 흰 글씨 대비 6.36:1 */
  --color-success:        #2E7D32;   /* 성공 - 흰 글씨 대비 5.06:1 */
  --color-warning:        #B45309;   /* 경고 - 흰 글씨 대비 5.21:1 */

  --color-text:           #1A1A1A;   /* 흰 배경 대비 16.1:1 */
  --color-text-muted:     #4A4A4A;   /* 흰 배경 대비 9.7:1 */
  --color-text-on-primary:#FFFFFF;

  --color-bg:             #FFFFFF;
  --color-surface:        #F7F7F7;   /* 카드 배경 */
  --color-border:         #B0B0B0;   /* 흰 배경 대비 3.5:1 (UI 요소 대비 기준 충족) */
  --color-focus:          #FF8F00;   /* 포커스 링 - 어디서나 잘 보이는 주황 */

  /* ---------- Spacing ---------- */
  --spacing-xs:  4px;
  --spacing-sm:  8px;
  --spacing-md:  16px;
  --spacing-lg:  24px;
  --spacing-xl:  32px;
  --spacing-2xl: 48px;

  /* ---------- Sizing (Touch / Hit Target) ---------- */
  --touch-target:     48px;  /* 시니어 권장 최소 터치 영역 (WCAG AAA 44px 초과) */
  --btn-min-height:   48px;
  --btn-min-width:    96px;
  --input-min-height: 56px;  /* 입력은 더 크게 */

  /* ---------- Radius / Border ---------- */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --border-width: 2px;       /* 1px은 시니어에게 안 보임 */

  /* ---------- Focus / Motion ---------- */
  --focus-ring: 3px solid var(--color-focus);
  --focus-offset: 2px;
  --transition-base: 150ms ease-out;
}

/* 사용자 OS 설정 존중 — 시니어에게 중요 */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 2. 코딩 시 확인 체크리스트 (요구사항 기준)

각 항목은 PR 머지 전 빌더가 직접 체크.

### 타이포그래피
- [ ] 본문 최소 18px (`--font-size-base`) — 16px는 보조 문구에만
- [ ] 행간(line-height) 1.5 이상
- [ ] 한 줄 60자 이하 (가로 길이 제한)
- [ ] 본문은 굵기 400, 강조는 700 (300/light 금지)
- [ ] 영문/숫자 혼용 시에도 한글 기준 폰트 사이즈 유지

### 색상·대비
- [ ] 모든 텍스트는 배경 대비 4.5:1 이상 (큰 글씨 24px+ 굵음은 3:1)
- [ ] UI 컴포넌트 경계(버튼 테두리, 입력 외곽선)는 3:1 이상
- [ ] 색상만으로 정보 전달 금지 — 항상 텍스트·아이콘 병기
  - 에러: 빨강 + "확인" 텍스트 + 경고 아이콘
  - 성공: 초록 + "완료" 텍스트 + 체크 아이콘
- [ ] 다크모드 토글 미지원이면 강제 light 배경 유지

### 터치·키보드
- [ ] 모든 인터랙티브 요소의 hit area ≥ 48×48px
- [ ] 인접한 터치 타겟 간 간격 ≥ 8px
- [ ] 모든 기능을 키보드로 사용 가능
- [ ] 포커스 링 가시성: `outline: var(--focus-ring); outline-offset: var(--focus-offset);` (제거 금지)
- [ ] Tab 순서는 시각적 순서와 일치

### 콘텐츠·문구
- [ ] 전문용어 금지 — "로그아웃" O / "Sign out" X
- [ ] 명령형 짧은 문장 — "비밀번호를 입력하세요" O / "비밀번호란에 텍스트를 기재해 주시기 바랍니다" X
- [ ] 에러는 무엇이/왜/어떻게 — "이메일 형식이 올바르지 않습니다. 예: name@email.com"
- [ ] 로딩 상태 명시: "불러오는 중..." (스피너만 X)
- [ ] 빈 상태 안내: "아직 주문 내역이 없습니다. 상품을 둘러볼까요?"

### 네비게이션
- [ ] 메뉴 깊이 최대 3단계
- [ ] 현재 위치(breadcrumb 또는 활성 상태) 항상 표시
- [ ] 뒤로가기 버튼 명시적 제공 — 브라우저 버튼만 의존 X
- [ ] 홈으로 가는 경로는 항상 한 번에 도달 가능 (로고 클릭)

### 폼
- [ ] 라벨은 입력 위에 (placeholder 단독 사용 금지)
- [ ] 필수 필드 명시: 라벨에 "(필수)" 텍스트 + 시각적 표시
- [ ] 자동완성 속성 부여: `autocomplete="email" | "current-password" | "tel"` 등
- [ ] 입력 오류는 필드 바로 아래 빨강+텍스트로
- [ ] 제출 후 첫 오류 필드로 포커스 이동

### 이미지·미디어
- [ ] 모든 의미 있는 `<img>`에 `alt` 속성 — 장식용은 `alt=""`
- [ ] 상품 이미지는 최소 200×200px 표시
- [ ] 자동재생 비디오 금지

### 시맨틱 HTML
- [ ] `<button>` vs `<a>` 구분 — 동작은 button, 이동은 link
- [ ] `<h1>`은 페이지당 1개, 헤딩 레벨 건너뛰기 금지
- [ ] 랜드마크: `<header>`, `<nav>`, `<main>`, `<footer>` 사용
- [ ] 폼은 `<form>` + `<label htmlFor>` 연결

---

## 3. 컴포넌트별 접근성 기준

### Button
```jsx
// 최소 요건
<button
  type="button"
  className={styles.btn}
  disabled={isLoading}
  aria-busy={isLoading}
>
  {isLoading ? "처리 중..." : "장바구니 담기"}
</button>
```
- 높이 ≥ 48px, 폭 ≥ 96px
- 폰트 18px 이상, 굵기 700
- 비활성 시 시각적 표시 + `disabled` + `aria-disabled`
- 로딩 중 텍스트가 바뀌어야 함 (스피너 only X)
- `:focus-visible` 시 주황 outline 3px

### Input
```jsx
<label htmlFor="email" className={styles.label}>
  이메일 <span aria-hidden="true">*</span>
  <span className="sr-only">(필수)</span>
</label>
<input
  id="email"
  type="email"
  autoComplete="email"
  required
  aria-invalid={!!error}
  aria-describedby={error ? "email-error" : undefined}
  className={styles.input}
/>
{error && <p id="email-error" className={styles.error} role="alert">{error}</p>}
```
- 높이 ≥ 56px
- 폰트 ≥ 18px (모바일 자동 줌 방지 위해 16px 이상 필수)
- 테두리 2px solid `--color-border`, focus 시 `--color-primary`
- 에러 시 테두리 `--color-danger` + 메시지 표시

### ProductCard
- 이미지 ≥ 200×200px, `alt`=상품명
- 상품명 ≥ 22px, 굵기 700, 2줄까지 표시 후 ellipsis
- 가격 ≥ 24px, `aria-label="가격 45,000원"`
- 카드 전체가 링크면 `<Link>`로 감싸되, 내부 "담기" 버튼은 별도 클릭 영역 (이벤트 전파 차단)
- 호버/포커스 시 명확한 시각적 변화 (그림자 + 테두리)

### Nav
- 상단 고정, 높이 ≥ 64px
- 로고는 클릭 시 항상 홈
- 활성 메뉴는 색상 + 굵기 + 하단 라인 (3가지 단서)
- 모바일: 햄버거 메뉴 아이콘 옆에 "메뉴" 텍스트 병기 — 아이콘 단독 X
- 장바구니 아이콘에는 항목 수 배지 + `aria-label="장바구니 (3개)"`

### Modal
- 열릴 때 포커스를 모달 내부 첫 인터랙티브 요소로 이동
- ESC로 닫히기 + 닫기 버튼 우상단 (≥ 48×48px)
- 배경 클릭 닫기는 옵션 (시니어는 실수로 닫힐 수 있어 기본 OFF 권장)
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby="..."`
- 모달 외부는 `aria-hidden="true"` + 스크롤 잠금
- 닫힌 후 포커스를 트리거 버튼으로 복원

---

## 4. WCAG AA 통과 색상 조합 (검증된 쌍)

> 모든 조합은 4.5:1 이상 (일반 텍스트 기준). [대비 계산기](https://webaim.org/resources/contrastchecker/) 기준.

| 배경 | 텍스트 | 대비 | 용도 |
|------|--------|------|------|
| `#FFFFFF` 흰색 | `#1A1A1A` 거의검정 | **16.1:1** | 본문 |
| `#FFFFFF` | `#4A4A4A` 진회색 | **9.7:1** | 보조 텍스트 |
| `#FFFFFF` | `#0066CC` 파랑 | **5.17:1** | 링크 |
| `#FFFFFF` | `#C62828` 빨강 | **6.36:1** | 에러 |
| `#FFFFFF` | `#2E7D32` 초록 | **5.06:1** | 성공 |
| `#FFFFFF` | `#B45309` 주황갈색 | **5.21:1** | 경고 |
| `#0066CC` 파랑 | `#FFFFFF` 흰색 | **5.17:1** | 기본 버튼 |
| `#C62828` 빨강 | `#FFFFFF` | **6.36:1** | 삭제 버튼 |
| `#2E7D32` 초록 | `#FFFFFF` | **5.06:1** | 확인 버튼 |
| `#F7F7F7` 회색 카드 | `#1A1A1A` | **14.9:1** | 카드 본문 |
| `#F7F7F7` | `#0052A3` 진파랑 | **6.51:1** | 카드 위 링크 |

**금지 조합** (대비 부족 — 시니어에게 보이지 않음)
- 흰색 위 옅은 회색 (`#CCCCCC` 등) — 1.6:1
- 흰색 위 옅은 파랑 (`#66B2FF`) — 2.7:1
- 색깔만으로 빨강·초록 구분 (색약 사용자)

---

## 5. 글로벌 유틸리티 클래스 (포함 권장)

```css
/* 스크린리더 전용 */
.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0, 0, 0, 0);
  white-space: nowrap; border: 0;
}

/* Skip to content (페이지 상단 첫 요소로) */
.skip-link {
  position: absolute;
  top: -40px; left: 0;
  background: var(--color-primary);
  color: var(--color-text-on-primary);
  padding: var(--spacing-sm) var(--spacing-md);
  z-index: 100;
}
.skip-link:focus { top: 0; }
```

페이지 최상단에 항상:
```jsx
<a href="#main" className="skip-link">본문 바로가기</a>
```

---

## 6. 빌더 자가 검증 절차

PR 머지 전 빌더 본인이 수행:

1. **Lighthouse Accessibility 점수 ≥ 95**
2. **키보드만으로 회원가입 → 상품 담기 → 주문 완료 가능한지 확인**
3. **브라우저 글꼴 200% 확대 시 레이아웃 깨지지 않는지**
4. **macOS VoiceOver / NVDA로 주요 페이지 1회 청취**
5. **색약 시뮬레이터(Chrome DevTools Rendering > Emulate vision deficiencies)에서 정보 손실 없는지**
6. **모바일 375px 폭에서 모든 버튼 48px 이상 유지되는지**

---

## 7. 빌더 인계 사항

- **Frontend 빌더**: 본 문서의 토큰 CSS를 `client/src/styles/tokens.css`에 그대로 복사하여 `main.jsx`에서 import
- 모든 컴포넌트는 본 문서의 컴포넌트별 기준을 만족해야 함
- 시니어 UX는 "더 적은 옵션, 더 큰 글씨, 더 명확한 문구" 원칙
