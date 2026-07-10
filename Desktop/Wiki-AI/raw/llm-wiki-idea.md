# LLM Wiki
*A pattern for building personal knowledge bases using LLMs.*

Source: pasted by user on 2026-04-07

---

## The core idea

Most people's experience with LLMs and documents looks like RAG: you upload a collection of files, the LLM retrieves relevant chunks at query time, and generates an answer. This works, but the LLM is rediscovering knowledge from scratch on every question. There's no accumulation. Ask a subtle question that requires synthesizing five documents, and the LLM has to find and piece together the relevant fragments every time. Nothing is built up. NotebookLM, ChatGPT file uploads, and most RAG systems work this way.

The idea here is different. Instead of just retrieving from raw documents at query time, the LLM incrementally builds and maintains a persistent wiki — a structured, interlinked collection of markdown files that sits between you and the raw sources. When you add a new source, the LLM doesn't just index it for later retrieval. It reads it, extracts the key information, and integrates it into the existing wiki — updating entity pages, revising topic summaries, noting where new data contradicts old claims, strengthening or challenging the evolving synthesis. The knowledge is compiled once and then kept current, not re-derived on every query.

This is the key difference: the wiki is a persistent, compounding artifact. The cross-references are already there. The contradictions have already been flagged. The synthesis already reflects everything you've read. The wiki keeps getting richer with every source you add and every question you ask.

You never (or rarely) write the wiki yourself — the LLM writes and maintains all of it. You're in charge of sourcing, exploration, and asking the right questions. The LLM does all the grunt work — the summarizing, cross-referencing, filing, and bookkeeping that makes a knowledge base actually useful over time. In practice, I have the LLM agent open on one side and Obsidian open on the other. The LLM makes edits based on our conversation, and I browse the results in real time — following links, checking the graph view, reading the updated pages. Obsidian is the IDE; the LLM is the programmer; the wiki is the codebase.

This can apply to a lot of different contexts. A few examples:

- Personal: tracking your own goals, health, psychology, self-improvement
- Research: going deep on a topic over weeks or months
- Reading a book: filing each chapter as you go, building out pages for characters, themes, plot threads
- Business/team: an internal wiki maintained by LLMs, fed by Slack threads, meeting transcripts, project documents
- Competitive analysis, due diligence, trip planning, course notes, hobby deep-dives

## Architecture

Three layers:

**Raw sources** — curated source documents. Articles, papers, images, data files. Immutable — the LLM reads from them but never modifies them.

**The wiki** — a directory of LLM-generated markdown files. Summaries, entity pages, concept pages, comparisons, an overview, a synthesis. The LLM owns this layer entirely.

**The schema** — a document (e.g. CLAUDE.md) that tells the LLM how the wiki is structured, what the conventions are, and what workflows to follow. This is the key configuration file. You and the LLM co-evolve this over time.

## Operations

**Ingest.** Drop a new source into raw/ and tell the LLM to process it. The LLM reads the source, discusses key takeaways, writes a summary page, updates the index, updates relevant entity and concept pages, and appends an entry to the log. A single source might touch 10-15 wiki pages.

**Query.** Ask questions against the wiki. The LLM searches for relevant pages, reads them, and synthesizes an answer with citations. Good answers can be filed back into the wiki as new pages.

**Lint.** Periodically ask the LLM to health-check the wiki. Look for: contradictions, stale claims, orphan pages, missing cross-references, data gaps.

## Indexing and logging

**index.md** is content-oriented. A catalog of everything in the wiki — each page listed with a link, a one-line summary, and metadata. The LLM updates it on every ingest.

**log.md** is chronological. An append-only record of what happened and when — ingests, queries, lint passes. Each entry starts with `## [YYYY-MM-DD] operation | title`.

## Optional: CLI tools

- **qmd**: local search engine for markdown files with hybrid BM25/vector search and LLM re-ranking. Has both a CLI and an MCP server.
- Custom search scripts can be vibe-coded as the need arises.

