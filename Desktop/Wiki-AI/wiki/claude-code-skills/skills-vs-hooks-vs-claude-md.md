# Skills vs Hooks vs CLAUDE.md

> Three mechanisms for shaping Claude Code's behavior — each serves a distinct purpose. Knowing which to reach for prevents over-engineering.

## Overview

- **Skills**: teach Claude new capabilities; on-demand or auto-triggered
- **Hooks**: enforce deterministic rules at lifecycle events; always fire
- **CLAUDE.md**: persistent session instructions; loaded at startup
- These are complementary, not alternatives — production setups use all three

## Detail

### Comparison Table

| Dimension | Skills | Hooks | CLAUDE.md |
|-----------|--------|-------|-----------|
| **What it is** | SKILL.md instruction files | Shell commands on lifecycle events | Markdown instructions file |
| **Trigger** | User invokes `/skill` or Claude auto-detects | Deterministic: pre/post tool, session start, permission request | Session start (always) |
| **Control** | LLM-driven — Claude decides when relevant | Deterministic — always fires if condition matches | Always injected into context |
| **Scope** | Loaded when invoked, can fork to subagent | Configured in settings.json, global or project | Global, project, or directory-level |
| **Best for** | Extending capabilities, slash commands, domain knowledge | Automation, enforcement, side effects that always happen | Project standards, architecture, persistent context |
| **Can Claude bypass?** | Yes (it decides relevance) | No (shell command runs regardless) | N/A (it's just text it reads) |
| **Config location** | `~/.claude/skills/` or `.claude/skills/` | `settings.json` | CLAUDE.md file |

### When to Use Skills

Use skills when you want Claude to **intelligently choose** to apply knowledge or when you want a **slash command**:

- Domain-specific patterns: `/api-design-principles`
- Reusable workflows: `/create-pr`, `/deploy`, `/pentest`
- Background context that activates on detection: legacy system docs, coding conventions
- Capabilities that depend on task type: `/frontend-design` when building UI

```yaml
# Good skill: teaches Claude how to review code
---
name: code-reviewer
description: Review code for single responsibility, duplicate logic, and performance issues
---
Check the changed files for:
- Functions doing too much (>30 lines is a signal)
- Duplicated logic (extract to utility if 3+ occurrences)
...
```

### When to Use Hooks

Use hooks when you want something to **always happen regardless of what Claude thinks**:

- Format code after every edit: `PostToolUse` on `Edit|Write` → run prettier
- Lint on save: `PostToolUse` → run eslint
- Notify on task completion: `Stop` → send Slack message
- Enforce secrets scanning: `PreToolUse` on `Write` → block if secrets detected

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{
        "type": "command",
        "command": "npx prettier --write $(jq -r '.tool_input.file_path')"
      }]
    }]
  }
}
```

Claude cannot bypass this. It fires every time an Edit or Write tool is used.

### When to Use CLAUDE.md

Use CLAUDE.md for **persistent context that should always be in scope**:

- Project architecture overview
- Coding standards and style rules
- File organization conventions
- Commands to know (`npm test`, `pscale branch create`)
- What NOT to do (known footguns in this codebase)

```markdown
# Project Standards
- Use 2-space indentation
- All API handlers in src/api/handlers/
- Run npm test before any commit
- Never use SELECT * in database queries
```

**CLAUDE.md is loaded every session** — keep it focused. Detailed workflows belong in skills; automatic enforcement belongs in hooks.

### How They Work Together (Example)

Session on a TypeScript API project:

1. **Session start** → CLAUDE.md loaded (project structure, conventions, commands)
2. **`SessionStart` hook** → reloads `.env` variables
3. User asks to "build a new user endpoint"
4. **Auto-detect** → `/api-design-principles` skill triggers (keyword match on "endpoint")
5. Claude writes the code
6. **`PostToolUse` hook** → prettier auto-formats the new file
7. User says `/create-pr`
8. **Skill with `disable-model-invocation: true`** → Claude packages work into a PR

### Common Mistakes

| Mistake | Fix |
|---------|-----|
| Putting every project detail in CLAUDE.md | Move reusable workflows to skills; move automatic rules to hooks |
| Using a skill for something that must always happen | Use a hook instead — Claude can ignore skills |
| Using a hook for something that depends on context | Use a skill — hooks don't adapt |
| Not setting `disable-model-invocation: true` on deploy skills | Claude might auto-deploy unexpectedly |
| Writing skills without testing auto-invocation | Verify description triggers correctly, then refine |

## Key Takeaways

- Skills are **intelligent and optional** — great for capabilities, bad for enforcement
- Hooks are **dumb and reliable** — perfect for "this must always happen"
- CLAUDE.md is **ambient context** — for things Claude should always know, not always do
- The best setups use all three: CLAUDE.md for context, hooks for enforcement, skills for capability

## Related

- [[overview]] — skill ecosystem and locations
- [[skill-anatomy]] — SKILL.md format and frontmatter reference
- [[top-10-skills-2026]] — real-world skill examples

---
*Source: research (official Claude Code docs) | Compiled: 2026-04-07*

---

## 한국어 번역

# 스킬 vs 훅 vs CLAUDE.md

> Claude Code의 동작을 형성하는 세 가지 메커니즘 — 각각 고유한 목적이 있음. 어느 것을 선택할지 알면 과잉 엔지니어링을 방지.

## 개요

- **스킬**: Claude에게 새로운 기능 가르치기; 온디맨드 또는 자동 실행
- **훅**: 생명주기 이벤트에서 결정론적 규칙 적용; 항상 실행
- **CLAUDE.md**: 지속적인 세션 지침; 시작 시 로드
- 이것들은 대안이 아니라 상호 보완적 — 프로덕션 설정은 세 가지 모두 사용

## 세부 내용

### 비교 표

| 차원 | 스킬 | 훅 | CLAUDE.md |
|-----------|--------|-------|-----------|
| **무엇인가** | SKILL.md 지침 파일 | 생명주기 이벤트의 셸 명령 | 마크다운 지침 파일 |
| **트리거** | 사용자가 `/skill` 호출 또는 Claude가 자동 감지 | 결정론적: 사전/사후 도구, 세션 시작, 권한 요청 | 세션 시작 (항상) |
| **제어** | LLM 주도 — Claude가 관련성 결정 | 결정론적 — 조건 일치 시 항상 실행 | 항상 컨텍스트에 주입 |
| **범위** | 호출 시 로드, 서브에이전트로 포크 가능 | settings.json에서 설정, 글로벌 또는 프로젝트 | 글로벌, 프로젝트 또는 디렉토리 수준 |
| **최적 용도** | 기능 확장, 슬래시 명령, 도메인 지식 | 자동화, 적용, 항상 발생하는 부작용 | 프로젝트 표준, 아키텍처, 지속적 컨텍스트 |
| **Claude가 우회할 수 있나?** | 예 (관련성 결정) | 아니요 (셸 명령이 관계없이 실행) | 해당 없음 (읽는 텍스트일 뿐) |
| **설정 위치** | `~/.claude/skills/` 또는 `.claude/skills/` | `settings.json` | CLAUDE.md 파일 |

### 스킬을 사용할 때

Claude가 지식을 **지능적으로 적용하도록** 하거나 **슬래시 명령**을 원할 때 스킬 사용:

- 도메인 특화 패턴: `/api-design-principles`
- 재사용 가능한 워크플로우: `/create-pr`, `/deploy`, `/pentest`
- 감지 시 활성화되는 백그라운드 컨텍스트: 레거시 시스템 문서, 코딩 규칙
- 작업 유형에 따라 달라지는 기능: UI 빌드 시 `/frontend-design`

### 훅을 사용할 때

**Claude의 판단에 관계없이 항상 일어나야** 하는 것에 훅 사용:

- 모든 편집 후 코드 형식화: `PostToolUse`의 `Edit|Write` → prettier 실행
- 저장 시 린트: `PostToolUse` → eslint 실행
- 작업 완료 시 알림: `Stop` → Slack 메시지 전송
- 비밀 스캔 적용: `Write`의 `PreToolUse` → 비밀 감지 시 차단

Claude는 이것을 우회할 수 없음. Edit 또는 Write 도구가 사용될 때마다 실행.

### CLAUDE.md를 사용할 때

**항상 범위에 있어야 하는 지속적인 컨텍스트**에 CLAUDE.md 사용:

- 프로젝트 아키텍처 개요
- 코딩 표준 및 스타일 규칙
- 파일 구조 규칙
- 알아야 할 명령어 (`npm test`, `pscale branch create`)
- 하지 말아야 할 것 (이 코드베이스에서 알려진 함정)

**CLAUDE.md는 모든 세션에 로드됨** — 집중 유지. 상세한 워크플로우는 스킬에; 자동 적용은 훅에.

### 함께 작동하는 방식 (예시)

TypeScript API 프로젝트의 세션:

1. **세션 시작** → CLAUDE.md 로드 (프로젝트 구조, 규칙, 명령어)
2. **`SessionStart` 훅** → `.env` 변수 재로드
3. 사용자가 "새로운 사용자 엔드포인트 만들기" 요청
4. **자동 감지** → `/api-design-principles` 스킬 실행 ("endpoint" 키워드 일치)
5. Claude가 코드 작성
6. **`PostToolUse` 훅** → prettier가 새 파일 자동 형식화
7. 사용자가 `/create-pr` 입력
8. **`disable-model-invocation: true`인 스킬** → Claude가 작업을 PR로 패키징

### 흔한 실수

| 실수 | 수정 |
|---------|-----|
| 모든 프로젝트 세부사항을 CLAUDE.md에 넣기 | 재사용 가능한 워크플로우는 스킬로; 자동 규칙은 훅으로 이동 |
| 항상 일어나야 하는 것에 스킬 사용 | 훅 사용 — Claude는 스킬을 무시할 수 있음 |
| 컨텍스트에 따라 달라지는 것에 훅 사용 | 스킬 사용 — 훅은 적응하지 않음 |
| 배포 스킬에 `disable-model-invocation: true` 설정 안 함 | Claude가 예상치 못하게 자동 배포할 수 있음 |
| 자동 호출 테스트 없이 스킬 작성 | 설명이 올바르게 트리거되는지 확인 후 개선 |

## 핵심 시사점

- 스킬은 **지능적이고 선택적** — 기능에 좋고, 적용에 나쁨
- 훅은 **단순하고 신뢰할 수 있음** — "이것은 항상 일어나야 함"에 완벽
- CLAUDE.md는 **주변 컨텍스트** — Claude가 항상 알아야 하는 것이지, 항상 해야 하는 것이 아님
- 최고의 설정은 세 가지 모두 사용: CLAUDE.md는 컨텍스트에, 훅은 적용에, 스킬은 기능에

## 관련 항목

- [[overview]] — 스킬 생태계 및 위치
- [[skill-anatomy]] — SKILL.md 형식 및 프론트매터 레퍼런스
- [[top-10-skills-2026]] — 실제 스킬 예시

---
*출처: 연구 (공식 Claude Code 문서) | 편집: 2026-04-07*
