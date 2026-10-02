# Obsidian + Claude Code as a Knowledge Base (Karpathy Pattern)

> A lightweight alternative to RAG: use Claude Code as a wiki librarian maintaining structured markdown in an Obsidian vault — no embeddings, no vector database.

## Overview

- Popularized by Andrej Karpathy (April 2026) — tweet describing his personal Obsidian system
- Core insight: a well-structured file system with index files lets Claude navigate large document collections without expensive retrieval infrastructure
- Claude Code navigates markdown the same way humans do — this wiki you're reading is an implementation of this pattern
- "Obsidian is the IDE; the LLM is the programmer; the wiki is the codebase"

## Detail

### Why This Works Instead of RAG

| RAG | Obsidian + Claude Code |
|-----|----------------------|
| Re-derives knowledge from raw docs on every query | Compiles knowledge once into maintained wiki |
| Embeddings + vector DB required | Just markdown files |
| Black box — hard to inspect retrieval | Transparent — you can read every file |
| Scales to millions of docs | Sweet spot: solo/small team, hundreds of docs |
| Expensive setup | Free, local, instant |

**The insight:** LLMs are good at auto-maintaining index files and brief document summaries. Index files + CLAUDE.md rules = LLM-navigable knowledge graph, no search engine required.

### The Three-Layer Architecture

```
vault/
├── CLAUDE.md          ← rules for the LLM librarian (the schema)
├── raw/               ← immutable source documents (your inbox)
│   └── assets/        ← locally downloaded images
├── wiki/              ← LLM-maintained wiki (the output)
│   ├── _master-index.md   ← topic table
│   ├── index.md           ← content catalog
│   ├── log.md             ← append-only operation log
│   └── <topic>/           ← one folder per topic
│       ├── _index.md      ← topic article list
│       └── *.md           ← wiki articles
└── output/            ← generated reports, query results
```

### The Four Operations

**Ingest ("compile"):**
- Drop source in `raw/`
- Say "compile" to Claude Code
- Claude reads source → decides topic → writes article → updates indexes → appends to log
- One source can touch 10-15 wiki pages (cross-links, entity pages, topic updates)

**Query:**
- Ask any question
- Claude reads `_master-index.md` → relevant `_index.md` → specific articles
- Synthesizes answer with `[[wiki links]]` citations
- Valuable answers can be filed back into wiki or `output/`

**Lint/Audit:**
- Say "lint" or "audit"
- Claude checks for orphan pages, broken links, contradictions, stale claims, gaps
- Returns actionable checklist

**Grow:**
- As wiki grows, it gets richer per query — not slower
- Cross-references pre-built; contradictions pre-flagged; synthesis already reflects everything ingested

### Tooling Setup

**Obsidian Web Clipper** — Chrome extension that converts web pages to markdown, sends to `raw/` automatically:
- Set note location to `raw/` in clipper settings
- Clips include title, source URL, and full article markdown

**Local Images Plus** (Obsidian community plugin) — downloads image attachments locally:
- Configure attachment path to `raw/assets/`
- Bind hotkey to "Download attachments for current file"
- Makes images readable by Claude Code (read text first, then view images separately)

**Obsidian Graph View** — best way to see wiki structure:
- Hub pages (many inbound links) = well-developed topics
- Orphan pages = gaps or dead-ends needing integration
- Cluster density = topic maturity

**Optional: qmd** — local markdown search for large wikis:
- Hybrid BM25/vector search with LLM reranking
- Has both CLI (Claude can shell out) and MCP server (native tool use)
- Not needed until index.md approach hits its limits (~hundreds of articles)

### When to Use True RAG Instead

Use RAG when:
- Scaling to thousands or millions of documents
- Multiple users querying simultaneously
- Need sub-second retrieval at scale
- Documents are unstructured and don't benefit from wiki organization

Stay with Obsidian when:
- Solo operator or small team
- Hundreds of documents, not thousands
- You want to browse and understand the knowledge base yourself
- Setup time matters

**The pragmatic answer:** Start with Obsidian. If it clearly stops working, move to RAG. Most people never need to make that switch.

### CLAUDE.md as the Schema

The CLAUDE.md file is what transforms Claude Code from a generic chatbot into a disciplined wiki librarian:
- Defines directory conventions
- Specifies article format (including required sections)
- Documents the three operations (ingest/query/lint)
- Sets linking rules
- Describes the index and log files

