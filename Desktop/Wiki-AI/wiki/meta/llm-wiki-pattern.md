# LLM Wiki Pattern

> A method for building a personal knowledge base where an LLM incrementally writes and maintains a structured wiki, rather than answering from raw documents each time.

## Overview

- **The problem with RAG**: LLMs re-derive answers from raw docs on every query — no accumulation, no synthesis
- **The alternative**: LLM builds a persistent, compounding wiki as sources come in — cross-references pre-built, contradictions pre-flagged
- **Division of labor**: human curates sources and asks questions; LLM does all bookkeeping, summarizing, cross-referencing
- **Tooling**: LLM agent + Obsidian side-by-side — "Obsidian is the IDE, the LLM is the programmer, the wiki is the codebase"
- **Why wikis fail**: maintenance burden grows faster than value; LLMs don't get bored or forget to update a cross-reference

## Detail

### Three Layers

- **raw/** — immutable source documents; LLM reads but never edits
- **wiki/** — LLM-generated markdown; LLM owns entirely
- **schema (CLAUDE.md)** — configuration file co-evolved by human + LLM; defines conventions and workflows

### Three Operations

- **Ingest**: drop source in raw/ → LLM reads, extracts, writes article, updates 10-15 wiki pages, logs entry
- **Query**: ask question → LLM reads index + relevant pages → synthesizes answer with citations → valuable answers get filed back into wiki
- **Lint**: periodic health-check → find contradictions, orphan pages, stale claims, missing cross-references

### Navigation Infrastructure

- **index.md**: content catalog — every page, one-line summary, metadata; read first when searching
- **log.md**: append-only chronological log — `## [YYYY-MM-DD] operation | title`; parseable with grep

### Use Cases

- Personal: goals, health, psychology, journal entries
- Research: going deep on a topic over weeks/months
- Book reading: characters, themes, plot threads per chapter
- Team/business: fed by Slack, meeting transcripts, project docs
- Competitive analysis, due diligence, trip planning, course notes

### Tooling Options

- **Obsidian Web Clipper**: converts web articles to markdown for raw/
- **Marp**: markdown slide decks (Obsidian plugin)
- **Dataview**: query YAML frontmatter in Obsidian
- **qmd**: local markdown search engine with BM25/vector hybrid + LLM reranking; has CLI and MCP server
- **Git**: the wiki is just a repo — version history for free

## Key Takeaways

- The wiki is a **persistent, compounding artifact** — not a retrieval index but a maintained synthesis
- Humans abandon wikis because maintenance is tedious; LLMs make the cost near-zero
- Good query answers should be **filed back** into the wiki — explorations compound just like ingested sources
- The schema (CLAUDE.md) is what makes the LLM a disciplined librarian, not a generic chatbot; co-evolve it
- Related in spirit to Vannevar Bush's **Memex** (1945) — associative trails between documents, privately curated

## Related

- [[meta/_index]] — this topic's index
- [[llm-wiki-pattern]] — you are here

---
*Source: raw/llm-wiki-idea.md | Compiled: 2026-04-07*

---

## 한국어 번역

# LLM 위키 패턴

> LLM이 원본 문서에서 매번 답을 도출하는 대신, 구조화된 위키를 점진적으로 작성하고 유지하는 개인 지식베이스 구축 방법.

## 개요

- **RAG의 문제점**: LLM이 모든 쿼리마다 원시 문서에서 답을 다시 도출함 — 축적도 없고 합성도 없음
- **대안**: LLM이 소스가 들어올 때마다 지속적이고 복리로 성장하는 위키를 구축 — 교차 참조가 미리 구성되고, 모순이 미리 표시됨
- **역할 분담**: 사람이 소스를 큐레이팅하고 질문하면; LLM이 모든 장부 관리, 요약, 교차 참조를 수행
- **도구**: LLM 에이전트 + Obsidian 나란히 — "Obsidian은 IDE, LLM은 프로그래머, 위키는 코드베이스"
- **위키가 실패하는 이유**: 유지보수 부담이 가치보다 빠르게 커짐; LLM은 지루해하지 않고 교차 참조 업데이트를 잊지 않음

## 세부 내용

### 세 가지 레이어

- **raw/** — 변경 불가능한 원본 문서; LLM은 읽기만 하고 수정하지 않음
- **wiki/** — LLM이 생성한 마크다운; LLM이 전적으로 소유
- **스키마 (CLAUDE.md)** — 사람 + LLM이 공동으로 발전시키는 설정 파일; 규칙과 워크플로우를 정의

### 세 가지 운영 방식

- **수집(Ingest)**: raw/에 소스 투입 → LLM이 읽고, 추출하고, 글을 쓰고, 10-15개 위키 페이지를 업데이트하고, 로그 항목 추가
- **쿼리(Query)**: 질문 → LLM이 색인 + 관련 페이지를 읽음 → 인용과 함께 답변 합성 → 가치 있는 답변은 위키에 다시 등록
- **점검(Lint)**: 주기적 상태 점검 → 모순, 고아 페이지, 오래된 주장, 누락된 교차 참조 찾기

### 탐색 인프라

- **index.md**: 콘텐츠 카탈로그 — 모든 페이지, 한 줄 요약, 메타데이터; 검색 시 먼저 읽기
- **log.md**: 추가 전용 시간순 로그 — `## [YYYY-MM-DD] 작업 | 제목`; grep으로 파싱 가능

### 사용 사례

- 개인: 목표, 건강, 심리, 일기 항목
- 연구: 몇 주/개월에 걸쳐 주제를 깊이 파고들기
- 도서 읽기: 챕터별 등장인물, 주제, 줄거리 실마리
- 팀/기업: Slack, 회의록, 프로젝트 문서로 구동
- 경쟁 분석, 실사, 여행 계획, 강의 노트

### 도구 옵션

- **Obsidian Web Clipper**: 웹 기사를 raw/용 마크다운으로 변환
- **Marp**: 마크다운 슬라이드 덱 (Obsidian 플러그인)
- **Dataview**: Obsidian에서 YAML 프론트매터 쿼리
- **qmd**: BM25/벡터 하이브리드 + LLM 재순위화가 있는 로컬 마크다운 검색 엔진; CLI와 MCP 서버 모두 제공
- **Git**: 위키는 단순한 저장소 — 버전 기록이 무료로 제공

## 핵심 시사점

- 위키는 **지속적이고 복리로 성장하는 산출물** — 검색 색인이 아니라 유지되는 합성물
- 사람들이 위키를 포기하는 이유는 유지보수가 지루하기 때문; LLM은 그 비용을 거의 0에 가깝게 만듦
- 좋은 쿼리 답변은 위키에 **다시 등록**되어야 함 — 탐색도 수집된 소스처럼 복리로 쌓임
- 스키마(CLAUDE.md)는 LLM을 일반 챗봇이 아닌 규율 있는 사서로 만드는 것; 함께 발전시킬 것
- 정신적으로 Vannevar Bush의 **Memex**(1945)와 유사 — 문서 간 연상적 흔적, 개인적으로 큐레이팅

## 관련 항목

- [[meta/_index]] — 이 주제의 색인
- [[llm-wiki-pattern]] — 현재 페이지

---
*출처: raw/llm-wiki-idea.md | 편집: 2026-04-07*
