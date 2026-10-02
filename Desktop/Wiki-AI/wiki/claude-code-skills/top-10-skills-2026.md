# Top 10 Skills for Claude Code (2026)

> The 10 must-have skills covering the workflow gaps where a raw coding agent produces suboptimal output without specialized guidance.

## Overview

- Skills cover 80% of the workflow gaps in raw agent output
- The best skills change the agent's **default behavior** — not just adding a command, but changing what "build me X" returns
- Sources: March 2026 community article + Anthropic official skills
- Install prefix: `npx skills add <source> --skill <name>`

---

## Detail

### 1. Frontend Design

**Problem:** Without guidance, LLMs default to "distributional convergence" — Inter font, purple gradient, grid cards. Statistically average, visually forgettable.

**What it does:** Gives Claude a design philosophy before touching code — bold aesthetics, distinctive typography, purposeful color, intentional animation.

**Install:**
```bash
npx skills add anthropics/claude-code --skill frontend-design
```
**Invoke:** `/frontend-design` — describe what to build

**Stats:** 277,000+ installs as of March 2026

**Real value:** Escapes the "AI-generated" visual signature. Essential for any user-facing product.

---

### 2. Browser Use

**Problem:** Agents can write a scraper but can't run it. Blind to dynamic web content, live dashboards, or end-to-end flows requiring clicks.

**What it does:** Connects Claude to a headless browser — navigate URLs, click elements, fill forms, extract JS-rendered content, take screenshots.

**Install:**
```bash
npx skills add https://github.com/browser-use/browser-use --skill browser-use
```

**Example flow:** "Check that signup works end-to-end on staging"
→ Agent opens page → fills form → clicks through → screenshots confirmation → reports any issues

**Real value:** Turns Claude into a QA engineer + research analyst. Any workflow requiring a human to open a browser is now automatable.

---

### 3. Code Reviewer (Simplify)

**Problem:** Agents write code that works on first read but misses: unnecessary abstractions, duplicated logic, functions doing too much, performance issues, naming problems.

**What it does:** Runs a structured review pass — checks for single responsibility violations, N+1 queries, dead code, inconsistent patterns — and **fixes them before presenting code to you**.

**Install:**
```bash
# Anthropic official
npx skills add anthropics/claude-code --skill simplify

# Community version
npx claude-code-templates@latest --skill development/code-reviewer
```

**Best practice — add to CLAUDE.md:**
```markdown
## Code Review Standards
Run /simplify before presenting code. Flag:
- Functions longer than 30 lines
- Logic duplicated more than twice
- `any` type usage in TypeScript
- Missing error handling on async operations
```

**Real value:** Code review happens before you see the output — you receive the second draft, not the first.

---

### 4. Remotion

**Problem:** Videos communicate things documentation can't. Video production requires different tools, teams, timelines — so most developers just don't do it.

**What it does:** Translates natural language into working React/Remotion components for programmatic video creation. Describe → Claude generates → preview in Remotion Studio → render to MP4.

**Install:**
```bash
npx skills add remotion/agent-skills
```

**Invoke:**
```
/remotion Create a 30-second product demo showing our API dashboard with animated charts
```

**Real value:** Product demos, release announcements, animated README headers — without leaving your editor. Any developer can now produce video content.

---

### 5. Google Workspace (GWS)

**Problem:** Google Workspace has 50+ APIs with separate OAuth flows, client libraries, and REST endpoints per service. Integration setup has historically been significant work.

**What it does:** `gws` CLI dynamically discovers all Workspace APIs via Google's Discovery Service, exposes them as a unified interface, and ships with a built-in MCP server.

**Install:**
```bash
npm install -g @googleworkspace/cli
gws mcp -s drive,gmail,calendar,sheets   # start MCP server
npx skills add https://github.com/googleworkspace/cli
```

**Pre-built patterns:** executive assistant, project manager, IT admin, sales team

