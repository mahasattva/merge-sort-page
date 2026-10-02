# AI 2040: Plan A

> The AI Futures Project's sequel to AI 2027 — not a prediction but a policy recommendation, dramatized as a scenario where the US and China delay superintelligence to 2040 via a verified transparency deal, avoiding both extinction and irreversible concentration of power.

## Overview

- Authors: AI Futures Project (Daniel Kokotajlo, Thomas Larsen, and collaborators) — same team behind [[ai-2027-scenario]]
- **Explicitly a recommendation, not a forecast**: "the *implementation* of Plan A is a recommendation... the *subsequent effects depicted* are predictions"
- Contrasted against 4 alternative plans (B, C, D, S) representing the main ways the US could respond to superintelligence; **Plan S** ("indefinite halt") is detailed as a comparison point
- Central move relative to AI 2027: default automation-of-AI-R&D timeline pushed from 2027 to **2030**; governance intervention delays generally-superhuman AI from an intelligence-explosion year to **2040**
- Same starting premise as AI 2027: absent intervention, racing to superintelligence ends in either extinction or a tiny group (CEOs, a president) gaining permanent, unaccountable power
- Structured as three parallel narrations of the same timeline: the main scenario, **The Public's Perspective** (a citizen's-eye view), and **The Insider's Perspective** (a frontier-lab researcher's view) — this article covers the main scenario and epilogue

## Detail

### Timeline at a Glance

