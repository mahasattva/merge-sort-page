# Skill Anatomy — SKILL.md Format & Configuration

> Everything you need to write a complete SKILL.md file: structure, frontmatter fields, string substitutions, and advanced patterns.

## Overview

- Every skill lives in a named directory with a required `SKILL.md` entrypoint
- Frontmatter is optional but unlocks control over invocation, tools, and scope
- Supporting files (templates, examples, scripts) live alongside SKILL.md
- Keep SKILL.md under 500 lines — move detailed reference to supporting files

## Detail

### Minimal Skill Structure

```
~/.claude/skills/my-skill/
├── SKILL.md           ← required entrypoint
├── reference.md       ← optional supporting content
├── examples/
│   └── sample.md
└── scripts/
    └── helper.sh
```

### SKILL.md Template

```markdown
---
name: my-skill
description: What this skill does. Use when [situation]. Max 250 chars.
argument-hint: [optional-arg]
disable-model-invocation: false
user-invocable: true
allowed-tools: Read Grep Glob
---

Your skill instructions here.

Use $ARGUMENTS to reference what the user passed.
```

### All Frontmatter Fields

| Field | Type | Default | Purpose |
|-------|------|---------|---------|
| `name` | string | directory name | Slash command name (kebab-case, max 64 chars) |
| `description` | string | — | When/why to use — Claude reads this to decide auto-invocation |
| `argument-hint` | string | — | Autocomplete hint: `[issue-number]`, `[file] [format]` |
| `disable-model-invocation` | bool | false | If true: only user can invoke (no auto) — use for side effects |
| `user-invocable` | bool | true | If false: only Claude can invoke — use for background knowledge |
| `allowed-tools` | string/list | all | Tools Claude can use without confirmation: `Read Grep Glob`, `Bash(git *)` |
| `model` | string | session default | Override model when skill is active |
| `effort` | string | session default | `low`, `medium`, `high`, `max` |
| `context` | string | — | Set `fork` to run in isolated subagent context |
| `agent` | string | general-purpose | Which subagent when `context: fork` — `Explore`, `Plan`, etc. |
| `paths` | string/list | — | Glob patterns limiting auto-activation scope |
| `shell` | string | bash | `bash` or `powershell` |
| `hooks` | object | — | Event handlers scoped to this skill |

### String Substitutions

| Variable | Description |
|----------|-------------|
| `$ARGUMENTS` | All arguments passed to skill |
| `$ARGUMENTS[N]` | Nth argument (0-based) |
| `$N` | Shorthand for `$ARGUMENTS[N]` |
| `${CLAUDE_SESSION_ID}` | Current session ID |
| `${CLAUDE_SKILL_DIR}` | Directory containing SKILL.md |

If `$ARGUMENTS` is not in the skill body, Claude appends `ARGUMENTS: <input>` automatically.

### Dynamic Context Injection

Run shell commands inline — output replaces the placeholder before Claude sees the skill:

```markdown
## Current project state
- Git status: !`git status --short`
- PR details: !`gh pr view --comments`

## Your task
Review the above and...
```

Multi-line commands use fenced blocks:
````markdown
```!
node --version
npm --version
git log --oneline -5
```
````

### Invocation Control Matrix

| Frontmatter | User can invoke | Claude can auto-invoke | Use for |
|---|---|---|---|
| (default) | Yes | Yes | Most skills |
| `disable-model-invocation: true` | Yes | No | `/deploy`, `/pentest`, anything with side effects |
| `user-invocable: false` | No | Yes | Background context (legacy systems, domain knowledge) |

### Subagent Fork Pattern

```yaml
---
name: deep-research
context: fork
agent: Explore
---

Research $ARGUMENTS:
1. Find relevant files
2. Analyze and summarize
3. Return findings with file references
```

- Runs in isolated context window — no conversation history
- Result summarized and returned to main session
- Use for large investigations that would bloat main context

### Tool Restriction Examples

```yaml
# Read-only skill
allowed-tools: Read Grep Glob

# Git and test only
allowed-tools: Bash(git *) Bash(npm test)

# MCP tools
allowed-tools: mcp__github__get_pull_request mcp__github__search
```

### Description Writing Tips

- Front-load key use cases — first 250 chars show in listings
- Include natural language keywords users would say ("optimize", "slow code", "performance")
- Too vague → triggers too often; too specific → never auto-invokes
- Use `paths` to scope to specific file types: `paths: "src/api/**/*.ts"`

## Key Takeaways

- `disable-model-invocation: true` is the safety switch for skills with side effects
- Dynamic injection (`!`command``) turns SKILL.md into a live-context document
- `context: fork` isolates heavy research in a fresh context window
- `allowed-tools` is the principle of least privilege for skills
- Description quality determines auto-invocation quality — write it last, after the skill works

## Related

- [[overview]] — skill ecosystem, locations, installation
- [[top-10-skills-2026]] — real-world examples of well-designed skills
- [[skills-vs-hooks-vs-claude-md]] — when skills vs hooks vs CLAUDE.md

---
*Source: research (official Claude Code docs) | Compiled: 2026-04-07*

---

## 한국어 번역

# 스킬 해부학 — SKILL.md 형식 및 설정

> 완전한 SKILL.md 파일을 작성하는 데 필요한 모든 것: 구조, 프론트매터 필드, 문자열 치환, 고급 패턴.

## 개요