**Real value:** Any workflow copying between Google apps → fully automated. Read Gmail → draft reply → update Sheets → create Calendar event, all from one prompt.

---

### 6. Valyu — Real-Time & Specialised Data

**Problem:** Agents fabricate or use stale data when real answers require paywalled sources: SEC filings, PubMed, clinical trials, economic databases.

**What it does:** Single API connecting to 36+ specialised data sources — SEC 10-K filings, PubMed, ChEMBL (2.5M bioactive compounds), ClinicalTrials.gov, FRED economic indicators, patent databases, academic publishers.

**Install:**
```bash
npx skills add https://github.com/valyuai/skills --skill valyu-best-practices
```

**Benchmark results:**
| Benchmark | Valyu | Google | Exa |
|-----------|-------|--------|-----|
| FreshQA (600 time-sensitive queries) | **79%** | 39% | 24% |
| Finance queries | **73%** | 55% | — |
| MedAgent (562 medical queries) | **48%** | — | — |

**Real value:** Separates a demo from a tool people actually use. Agents with current, authoritative, paywalled data are categorically more useful.

---

### 7. Antigravity Awesome Skills

**Problem:** Every skill problem you have, someone has already solved — but the solutions are scattered across GitHub, Discord, and blog posts.

**What it does:** Community-maintained library of **1,234+ skills** compatible with Claude Code, Cursor, Gemini CLI, Codex CLI, GitHub Copilot, and more. Universal SKILL.md format.

**Stats:** 22,000+ GitHub stars, 3,800+ forks, v7.3.0 as of March 2026

**Install:**
```bash
npx antigravity-awesome-skills --claude
```

**Starter skills worth knowing immediately:**
- `/brainstorming` — structured planning before writing code
- `/architecture` — system design and component structure
- `/debugging-strategies` — systematic troubleshooting playbooks
- `/api-design-principles` — REST API shape, consistency, versioning
- `/security-auditor` — security-focused code review
- `/create-pr` — packages work into clean pull requests
- `/doc-coauthoring` — structured technical documentation

**Role-based bundles:**
- **Essentials:** brainstorming, architecture, debugging-strategies, doc-coauthoring, create-pr
- **Web Wizard:** frontend-design, api-design-principles, lint-and-validate, create-pr
- **Security Engineer:** security-auditor, lint-and-validate, debugging-strategies

**Real value:** Eliminates the "I should write a skill for that" backlog. Install once, cover virtually every engineering workflow.

---

### 8. PlanetScale Database Skills

**Problem:** Agents treat databases like any other code — write something that runs and move on. Schema decisions made at day one are hardest to undo at day 365.

**What it does:** Teaches agents PlanetScale's branching workflow (database branches = git branches), index-aware query writing, foreign key conventions for horizontal scalability, and schema review via deploy requests.

**Install:**
```bash
brew install planetscale/tap/pscale
pscale auth login
npx skills add planetscale/agent-skill
```

**What changes:** Agent without skill writes `SELECT * FROM orders WHERE status = 'pending'`. Agent with skill writes the same query, adds composite index, avoids SELECT *, estimates query time at scale (2ms vs 8s at 10M rows).

**Real value:** Database decisions baked in from the start — schema changes as reviewable, reversible, mergeable code.

---

### 9. Shannon — Autonomous AI Pentester

**Problem:** Security testing is expensive, slow, and requires specialized knowledge — so most teams skip it. Traditional pentests cost thousands and return a PDF weeks later.

**What it does:** Autonomous white-box security testing agent — analyzes source code, maps attack surfaces, executes **real exploits** across 50+ vulnerability types, reports only what it can prove.

**Stats:** **96.15% exploit success rate** on XBOW security benchmark (100/104). No false positives — no exploit, no report.

**Install:**
```bash
npx skills add unicodeveloper/shannon
```
*Prerequisites: Docker, Anthropic API key*