This file is co-evolved between human and LLM as you discover what works for your domain. See [[meta/llm-wiki-pattern]] for the full pattern description.

## Key Takeaways

- A well-structured index file + CLAUDE.md rules ≈ a lightweight RAG system for most use cases
- The wiki is a **compounding artifact** — richer with every source, not re-derived every query
- Obsidian provides a human-readable frontend; Claude Code provides the maintenance layer
- Index files (`_master-index.md`, `index.md`) are the navigation backbone — keep them up to date
- This very wiki is an implementation: you're reading what Claude Code compiles and maintains

## Related

- [[overview]] — Claude Code skills ecosystem (how skills extend this workflow)
- [[skills-vs-hooks-vs-claude-md]] — the CLAUDE.md schema mechanism explained
- [[meta/llm-wiki-pattern]] — the full LLM Wiki pattern that underpins this vault

---
*Source: raw/Karpathy's Obsidian RAG + Claude Code = CHEAT CODE.md | Compiled: 2026-04-07*

---

## 한국어 번역

# Obsidian + Claude Code를 지식베이스로 (Karpathy 패턴)

> RAG의 가벼운 대안: Claude Code를 Obsidian 볼트의 구조화된 마크다운을 유지하는 위키 사서로 사용 — 임베딩 없음, 벡터 데이터베이스 없음.

## 개요

- Andrej Karpathy에 의해 대중화됨 (2026년 4월) — 그의 개인 Obsidian 시스템을 설명한 트윗
- 핵심 통찰: 색인 파일이 있는 잘 구조화된 파일 시스템이 Claude로 하여금 비싼 검색 인프라 없이 대용량 문서 컬렉션을 탐색하게 함
- Claude Code는 사람이 마크다운을 탐색하는 것처럼 탐색함 — 지금 읽고 있는 이 위키가 이 패턴의 구현
- "Obsidian은 IDE; LLM은 프로그래머; 위키는 코드베이스"

## 세부 내용

### RAG 대신 이것이 작동하는 이유

| RAG | Obsidian + Claude Code |
|-----|----------------------|
| 모든 쿼리마다 원시 문서에서 지식 재도출 | 지식을 유지되는 위키로 한 번만 컴파일 |
| 임베딩 + 벡터 DB 필요 | 마크다운 파일만 필요 |
| 블랙박스 — 검색 검사 어려움 | 투명 — 모든 파일 직접 읽기 가능 |
| 수백만 문서까지 확장 | 최적 지점: 개인/소규모 팀, 수백 문서 |
| 비싼 설정 | 무료, 로컬, 즉각적 |

**통찰:** LLM은 색인 파일과 간략한 문서 요약을 자동 유지하는 데 능숙함. 색인 파일 + CLAUDE.md 규칙 = LLM이 탐색 가능한 지식 그래프, 검색 엔진 불필요.

### 세 가지 레이어 아키텍처

```
vault/
├── CLAUDE.md          ← LLM 사서를 위한 규칙 (스키마)
├── raw/               ← 변경 불가능한 원본 문서 (받은 편지함)
│   └── assets/        ← 로컬에 다운로드된 이미지
├── wiki/              ← LLM이 유지하는 위키 (출력)
│   ├── _master-index.md   ← 주제 표
│   ├── index.md           ← 콘텐츠 카탈로그
│   ├── log.md             ← 추가 전용 작업 로그
│   └── <topic>/           ← 주제별 폴더
│       ├── _index.md      ← 주제 글 목록
│       └── *.md           ← 위키 글
└── output/            ← 생성된 보고서, 쿼리 결과
```

### 네 가지 운영 방식

**수집 ("compile"):**
- `raw/`에 소스 투입
- Claude Code에 "compile" 말하기
- Claude가 소스 읽기 → 주제 결정 → 글 작성 → 색인 업데이트 → 로그에 추가
- 하나의 소스가 10-15개 위키 페이지에 영향 (교차 링크, 엔티티 페이지, 주제 업데이트)

**쿼리:**
- 질문 입력
- Claude가 `_master-index.md` → 관련 `_index.md` → 특정 글 읽기
- `[[wiki links]]` 인용과 함께 답변 합성
- 가치 있는 답변은 위키나 `output/`에 다시 등록 가능