- 모든 스킬은 필수 `SKILL.md` 진입점이 있는 이름 붙은 디렉토리에 위치
- 프론트매터는 선택 사항이지만 호출, 도구, 범위에 대한 제어를 가능하게 함
- 지원 파일(템플릿, 예시, 스크립트)은 SKILL.md 옆에 위치
- SKILL.md는 500줄 이하로 유지 — 상세 레퍼런스는 지원 파일로 이동

## 세부 내용

### 최소 스킬 구조

```
~/.claude/skills/my-skill/
├── SKILL.md           ← 필수 진입점
├── reference.md       ← 선택적 지원 콘텐츠
├── examples/
│   └── sample.md
└── scripts/
    └── helper.sh
```

### SKILL.md 템플릿

```markdown
---
name: my-skill
description: 이 스킬이 하는 일. [상황]에서 사용. 최대 250자.
argument-hint: [optional-arg]
disable-model-invocation: false
user-invocable: true
allowed-tools: Read Grep Glob
---

스킬 지침을 여기에 작성.

$ARGUMENTS를 사용하여 사용자가 전달한 내용을 참조.
```

### 모든 프론트매터 필드

| 필드 | 유형 | 기본값 | 목적 |
|-------|------|---------|---------|
| `name` | 문자열 | 디렉토리 이름 | 슬래시 명령 이름 (kebab-case, 최대 64자) |
| `description` | 문자열 | — | 언제/왜 사용하는지 — Claude가 자동 호출 결정 시 읽음 |
| `argument-hint` | 문자열 | — | 자동완성 힌트: `[issue-number]`, `[file] [format]` |
| `disable-model-invocation` | bool | false | true이면: 사용자만 호출 가능 (자동 없음) — 부작용에 사용 |
| `user-invocable` | bool | true | false이면: Claude만 호출 가능 — 백그라운드 지식에 사용 |
| `allowed-tools` | 문자열/목록 | 전체 | 확인 없이 Claude가 사용 가능한 도구: `Read Grep Glob`, `Bash(git *)` |
| `model` | 문자열 | 세션 기본값 | 스킬 활성 시 모델 재정의 |
| `effort` | 문자열 | 세션 기본값 | `low`, `medium`, `high`, `max` |
| `context` | 문자열 | — | `fork`로 설정하면 격리된 서브에이전트 컨텍스트에서 실행 |
| `agent` | 문자열 | general-purpose | `context: fork` 시 사용할 서브에이전트 — `Explore`, `Plan` 등 |
| `paths` | 문자열/목록 | — | 자동 활성화 범위를 제한하는 Glob 패턴 |
| `shell` | 문자열 | bash | `bash` 또는 `powershell` |
| `hooks` | 객체 | — | 이 스킬로 범위가 제한된 이벤트 핸들러 |

### 문자열 치환

| 변수 | 설명 |
|----------|-------------|
| `$ARGUMENTS` | 스킬에 전달된 모든 인수 |
| `$ARGUMENTS[N]` | N번째 인수 (0부터 시작) |
| `$N` | `$ARGUMENTS[N]`의 단축형 |
| `${CLAUDE_SESSION_ID}` | 현재 세션 ID |
| `${CLAUDE_SKILL_DIR}` | SKILL.md가 포함된 디렉토리 |

스킬 본문에 `$ARGUMENTS`가 없으면 Claude가 자동으로 `ARGUMENTS: <input>`을 추가.

### 동적 컨텍스트 주입

셸 명령을 인라인으로 실행 — Claude가 스킬을 보기 전에 출력이 자리 표시자를 대체:

```markdown
## 현재 프로젝트 상태
- Git 상태: !`git status --short`
- PR 세부 사항: !`gh pr view --comments`

## 작업
위 내용을 검토하고...
```

### 호출 제어 매트릭스

| 프론트매터 | 사용자 호출 가능 | Claude 자동 호출 가능 | 용도 |
|---|---|---|---|
| (기본값) | 예 | 예 | 대부분의 스킬 |
| `disable-model-invocation: true` | 예 | 아니요 | `/deploy`, `/pentest`, 부작용이 있는 모든 것 |
| `user-invocable: false` | 아니요 | 예 | 백그라운드 컨텍스트 (레거시 시스템, 도메인 지식) |

### 서브에이전트 포크 패턴

```yaml
---
name: deep-research
context: fork
agent: Explore
---

$ARGUMENTS 조사:
1. 관련 파일 찾기
2. 분석 및 요약
3. 파일 참조와 함께 결과 반환
```

- 격리된 컨텍스트 창에서 실행 — 대화 기록 없음
- 결과가 요약되어 메인 세션으로 반환됨
- 메인 컨텍스트를 비대하게 만들 수 있는 대규모 조사에 사용

## 핵심 시사점

- `disable-model-invocation: true`는 부작용이 있는 스킬의 안전 스위치
- 동적 주입(`!`command``)은 SKILL.md를 실시간 컨텍스트 문서로 변환
- `context: fork`는 무거운 연구를 새로운 컨텍스트 창에 격리
- `allowed-tools`는 스킬을 위한 최소 권한 원칙
- 설명 품질이 자동 호출 품질을 결정 — 스킬이 작동한 후 마지막에 작성

## 관련 항목

- [[overview]] — 스킬 생태계, 위치, 설치
- [[top-10-skills-2026]] — 잘 설계된 스킬의 실제 예시
- [[skills-vs-hooks-vs-claude-md]] — 스킬 vs 훅 vs CLAUDE.md 사용 시점

---
*출처: 연구 (공식 Claude Code 문서) | 편집: 2026-04-07*