**Invoke:**
```bash
/shannon http://localhost:3000 myapp                    # full pentest
/shannon --scope=xss,injection http://localhost:8080    # targeted
/shannon status                                          # check progress
/shannon results                                         # view report
```

**5-phase pipeline:** Pre-Recon → Recon → Vulnerability Analysis (5 parallel agents) → Exploitation → Reporting

**Covers:** SQL injection (union/blind/time-based), XSS (reflected/stored/DOM), SSRF (AWS/GCP/Azure metadata), auth bypass (JWT/session/CSRF/MFA), authorization (IDOR/path traversal/privilege escalation)

**Cost:** ~$50/pentest using Claude Sonnet, ~1–1.5 hours

**Safety gates:** Confirms authorization before every run, runs all attacks in Docker, supports scope controls and avoid-lists. Only use against systems you own or have **explicit written authorization** to test.

---

### 10. Excalidraw Diagram Generator

**Problem:** Architecture decisions live in prose or whiteboard sessions nobody records. Code comments describe what; diagrams show why.

**What it does:** Generates production-quality Excalidraw diagrams from natural language. Visual structure maps to conceptual structure (fan-out for one-to-many, convergence for aggregation). Includes a Playwright-based self-validation loop — renders to PNG, checks for layout issues, fixes before presenting.

**Install:**
```bash
npx skills add https://github.com/coleam00/excalidraw-diagram-skill --skill excalidraw-diagram
```

**Example prompts:**
```
Create an Excalidraw diagram showing request flow through API gateway, auth middleware, and downstream services
Generate architecture for multi-tenant SaaS with separate DB schemas and shared analytics layer
Draw sequence diagram for OAuth2 PKCE flow including browser, auth server, and resource server
```

**Real value:** Diagrams are the artifact that survives longest. The self-validation loop means you get something you can actually publish, not a first draft.

---

### Summary Table

| Skill | Gap it fills | Install |
|-------|-------------|---------|
| Frontend Design | Visual quality / anti-average design | `anthropics/claude-code` |
| Browser Use | Live web interaction, E2E testing | `browser-use/browser-use` |
| Code Reviewer | Code quality, second-draft output | `anthropics/claude-code --skill simplify` |
| Remotion | Programmatic video production | `remotion/agent-skills` |
| GWS | Google Workspace automation (50+ APIs) | `googleworkspace/cli` |
| Valyu | Paywalled/specialised data (36+ sources) | `valyuai/skills` |
| Antigravity | 1,234+ community skills, one install | `antigravity-awesome-skills --claude` |
| PlanetScale | Index-aware schema + DB branch workflow | `planetscale/agent-skill` |
| Shannon | Autonomous pentesting, 96% exploit rate | `unicodeveloper/shannon` |
| Excalidraw | Architecture diagrams with self-validation | `coleam00/excalidraw-diagram-skill` |

## Key Takeaways

- The bar for a worthwhile skill: does it change **default behavior**, or just add a command you have to remember?
- Install `/simplify` and Antigravity Awesome Skills on every machine — universal productivity boost
- `Shannon` and `deploy`-type skills must use `disable-model-invocation: true` — side effects require manual control
- Skills compound: `frontend-design` + `code-reviewer` + `Excalidraw` creates an agent that designs, reviews, and documents by default

## Related

- [[overview]] — what skills are and the full ecosystem
- [[skill-anatomy]] — how to write your own SKILL.md
- [[skills-vs-hooks-vs-claude-md]] — when to reach for each tool

---
*Source: raw/10 Must-Have Skills for Claude (and Any Coding Agent) in 2026.md | Compiled: 2026-04-07*

---

## 한국어 번역

# Claude Code를 위한 상위 10가지 스킬 (2026)

> 특화된 지침 없이 원시 코딩 에이전트가 최적화되지 않은 결과물을 생성하는 워크플로우 격차를 해소하는 10가지 필수 스킬.

