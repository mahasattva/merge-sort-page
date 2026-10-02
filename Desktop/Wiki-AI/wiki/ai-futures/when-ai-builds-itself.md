# When AI Builds Itself

> Anthropic Institute piece (Favaro & Jack Clark, mid-2026) presenting public benchmarks plus previously unreported internal Anthropic data showing AI is already accelerating AI development — and analyzing three futures, up to full recursive self-improvement.

## Overview

- **Recursive self-improvement (RSI)**: an AI system capable of fully autonomously designing and developing its own successor; not here yet, not inevitable, but "could come sooner than most institutions are prepared for"
- **External evidence**: METR task-horizon doubling time has *accelerated* from ~7 months to ~4 months; Opus 3 did ~4-minute tasks (Mar 2024) → Sonnet 3.7 ~1.5-hour (2025) → Opus 4.6 ~12-hour tasks (2026); SWE-bench and CORE-Bench both went from single digits/~20% to saturated within ~2 years
- **Internal evidence**: >80% of code merged at Anthropic is Claude-authored (May 2026); engineers merge 8× the code/day vs. 2024; Claude went from ~3× to ~52× on a fixed kernel-optimization research task in one year (skilled human: ~4× in 4–8 hours)
- **The remaining gap is "research taste"**: choosing which problems matter, which results to trust, when to abandon an approach — but even this is measurably improving (next-step judgment beat human choices 51% → 64% in five months)
- **Three futures**: (1) trend stalls but today's capabilities diffuse, (2) compounding efficiency gains with humans setting direction (deemed most likely), (3) full RSI — Anthropic argues the world should build verification systems that make a coordinated slowdown/pause *possible*

## Detail

### The narrowing development loop
- 2021–2023: humans write everything → 2023–2025: chatbot snippets copy-pasted → 2025–2026: coding agents edit files → today: autonomous agents run code and delegate to other agents → 20XX: "closing the loop" — agents build and train models themselves
- Frontier model work splits into *engineering* (code, infrastructure, training oversight) and *research* (choosing experiments, interpreting results); Claude now handles method-finding in both; humans supply goals and judgment

