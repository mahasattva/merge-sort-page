# Claude Code Skills — Overview

> Skills are reusable SKILL.md instruction files that extend what Claude Code knows how to do — invokable as slash commands or triggered automatically when relevant.

## Overview

- Skills are **SKILL.md files** — markdown with optional YAML frontmatter
- A raw Claude without skills is like a senior engineer on day one: brilliant, but missing project-specific context
- Skills can be invoked explicitly (`/skill-name`) or triggered automatically when Claude recognizes a relevant task
- The same SKILL.md format works across Claude Code, Cursor, Gemini CLI, Codex CLI, and Antigravity IDE (universal standard)
- As of 2026, the ecosystem includes official Anthropic skills, verified third-party skills, and 1,234+ community skills

## Detail

### The Three-Layer Toolkit

| Layer | What it is | Trigger | Persistence |
|-------|-----------|---------|-------------|
| **Skills** | Reusable instruction sets | On-demand or auto | Loaded when invoked |
| **Hooks** | Deterministic lifecycle rules | Automatic on events | Always enforced |
| **CLAUDE.md** | Persistent session instructions | Session start | Always in context |

- See [[skills-vs-hooks-vs-claude-md]] for full comparison

### Skill Locations (Scope & Precedence)

| Scope | Path | Shared |
|-------|------|--------|
| Enterprise (highest) | Managed policy location | Yes |
| User / Personal | `~/.claude/skills/<skill-name>/SKILL.md` | No (local machine) |
| Project | `.claude/skills/<skill-name>/SKILL.md` | Yes (commit to repo) |
| Plugin (lowest) | `<plugin>/skills/<skill-name>/SKILL.md` | Yes (distributed) |

Higher-priority locations win when skill names conflict.

### Built-in Anthropic Skills (Bundled)

| Skill | Invoke | Purpose |
|-------|--------|---------|
| `/batch` | Manual | Parallel large-scale codebase changes via git worktrees |
| `/claude-api` | Auto (on `import anthropic`) | Claude API + Agent SDK reference |
| `/debug` | Manual | Enable debug logging for session |
| `/loop [interval]` | Manual | Run a prompt on recurring interval |
| `/simplify` | Manual | Review changed code for quality/efficiency and fix |

### The Skill Ecosystem (2026)

- **Official Anthropic skills** — `npx skills add anthropics/claude-code --skill <name>`
- **Antigravity Awesome Skills** — 1,234+ community skills, one install: `npx antigravity-awesome-skills --claude`
- **Skill directories** — aitmpl.com/skills, skills.sh
- **Plugin marketplace** — claude.ai/settings/plugins

### Installation Pattern

```bash
# Official Anthropic
npx skills add anthropics/claude-code --skill frontend-design

# GitHub repo
npx skills add https://github.com/org/repo --skill skill-name

# Antigravity bulk install
npx antigravity-awesome-skills --claude

# List installed
npx skills list
```

## Key Takeaways

- Skills shift Claude's **default behavior** — the best ones change what happens without requiring constant prompting
- Test skills by invoking directly: `/skill-name`; auto-invocation uses the `description` field
- Skills are just markdown files — commit them to `.claude/skills/` to share with your team
- The universal SKILL.md format means skills are portable across major AI coding agents
- For security/side-effect skills (deploy, pentest), use `disable-model-invocation: true` to require manual invocation

## Related

- [[skill-anatomy]] — SKILL.md format, all frontmatter fields, string substitutions
- [[top-10-skills-2026]] — the 10 must-have skills from the community
- [[skills-vs-hooks-vs-claude-md]] — when to use each mechanism
- [[obsidian-claude-code-workflow]] — using Claude Code as a wiki librarian (Karpathy pattern)

---
*Sources: raw/10 Must-Have Skills for Claude (and Any Coding Agent) in 2026.md, research | Compiled: 2026-04-07*

---

## 한국어 번역

# Claude Code 스킬 — 개요

> 스킬은 재사용 가능한 SKILL.md 지침 파일로, Claude Code가 수행할 수 있는 작업을 확장함 — 슬래시 명령으로 호출하거나 관련 작업 인식 시 자동으로 실행됨.

## 개요