## 개요

- 스킬은 원시 에이전트 출력의 워크플로우 격차 80%를 해결
- 최고의 스킬은 에이전트의 **기본 동작을 바꿈** — 단순히 명령어를 추가하는 것이 아니라 "X를 만들어줘"의 결과물을 바꿈
- 출처: 2026년 3월 커뮤니티 글 + Anthropic 공식 스킬
- 설치 접두사: `npx skills add <source> --skill <name>`

---

## 세부 내용

### 1. 프론트엔드 디자인

**문제:** 지침 없이 LLM은 "분포 수렴"에 기본 설정됨 — Inter 폰트, 보라색 그라데이션, 격자 카드. 통계적으로 평균이고, 시각적으로 기억에 남지 않음.

**하는 일:** Claude가 코드를 건드리기 전에 디자인 철학을 제공 — 대담한 미학, 독특한 타이포그래피, 목적 있는 색상, 의도적인 애니메이션.

**설치:**
```bash
npx skills add anthropics/claude-code --skill frontend-design
```
**호출:** `/frontend-design` — 만들고 싶은 것을 설명

**통계:** 2026년 3월 기준 27만 7천회 이상 설치

**실제 가치:** "AI 생성" 시각적 특징에서 벗어남. 사용자 대면 제품에 필수.

---

### 2. 브라우저 사용

**문제:** 에이전트는 스크레이퍼를 작성할 수 있지만 실행할 수 없음. 동적 웹 콘텐츠, 실시간 대시보드, 또는 클릭이 필요한 엔드-투-엔드 흐름에 접근 불가.

**하는 일:** Claude를 헤드리스 브라우저에 연결 — URL 탐색, 요소 클릭, 양식 작성, JS 렌더링 콘텐츠 추출, 스크린샷 촬영.

**설치:**
```bash
npx skills add https://github.com/browser-use/browser-use --skill browser-use
```

**실제 가치:** Claude를 QA 엔지니어 + 리서치 분석가로 변환. 사람이 브라우저를 열어야 하는 모든 워크플로우가 이제 자동화 가능.

---

### 3. 코드 리뷰어 (Simplify)

**문제:** 에이전트는 첫 번째 읽기에서 작동하는 코드를 작성하지만 놓침: 불필요한 추상화, 중복된 로직, 너무 많은 일을 하는 함수, 성능 문제, 명명 문제.

**하는 일:** 구조화된 리뷰 패스 실행 — 단일 책임 위반, N+1 쿼리, 죽은 코드, 일관되지 않은 패턴 확인 — 코드를 보여주기 전에 **수정**.

**설치:**
```bash
# Anthropic 공식
npx skills add anthropics/claude-code --skill simplify

# 커뮤니티 버전
npx claude-code-templates@latest --skill development/code-reviewer
```

**실제 가치:** 출력을 보기 전에 코드 리뷰가 발생 — 첫 번째 초안이 아닌 두 번째 초안을 받음.

---

### 4. Remotion

**문제:** 동영상은 문서가 전달할 수 없는 것을 전달함. 동영상 제작은 다른 도구, 팀, 일정이 필요 — 대부분의 개발자가 그냥 하지 않는 이유.

**하는 일:** 자연어를 프로그래밍 방식 동영상 생성을 위한 작동하는 React/Remotion 컴포넌트로 변환. 설명 → Claude 생성 → Remotion Studio에서 미리보기 → MP4로 렌더링.

**설치:**
```bash
npx skills add remotion/agent-skills
```

**실제 가치:** 편집기를 벗어나지 않고 제품 데모, 릴리스 발표, 애니메이션 README 헤더. 이제 모든 개발자가 동영상 콘텐츠를 제작 가능.

---

### 5. Google Workspace (GWS)

