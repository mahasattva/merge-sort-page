# Animals vs Ghosts

> Karpathy's framing of LLMs as "ghosts" (statistical distillations of humanity) rather than "animals" (biologically-grounded intelligence), prompted by Sutton's critique on Dwarkesh's podcast.

## Overview

- **The central metaphor**: LLMs are *ghosts* — imperfect replicas, statistical distillations of human documents, thoroughly engineered by humanity; not *animals* — organisms shaped by evolution and continuous RL interaction with the world
- **Sutton's critique**: LLMs are NOT genuinely "bitter lesson pilled" — they're trained on finite, human-generated data with supervised finetuning, both absent in the animal kingdom; the bitter lesson demands a system that learns from experience alone
- **Karpathy's defense of pretraining**: Animals aren't tabula rasa either — a baby zebra runs within minutes because its billions of neural parameters are richly initialized via evolution (DNA); pretraining is the AI equivalent of that evolutionary initialization: *"Pretraining is our crappy evolution"*
- **What animals have that LLMs lack**: intrinsic motivation (fun, curiosity), continuous test-time learning via weight updates, multi-agent self-play, cultural transmission — all without supervised human teleoperation
- **Possible futures**: ghosts could be finetuned toward animals over time, or diverge permanently — *"ghosts:animals :: planes:birds"*

## Detail

### The Bitter Lesson Debate
- Sutton's "The Bitter Lesson" (2019): approaches that scale with computation beat hand-crafted methods; RL from experience is the only principled path
- Frontier LLM labs treat it as scripture — they ask whether an approach is "bitter lesson pilled" as a proxy for long-term viability
- Sutton's twist: LLMs *fail* this test by his own standard — pretraining on human text is not learning from raw experience; the data is finite, human-biased, and curated
- He invokes Turing's "child machine" ideal: a system that learns through open-ended world interaction with no pretraining stage

### Why Animals Aren't the Clean Example Sutton Claims
- Baby zebra argument: complex sensorimotor behavior (running, following mother) within minutes of birth — impossible if truly tabula rasa
- Animal "learning" is partly *maturation* (unfolding of genetically encoded programs), not RL from scratch
- Evolution is the "outer loop" that loaded billions of parameters (DNA → neural architecture) before birth — analogous to pretraining
- AlphaZero beats AlphaGo (human-initialized), but Go is "algorithmically a harder tic-tac-toe" — not a model for the messiness of reality

### Supervised Learning and Animals
- Animals observe demonstrations but are never *teleoperated* — their actions aren't directly forced by another agent the way SFT works
- The animal analogue to in-context learning: "Given problem + human example solution in context, solve it. Reward = 1 if correct" — that's RL, not SFT
- In-context learning *is* a form of test-time adaptation; CLAUDE.md files are a text-substrate memory mechanism analogous to this

### What Ghosts Can Still Learn from Animals
- Intrinsic motivation: fun, curiosity, empowerment as reward signals independent of human labels
- Continuous test-time weight updates (not just context accumulation)
- Multi-agent self-play and cultural transmission
- Temporal difference learning for long-horizon sparse rewards remains an open problem

### The Ghost Framing
- Ghosts are "muddled by humanity" — not a pejorative, just a different point in intelligence-space
- They may be "practically bitter lesson pilled" relative to prior paradigms even if not platonically so
- The planes:birds analogy: functional equivalence (flight/intelligence) achieved through completely different mechanisms; neither is a failed version of the other

## Key Takeaways

- LLMs are ghosts, not animals — a fundamentally different kind of intelligence shaped by human data rather than evolutionary RL
- Pretraining solves the cold-start problem that evolution solves for animals; neither is tabula rasa
- Sutton's critique is valid directionally: frontier labs are likely not sufficiently bitter lesson pilled and more powerful paradigms probably exist
- Animal intelligence remains a productive source of inspiration (intrinsic motivation, continuous learning) even if the animal = LLM analogy is imprecise
- The ghost vs animal distinction may not be permanent — finetuning could push ghosts toward animals, or they diverge like planes from birds: different substrate, comparable capability