- 스킬은 **SKILL.md 파일** — 선택적 YAML 프론트매터가 있는 마크다운
- 스킬 없는 순수 Claude는 첫날 출근한 시니어 엔지니어와 같음: 뛰어나지만 프로젝트 특화 컨텍스트가 없음
- 스킬은 명시적으로(`/skill-name`) 호출하거나 Claude가 관련 작업을 인식할 때 자동으로 실행됨
- 동일한 SKILL.md 형식이 Claude Code, Cursor, Gemini CLI, Codex CLI, Antigravity IDE에서 모두 작동 (범용 표준)
- 2026년 기준, 생태계에는 공식 Anthropic 스킬, 검증된 서드파티 스킬, 1,234개 이상의 커뮤니티 스킬이 포함됨

## 세부 내용

### 세 가지 레이어 툴킷

| 레이어 | 무엇인가 | 트리거 | 지속성 |
|-------|-----------|---------|-------------|
| **스킬** | 재사용 가능한 지침 세트 | 온디맨드 또는 자동 | 호출 시 로드됨 |
| **훅** | 결정론적 생명주기 규칙 | 이벤트 발생 시 자동 | 항상 적용 |
| **CLAUDE.md** | 지속적 세션 지침 | 세션 시작 시 | 항상 컨텍스트에 포함 |

- 전체 비교는 [[skills-vs-hooks-vs-claude-md]] 참고

### 스킬 위치 (범위 및 우선순위)

| 범위 | 경로 | 공유 |
|-------|------|--------|
| 엔터프라이즈 (최고) | 관리 정책 위치 | 예 |
| 사용자/개인 | `~/.claude/skills/<skill-name>/SKILL.md` | 아니요 (로컬 머신) |
| 프로젝트 | `.claude/skills/<skill-name>/SKILL.md` | 예 (저장소에 커밋) |
| 플러그인 (최저) | `<plugin>/skills/<skill-name>/SKILL.md` | 예 (배포됨) |

스킬 이름 충돌 시 우선순위가 높은 위치가 이김.

### 기본 제공 Anthropic 스킬

| 스킬 | 호출 | 목적 |
|-------|--------|---------|
| `/batch` | 수동 | git 워크트리를 통한 대규모 병렬 코드베이스 변경 |
| `/claude-api` | 자동 (`import anthropic` 시) | Claude API + Agent SDK 레퍼런스 |
| `/debug` | 수동 | 세션 디버그 로깅 활성화 |
| `/loop [간격]` | 수동 | 반복 간격으로 프롬프트 실행 |
| `/simplify` | 수동 | 변경된 코드의 품질/효율성 검토 및 수정 |

### 스킬 생태계 (2026)

- **공식 Anthropic 스킬** — `npx skills add anthropics/claude-code --skill <name>`
- **Antigravity Awesome Skills** — 1,234개 이상의 커뮤니티 스킬, 한 번에 설치: `npx antigravity-awesome-skills --claude`
- **스킬 디렉토리** — aitmpl.com/skills, skills.sh
- **플러그인 마켓플레이스** — claude.ai/settings/plugins

### 설치 패턴

```bash
# 공식 Anthropic
npx skills add anthropics/claude-code --skill frontend-design

# GitHub 저장소
npx skills add https://github.com/org/repo --skill skill-name

# Antigravity 일괄 설치
npx antigravity-awesome-skills --claude

# 설치된 목록 확인
npx skills list
```

## 핵심 시사점

- 스킬은 Claude의 **기본 동작을 변경** — 최고의 스킬은 지속적인 프롬프팅 없이도 기본 동작을 바꿈
- `/skill-name`을 직접 호출하여 스킬 테스트; 자동 호출은 `description` 필드를 사용
- 스킬은 마크다운 파일일 뿐 — `.claude/skills/`에 커밋하여 팀과 공유
- 범용 SKILL.md 형식은 주요 AI 코딩 에이전트 간 스킬 이식성을 의미
- 보안/부작용이 있는 스킬(배포, 침투 테스트)의 경우, `disable-model-invocation: true`를 사용하여 수동 호출 필요

## 관련 항목

- [[skill-anatomy]] — SKILL.md 형식, 모든 프론트매터 필드, 문자열 치환
- [[top-10-skills-2026]] — 커뮤니티의 10가지 필수 스킬
- [[skills-vs-hooks-vs-claude-md]] — 각 메커니즘을 언제 사용할지
- [[obsidian-claude-code-workflow]] — Claude Code를 위키 사서로 사용하기 (Karpathy 패턴)

---
*출처: raw/10 Must-Have Skills for Claude (and Any Coding Agent) in 2026.md, 연구 | 편집: 2026-04-07*