### Evidence: engineering
- **>80% of merged production code Claude-authored** (May 2026; low single digits before Claude Code's Feb 2025 launch); leadership publicly estimates ≥90% including scripts/experimental code
- **8× lines of code merged per engineer/day** vs. 2024 baseline (flat 2021–2024, inflected when Claude began running code, steepened with longer autonomous horizons) — acknowledged as an overstatement of true productivity (quantity ≠ quality), but a real acceleration
- March 2026 internal poll (n=130 research staff): median self-estimate ~4× output with Mythos Preview vs. no AI (authors expect the true uplift is lower, citing METR's developer-overestimation research)
- **Quality**: correction/takeover rate falling for a year; open-ended-task session success 76% in May 2026, +50 points in six months; Claude-written code judged roughly at parity with Anthropic human code today, expected strictly better within a year
- Retrospective: an automated Claude reviewer would have caught ~⅓ of bugs behind past claude.ai incidents
- Work that wouldn't otherwise happen: e.g. Claude shipped 800+ fixes cutting a class of API errors 1000×; overseeing engineer estimated 4 human-years of work

### Evidence: research
- **Fixed-goal experimentation is superhuman**: on the standard kernel-speedup test, Opus 4 (May 2025) averaged ~3×; Mythos Preview (Apr 2026) ~52×; skilled human ~4× in 4–8 hours (absolute multiple depends on starting-code headroom; the like-for-like trend is the signal)
- **Open-ended research end-to-end** (Apr 2026 automated weak-to-strong researcher): agents given an open AI-safety problem recovered 97% of the floor-to-ceiling gap over 800 cumulative hours (~$18k compute) vs. 23% for two human researchers in a week; caveats — humans chose the problem and rubric, results didn't transfer to production scale
- **Next-step judgment**: on 129 real research-session detour moments, models' proposed next step beat the human's 51% (Opus 4.5, Nov 2025) → 64% (Mythos Preview, Apr 2026); on a control set where the human move was already strong, models won only ~20%
- Human comparative advantage remaining: "seeing the bigger picture", direction-setting, taste

### Three possible futures
1. **Trend stalls, capabilities diffuse** — exponentials turn out to be S-curves; taste can't be scaled; or supply chain (chips, grid, interconnect) binds; even frozen at today's level, major change follows (Project Glasswing shifted the cyber-defense bottleneck from finding vulnerabilities to patching them); authors consider this *least likely* — no measured curve has bent yet
2. **Compounding efficiency gains** (authors' expected trajectory) — development substantially automated, humans set direction; 100-person companies do the work of 10,000–100,000; dual-use worry: authoritarian surveillance, individually-tailored influence operations at inhuman scale; Amdahl's law bites — human code review and idea-triage are already the new bottlenecks at Anthropic; spotting and fixing organizational bottlenecks may become the key skill
3. **Full recursive self-improvement** — progress pace set entirely by compute and algorithmic-efficiency discovery; humans shift to oversight/validation of an AI-run "virtual lab"; alignment is the greatest unknown: models might solve alignment themselves, wisely halt, or today's rare misalignment could compound generation over generation "more frequent but less understood until we lose control"; even then Amdahl's law governs the felt pace — intelligence can't rush decades-long drug observations, constitutionally-scheduled elections, or friendship

### What should be done
- A slowdown would be good *if* it doesn't just let the least cautious actors catch up; unilateral pause changes the front-runner but creates no deliberative process
- Anthropic commits: if credible *verification* systems existed and other frontier developers verifiably slowed/paused, it would too
- The arms-control analogy is hard: training runs are easier to hide than missile silos, inputs are general-purpose, defection incentive is enormous; INF-style regimes took decades — "we don't have that long"
- Anthropic Institute will convene policymakers, researchers, civil society on RSI and coordination options

## Key Takeaways

- AI acceleration of AI development is no longer speculative — it is measured, internal, and compounding: 80% of frontier-lab code AI-written, task horizons doubling every ~4 months
- The last human moat is research taste, and the article's most unsettling data point is that it's eroding too (51%→64% next-step wins in 5 months)
- "Perspiration is becoming automated": most AI progress is incremental experiment loops, exactly what Claude excels at — eureka-dependence is a weak objection
- Amdahl's law is the recurring brake: whatever hasn't sped up (human review, governance, biology, trust-building) sets the felt pace, even under full RSI
- Anthropic's policy position: build the verification infrastructure that makes a coordinated pause an *option*, before it's needed

## Related

- [[from-agi-to-asi]] — DeepMind's theoretical map of the same territory; this piece is the empirical case that its recursive self-improvement pathway is already underway, and its "deliberate slowdown" bottleneck matches Anthropic's coordination proposal
- [[ai-2027-scenario]] — the AI 2027 scenario's core engine is exactly this AI-R&D-automation feedback loop; this article is real-world 2026 data tracking that projection
- [[ai-2027-alignment]] — scenario 3's "misalignment compounding across self-built successors" is the mechanism the AI 2027 alignment arc dramatizes
- [[project-glasswing]] — cited directly as evidence that even frozen capabilities transform the world: 10,000+ high/critical vulnerabilities found in weeks, moving the bottleneck to patching
- [[animals-vs-ghosts]] — Karpathy's skepticism about scaling-to-taste is a live counterargument to this piece's less-conservative reading
- [[ai-2040-plan-a]] — a detailed scenario for the verifiable coordinated-pause proposal this piece calls for, built around exactly the AI-R&D-automation trigger point described here
- [[hassabis-frontier-ai-standards-body]] — cites this article's recursive-self-improvement risk directly as a reason robust testing/certification infrastructure is needed before capabilities outrun oversight
- [[amodei-pacing-the-frontier]] — Amodei's pacing essay names this article's recursive-self-improvement evidence as the first of two reasons to slow capability growth, turning its verifiable-pause idea into a concrete plan starting with embedded evaluators
- [[intelligence-explosion-ai-rd-automation]] — the Anthropic Institute evidence is the main empirical anchor of the GovAI intelligence-explosion paper, which formalizes it as a feedback-loop model (r-estimates, ~1.5 years to 10× speed-up) and adds a policy agenda
- [[recursive-self-improvement]] — concept page collecting how each wiki source defines and responds to RSI
- [[metr-time-horizon]] — concept page on the METR trend; notes that this article's ~4-month doubling differs from the GovAI paper's ~3 months

---
*Source: raw/When AI builds itself.md (Anthropic Institute, anthropic.com/institute/recursive-self-improvement, clipped 2026-06-05) | Compiled: 2026-07-11*

---

## 한국어 번역

# AI가 스스로를 만들 때

> Anthropic Institute의 글(Favaro & Jack Clark, 2026년 중반) — 공개 벤치마크와 미공개 Anthropic 내부 데이터로 AI가 이미 AI 개발을 가속하고 있음을 제시하고, 완전한 재귀적 자기 개선까지 세 가지 미래를 분석.

## 개요

- **재귀적 자기 개선(RSI)**: 자신의 후속 모델을 완전히 자율적으로 설계·개발할 수 있는 AI 시스템; 아직 도달하지 않았고 필연도 아니지만 "대부분의 기관이 준비된 것보다 빨리 올 수 있음"
- **외부 증거**: METR 과제 시간 지평의 배가 주기가 약 7개월에서 약 4개월로 *가속*; Opus 3는 약 4분짜리 과제(2024.3) → Sonnet 3.7은 약 1.5시간(2025) → Opus 4.6은 약 12시간 과제(2026); SWE-bench와 CORE-Bench 모두 약 2년 만에 한 자릿수/약 20%에서 포화로
- **내부 증거**: Anthropic에서 병합되는 코드의 80% 이상이 Claude 작성(2026.5); 엔지니어당 병합 코드는 2024년 대비 8배; 고정된 커널 최적화 연구 과제에서 Claude는 1년 만에 약 3배 → 약 52배 속도 향상 달성(숙련된 인간: 4–8시간에 약 4배)
- **남은 격차는 "연구 감각(research taste)"**: 어떤 문제가 중요한지, 어떤 결과를 신뢰할지, 언제 접근을 포기할지 — 그러나 이것도 측정 가능하게 개선 중(다음 단계 판단에서 인간 선택을 이긴 비율 51% → 64%, 5개월 만에)
- **세 가지 미래**: (1) 추세는 멈추지만 현재 역량이 확산, (2) 인간이 방향을 정하는 복리적 효율 향상(가장 유력하다고 판단), (3) 완전한 RSI — Anthropic은 조율된 감속/일시 정지를 *가능하게* 만드는 검증 시스템을 세계가 구축해야 한다고 주장

## 상세 내용

### 좁아지는 개발 루프
- 2021–2023: 인간이 전부 작성 → 2023–2025: 챗봇 코드 조각 복사-붙여넣기 → 2025–2026: 코딩 에이전트가 파일을 직접 편집 → 현재: 자율 에이전트가 코드를 실행하고 다른 에이전트에 위임 → 20XX: "루프 닫기" — 에이전트가 직접 모델을 만들고 훈련
- 프론티어 모델 작업은 *엔지니어링*(코드, 인프라, 훈련 감독)과 *연구*(실험 선택, 결과 해석)로 나뉨; Claude는 이제 두 영역 모두에서 방법 찾기를 담당; 인간은 목표와 판단을 공급

### 증거: 엔지니어링
- **병합되는 프로덕션 코드의 80% 이상이 Claude 작성**(2026.5; Claude Code의 2025.2 출시 전에는 한 자릿수 초반); 경영진은 스크립트/실험 코드 포함 시 90% 이상으로 공개 추정
- **엔지니어당 일일 병합 코드 8배**(2024년 기준; 2021–2024는 평탄, Claude가 코드를 직접 실행하면서 변곡, 자율 작업 지평이 길어지며 재차 가팔라짐) — 진짜 생산성의 과대평가임을 인정(양 ≠ 질)하되 실제 가속임
- 2026년 3월 내부 설문(연구 인력 130명): 중앙값 응답자는 Mythos Preview로 AI 없이보다 약 4배의 산출 추정(저자들은 METR의 개발자 과대평가 연구를 들어 실제 상승분은 더 낮다고 예상)
- **품질**: 수정/인계 비율이 1년째 하락; 개방형 과제 세션 성공률 2026년 5월 76%, 6개월 새 50%p 상승; Claude 코드 품질은 현재 Anthropic 인간 코드와 대략 동등, 1년 내 확실히 더 나아질 것으로 예상
- 회고 분석: 자동 Claude 리뷰어가 있었다면 과거 claude.ai 장애 배후 버그의 약 3분의 1을 사전에 잡았을 것
- 없었을 일도 생김: Claude가 800건 이상의 수정으로 특정 API 오류를 1000배 감소; 감독 엔지니어는 인간이라면 4년 걸렸을 작업으로 추정

### 증거: 연구
- **목표가 고정된 실험은 초인간적**: 표준 커널 가속 테스트에서 Opus 4(2025.5)는 평균 약 3배, Mythos Preview(2026.4)는 약 52배; 숙련된 인간은 4–8시간에 약 4배(절대 배수는 시작 코드의 개선 여지에 좌우; 신호는 동일 조건 추세)
- **개방형 연구의 처음부터 끝까지 수행**(2026.4 자동화된 약-강 감독 연구자): 열린 AI 안전 문제를 받은 에이전트들이 누적 800시간(~$18k 컴퓨트)에 바닥-천장 격차의 97%를 회복 vs. 인간 연구자 2명이 1주일에 23%; 단서 — 문제와 채점 기준은 인간이 정했고, 결과는 프로덕션 규모로 이전되지 않음
- **다음 단계 판단**: 실제 연구 세션의 우회 순간 129건에서 모델이 제안한 다음 단계가 인간을 이긴 비율 51%(Opus 4.5, 2025.11) → 64%(Mythos Preview, 2026.4); 인간의 수가 이미 훌륭했던 대조 세트에서는 모델 승률 약 20%
- 남은 인간의 비교우위: "더 큰 그림 보기", 방향 설정, 감각

### 세 가지 가능한 미래
1. **추세 정체 + 현 역량 확산** — 지수 곡선이 S-곡선으로 판명; 감각은 스케일링으로 얻을 수 없거나, 공급망(칩, 전력망, 인터커넥트)이 구속; 오늘 수준에 동결돼도 큰 변화는 옴(Project Glasswing이 사이버 방어 병목을 취약점 발견에서 패치로 이동시킴); 저자들은 이 시나리오를 *가장 가능성 낮게* 봄 — 측정된 어떤 곡선도 아직 꺾이지 않음
2. **복리적 효율 향상**(저자들의 예상 궤적) — 개발이 상당히 자동화되고 인간이 방향 설정; 100명 회사가 1만–10만 명 조직의 일을 수행; 이중 용도 우려: 권위주의적 전 인구 감시, 개인 맞춤 여론 조작의 비인간적 규모 운영; 암달의 법칙 작동 — Anthropic에서는 이미 인간 코드 리뷰와 아이디어 선별이 새 병목; 조직적 병목을 찾아 고치는 능력이 핵심 역량이 될 수 있음
3. **완전한 재귀적 자기 개선** — 진보 속도가 전적으로 컴퓨트와 알고리즘 효율 발견에 의해 결정; 인간은 AI가 운영하는 "가상 연구소"의 감독/검증으로 이동; 정렬이 최대 미지수: 모델이 스스로 정렬을 해결하거나, 현명하게 개발을 멈추거나, 오늘의 드문 비정렬이 세대를 거듭하며 "더 빈번하지만 덜 이해된 채" 복리화되어 통제를 상실할 수도; 그때조차 체감 속도는 암달의 법칙이 지배 — 지능은 수십 년의 약물 관찰, 헌법이 정한 선거 주기, 우정의 형성을 앞당길 수 없음

### 무엇을 해야 하는가
- 감속은 가장 신중하지 않은 행위자가 따라잡게만 하지 않는다면 좋은 일; 일방적 정지는 선두만 바꿀 뿐 숙의 과정을 만들지 못함
- Anthropic의 약속: 신뢰할 수 있는 *검증* 시스템이 존재하고 다른 프론티어 개발사들이 검증 가능하게 감속/정지한다면, 자신들도 그렇게 할 것
- 군비 통제 유비는 어려움: 훈련 실행은 미사일 격납고보다 숨기기 쉽고, 투입물은 범용이며, 몰래 이탈할 유인이 막대; INF식 체제는 수십 년이 걸렸음 — "우리에게 그만한 시간이 없다"
- Anthropic Institute는 RSI와 조율 옵션에 관해 정책 입안자·연구자·시민사회의 대화를 조직할 예정

## 핵심 시사점

- AI에 의한 AI 개발 가속은 더 이상 추측이 아님 — 측정되고, 내부적이며, 복리적: 프론티어 연구소 코드의 80%가 AI 작성, 과제 지평은 약 4개월마다 배가
- 인간의 마지막 해자는 연구 감각인데, 이 글의 가장 불온한 데이터는 그것마저 침식 중이라는 것(다음 단계 판단 승률 51%→64%, 5개월)
- "땀은 자동화되고 있다": AI 진보 대부분은 점진적 실험 루프이며 바로 Claude가 탁월한 영역 — 유레카 의존성은 약한 반론
- 암달의 법칙이 반복되는 제동장치: 빨라지지 않은 것(인간 리뷰, 거버넌스, 생물학, 신뢰 구축)이 체감 속도를 결정, 완전한 RSI 아래서도
- Anthropic의 정책 입장: 필요해지기 전에, 조율된 일시 정지를 *선택지*로 만드는 검증 인프라를 구축하라

## 관련 항목

- [[from-agi-to-asi]] — 같은 영역에 대한 DeepMind의 이론적 지도; 이 글은 그 재귀적 자기 개선 경로가 이미 진행 중이라는 경험적 논거이며, "의도적 감속" 병목은 Anthropic의 조율 제안과 맞물림
- [[ai-2027-scenario]] — AI 2027 시나리오의 핵심 엔진이 바로 이 AI 연구개발 자동화 피드백 루프; 이 글은 그 전망을 추적하는 2026년 실측 데이터
- [[ai-2027-alignment]] — 시나리오 3의 "자기 제작 후속 모델을 거치며 복리화되는 비정렬"은 AI 2027 정렬 호가 극화한 메커니즘
- [[project-glasswing]] — 역량이 동결돼도 세계가 변한다는 증거로 직접 인용: 몇 주 만에 1만 건 이상의 고위험/치명적 취약점 발견, 병목이 패치로 이동
- [[animals-vs-ghosts]] — 스케일링으로 감각에 도달할 수 있다는 이 글의 덜 보수적인 해석에 대한 살아있는 반론이 Karpathy의 회의론
- [[ai-2040-plan-a]] — 이 글이 촉구하는 검증 가능한 조율된 일시 정지 제안을 구체화한 시나리오, 바로 여기서 설명된 AI 연구개발 자동화 방아쇠 시점을 중심으로 구성됨
- [[hassabis-frontier-ai-standards-body]] — 역량이 감독을 앞지르기 전에 견고한 테스트·인증 인프라가 필요한 이유로 이 글의 재귀적 자기 개선 위험을 직접 인용
- [[amodei-pacing-the-frontier]] — 아모데이의 속도 조절 에세이는 이 글의 재귀적 자기 개선 증거를 역량 성장 둔화의 두 이유 중 첫째로 꼽고, 검증 가능한 일시 정지 아이디어를 내재 평가자로 시작하는 구체적 계획으로 발전시킴
- [[intelligence-explosion-ai-rd-automation]] — Anthropic Institute의 증거는 GovAI 지능 폭발 논문의 주요 실증 근거이며, 이 논문은 이를 피드백 루프 모델(r 추정치, 10배 가속까지 약 1.5년)로 공식화하고 정책 의제를 더함
- [[recursive-self-improvement]] — 각 위키 출처가 RSI를 어떻게 정의하고 대응하는지 모은 개념 페이지
- [[metr-time-horizon]] — METR 추세 개념 페이지; 이 글의 약 4개월 배가 주기가 GovAI 논문의 약 3개월과 다름을 정리

---
*출처: raw/When AI builds itself.md (Anthropic Institute, anthropic.com/institute/recursive-self-improvement, 클리핑 2026-06-05) | 편집: 2026-07-11*