## Related

- [[ai-2027-scenario]] — AI capability trajectory; the ghost paradigm is what drives the 2025-2027 capability jumps in that scenario
- [[in-context-scheming]] — scheming emerges from ghost-type LLMs; would animal-type systems exhibit it differently?
- [[obsidian-claude-code-workflow]] — Karpathy's practical workflow for augmenting LLM memory; directly referenced in the appendix as an example of text-substrate test-time learning
- [[ai-2027-alignment]] — alignment failure arc; ghost psychology (human-distillation) shapes why alignment fails the way it does

---
*Source: raw/Animals vs Ghosts.md (Karpathy, karpathy.bearblog.dev, 2025-10-02) | Compiled: 2026-05-02*

---

## 한국어 번역

# 동물 vs 유령

> Karpathy의 LLM을 "동물"(진화와 강화학습으로 형성된 생물학적 지능)이 아닌 "유령"(인류의 통계적 증류물)으로 프레이밍. Dwarkesh 팟캐스트에서 Sutton의 비판으로 촉발됨.

## 개요

- **중심 비유**: LLM은 *유령* — 불완전한 복제물, 인류 문서의 통계적 증류물, 인류에 의해 철저히 설계됨; *동물*이 아님 — 진화와 세계와의 지속적 강화학습 상호작용으로 형성된 유기체
- **Sutton의 비판**: LLM은 진정으로 "쓴 교훈에 기반하지 않음" — 유한하고 인간이 생성한 데이터로 훈련되며, 지도 세밀 조정(동물 세계에서는 없음)을 사용하고, 테스트 시간에 지속적으로 학습하지 않음; 쓴 교훈은 경험만으로부터 학습할 수 있는 시스템을 요구함
- **Karpathy의 사전 학습 변호**: 동물도 타불라 라사가 아님 — 새끼 얼룩말은 몇 분 안에 달리는데, 이는 뇌의 수십억 개 매개변수가 진화(DNA)를 통해 풍부하게 초기화되어 있기 때문; 사전 학습은 그 진화적 초기화의 AI 등가물: *"사전 학습은 우리의 조잡한 진화"*
- **동물이 가지고 LLM이 부족한 것**: 내재적 동기(재미, 호기심), 가중치 업데이트를 통한 지속적 테스트 시간 학습, 다중 에이전트 자기 대결, 문화 전달 — 모두 인간의 지도 감독 없이
- **가능한 미래들**: 유령이 시간이 지남에 따라 동물 쪽으로 세밀 조정될 수도 있고, 영구적으로 달라질 수도 있음 — *"유령:동물::비행기:새"*

## 상세 내용

### 쓴 교훈 논쟁
- Sutton의 "쓴 교훈" (2019): 계산과 함께 확장되는 접근 방식이 수공예 방법을 이김; 경험에서 오는 강화학습이 유일한 원칙적 경로
- 프론티어 LLM 연구소는 이를 성경처럼 취급 — 접근 방식이 "쓴 교훈에 기반했는지"를 장기 생존 가능성의 대리 지표로 질문
- Sutton의 반전: LLM은 자신의 기준에서 이 테스트에 *실패* — 인간 텍스트에 대한 사전 학습은 원시 경험에서의 학습이 아님; 데이터는 유한하고 인간 편향되어 있으며 큐레이션됨
- 그는 튜링의 "아이 기계" 이상 소환: 사전 학습 단계 없이 개방형 세계 상호작용을 통해 학습하는 시스템