**문제:** Google Workspace에는 서비스별로 별도의 OAuth 흐름, 클라이언트 라이브러리, REST 엔드포인트가 있는 50개 이상의 API가 있음. 통합 설정이 상당한 작업이었음.

**하는 일:** `gws` CLI가 Google의 Discovery Service를 통해 모든 Workspace API를 동적으로 검색하고, 통합 인터페이스로 노출하며, 내장 MCP 서버와 함께 제공.

**설치:**
```bash
npm install -g @googleworkspace/cli
gws mcp -s drive,gmail,calendar,sheets   # MCP 서버 시작
npx skills add https://github.com/googleworkspace/cli
```

**실제 가치:** Google 앱 간 복사 워크플로우 → 완전 자동화. Gmail 읽기 → 답장 초안 → Sheets 업데이트 → Calendar 이벤트 생성, 모두 하나의 프롬프트로.

---

### 6. Valyu — 실시간 및 특화 데이터

**문제:** 실제 답변이 유료 소스를 필요로 할 때 에이전트가 데이터를 만들어내거나 오래된 데이터를 사용: SEC 공시, PubMed, 임상시험, 경제 데이터베이스.

**하는 일:** 36개 이상의 특화 데이터 소스에 연결하는 단일 API — SEC 10-K 공시, PubMed, ChEMBL (250만 생체활성 화합물), ClinicalTrials.gov, FRED 경제 지표, 특허 데이터베이스, 학술 출판사.

**설치:**
```bash
npx skills add https://github.com/valyuai/skills --skill valyu-best-practices
```

**실제 가치:** 데모와 실제로 사용되는 도구를 구분. 현재의, 권위 있는, 유료 데이터를 가진 에이전트는 범주적으로 더 유용함.

---

### 7. Antigravity Awesome Skills

**문제:** 당신이 가진 모든 스킬 문제는 이미 누군가가 해결했음 — 하지만 해결책이 GitHub, Discord, 블로그 게시물에 흩어져 있음.

**하는 일:** Claude Code, Cursor, Gemini CLI, Codex CLI, GitHub Copilot 등과 호환되는 **1,234개 이상의 스킬**의 커뮤니티 유지 라이브러리. 범용 SKILL.md 형식.

**통계:** GitHub 별 2만 2천개 이상, 포크 3,800개 이상, 2026년 3월 기준 v7.3.0

**설치:**
```bash
npx antigravity-awesome-skills --claude
```

**실제 가치:** "그걸 위한 스킬을 작성해야 하는데" 백로그를 없앰. 한 번 설치하면 거의 모든 엔지니어링 워크플로우를 커버.

---

### 8. PlanetScale 데이터베이스 스킬

**문제:** 에이전트는 데이터베이스를 다른 코드처럼 취급 — 작동하는 것을 작성하고 넘어감. 1일에 내린 스키마 결정이 365일에 되돌리기 가장 어려움.

**하는 일:** 에이전트에게 PlanetScale의 브랜칭 워크플로우(데이터베이스 브랜치 = git 브랜치), 인덱스 인식 쿼리 작성, 수평적 확장성을 위한 외래 키 규칙, 배포 요청을 통한 스키마 리뷰를 가르침.

**설치:**
```bash
brew install planetscale/tap/pscale
pscale auth login
npx skills add planetscale/agent-skill
```

**실제 가치:** 데이터베이스 결정이 처음부터 내장됨 — 스키마 변경이 검토 가능하고, 되돌릴 수 있고, 병합 가능한 코드로.

---

### 9. Shannon — 자율 AI 침투 테스터

**문제:** 보안 테스팅은 비용이 많이 들고, 느리며, 전문 지식이 필요 — 대부분의 팀이 건너뜀. 전통적인 침투 테스트는 수천 달러가 들고 몇 주 후에 PDF를 반환.

**하는 일:** 자율 화이트박스 보안 테스팅 에이전트 — 소스 코드 분석, 공격 표면 매핑, 50개 이상의 취약점 유형에 걸쳐 **실제 익스플로잇** 실행, 증명할 수 있는 것만 보고.

