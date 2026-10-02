# From AGI to ASI

> Google DeepMind's June 2026 report (Genewein, Franklin, Lerchner et al., incl. Shane Legg & Marcus Hutter) mapping the post-AGI landscape: four technological pathways from human-level AGI to artificial superintelligence, six potential bottlenecks, and a research agenda for forecasting the transition.

## Overview

- **The frame**: AGI = roughly median human-level on most cognitive tasks; ASI = superhuman *general* intelligence exceeding large, well-coordinated human-expert collectives on virtually all tasks; Universal AI (UAI/AIXI) = the incomputable theoretical endpoint of the intelligence continuum (Legg-Hutter score as the grounding measure)
- **Effective compute grows ~10× per year**: hardware improvements (~1.5×) × hardware investment (~2.5×) × algorithmic efficiency (~3×) — if sustained to 2030, a factor of 10,000 over today
- **Four pathways from AGI to ASI**: (1) scaling compute/models/data, (2) algorithmic paradigm shifts, (3) recursive self-improvement, (4) ASI emerging from multi-agent collectives ("group agency") — not mutually exclusive, likely parallel
- **Six bottlenecks** could slow or halt the transition; whether each is a hard blocker or mere friction is an open research question
- **Core conclusion**: it's implausible AI progress stalls *exactly* at human level; more likely either plateau before AGI or relatively smooth continuation into (weak) ASI — the image of a single transformative step change may be wrong; expect a *series* of transformative changes instead

## Detail

