---
name: senior-mall-orchestrator
description: "시니어 쇼핑몰(SeniorMall) 에이전트 팀을 조율하는 오케스트레이터. 시니어몰 개발, 쇼핑몰 구축, 시니어 쇼핑 앱 만들기, SeniorMall 개발 시작 요청 시 사용. 후속 작업: 시니어몰 수정, 재실행, 업데이트, 기능 추가, 특정 기능만 다시, 이전 결과 개선, 백엔드 수정, 프론트엔드 수정 요청 시에도 반드시 이 스킬을 사용."
---

# Senior Mall Orchestrator

시니어 쇼핑몰의 아키텍처 설계 → 백엔드/프론트엔드 구현 → QA까지 전체 빌드를 조율하는 통합 스킬.

## 실행 모드: 하이브리드

| Phase | 모드 | 이유 |
|-------|------|------|
| Phase 2 (아키텍처 설계) | 서브 에이전트 | Architect 단독 작업, 팀 통신 불필요 |
| Phase 3 (빌드) | 에이전트 팀 | Backend↔Frontend 실시간 API 계약 조율 필요 |
| Phase 4 (QA) | 서브 에이전트 | QA 단독 독립 검증 |

## 에이전트 구성

| 에이전트 | 타입 | 역할 | 출력 |
|---------|------|------|------|
| senior-mall-architect | 커스텀 | 스키마·API 명세·접근성 기준 설계 | `_workspace/01_architect_*.md` |
| senior-mall-backend | 커스텀 (팀원) | Express API + Prisma 구현 | `SeniorMall/server/` |
| senior-mall-frontend | 커스텀 (팀원) | React + 시니어 접근성 UI 구현 | `SeniorMall/client/` |
| senior-mall-qa | 커스텀 | 통합 정합성·접근성·보안 검증 | `_workspace/qa_report.md` |

---

## 워크플로우

### Phase 0: 컨텍스트 확인

`_workspace/` 존재 여부를 확인한다:

- **미존재** → 초기 실행. Phase 1로 진행
- **존재 + 부분 수정 요청** → 해당 에이전트만 재호출. 기존 산출물 중 수정 대상만 덮어씀
- **존재 + 새 요구사항 제공** → `_workspace/`를 `_workspace_{YYYYMMDD_HHMMSS}/`로 이동 후 Phase 1 진행

부분 재실행 시: 이전 산출물 경로를 에이전트 프롬프트에 포함하여 기존 결과를 읽고 피드백을 반영하도록 지시한다.

### Phase 1: 준비

1. 사용자 입력(요구사항, 특이사항)을 파싱
2. `_workspace/` 및 `_workspace/00_input/` 생성
3. 요구사항을 `_workspace/00_input/requirements.md`에 저장:
   ```
   프로젝트: 시니어 쇼핑몰 (SeniorMall)
   대상: 60세+ 시니어 사용자
   핵심 기능: 상품 카탈로그, 장바구니, 주문/결제, 회원관리
   특이사항: [사용자 추가 요구사항]
   기술 스택: React/Vite + Node.js/Express + PostgreSQL/Prisma
   ```

### Phase 2: 아키텍처 설계
**실행 모드:** 서브 에이전트

Architect를 단일 서브 에이전트로 호출한다:

```
Agent(
  subagent_type: "senior-mall-architect",
  model: "opus",
  prompt: "
    요구사항: _workspace/00_input/requirements.md를 읽고 시니어몰 아키텍처를 설계하라.
    
    산출물 (모두 생성 필수):
    - _workspace/01_architect_tech_stack.md
    - _workspace/01_architect_schema.md  (Prisma 스키마 전문 포함)
    - _workspace/01_architect_api_spec.md (모든 엔드포인트 + 요청/응답 shape)
    - _workspace/01_architect_accessibility.md (시니어 UI 체크리스트)
    
    완료 후 생성된 파일 목록을 보고하라.
  "
)
```