## Tips and tricks

- Obsidian Web Clipper: browser extension that converts web articles to markdown
- Download images locally via Obsidian's "Download attachments" command
- Obsidian graph view: best way to see wiki structure, hubs, orphans
- Marp: markdown-based slide deck format, Obsidian plugin available
- Dataview: Obsidian plugin for querying page frontmatter
- The wiki is just a git repo — version history and branching for free

## Why this works

The tedious part of maintaining a knowledge base is the bookkeeping. Humans abandon wikis because the maintenance burden grows faster than the value. LLMs don't get bored, don't forget to update a cross-reference, and can touch 15 files in one pass.

The human's job: curate sources, direct the analysis, ask good questions, think about what it all means.
The LLM's job: everything else.

Related in spirit to Vannevar Bush's Memex (1945) — a personal, curated knowledge store with associative trails between documents.

---

## 한국어 번역

# LLM 위키
*LLM을 사용하여 개인 지식 베이스를 구축하는 패턴.*

출처: 사용자가 2026-04-07에 붙여넣음

---

## 핵심 아이디어

LLM과 문서에 관한 대부분의 사람들의 경험은 RAG처럼 보인다: 파일 컬렉션을 업로드하면, LLM이 쿼리 시 관련 청크를 검색하고 답변을 생성한다. 이것은 작동하지만 LLM이 모든 질문마다 지식을 처음부터 재발견한다. 축적이 없다. 5개의 문서를 합성해야 하는 미묘한 질문을 하면, LLM은 매번 관련 조각을 찾아 맞춰야 한다. 구축되는 것이 없다. NotebookLM, ChatGPT 파일 업로드, 대부분의 RAG 시스템이 이렇게 작동한다.

여기서의 아이디어는 다르다. 쿼리 시 원시 문서에서 검색하는 대신, LLM이 점진적으로 지속적인 위키를 구축하고 유지한다 — 원시 소스와 당신 사이에 있는 구조화되고 상호 연결된 마크다운 파일 모음. 새로운 소스를 추가할 때, LLM은 나중에 검색하기 위해 단순히 색인하지 않는다. 읽고, 핵심 정보를 추출하고, 기존 위키에 통합한다 — 엔티티 페이지 업데이트, 주제 요약 수정, 새 데이터가 오래된 주장과 모순되는 곳 메모, 진화하는 합성을 강화하거나 도전. 지식이 한 번 컴파일되고 최신 상태로 유지되며, 모든 쿼리마다 재도출되지 않는다.

이것이 핵심 차이: 위키는 지속적이고 복리로 성장하는 산출물이다. 교차 참조가 이미 있다. 모순이 이미 표시되었다. 합성은 이미 읽은 모든 것을 반영한다. 위키는 추가하는 모든 소스와 묻는 모든 질문마다 더 풍부해진다.

당신은 위키를 직접 쓰지 않는다 — LLM이 전부를 쓰고 유지한다. 당신은 소싱, 탐색, 옳은 질문 묻기를 담당한다. LLM이 모든 단순 작업을 수행한다 — 요약, 교차 참조, 파일링, 시간이 지남에 따라 지식 베이스를 실제로 유용하게 만드는 장부 관리. 실제로, 나는 한쪽에 LLM 에이전트를 열고 다른 쪽에 Obsidian을 열어 둔다. LLM이 대화를 기반으로 편집을 하고, 나는 실시간으로 결과를 탐색한다 — 링크를 따라가고, 그래프 뷰를 확인하고, 업데이트된 페이지를 읽으면서. Obsidian은 IDE; LLM은 프로그래머; 위키는 코드베이스.

이것은 많은 다양한 맥락에 적용될 수 있다. 몇 가지 예:

- 개인: 자신의 목표, 건강, 심리, 자기 개선 추적
- 연구: 몇 주 또는 몇 달에 걸쳐 주제 깊이 파고들기
- 책 읽기: 진행하면서 각 챕터 파일링, 등장인물, 주제, 줄거리 실마리 페이지 구축
- 기업/팀: Slack 스레드, 회의 녹취록, 프로젝트 문서로 LLM이 유지하는 내부 위키
- 경쟁 분석, 실사, 여행 계획, 강의 노트, 취미 깊이 파고들기

## 아키텍처

세 가지 레이어:

**원시 소스** — 엄선된 원본 문서. 글, 논문, 이미지, 데이터 파일. 변경 불가능 — LLM이 읽지만 수정하지 않음.

**위키** — LLM이 생성한 마크다운 파일 디렉토리. 요약, 엔티티 페이지, 개념 페이지, 비교, 개요, 합성. LLM이 이 레이어를 전적으로 소유.

**스키마** — LLM에게 위키 구조, 규칙, 따를 워크플로우를 알려주는 문서 (예: CLAUDE.md). 이것이 핵심 설정 파일. 당신과 LLM이 시간이 지남에 따라 공동으로 발전시킴.

## 운영

**수집.** raw/에 새 소스를 투입하고 LLM에게 처리하도록 요청. LLM이 소스를 읽고, 핵심 시사점을 논의하고, 요약 페이지를 작성하고, 색인을 업데이트하고, 관련 엔티티 및 개념 페이지를 업데이트하고, 로그에 항목을 추가. 하나의 소스가 10-15개 위키 페이지에 영향.

**쿼리.** 위키에 대해 질문. LLM이 관련 페이지를 검색하고, 읽고, 인용과 함께 답변을 합성. 좋은 답변은 위키에 새 페이지로 다시 등록.

**점검.** 주기적으로 LLM에게 위키 상태를 확인하도록 요청. 찾을 것: 모순, 오래된 주장, 고아 페이지, 누락된 교차 참조, 데이터 격차.

## 색인 및 로깅

**index.md**는 콘텐츠 중심. 위키의 모든 것의 카탈로그 — 링크, 한 줄 요약, 메타데이터가 있는 각 페이지. LLM이 모든 수집마다 업데이트.

**log.md**는 시간순. 무슨 일이 언제 일어났는지에 대한 추가 전용 기록 — 수집, 쿼리, 점검 패스. 각 항목은 `## [YYYY-MM-DD] 작업 | 제목`으로 시작.

## 선택 사항: CLI 도구

- **qmd**: BM25/벡터 검색 하이브리드 및 LLM 재순위화가 있는 마크다운 파일용 로컬 검색 엔진. CLI와 MCP 서버 모두 있음.
- 커스텀 검색 스크립트는 필요에 따라 바이브 코딩 가능.

## 팁과 트릭

- Obsidian Web Clipper: 웹 기사를 마크다운으로 변환하는 브라우저 확장
- Obsidian의 "첨부파일 다운로드" 명령으로 로컬에 이미지 다운로드
- Obsidian 그래프 뷰: 위키 구조, 허브, 고아를 보는 최적 방법
- Marp: 마크다운 기반 슬라이드 덱 형식, Obsidian 플러그인 사용 가능
- Dataview: 페이지 프론트매터 쿼리를 위한 Obsidian 플러그인
- 위키는 단순한 git 저장소 — 버전 기록과 브랜칭이 무료

## 이것이 작동하는 이유

지식 베이스를 유지하는 지루한 부분은 장부 관리다. 인간은 유지보수 부담이 가치보다 빠르게 커지기 때문에 위키를 포기한다. LLM은 지루해하지 않고, 교차 참조 업데이트를 잊지 않으며, 한 패스에서 15개의 파일을 건드릴 수 있다.

인간의 역할: 소스 큐레이팅, 분석 지시, 좋은 질문 묻기, 그것이 모두 무엇을 의미하는지 생각.
LLM의 역할: 나머지 모든 것.

Vannevar Bush의 Memex (1945)와 정신적으로 관련됨 — 문서 간 연상적 흔적이 있는 개인적이고 큐레이팅된 지식 저장소.