**통계:** XBOW 보안 벤치마크에서 **96.15% 익스플로잇 성공률** (100/104). 오탐 없음 — 익스플로잇이 없으면 보고도 없음.

**설치:**
```bash
npx skills add unicodeveloper/shannon
```

**비용:** Claude Sonnet 사용 시 침투 테스트당 약 $50, 약 1-1.5시간

**안전 게이트:** 실행 전 항상 승인 확인, 모든 공격을 Docker에서 실행. 소유하거나 **명시적 서면 승인**을 받은 시스템에만 사용.

---

### 10. Excalidraw 다이어그램 생성기

**문제:** 아키텍처 결정이 산문이나 아무도 기록하지 않는 화이트보드 세션에 남음. 코드 주석은 무엇을 설명하지만; 다이어그램은 왜를 보여줌.

**하는 일:** 자연어에서 프로덕션 품질의 Excalidraw 다이어그램 생성. 시각적 구조가 개념 구조에 매핑됨. Playwright 기반 자기 검증 루프 포함 — PNG로 렌더링하고, 레이아웃 문제를 확인하고, 제시하기 전에 수정.

**설치:**
```bash
npx skills add https://github.com/coleam00/excalidraw-diagram-skill --skill excalidraw-diagram
```

**실제 가치:** 다이어그램은 가장 오래 살아남는 산출물. 자기 검증 루프는 첫 번째 초안이 아닌 실제로 게시할 수 있는 것을 제공.

---

### 요약 표

| 스킬 | 채우는 격차 | 설치 |
|-------|-------------|---------|
| 프론트엔드 디자인 | 시각적 품질 / 평균 디자인 탈피 | `anthropics/claude-code` |
| 브라우저 사용 | 실시간 웹 상호작용, E2E 테스팅 | `browser-use/browser-use` |
| 코드 리뷰어 | 코드 품질, 두 번째 초안 결과물 | `anthropics/claude-code --skill simplify` |
| Remotion | 프로그래밍 방식 동영상 제작 | `remotion/agent-skills` |
| GWS | Google Workspace 자동화 (50개 이상 API) | `googleworkspace/cli` |
| Valyu | 유료/특화 데이터 (36개 이상 소스) | `valyuai/skills` |
| Antigravity | 1,234개 이상 커뮤니티 스킬, 한 번 설치 | `antigravity-awesome-skills --claude` |
| PlanetScale | 인덱스 인식 스키마 + DB 브랜치 워크플로우 | `planetscale/agent-skill` |
| Shannon | 자율 침투 테스팅, 96% 익스플로잇 성공률 | `unicodeveloper/shannon` |
| Excalidraw | 자기 검증이 있는 아키텍처 다이어그램 | `coleam00/excalidraw-diagram-skill` |

## 핵심 시사점

- 가치 있는 스킬의 기준: **기본 동작을 바꾸는가**, 아니면 기억해야 하는 명령어만 추가하는가?
- 모든 머신에 `/simplify`와 Antigravity Awesome Skills 설치 — 범용 생산성 향상
- `Shannon`과 `deploy` 유형 스킬은 반드시 `disable-model-invocation: true` 사용 — 부작용은 수동 제어 필요
- 스킬은 복합적: `frontend-design` + `code-reviewer` + `Excalidraw`는 기본적으로 디자인하고, 리뷰하고, 문서화하는 에이전트를 만듦

## 관련 항목

- [[overview]] — 스킬이란 무엇이고 전체 생태계
- [[skill-anatomy]] — 자신의 SKILL.md 작성 방법
- [[skills-vs-hooks-vs-claude-md]] — 각 도구를 언제 사용할지

---
*출처: raw/10 Must-Have Skills for Claude (and Any Coding Agent) in 2026.md | 편집: 2026-04-07*