Architect 완료 후 산출물 4개를 Read로 확인하고 Phase 3로 진행.

### Phase 3: 빌드
**실행 모드:** 에이전트 팀

1. **팀 구성:**
   ```
   TeamCreate(
     team_name: "senior-mall-build-team",
     members: [
       {
         name: "backend",
         agent_type: "senior-mall-backend",
         model: "opus",
         prompt: "
           아키텍처 명세를 읽고 백엔드를 구현하라:
           - _workspace/01_architect_schema.md
           - _workspace/01_architect_api_spec.md
           
           구현 순서:
           1. SeniorMall/server/ 디렉토리 구조 생성
           2. package.json + 의존성 설치 스크립트 작성
           3. prisma/schema.prisma 생성
           4. Express 앱 기본 구조 (index.js, middleware/)
           5. 라우트 구현 (auth → products → cart → orders → users 순)
           6. prisma/seed.js 작성 (상품 10개, 사용자 2명)
           
           각 라우트 파일 완성 시 frontend에게 SendMessage로 알림.
           형식: '완료: /api/products - GET (응답: {id, name, price, stock, category}), POST ...'
         "
       },
       {
         name: "frontend",
         agent_type: "senior-mall-frontend",
         model: "opus",
         prompt: "
           아키텍처 명세를 읽고 프론트엔드를 구현하라:
           - _workspace/01_architect_api_spec.md
           - _workspace/01_architect_accessibility.md
           
           구현 순서:
           1. SeniorMall/client/ Vite 프로젝트 구조 생성
           2. 전역 CSS 변수 (글꼴 크기, 색상, 간격)
           3. 공통 컴포넌트 (Button, ProductCard, Header, BottomNav)
           4. 인증 페이지 (Login, Register)
           5. 상품 페이지 (Home, ProductList, ProductDetail)
           6. 구매 플로우 (Cart, Checkout)
           7. 마이페이지 (Orders, MyPage)
           
           backend로부터 API 완료 알림 수신 시 mock 데이터를 실제 API로 교체.
           API 형식 불명확 시 backend에게 SendMessage로 질의.
         "
       }
     ]
   )
   ```

2. **작업 등록:**
   ```
   TaskCreate(tasks: [
     { title: "Express 서버 기본 구조", assignee: "backend" },
     { title: "Prisma 스키마 + 인증 API", assignee: "backend" },
     { title: "상품/카테고리 API", assignee: "backend" },
     { title: "장바구니/주문 API", assignee: "backend" },
     { title: "시드 스크립트", assignee: "backend", depends_on: ["Prisma 스키마 + 인증 API"] },
     { title: "Vite 프로젝트 구조 + 전역 스타일", assignee: "frontend" },
     { title: "공통 컴포넌트 + 인증 페이지", assignee: "frontend" },
     { title: "상품 목록/상세 페이지", assignee: "frontend" },
     { title: "장바구니/결제 페이지", assignee: "frontend" },
     { title: "마이페이지/주문 내역", assignee: "frontend" }
   ])
   ```

3. **리더 모니터링:**
   - 팀원이 유휴 상태가 되면 자동 알림 수신
   - 팀원 간 API 계약 분쟁 발생 시 아키텍트 명세를 기준으로 중재
   - TaskGet으로 전체 진행률 주기적 확인

4. **빌드 완료 기준:** 모든 TaskUpdate가 completed + 양쪽 팀원이 유휴 상태

### Phase 4: QA
**실행 모드:** 서브 에이전트

팀 정리 후 QA 에이전트를 호출한다:

```
TeamDelete(team_name: "senior-mall-build-team")

Agent(
  subagent_type: "senior-mall-qa",
  model: "opus",
  prompt: "
    완성된 시니어몰 코드를 검증하라:
    - SeniorMall/server/ — 백엔드 API
    - SeniorMall/client/ — 프론트엔드
    - SeniorMall/prisma/ — 스키마
    - _workspace/01_architect_api_spec.md — API 명세 (기준)
    - _workspace/01_architect_accessibility.md — 접근성 기준 (기준)
    
    검증 항목:
    1. API 명세 vs 실제 구현 교차 비교 (엔드포인트, 응답 shape)
    2. 접근성 체크리스트 (글꼴 크기, 버튼 크기, 대비율)
    3. 회원가입→로그인→장바구니→주문 플로우 코드 추적
    4. 보안 기본 검토 (인증 미들웨어 누락, XSS)
    
    결과를 _workspace/qa_report.md에 저장하라.
  "
)
```

### Phase 5: 정리

1. QA 보고서 Read: `_workspace/qa_report.md`
2. 치명적 이슈 있으면 해당 에이전트 재호출 (부분 재실행)
3. `_workspace/` 디렉토리 보존
4. 사용자에게 결과 요약:
   - 생성된 파일 구조
   - QA 결과 요약 (통과/이슈 수)
   - 다음 단계 안내 (환경변수 설정, npm install, DB 마이그레이션)

---

## 데이터 흐름

```
[리더]
  │
  ├─ Phase 2: Agent(Architect) → _workspace/01_architect_*.md
  │
  ├─ Phase 3: TeamCreate(backend + frontend)
  │    backend ←─SendMessage─→ frontend  (API 계약 조율)
  │    backend → SeniorMall/server/
  │    frontend → SeniorMall/client/
  │
  ├─ TeamDelete → Agent(QA) → _workspace/qa_report.md
  │
  └─ 결과 보고
```

---

## 에러 핸들링

| 상황 | 전략 |
|------|------|
| Architect 산출물 불완전 | 누락 파일 확인 후 재호출 |
| Backend 팀원 중지 | SendMessage 상태 확인 → 재시작 |
| Frontend 팀원 중지 | SendMessage 상태 확인 → 재시작 |
| Backend↔Frontend API 충돌 | 아키텍트 명세 기준으로 리더가 중재 |
| QA 치명적 버그 발견 | 해당 에이전트만 부분 재실행 |
| 양쪽 팀원 동시 실패 | 사용자에게 알리고 진행 여부 확인 |

---

## 테스트 시나리오

### 정상 흐름
1. 사용자: "시니어몰 만들어줘, 건강식품 카테고리 추가해줘"
2. Phase 1: `_workspace/00_input/requirements.md` 생성 (건강식품 카테고리 명시)
3. Phase 2: Architect가 Product 스키마에 category 필드 포함, `/api/categories` 엔드포인트 명세
4. Phase 3: Backend가 categories API 구현 → Frontend에 SendMessage → Frontend가 카테고리 필터 UI 구현
5. Phase 4: QA가 카테고리 API 응답과 ProductList 페이지의 필터 로직 교차 검증
6. 최종: `SeniorMall/server/`, `SeniorMall/client/` 완성 + qa_report.md 생성

### 에러 흐름
1. Phase 3에서 Frontend 팀원이 API 응답 형식 불명확으로 중지
2. Frontend가 Backend에 SendMessage: "GET /api/products 응답에 imageUrl 필드 있나요?"
3. Backend 응답: "있음, 형식: string (상대 경로 /uploads/...)"
4. Frontend 재개, UI 구현 완료
5. QA에서 이미지 경로 처리 검증 포함

---

## 실행 후 체크리스트

빌드 완료 후 사용자에게 안내할 다음 단계:

```bash
# 1. 환경변수 설정
cp SeniorMall/.env.example SeniorMall/.env
# (DATABASE_URL, JWT_SECRET 등 입력)

# 2. 의존성 설치
cd SeniorMall/server && npm install
cd SeniorMall/client && npm install

# 3. DB 마이그레이션 + 시드
cd SeniorMall && npx prisma migrate dev
npx prisma db seed

# 4. 서버 실행
cd server && npm run dev   # 포트 3001
cd client && npm run dev   # 포트 5173
```