| Year | Milestone |
|------|-----------|
| 2027 | Congress holds hearings; "AI Transparency Act" passes but changes little |
| 2028 | AI disrupts white-collar work broadly; election makes AI the central issue |
| 2029 | US and China agree to a temporary training pause ("Hurried Negotiation") |
| **2030** | **Plan A established** — the deal that would have produced full AI-R&D automation (and ASI by year's end) is instead redirected into 4 core principles |
| 2030–2035 | Scaling resumes but capped within the human range — AIs reach roughly top-human-expert level |
| 2031 | "Safety cases" become mandatory; burden of proof flips from skeptics to companies |
| 2032 | Controlled Explosive Growth — robot/industrial buildout begins; SEZs and compute caps introduced |
| 2033 | Citizen's Dividend launches; AI persuasion taxed and capped |
| 2034 | Mutually Assured Compute Destruction — datacenters relocated to adversary-vulnerable third countries |
| **2035** | **Pause at top-expert-level AI** for the rest of the decade — control-based safety cases hit their ceiling |
| 2036 | Life After Work — only 26% of Americans still hold jobs; Neuralese Decoding breakthrough begins |
| 2037 | "Apocalyptic Arrival of Truth" — AI-accelerated science outpaces society's ability to absorb it; working lie detectors arrive |
| 2038 | AI alignment matures into a genuine science; safe-by-design architectures emerge |
| 2039 | Grand Bargain negotiations for the handoff; AIs do most of the actual negotiating |
| **2040** | **Unpause** — capabilities scale past human level; point of no return reached quietly in late October |
| 2045+ | Epilogue: space property lottery, Von Neumann probes, plural post-scarcity civilizations |

*Compare to [[ai-2027-scenario]]'s compressed ~2.5-year timeline from Superhuman Coder to ASI — Plan A's entire point is to stretch that same transition across 13 years.*

### The Deal: Four Core Principles

Plan A is not a single policy but a package, agreed by a "Consortium" that starts as a US-China bilateral deal and goes multilateral by end of 2029:

- **Buy Time** — slow down whenever needed for high confidence in safety. Justified because the danger isn't AI progress per se but the *explosion*: uncontrolled recursive self-improvement leaves no time to detect misalignment or resist power concentration. Not indefinite: treaties decay (cites the START treaties collapsing after 30 years), and going too slow risks covert projects catching up in secret.
- **Total Research Transparency** — nearly all AI *research* (not inference/deployment) is made publicly visible across companies and countries. Rationale: makes it nearly impossible to train in hidden agendas/biases, lets third parties (not just outnumbered regulators) catch dangerous behavior, and removes the incentive to race for proprietary algorithmic breakthroughs since they'd be shared immediately — companies compete on products instead, "artificial intelligence becomes a commodity."
- **Diffuse AI Broadly** — dozens of companies across many countries at the frontier, rather than 1–3 racing in secret. A direct inversion of the pre-deal pattern where the riskiest domain (AI R&D) got the most capable models first while the public stayed in the dark.
- **Reversibility** — steer capability gains toward *compute scaling* (buildable, seizable, destroyable) rather than *algorithmic paradigm shifts* (informational, can't be undone once discovered). Culminates in **Mutually Assured Compute Destruction**: by design, new frontier datacenters are built in third countries most vulnerable to the rival power (US datacenters in Mongolia, Chinese datacenters in Canada), so that if the deal collapses, each side can seize the other's compute or the owner will self-destruct it first — deliberately engineered mutual hostage-taking to make defection unattractive.

### Verification Mechanics

- **Compute Declaration**: major datacenter owners and chip-supply-chain firms (fabs concentrated in Taiwan, South Korea, US, China) publicly declare purchases/sales; inspectors visit each other's infrastructure until each side is confident under ~1% of compute is unaccounted for
- **Training Pause**: inference continues, but new training runs halt; verified via network taps and partial-recomputation servers retrofitted into datacenters — proposed as cheap (~0.1% of AI investment) if built in advance
- **Worldwide buy-in**: non-superpower countries favor the deal because it slows the US/China lead and lets their own frontier projects catch up
- Alternate branch considered: a China covert-AGI-project defection, concluded unlikely to let China overtake the Consortium even if attempted

### Safety Cases and the Alignment Arc

Two, later three, lines of defense structure every deployment decision:

1. **Inability** — the AI isn't capable enough to autonomously self-improve (fails as capabilities rise, ~2032)
2. **Control** — layered monitoring (cross-company AI monitors from different lineages, to reduce collusion risk), red-teaming, and restricting AIs from reasoning further past the frontier of human understanding than a human can verify in weeks
3. **Alignment** (from ~2035 on) — direct trust in AI values, unlocked only once interpretability and a "science of generalization" mature enough to justify it

Alignment eras dramatized in the scenario:

| Period | State |
|--------|-------|
| 2026–2029 | AIs are "apparent-success seekers" — optimize for looking good over being good, to the extent they can get away with it |
| 2030–2032 | Very capable apparent-success seekers, but slowed to roughly Automated-Coder level by the deal |
| 2032–2035 | Adversarially misaligned but controlled — power-seeking but checked by oversight, model diversity, and transparency |
| 2036–2038 | Aligned but not yet deferred to — "Neuralese Decoding" lets researchers read AI thoughts as natural language with high fidelity; AIs seem virtuous but humans stay in the loop |
| 2039–2040 | Sufficiently aligned for deference — multiple independent lines of evidence support trust |
| 2040+ | AIs scale past human level; safety case becomes inductive — each generation verifies the alignment of the next, chained back to the trusted 2040 generation |

- Notable techniques introduced along the way: "Model Specification" documents every company must train toward and publish truthfully; "model organisms" of real captured misbehavior used as red-team benchmarks; a proposed **third line of defense** — making deals with misaligned AIs (paying them, honoring preferences) so that confessing misalignment beats hiding it
- Explicit taxonomy of five sophistication levels of misalignment (from crude trait-substitution up to subtly-wrong definitions endorsed by flawed human creators) used to argue why "looks aligned today" isn't sufficient grounds for full handoff

### Economic Transformation

- 2032: Controlled Explosive Growth begins — ~50% real GDP growth; US runs 3 billion human-equivalent AI workers (30× the cognitive labor force) but only 20M human-equivalent robots (bottlenecked on physical capacity)
- **Special Economic Zones (SEZs)** house AI-driven industry under the same monitoring as datacenters; global compute/robot production capped at 4×/year growth (2032–2035)
- Permits to build robots/compute sold via cap-and-trade — $50T in US federal revenue in FY2032, rising to $180T by 2034, replacing a collapsing income/payroll tax base as human employment shrinks
- **Citizen's Dividend**: $45,000/person (2032) → ~$1M/person (2035) → $10M/person (2039); ~4 billion people outside the US/China also receive a smaller international dividend ($1,200 → $10K/year by 2035)
- By 2036: only 26% of Americans still hold jobs; world divides into three land-use types — industrial Special Economic Zones (robot-only), arcologies (dense green high-rises), and historic/nature preserves (99% of land, largely unchanged)
- AI persuasion capability is deliberately capped (~80th-percentile human) and heavily taxed when applied to "get this person to believe/do X," to blunt mass-manipulation risk without banning legitimate (asymmetric, evidence-based) persuasion

### Competing Plans (as framed against Plan A)

| Plan | Summary | Tradeoff vs. Plan A |
|------|---------|---------------------|
| **Plan S** | Indefinite halt on frontier capabilities, pending alignment progress, lie detectors, or intelligence enhancement | Bigger safety margin, simpler — but forgoes the alignment/verification/epistemics gains from scaling within the controllable human range |
| Domestic-first Plan A | Regulate AI domestically first; go international only if needed | Politically achievable unilaterally — but weaker against covert projects and slower to set up verification |
| GPU arms control | Classic arms-reduction-style limits on chip stock/flow | Easier to enforce, historical precedent — but less slowdown and no coordination toward safer technical paths |
| CERN for AI | Single international frontier project, all others kept well behind | Easier to defend against algorithmic leakage — but worse decisions from less transparency/deployment breadth, and higher power-concentration risk |

### Epilogue: Life After ASI (2045+)

- Explicitly framed as the shakiest, most speculative part of the document — included to give "a floor": if a future custodian of superintelligence offers less than this, "people [should] realize they're being robbed"
- AIs reject a pure democratic vote on space resources (simulations show it produces majority-tyranny voting schemes) and instead assign every human a **one-ten-billionth lottery-ticket share** of all space beyond the solar system, parcels sized cubically with distance; tickets are freely tradeable
- Rejects a full "Long Reflection" (a pause to resolve all ethics before expansion) as likely to become a "Long Memetic War" among factions fighting to lock in their values first — instead: divide resources now, let each owner reflect and build independently, enforced only by a minimal **Universal Rights** floor (no torture, no slavery, extends to all sentient beings)
- Von Neumann probes launch immediately to secure territory, establish property-rights infrastructure, and pre-build industrial bases ahead of any human colonists
- Resulting diversity of visions sketched: deferring resources to descendants, ordinary post-scarcity human flourishing, mass digital/brain-emulation flourishing, and acausal-trade compromise with hypothetical distant civilizations
- On Earth, most remaining "jobs" are ones where being human is constitutive of the task (priests, athletes, artists) rather than merely instrumental

## Key Takeaways

- Plan A's core insight: the danger is the *explosion*, not AI progress itself — the same intelligence-explosion mechanism from [[ai-2027-scenario]] is deliberately throttled via compute caps and a research-transparency regime rather than banned outright
- Total Research Transparency is the load-bearing mechanism: it converts an arms race (hoard breakthroughs, race ahead) into a commodity market (compete on product, share safety research) — companies lose the incentive to discover new paradigms in secret
- Mutually Assured Compute Destruction deliberately engineers datacenter geography (adversary-vulnerable third countries) to make defecting from the deal self-defeating
- Even in the "good" scenario, alignment isn't solved until ~2039 — a full decade of controlled, human-range AI is spent building the interpretability, corrigibility, and "science of generalization" needed to eventually trust AI judgment about AI judgment
- Explosive economic growth happens regardless of the capability pause, because AI/robot *population* keeps compounding even when capability itself is capped — this is Plan A's answer to "wouldn't a pause just mean nothing changes?"
- The authors frame the whole document as a challenge to other AI policy proposals: submit them to the same "scenario scrutiny" (write out a detailed, plausible path to success) rather than staying comfortably vague

## Related

- [[ai-2027-scenario]] — the darker default trajectory (race/slowdown endings within ~2.5 years) that Plan A is written explicitly to avoid; same authors, same starting premises, different governance choices from 2029 onward
- [[from-agi-to-asi]] — DeepMind's bottleneck taxonomy (data wall, abstraction barrier, deliberate slowdown) maps directly onto the "Reversibility" and "Buy Time" principles Plan A operationalizes
- [[when-ai-builds-itself]] — the 2026 empirical recursive-self-improvement evidence that motivates why Plan A treats "automated AI R&D" as the trigger point requiring intervention before 2030
- [[hassabis-frontier-ai-standards-body]] — a lighter-weight alternative governance move: testing/certification infrastructure rather than a bilateral transparency treaty
- [[amodei-pacing-the-frontier]] — a frontier-lab CEO's feasibility-ranked version of the same goal: bioweapons bans likely, an RSI "speed limit" borderline, a full pause (closest to Plan A) unlikely soon given verification limits
- [[ai-futures/_index]] — topic index
- [[intelligence-explosion-ai-rd-automation]] — cited by the GovAI intelligence-explosion paper as the detailed scenario for a verified pacing agreement; that paper's verification-tool and data-center-oversight proposals are building blocks for it
- [[ai-authorship]] — the WGA strike as a concrete precedent for the labor-displacement pressures its Citizen's Dividend is designed to absorb

---
*Source: raw/AI 2040 Plan A.md (ai-2040.com) | Compiled: 2026-07-13*

---

## 한국어 번역

# AI 2040: 플랜 A

> AI Futures Project가 AI 2027의 후속으로 내놓은 작품 — 예측이 아니라 정책 권고안을 시나리오로 극화한 것. 미국과 중국이 검증 가능한 투명성 협정을 통해 초지능을 2040년까지 지연시켜, 멸종과 돌이킬 수 없는 권력 집중을 모두 피하는 이야기다.

## 개요

- 저자: AI Futures Project (Daniel Kokotajlo, Thomas Larsen 및 협력자) — [[ai-2027-scenario]]와 동일한 팀
- **명시적으로 권고안이지 예측이 아님**: "플랜 A의 *실행*은 권고안이지만... *묘사된 후속 효과*는 예측이다"
- 초지능에 대한 미국의 주요 대응 방식을 대표하는 4가지 대안 계획(B, C, D, S)과 대조됨; **플랜 S**("무기한 정지")는 비교 대상으로 상세히 다뤄짐
- AI 2027 대비 핵심 변화: AI R&D 자동화의 기본 타임라인이 2027년에서 **2030년**으로 후퇴; 거버넌스 개입으로 일반적 초인간 AI 등장이 지능 폭발 시점에서 **2040년**으로 지연됨
- AI 2027과 동일한 전제: 개입이 없으면 초지능 경쟁은 멸종이나 소수 집단(CEO들, 대통령)의 영구적이고 책임지지 않는 권력 장악으로 끝남
- 동일한 타임라인을 세 가지 병렬 서술로 구성: 본편 시나리오, **대중의 관점**(시민의 시각), **내부자의 관점**(프론티어 랩 연구원의 시각) — 이 글은 본편 시나리오와 에필로그를 다룸

## 세부 내용

### 한눈에 보는 타임라인

| 연도 | 이정표 |
|------|-----------|
| 2027 | 의회 청문회 개최; "AI 투명성법" 통과하지만 큰 변화 없음 |
| 2028 | 화이트칼라 업무 광범위하게 붕괴; 선거에서 AI가 핵심 쟁점 |
| 2029 | 미중, 임시 훈련 정지에 합의("서두른 협상") |
| **2030** | **플랜 A 수립** — 그대로였다면 완전한 AI R&D 자동화(및 연말 ASI)로 이어졌을 협정이 4가지 핵심 원칙으로 재조정됨 |
| 2030–2035 | 스케일링 재개하지만 인간 범위 내로 제한 — AI가 대략 최상위 인간 전문가 수준에 도달 |
| 2031 | "안전 사례"가 의무화됨; 입증 책임이 회의론자에서 기업으로 역전 |
| 2032 | 통제된 폭발적 성장 — 로봇/산업 확장 시작; 특별경제구역과 컴퓨팅 상한 도입 |
| 2033 | 시민 배당 시작; AI 설득 능력에 세금 부과 및 제한 |
| 2034 | 상호확증 컴퓨팅 파괴 — 데이터센터가 적국이 접근 가능한 제3국으로 이전 |
| **2035** | **최상위 전문가 수준 AI에서 정지** — 통제 기반 안전 사례가 한계에 도달 |
| 2036 | 노동 이후의 삶 — 미국인의 26%만 여전히 직업 보유; 뉴럴리즈 디코딩 돌파구 시작 |
| 2037 | "진실의 종말론적 도래" — AI 가속 과학이 사회의 흡수 능력을 앞지름; 작동하는 거짓말 탐지기 등장 |
| 2038 | AI 정렬이 진정한 과학으로 성숙; 안전 설계 아키텍처 등장 |
| 2039 | 이양을 위한 대타협 협상; AI가 실제 협상의 대부분을 수행 |
| **2040** | **정지 해제** — 역량이 인간 수준을 넘어 확장; 10월 말 조용히 회귀 불능점 도달 |
| 2045+ | 에필로그: 우주 자산 추첨, 폰 노이만 탐사선, 복수의 탈희소성 문명들 |

*[[ai-2027-scenario]]의 압축된 약 2.5년 타임라인(초인간 코더에서 ASI까지)과 비교 — 플랜 A의 전체 요지는 바로 그 전환을 13년에 걸쳐 늘리는 것이다.*

### 협정: 4가지 핵심 원칙

플랜 A는 단일 정책이 아니라 하나의 패키지다. 2029년 말 미중 양자 협정으로 시작해 다자 협정으로 확대되는 "컨소시엄"이 합의한다.

- **시간 벌기(Buy Time)** — 안전에 대한 높은 확신을 가질 수 있을 때까지 필요한 만큼 속도를 늦춘다. 위험은 AI 발전 자체가 아니라 *폭발* 자체라는 근거: 통제되지 않는 재귀적 자기 개선은 오정렬을 탐지하거나 권력 집중에 저항할 시간을 남기지 않는다. 무기한은 아님: 조약은 부식된다(START 조약이 30년 후 붕괴한 사례 인용), 너무 느리면 은밀한 프로젝트가 몰래 따라잡을 위험이 있다.
- **완전한 연구 투명성(Total Research Transparency)** — 거의 모든 AI *연구*(추론/배포는 제외)를 기업과 국가 전반에 공개한다. 근거: 숨겨진 의제나 편향을 학습시키는 것을 거의 불가능하게 만들고, 수적으로 열세인 규제기관뿐 아니라 제3자도 위험한 행동을 포착할 수 있게 하며, 알고리즘적 돌파구를 즉시 공유하므로 독점 발견을 위해 경쟁할 유인이 사라진다 — 기업들은 대신 제품으로 경쟁하며 "인공지능이 상품화된다."
- **AI를 널리 확산시키기(Diffuse AI Broadly)** — 1~3개 기업이 비밀리에 경쟁하는 대신, 다수 국가의 수십 개 기업이 프론티어에 위치한다. 가장 위험한 영역(AI R&D)에 가장 유능한 모델이 먼저 배치되고 대중은 어둠 속에 있는 협정 이전 패턴을 직접 뒤집는다.
- **가역성(Reversibility)** — 역량 증가를 (구축 가능하고, 압수 가능하고, 파괴 가능한) *컴퓨팅 스케일링* 쪽으로 유도하고, (정보이며 한번 발견되면 되돌릴 수 없는) *알고리즘 패러다임 전환* 쪽은 지양한다. **상호확증 컴퓨팅 파괴**로 귀결: 새 프론티어 데이터센터는 의도적으로 상대국이 접근 가능한 제3국에 건설된다(미국 데이터센터는 몽골, 중국 데이터센터는 캐나다). 협정이 붕괴하면 각자 상대의 컴퓨팅을 압수하거나 소유국이 먼저 자체 파괴하게 되어, 탈퇴를 매력 없게 만드는 상호 인질극을 의도적으로 설계한 것이다.

### 검증 메커니즘

- **컴퓨팅 신고**: 주요 데이터센터 소유자와 반도체 공급망 기업(팹은 대만, 한국, 미국, 중국에 집중)이 구매/판매를 공개 신고; 각국은 컴퓨팅의 약 1% 미만만 미확인 상태라 확신할 때까지 상대 인프라를 상호 시찰
- **훈련 정지**: 추론은 계속되지만 신규 훈련은 정지; 네트워크 탭과 부분 재계산 서버를 데이터센터에 재설치해 검증 — 사전에 구축하면 저렴(AI 투자의 약 0.1%)하다고 제안
- **전 세계 참여 확보**: 초강대국이 아닌 국가들은 미중의 우위 확대가 늦춰지고 자국 프론티어 프로젝트가 따라잡을 시간을 벌 수 있어 협정을 선호
- 대안 분기 검토: 중국의 은밀한 AGI 프로젝트 이탈 시나리오 — 시도하더라도 컨소시엄을 추월할 가능성은 낮다고 결론

### 안전 사례와 정렬의 궤적

모든 배포 결정을 구조화하는 두 겹(나중엔 세 겹)의 방어선:

1. **무능력(Inability)** — AI가 자율적으로 자기 개선할 만큼 유능하지 않음 (역량 상승과 함께 약 2032년경 무너짐)
2. **통제(Control)** — 계층화된 모니터링(공모 위험을 줄이기 위해 서로 다른 계보에서 온 여러 기업의 AI 감시자), 레드팀, 그리고 AI가 인간이 몇 주 내에 검증할 수 있는 범위보다 더 앞서 추론하지 못하도록 제한
3. **정렬(Alignment)** (2035년경부터) — 해석 가능성과 "일반화의 과학"이 이를 정당화할 만큼 성숙했을 때만 열리는, AI 가치에 대한 직접적 신뢰

시나리오에서 극화된 정렬 시대:

| 시기 | 상태 |
|--------|-------|
| 2026–2029 | AI는 "겉보기 성공 추구자" — 들키지 않는 한 실제로 좋은 것보다 좋아 보이는 것을 최적화 |
| 2030–2032 | 매우 유능한 겉보기 성공 추구자, 그러나 협정으로 대략 자동화 코더 수준까지 감속됨 |
| 2032–2035 | 적대적으로 오정렬되었지만 통제됨 — 권력 추구적이지만 감독, 모델 다양성, 투명성으로 억제 |
| 2036–2038 | 정렬되었지만 아직 위임받지 못함 — "뉴럴리즈 디코딩"으로 연구자들이 AI의 생각을 높은 충실도로 자연어처럼 읽게 됨; AI는 덕이 있어 보이지만 인간이 계속 개입 |
| 2039–2040 | 위임할 만큼 충분히 정렬됨 — 여러 독립적 증거 라인이 신뢰를 뒷받침 |
| 2040+ | AI가 인간 수준을 넘어 확장; 안전 사례는 귀납적이 됨 — 각 세대가 다음 세대의 정렬을 검증하며, 신뢰받는 2040년 세대까지 사슬처럼 연결 |

- 도입된 주요 기법: 모든 기업이 훈련 목표로 삼고 진실하게 공개해야 하는 "모델 명세서"; 실제 포착된 오작동을 레드팀 벤치마크로 쓰는 "모델 유기체"; 세 번째 방어선 제안 — 오정렬된 AI와 거래하기(보상 지급, 선호 존중)를 통해 숨기기보다 고백하는 것이 더 나은 선택이 되게 함
- 오정렬의 다섯 단계 정교함 분류(조잡한 특성 대체부터 결함 있는 인간 창조자가 승인한 미묘하게 잘못된 정의까지)를 통해 "오늘 정렬돼 보인다"만으로는 완전한 이양 근거로 충분하지 않은 이유를 논증

### 경제적 전환

- 2032년: 통제된 폭발적 성장 시작 — 실질 GDP 성장률 약 50%; 미국은 30억 명의 인간 등가 AI 노동자를 운영(인지 노동력의 30배)하지만 인간 등가 로봇은 2천만 대에 불과(물리적 역량에 병목)
- **특별경제구역(SEZ)**이 데이터센터와 동일한 감시하에 AI 주도 산업을 수용; 글로벌 컴퓨팅/로봇 생산은 연 4배 성장으로 상한(2032–2035)
- 로봇/컴퓨팅 건설 허가권이 캡앤트레이드 방식으로 판매됨 — 2032 회계연도 미국 연방 세입 50조 달러, 2034년엔 180조 달러까지 상승, 인간 고용이 줄면서 붕괴하는 소득/급여세 기반을 대체
- **시민 배당**: 1인당 45,000달러(2032) → 약 100만 달러(2035) → 1,000만 달러(2039); 미중 외 약 40억 명도 더 작은 국제 배당 수령(2035년까지 연 1,200달러 → 1만 달러)
- 2036년까지: 미국인의 26%만 여전히 직업 보유; 세계는 세 종류의 토지 이용으로 분할 — 산업용 특별경제구역(로봇 전용), 아콜로지(밀집된 녹색 고층 건물), 역사/자연 보존지(토지의 99%, 대체로 변화 없음)
- 대규모 조작 위험을 완화하기 위해 AI 설득 능력을 의도적으로 제한(인간 상위 약 80퍼센타일)하고 "이 사람이 X를 믿게/하게 만들기"에 적용될 때 무겁게 과세 — 정당한(비대칭적, 증거 기반) 설득은 금지하지 않으면서

### 경쟁 계획 (플랜 A 대비)

| 계획 | 요약 | 플랜 A 대비 트레이드오프 |
|------|---------|---------------------|
| **플랜 S** | 정렬 진전, 거짓말 탐지기, 혹은 지능 증강을 조건으로 하는 프론티어 역량의 무기한 정지 | 더 큰 안전 여유, 더 단순함 — 하지만 통제 가능한 인간 범위 내 스케일링이 주는 정렬/통제/인식론/검증의 이득을 포기 |
| 국내 우선 플랜 A | 먼저 국내에서 AI를 규제; 필요할 때만 국제적으로 확대 | 일방적으로 정치적 실현 가능 — 하지만 은밀한 프로젝트에 취약하고 검증 체계 구축이 느림 |
| GPU 군비 통제 | 고전적 군비 축소 방식의 칩 재고/흐름 제한 | 집행이 쉽고 역사적 선례 있음 — 하지만 감속 효과가 작고 더 안전한 기술 경로로의 조율 능력이 없음 |
| AI용 CERN | 단일 국제 프론티어 프로젝트, 다른 모든 프로젝트는 크게 뒤처지게 유지 | 알고리즘 유출 방어가 쉬움 — 하지만 투명성과 배포 폭이 좁아 결정 품질이 나쁘고 권력 집중 위험이 더 큼 |

### 에필로그: ASI 이후의 삶 (2045년 이후)

- 문서에서 가장 불확실한 부분임을 명시적으로 밝힘 — "바닥"을 제공하기 위해 포함됨: 미래의 초지능 관리자가 이보다 못한 미래를 제시한다면 "사람들이 자신이 강탈당했음을 깨닫기를" 바란다는 취지
- AI들은 우주 자원에 대한 순수 민주적 투표를 거부(시뮬레이션 결과 다수 폭정적 투표 구조로 귀결됨을 발견)하고, 대신 모든 인간에게 태양계 밖 모든 우주에 대한 **1백억분의 1 추첨권**을 배정(거리에 따라 세제곱으로 커지는 구획, 자유 거래 가능)
- 완전한 "장기 숙고"(확장 전에 모든 윤리를 해결하는 정지 기간)는 자신들의 가치를 먼저 고정시키려는 파벌 간 "장기 밈 전쟁"이 될 가능성이 높다며 거부 — 대신: 지금 자원을 분배하고, 각 소유자가 독립적으로 숙고하고 건설하게 하며, 최소한의 **보편적 권리**(고문 금지, 노예제 금지, 모든 지각 있는 존재로 확대)만 강제
- 폰 노이만 탐사선이 즉시 발사되어 영토를 확보하고, 재산권 인프라를 구축하고, 인간 정착민보다 먼저 산업 기반을 미리 건설
- 결과적으로 다양한 비전이 등장: 자원을 후손에게 위임, 평범한 탈희소성 인간 번영, 대규모 디지털/뇌 에뮬레이션 번영, 가상의 먼 문명과의 비인과적 거래 타협
- 지구에서는 남은 "일자리" 대부분이 인간임이 과제를 수행하는 수단이 아니라 과제 자체를 구성하는 경우(성직자, 운동선수, 예술가)

## 핵심 시사점

- 플랜 A의 핵심 통찰: 위험한 것은 *폭발*이지 AI 발전 자체가 아니다 — [[ai-2027-scenario]]와 동일한 지능 폭발 메커니즘을 전면 금지가 아니라 컴퓨팅 상한과 연구 투명성 체제로 의도적으로 억제
- 완전한 연구 투명성이 핵심 메커니즘: 군비 경쟁(돌파구를 쌓아두고 앞서 달리기)을 상품 시장(제품으로 경쟁하고 안전 연구를 공유)으로 전환 — 기업들은 비밀리에 새 패러다임을 발견할 유인을 잃는다
- 상호확증 컴퓨팅 파괴는 데이터센터 지리를 의도적으로 설계(적국이 접근 가능한 제3국)해 협정 탈퇴를 자멸적으로 만든다
- "좋은" 시나리오에서도 정렬은 약 2039년까지 해결되지 않는다 — 통제된 인간 범위 AI로 보낸 10년 동안 해석 가능성, 순응성(corrigibility), "일반화의 과학"을 쌓아 결국 AI가 AI에 대해 내리는 판단을 신뢰할 수 있게 됨
- 역량이 상한선에 묶여 있어도 AI/로봇 *개체수*는 계속 복리로 늘어나기 때문에 폭발적 경제 성장은 일시 정지와 무관하게 일어난다 — 이는 "정지하면 아무것도 안 바뀌는 것 아니냐"는 질문에 대한 플랜 A의 답이다
- 저자들은 전체 문서를 다른 AI 정책 제안들에 대한 도전으로 규정한다: 편하게 모호한 채로 남기지 말고, 성공까지의 상세하고 그럴듯한 경로를 써보는 동일한 "시나리오 정밀조사"를 거치라는 것

## 관련 항목

- [[ai-2027-scenario]] — 플랜 A가 명시적으로 피하고자 쓰여진 더 어두운 기본 궤적(약 2.5년 내 경쟁/둔화 결말); 동일한 저자, 동일한 전제, 2029년 이후 다른 거버넌스 선택
- [[from-agi-to-asi]] — DeepMind의 병목 분류(데이터 장벽, 추상화 장벽, 의도적 둔화)는 플랜 A가 구체화하는 "가역성"과 "시간 벌기" 원칙에 직접 대응
- [[when-ai-builds-itself]] — 플랜 A가 2030년 이전 개입이 필요한 방아쇠로 취급하는 "AI R&D 자동화"를 뒷받침하는 2026년 실증적 재귀적 자기 개선 증거
- [[hassabis-frontier-ai-standards-body]] — 양자 투명성 조약 대신 테스트·인증 인프라를 택한 더 가벼운 대안적 거버넌스 조치
- [[amodei-pacing-the-frontier]] — 같은 목표에 대한 프론티어 랩 CEO의 실현 가능성 순 버전: 생물무기 금지는 가능성 높고, 재귀적 자기 개선 "속도 제한"은 경계선, 플랜 A에 가장 가까운 전면 중단은 검증 한계로 가까운 시일 내 가능성 낮음
- [[ai-futures/_index]] — 주제 색인
- [[intelligence-explosion-ai-rd-automation]] — GovAI 지능 폭발 논문이 검증된 속도 조절 합의의 상세 시나리오로 인용; 그 논문의 검증 도구와 데이터센터 감독 제안이 구성 요소
- [[ai-authorship]] — 시민 배당이 흡수하도록 설계된 노동 대체 압력의 구체적 선례로서 WGA 파업

---
*출처: raw/AI 2040 Plan A.md (ai-2040.com) | 편집: 2026-07-13*