### 왜 동물이 Sutton이 주장하는 깨끗한 예가 아닌가
- 새끼 얼룩말 논증: 출생 후 몇 분 만에 복잡한 감각운동 행동(달리기, 어미 따르기) — 진정으로 타불라 라사라면 불가능
- 동물의 "학습"은 부분적으로 *성숙*임(유전적으로 인코딩된 프로그램의 전개), 처음부터의 강화학습이 아님
- 진화는 출생 전에 수십억 개의 매개변수(DNA → 신경 구조)를 로드한 "외부 루프" — 사전 학습과 유사
- AlphaZero가 AlphaGo (인간 초기화)를 이기지만, 바둑은 "알고리즘적으로 더 어려운 틱택토" — 현실의 복잡함에 대한 모델이 아님

### 지도 학습과 동물
- 동물은 시연을 관찰하지만 *원격 조종되지는 않음* — 그들의 행동은 SFT가 작동하는 방식처럼 다른 에이전트에 의해 직접 강요되지 않음
- 인컨텍스트 학습의 동물 유사체: "이 수학 문제 + 인간 예시 풀이가 맥락에 있을 때, 문제를 풀어라. 정답이면 보상 1" — 강화학습이지 SFT가 아님
- 인컨텍스트 학습은 테스트 시간 적응의 한 형태; CLAUDE.md 파일은 가중치 대신 텍스트/맥락을 기질로 사용하는 이와 유사한 메모리 메커니즘

### 동물에게서 유령이 배울 수 있는 것
- 내재적 동기: 인간 레이블과 무관한 보상 신호로서의 재미, 호기심, 권한 부여
- 지속적 테스트 시간 가중치 업데이트 (맥락 축적만이 아님)
- 다중 에이전트 자기 대결과 문화 전달
- 장기 희소 보상에 대한 시간차 학습은 열린 문제로 남아 있음

### 유령 프레이밍
- 유령은 "인류에 의해 오염됨" — 경멸적이 아니라 지능 공간에서 다른 지점일 뿐
- 이전 패러다임에 비해 적어도 "실용적으로" 쓴 교훈에 기반할 수 있음, 플라톤적으로는 아닐지라도
- 비행기:새 유사체: 다른 메커니즘을 통해 달성된 기능적 동등성(비행/지능); 어느 것도 다른 것의 실패한 버전이 아님

## 핵심 시사점

- LLM은 유령이지 동물이 아님 — 진화적 강화학습이 아닌 인간 데이터로 형성된 근본적으로 다른 종류의 지능
- 사전 학습은 진화가 동물에게 해결하는 콜드 스타트 문제를 해결함; 어느 것도 타불라 라사가 아님
- Sutton의 비판은 방향적으로 유효함: 프론티어 연구소는 아마도 충분히 쓴 교훈에 기반하지 않으며 더 강력한 패러다임이 존재할 가능성이 높음
- 동물 지능은 LLM이 유사체라는 비유가 부정확하더라도 영감의 생산적인 원천으로 남음(내재적 동기, 지속적 학습)
- 유령 vs 동물 구분이 영구적이지 않을 수 있음 — 세밀 조정이 유령을 동물 쪽으로 밀거나, 새에서 비행기처럼 다른 기질, 비교 가능한 역량으로 갈라질 수 있음

## 관련 항목

- [[ai-2027-scenario]] — AI 역량 궤적; 유령 패러다임이 그 시나리오의 2025-2027 역량 도약을 이끌
- [[in-context-scheming]] — 책략은 유령형 LLM에서 나타남; 동물형 시스템은 다르게 나타낼까?
- [[obsidian-claude-code-workflow]] — Karpathy의 메모리 보강 실용 워크플로우; 부록에서 텍스트 기질 테스트 시간 학습의 예로 직접 인용됨
- [[ai-2027-alignment]] — 정렬 실패 호; 유령 심리학(인간 증류)이 정렬이 그런 방식으로 실패하는 이유를 형성함

---
*출처: raw/Animals vs Ghosts.md (Karpathy, karpathy.bearblog.dev, 2025-10-02) | 편집: 2026-05-02*