**점검/감사:**
- "lint" 또는 "audit" 입력
- Claude가 고아 페이지, 깨진 링크, 모순, 오래된 주장, 격차 확인
- 실행 가능한 체크리스트 반환

**성장:**
- 위키가 성장할수록 쿼리당 더 풍부해짐 — 느려지지 않음
- 교차 참조가 미리 구성됨; 모순이 미리 표시됨; 합성이 이미 수집된 모든 것을 반영

### 도구 설정

**Obsidian Web Clipper** — 웹 페이지를 마크다운으로 변환하고 `raw/`에 자동으로 전송하는 Chrome 확장:
- 클리퍼 설정에서 노트 위치를 `raw/`로 설정
- 클립에는 제목, 소스 URL, 전체 글 마크다운 포함

**Local Images Plus** (Obsidian 커뮤니티 플러그인) — 이미지 첨부파일을 로컬에 다운로드:
- 첨부파일 경로를 `raw/assets/`로 설정
- "현재 파일의 첨부파일 다운로드" 단축키 바인딩

**Obsidian 그래프 뷰** — 위키 구조 확인 최적 방법:
- 허브 페이지 (많은 인바운드 링크) = 잘 개발된 주제
- 고아 페이지 = 통합이 필요한 격차나 막다른 골목
- 클러스터 밀도 = 주제 성숙도

**선택사항: qmd** — 대형 위키용 로컬 마크다운 검색:
- BM25/벡터 하이브리드 검색 및 LLM 재순위화
- CLI (Claude가 셸 아웃 가능)와 MCP 서버 (네이티브 도구 사용) 모두 제공
- index.md 접근 방식이 한계에 도달할 때까지 (~수백 개 글) 불필요

### 진정한 RAG를 사용해야 할 때

RAG 사용 시:
- 수천 또는 수백만 문서로 확장 시
- 여러 사용자가 동시에 쿼리 시
- 대규모에서 초고속 검색 필요 시
- 문서가 구조화되지 않아 위키 조직의 이점이 없을 때

Obsidian 유지 시:
- 개인 운영자 또는 소규모 팀
- 수천이 아닌 수백 문서
- 지식베이스를 직접 탐색하고 이해하고 싶을 때
- 설정 시간이 중요할 때

**실용적인 답변:** Obsidian으로 시작. 명확히 작동하지 않으면 RAG로 이동. 대부분은 그 전환이 필요 없음.

### 스키마로서의 CLAUDE.md

CLAUDE.md 파일이 Claude Code를 일반 챗봇에서 규율 있는 위키 사서로 변환:
- 디렉토리 규칙 정의
- 글 형식 지정 (필수 섹션 포함)
- 세 가지 운영 방식 문서화 (수집/쿼리/점검)
- 링크 규칙 설정
- 색인 및 로그 파일 설명

이 파일은 도메인에 맞는 것이 무엇인지 발견하면서 사람과 LLM이 공동으로 발전시킴. 전체 패턴 설명은 [[meta/llm-wiki-pattern]] 참고.

## 핵심 시사점

- 잘 구조화된 색인 파일 + CLAUDE.md 규칙 ≈ 대부분의 사용 사례를 위한 경량 RAG 시스템
- 위키는 **복리로 성장하는 산출물** — 모든 소스마다 더 풍부해지고, 모든 쿼리마다 재도출하지 않음
- Obsidian은 사람이 읽을 수 있는 프론트엔드를 제공; Claude Code는 유지 관리 레이어를 제공
- 색인 파일 (`_master-index.md`, `index.md`)이 탐색의 근간 — 최신 상태 유지
- 이 위키 자체가 구현: Claude Code가 컴파일하고 유지하는 것을 읽고 있음

## 관련 항목

- [[overview]] — Claude Code 스킬 생태계 (스킬이 이 워크플로우를 확장하는 방법)
- [[skills-vs-hooks-vs-claude-md]] — CLAUDE.md 스키마 메커니즘 설명
- [[meta/llm-wiki-pattern]] — 이 볼트를 뒷받침하는 전체 LLM 위키 패턴

---
*출처: raw/Karpathy's Obsidian RAG + Claude Code = CHEAT CODE.md | 편집: 2026-04-07*