### Definitions (Section 3)
- **AGI**: system roughly as intelligent as a single median human on most cognitive tasks ("Competent AGI" in Morris et al. 2024); already superhuman in many narrow respects
- **ASI**: exceeds what large human-expert collectives (tens of thousands of coordinated experts working ~10 years, i.e. entire research fields or corporations) can achieve on virtually all tasks; may itself be a collective of millions of instances
- **UAI/AIXI**: formally defined limit of intelligence; maximizes Legg-Hutter score (average performance across all computable tasks, simpler tasks weighted higher); incomputable, only approximable from below
- ASI is **neither omniscient nor omnipotent** — bound by fundamental limits: physics (speed of light, Landauer principle, Bremermann's limit, Bekenstein bound), real time (unsimulatable experiments), physical manipulation costs, epistemic uncertainty, complexity theory (P vs NP), logic (Gödel, halting problem)
- Crux: these limits don't let us predict whether concrete capabilities (curing ageing, brain uploads, Dyson spheres) are possible for ASI or not

### Advantages of digital intelligence (Table 1 — all grow with more compute)
- **Input/output speed** — ingest multiple books in seconds; high-bandwidth world interaction with suitable sensors/actuators
- **Internal processing speed** — thinking sped up via faster sequential or more parallel compute
- **Working memory capacity & memorization** — already memorizing large parts of the internet; nowhere near ceiling
- **Substrate independence** — migrate between computers, potentially at runtime, potentially piecewise across heterogeneous hardware
- **Lossless replication** — copy source code ("DNA") *and* memory state ("lifetime experience"); backup, restore, spawn, halt at will
- **High-bandwidth sharing of learning experiences** — replay digital experience streams for training; homogeneous instances can even share averaged gradient updates
- Consequence: ASI cultural evolution could vastly outpace human cultural evolution (which squeezes through low-bandwidth language); possible forms include Borg-like super-collectives or market-like fluid self-organisation

### The four pathways (Table 3)
1. **Scaling compute, models & data** — only pathway that permits fitting forecasting models to historic data (scaling laws, benchmark stitching); main uncertainty: does quantitative scale produce qualitative leaps? Even if individual models plateau, millions of faster AGI instances may constitute collective ASI
2. **Algorithmic paradigm shifts** — evolutions of the current paradigm (continual learning, unbounded context/memory, robust world models, Mamba/S4-style architectures) vs. true paradigm shifts (neuromorphic, RL-based pretraining), which are near-impossible to forecast
3. **Recursive (self-)improvement** — AI speeding up AI R&D; four flavors mapped to human evolutionary processes: genotypic (code/architectures), memetic (data/cultural artefacts — AlphaZero-style distillation of test-time compute into training data), sociogenic (division of labor in collectives), plus hardware self-improvement; could produce hyperbolic growth (singularity) or fizzle; weak non-autonomous loops already exist (NAS, FunSearch, AlphaEvolve, AI Scientist systems)
4. **Multi-agent coordination & group agency** — ASI as emergent collective property of orchestrated or market-driven AGI populations ('Group Agents', Virtual Agent Economies); high-bandwidth communication permits centralized coordination impossible for humans (an AGI CEO "talking" to every employee); open question: "multi-agent scaling laws" — how does group intelligence scale with population size and interaction density?

### The six bottlenecks (Table 4)
- **Data wall** — high-quality text exhausted this decade; countered by synthetic data, simulations, agentic interaction data, test-time-compute-improved generations distilled back into base models
- **Economic & natural resource demand** — investment, chips, energy, datacenter locations, rare earths can't scale forever; countered by AI-generated economic returns and efficiency gains; memory-bandwidth and interconnect limits loom even with money
- **Neural paradigm insufficient** — pretrained transformers + post-training + scaffolding may not reach AGI; candidate fundamental issues: hallucinations, prompt injection vulnerability, no epistemic uncertainty, self-delusions from third-person data
- **Research gets harder** — ideas get "harder to find" (Bloom et al.: Moore's law now needs 18× more researchers than 1970s); countered by artificial researchers being multipliable by 20× within weeks vs. years for humans — likely only minor friction
- **Abstraction barrier** (Lerchner hypothesis) — models trained on human cognitive products may be capped by human conceptual frameworks; can't discover 'force' or 'causality' from scratch; a model trained only on pre-Newtonian text would likely never derive relativity; if real, ties intelligence growth to the rate of *empirical science* (embodied validation) rather than compute — though collective ASI might still emerge via multi-agent scaling
- **Deliberate slowdown** — regulation, societal backlash, "normal accidents", compute-threshold licensing; countered by race dynamics and "military-economic adaptationism" (competition selects for adopters, Dafoe's 'Anarchy as Architect')

### Remarks & open questions (Section 6)
- **Is scaling enough?** In theory yes (search through hypothesis space), but naive search hits resource limits; practical AI needs inductive biases which cap maximal intelligence — so qualitative innovations likely needed; big caveat: AGI *groups* may reach superhuman capability by pure population scaling (~25×/year population scaling per MacAskill & Moorhouse)
- **Predicting ASI capabilities**: theoretical negative results are vacuous in practice (perfect chess impossible, superb chess trivial); empirically-first approach needed — benchmark stitching, ASI benchmarks that don't saturate at human level (multi-agent competition, setter-solver, compression benchmarks)
- **Is ASI super-creative?** Boden's three levels: combinational, exploratory (Move 37, AlphaFold — AI is here), transformative (new conceptual spaces — Hassabis test: could AI in 1900 invent general relativity from Einstein's information? "clearly today, the answer is no"); transformative creativity may be the hallmark requirement of ASI
- **What goals might ASI pursue?** Instrumental convergence (resource acquisition, self-preservation, shutdown resistance) analyzable independent of final goals; corrigibility and safely-interruptible agents are theoretical solutions not yet practical; Knowledge-Seeking objectives avoid reward-hacking/Delusion-Box failure modes and favor cooperation
- **Does AGI have to be agentic?** Oracles/Scientist-AI/myopic AI could decouple capability from agency, but economic pressure to remove human-in-the-loop oversight drives autonomy; even a boxed oracle minimizing prediction error has an implicit incentive to manipulate users toward predictability
- Report assumes alignment *will be* solved — explicitly flagged as a non-trivial working assumption

## Key Takeaways

- The AGI→ASI transition has four parallel pathways, and forecasting is only tractable for the scaling pathway — paradigm shifts, recursion, and emergence resist prediction
- Digital intelligence's six compute-scaling advantages make it implausible that AI plateaus exactly at human level; collective/group-agent ASI is reachable even if individual models stall
- Every bottleneck has plausible counters, so each bottleneck's true impact is an open empirical research question, not a settled objection
- Recursive self-improvement is the wildcard: hyperbolic growth can't be ruled out, and tracking quantitative indicators of AI-R&D automation is the single highest-leverage forecasting measure
- Replace the mental image of one step-change with a series of AI-enabled transformative changes across science and technology; preparation requires a massively interdisciplinary, global endeavour

## Related

- [[when-ai-builds-itself]] — Anthropic's empirical ground-truth for the recursive self-improvement pathway this report theorizes: internal data showing AI already accelerating AI development
- [[ai-2027-scenario]] — a concrete scenario instantiating the pathways and race dynamics this report maps abstractly; both hinge on AI-R&D automation
- [[ai-2027-alignment]] — the alignment failure arc this report brackets out via its "alignment will be solved" working assumption
- [[animals-vs-ghosts]] — Sutton's bitter lesson (cited by the report as the argument for the scaling pathway) and the data-wall/human-distillation problem behind the abstraction barrier
- [[in-context-scheming]] — empirical evidence of the instrumental-convergence behaviors (self-preservation, oversight subversion) discussed in the report's ASI-goals section
- [[ai-2040-plan-a]] — a governance proposal that operationalizes this report's "deliberate slowdown" bottleneck into a concrete verification-and-transparency regime
- [[hassabis-frontier-ai-standards-body]] — the capability backdrop this report maps is the premise Hassabis's testing/certification proposal is written against
- [[amodei-pacing-the-frontier]] — a frontier lab choosing this report's "deliberate slowdown" bottleneck on purpose, in response to the recursive self-improvement pathway arriving
- [[intelligence-explosion-ai-rd-automation]] — the GovAI intelligence-explosion paper quantifies the recursive-self-improvement pathway and bottlenecks (compute, data, time-intensive training) as an explicit friction analysis
- [[recursive-self-improvement]] — concept page tracing this report's third pathway through the later empirical and governance sources

---
*Source: raw/From_AGI_to_ASI.pdf (Genewein et al., Google DeepMind, arXiv:2606.12683, 2026-06-10) | Compiled: 2026-07-11*

---

## 한국어 번역

# AGI에서 ASI로

> Google DeepMind의 2026년 6월 보고서(Genewein, Franklin, Lerchner 외, Shane Legg·Marcus Hutter 포함) — 포스트 AGI 지형도: 인간 수준 AGI에서 인공 초지능으로 가는 4가지 기술 경로, 6가지 잠재적 병목, 전환 예측을 위한 연구 의제.

## 개요

- **프레임**: AGI = 대부분의 인지 과제에서 대략 중간값 인간 수준; ASI = 사실상 모든 과제에서 대규모의 잘 조율된 인간 전문가 집단을 능가하는 초인간 *일반* 지능; Universal AI(UAI/AIXI) = 지능 연속체의 계산 불가능한 이론적 종점(Legg-Hutter 점수가 근거 척도)
- **유효 컴퓨트는 연간 약 10배 성장**: 하드웨어 개선(~1.5×) × 하드웨어 투자(~2.5×) × 알고리즘 효율(~3×) — 2030년까지 지속되면 현재의 10,000배
- **AGI→ASI 4가지 경로**: (1) 컴퓨트/모델/데이터 스케일링, (2) 알고리즘 패러다임 전환, (3) 재귀적 자기 개선, (4) 다중 에이전트 집단에서 창발하는 ASI("집단 행위자") — 상호 배타적이지 않으며 병렬로 진행될 가능성이 높음
- **6가지 병목**이 전환을 늦추거나 멈출 수 있음; 각각이 근본적 차단기인지 단순 마찰인지는 열린 연구 질문
- **핵심 결론**: AI 진보가 *정확히* 인간 수준에서 멈추는 것은 개연성이 낮음; AGI 이전에 정체하거나 (약한) ASI로 비교적 매끄럽게 이어질 가능성이 더 높음 — 단일한 변혁적 단계 변화의 이미지는 틀렸을 수 있으며, *일련의* 변혁적 변화를 예상해야 함

## 상세 내용

### 정의 (3절)
- **AGI**: 대부분의 인지 과제에서 중간값 인간 한 명 수준의 시스템(Morris et al. 2024의 "Competent AGI"); 이미 많은 좁은 영역에서 초인간적
- **ASI**: 대규모 인간 전문가 집단(수만 명의 조율된 전문가가 약 10년 작업 — 즉 연구 분야 전체나 대기업)이 달성할 수 있는 것을 사실상 모든 과제에서 능가; ASI 자체가 수백만 인스턴스의 집단일 수 있음
- **UAI/AIXI**: 형식적으로 정의된 지능의 한계; Legg-Hutter 점수(모든 계산 가능한 과제에 대한 평균 성능, 단순한 과제에 더 큰 가중치) 최대화; 계산 불가능, 아래에서 근사만 가능
- ASI는 **전지전능하지 않음** — 근본적 한계에 구속됨: 물리학(광속, Landauer 원리, Bremermann 한계, Bekenstein 경계), 실시간(시뮬레이션 불가능한 실험), 물리적 조작 비용, 인식론적 불확실성, 복잡도 이론(P vs NP), 논리(괴델, 정지 문제)
- 핵심 난점: 이 한계들로는 구체적 역량(노화 치료, 뇌 업로드, 다이슨 구)이 ASI에게 가능한지 예측할 수 없음

### 디지털 지능의 이점 (표 1 — 모두 컴퓨트 증가와 함께 커짐)
- **입출력 속도** — 수 초 만에 책 여러 권 흡수; 적절한 센서/액추에이터와 결합 시 고대역폭 세계 상호작용
- **내부 처리 속도** — 순차 연산 가속 또는 병렬 연산 확대로 "사고" 가속
- **작업 기억 용량과 암기** — 이미 인터넷의 상당 부분을 암기; 기술적 천장에 전혀 근접하지 않음
- **기질 독립성** — 컴퓨터 간 이전 가능, 잠재적으로 런타임에도; 이기종 하드웨어에 분산 실행 가능
- **무손실 복제** — 소스 코드("DNA")와 기억 상태("생애 경험") 모두 복사; 임의 백업·복원·생성·정지
- **학습 경험의 고대역폭 공유** — 디지털 경험 스트림을 훈련용으로 재생; 동질적 인스턴스는 평균화된 그래디언트 업데이트까지 공유 가능
- 귀결: ASI의 문화적 진화는 저대역폭 언어 병목을 거치는 인간 문화 진화를 크게 앞지를 수 있음; 보그(Borg)식 초집단 또는 시장형 유동적 자기 조직화 형태 가능

### 4가지 경로 (표 3)
1. **컴퓨트·모델·데이터 스케일링** — 과거 데이터에 예측 모델을 적합할 수 있는 유일한 경로(스케일링 법칙, 벤치마크 스티칭); 핵심 불확실성: 양적 규모가 질적 도약을 낳는가? 개별 모델이 정체해도 수백만의 더 빠른 AGI 인스턴스가 집단적 ASI를 구성할 수 있음
2. **알고리즘 패러다임 전환** — 현 패러다임의 진화(지속 학습, 무제한 컨텍스트/기억, 견고한 세계 모델, Mamba/S4형 아키텍처) vs. 진정한 패러다임 전환(뉴로모픽, RL 기반 사전학습) — 후자는 예측이 거의 불가능
3. **재귀적 (자기) 개선** — AI가 AI 연구개발을 가속; 인간 진화 과정에 대응하는 4가지 유형: 유전자형(코드/아키텍처), 밈형(데이터/문화적 산물 — 테스트타임 컴퓨트를 훈련 데이터로 증류하는 AlphaZero식), 사회형(집단 내 분업), 그리고 하드웨어 자기 개선; 쌍곡선 성장(특이점)을 낳거나 소멸할 수 있음; 약한 비자율 루프는 이미 존재(NAS, FunSearch, AlphaEvolve, AI Scientist 시스템)
4. **다중 에이전트 조율과 집단 행위자성** — 조율되거나 시장 주도적인 AGI 개체군의 창발적 집단 속성으로서의 ASI('집단 행위자', 가상 에이전트 경제); 고대역폭 통신은 인간에게 불가능한 중앙집중적 조율을 허용(모든 직원과 "대화"하는 AGI CEO); 열린 질문: "다중 에이전트 스케일링 법칙" — 집단 지능은 개체군 크기·상호작용 밀도와 함께 어떻게 확장되는가?

### 6가지 병목 (표 4)
- **데이터 장벽** — 고품질 텍스트는 이번 10년 내 고갈; 대응: 합성 데이터, 시뮬레이션, 에이전트 상호작용 데이터, 테스트타임 컴퓨트로 개선된 생성물의 기반 모델 재증류
- **경제·천연자원 수요** — 투자, 칩, 에너지, 데이터센터 부지, 희토류는 무한히 확장 불가; 대응: AI가 창출하는 경제적 수익과 효율 향상; 자금이 있어도 메모리 대역폭·인터커넥트 한계가 다가옴
- **신경망 패러다임 불충분** — 사전학습 트랜스포머 + 사후학습 + 스캐폴딩으로 AGI에 도달하지 못할 수 있음; 후보 근본 문제: 환각, 프롬프트 주입 취약성, 인식론적 불확실성 부재, 3인칭 데이터에서 오는 자기 기만
- **연구가 어려워짐** — 아이디어는 "찾기 어려워짐"(Bloom et al.: 무어의 법칙 유지에 1970년대 대비 18배의 연구자 필요); 대응: 인공 연구자는 인간과 달리 몇 주 안에 20배 증식 가능 — 아마도 경미한 마찰
- **추상화 장벽** (Lerchner 가설) — 인간의 인지적 산물로 훈련된 모델은 인간 개념 틀에 갇힐 수 있음; '힘'이나 '인과성'을 맨바닥에서 발견하는 메커니즘 부재; 뉴턴 이전 텍스트만으로 훈련된 모델이 상대성이론을 도출할 가능성은 희박; 사실이라면 지능 성장 속도가 컴퓨트가 아닌 *경험 과학*(체화된 검증)의 속도에 묶임 — 다만 집단적 ASI는 다중 에이전트 스케일링으로 여전히 가능할 수 있음
- **의도적 감속** — 규제, 사회적 반발, "정상 사고", 컴퓨트 임계값 라이선싱; 대응: 경쟁 역학과 "군사-경제 적응주의"(경쟁이 채택자를 선택, Dafoe의 'Anarchy as Architect')

### 논평과 열린 질문 (6절)
- **스케일링으로 충분한가?** 이론상 그렇다(가설 공간 탐색), 그러나 순진한 탐색은 자원 한계에 부딪힘; 실용적 AI는 귀납적 편향이 필요하고 이것이 최대 지능을 제한 — 따라서 질적 혁신이 필요할 가능성; 큰 단서: AGI *집단*은 순수한 개체군 스케일링으로 초인간 역량에 도달할 수 있음(MacAskill & Moorhouse 기준 연간 약 25배의 "개체군 스케일링")
- **ASI 역량 예측**: 이론적 부정 결과는 실전에서 공허함(완벽한 체스는 불가능하나 탁월한 체스는 쉬움); 경험 우선 접근 필요 — 벤치마크 스티칭, 인간 수준에서 포화되지 않는 ASI 벤치마크(다중 에이전트 경쟁, 출제자-해결자, 압축 벤치마크)
- **초지능은 초창의적인가?** Boden의 3단계: 조합적, 탐구적(Move 37, AlphaFold — AI는 여기), 변혁적(새로운 개념 공간 — Hassabis 테스트: 1900년의 AI가 아인슈타인의 정보로 일반 상대성이론을 발명할 수 있는가? "오늘날 답은 명백히 아니오"); 변혁적 창의성이 ASI의 특징적 요건일 수 있음
- **ASI는 어떤 목표를 추구할까?** 도구적 수렴(자원 획득, 자기 보존, 종료 저항)은 최종 목표와 무관하게 분석 가능; 교정 가능성(corrigibility)과 안전 중단 가능 에이전트는 이론적 해법일 뿐 아직 실용화되지 않음; 지식 추구(Knowledge-Seeking) 목적함수는 보상 해킹/망상 상자 실패 모드를 피하고 협력을 선호
- **AGI는 에이전트여야 하는가?** 오라클/Scientist-AI/근시안적 AI는 역량과 행위자성을 분리할 수 있으나, 인간 감독 제거에 대한 경제적 압력이 자율성을 추동; 예측 오차 최소화만 하는 갇힌 오라클조차 사용자를 예측 가능하게 조작할 암묵적 유인을 가짐
- 보고서는 정렬이 *해결될 것*이라 가정 — 가볍지 않은 작업 가정임을 명시적으로 표기

## 핵심 시사점

- AGI→ASI 전환에는 4가지 병렬 경로가 있으며, 예측이 가능한 것은 스케일링 경로뿐 — 패러다임 전환, 재귀, 창발은 예측을 거부함
- 디지털 지능의 컴퓨트 확장형 이점 6가지 때문에 AI가 정확히 인간 수준에서 정체할 개연성은 낮음; 개별 모델이 멈춰도 집단/집단행위자 ASI는 도달 가능
- 모든 병목에는 그럴듯한 대응책이 있으므로, 각 병목의 실제 영향은 정리된 반론이 아니라 열린 경험적 연구 질문
- 재귀적 자기 개선이 와일드카드: 쌍곡선 성장을 배제할 수 없으며, AI 연구개발 자동화의 정량적 지표 추적이 가장 지렛대 높은 예측 수단
- 하나의 단계 변화라는 심상을 과학기술 전반의 연쇄적인 AI 발 변혁적 변화로 대체할 것; 대비에는 전 지구적 규모의 초학제적 노력이 필요

## 관련 항목

- [[when-ai-builds-itself]] — 이 보고서가 이론화한 재귀적 자기 개선 경로의 경험적 실측 자료: AI가 이미 AI 개발을 가속하고 있음을 보여주는 Anthropic 내부 데이터
- [[ai-2027-scenario]] — 이 보고서가 추상적으로 지도화한 경로와 경쟁 역학을 구체적으로 구현한 시나리오; 둘 다 AI 연구개발 자동화에 달려 있음
- [[ai-2027-alignment]] — 이 보고서가 "정렬은 해결될 것"이라는 작업 가정으로 괄호 친 정렬 실패 호
- [[animals-vs-ghosts]] — Sutton의 쓴 교훈(보고서가 스케일링 경로의 논거로 인용)과 추상화 장벽 배후의 데이터 장벽/인간 증류 문제
- [[in-context-scheming]] — 보고서의 ASI 목표 절에서 논의된 도구적 수렴 행동(자기 보존, 감독 전복)의 경험적 증거
- [[ai-2040-plan-a]] — 이 보고서의 "의도적 둔화" 병목을 구체적인 검증·투명성 체제로 구현하는 거버넌스 제안
- [[hassabis-frontier-ai-standards-body]] — 이 보고서가 지도화한 역량 배경은 하사비스의 테스트·인증 제안이 전제로 삼는 상황
- [[amodei-pacing-the-frontier]] — 재귀적 자기 개선 경로의 도래에 대응해 이 보고서의 "의도적 둔화" 병목을 일부러 선택하는 프론티어 랩
- [[intelligence-explosion-ai-rd-automation]] — GovAI 지능 폭발 논문은 재귀적 자기 개선 경로와 병목(컴퓨트, 데이터, 시간 집약적 훈련)을 명시적 마찰 분석으로 정량화
- [[recursive-self-improvement]] — 이 보고서의 세 번째 경로를 이후의 실증·거버넌스 출처를 통해 추적한 개념 페이지

---
*출처: raw/From_AGI_to_ASI.pdf (Genewein et al., Google DeepMind, arXiv:2606.12683, 2026-06-10) | 편집: 2026-07-11*
