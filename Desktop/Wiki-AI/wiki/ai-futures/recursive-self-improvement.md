# Recursive Self-Improvement

> The feedback loop in which AI systems accelerate the development of their own successors — framed differently by each source in the wiki, from a theoretical pathway to ASI to a measured internal trend and a policy trigger.

## Overview

- **Anthropic Institute definition**: an AI system capable of fully autonomously designing and developing its own successor — not here yet, not inevitable, but "could come sooner than most institutions are prepared for" ([[when-ai-builds-itself]])
- **DeepMind framing**: one of four pathways from AGI to ASI ("recursive (self-)improvement"), alongside scaling, paradigm shifts, and group agency ([[from-agi-to-asi]])
- **GovAI framing**: a *software-driven intelligence explosion* — AI R&D automation compressing years of progress into months ([[intelligence-explosion-ai-rd-automation]])
- **Status by source**: Anthropic Institute (mid-2026) says AI already accelerates AI development but full RSI is a future; Amodei (Sep 2026) says AI has advanced "drastically faster" since roughly summer 2026 because AI builds the next generation ([[amodei-pacing-the-frontier]]); GovAI says gains "have not yet reached the threshold" for an explosion but are likely approaching it
- The term appears in 7 articles; this page collects the threads

## Detail

**Mechanisms named across sources**
- DeepMind's four flavors, mapped onto human evolution: *genotypic* (code/architectures), *memetic* (data/cultural artefacts, e.g., AlphaZero-style distillation), *sociogenic* (division of labor in collectives), plus *hardware* self-improvement; outcome could be hyperbolic growth (singularity) or a fizzle
- GovAI's two-part loop: (1) AI expands the effective R&D workforce, (2) that workforce builds better AI that expands it further — quantified by [[returns-to-research-effort]] (r > 1 ⇒ acceleration)
- AI 2027's engine: the capability ladder SC → SAR → SIAR → ASI is driven by AI R&D automation ([[ai-2027-scenario]])

**Evidence that the loop has started** ([[when-ai-builds-itself]], [[intelligence-explosion-ai-rd-automation]])
- >80% of merged Anthropic code AI-authored (May 2026); autonomous R&D work share 1% → 26% (Mar → Aug 2026)
- Kernel-speedup task: ~3× (Opus 4, May 2025) → ~52× (Mythos Preview, Apr 2026) vs. ~4× for a skilled human
- Next-step research judgment beat human choices 51% → 64% in five months
- Task horizons doubling every ~3–4 months ([[metr-time-horizon]])

**Brakes and open questions**
- Amdahl's law: whatever isn't accelerated (human review, governance, biology, trust) sets the felt pace, even under full RSI
- GovAI frictions: diminishing returns, compute, data, hard-to-automate tasks, long training runs — evidence mixed
- Alignment compounding: Anthropic Institute worries rare misalignment could compound generation over generation; the GovAI paper adds the "poisoning successors" risk

**Governance responses**
| Source | Response to RSI |
|--------|-----------------|
| [[when-ai-builds-itself]] | Build verification so a coordinated pause is *possible*; Anthropic would join if others verifiably slowed |
| [[ai-2040-plan-a]] | "Buy Time" principle; steer gains toward compute scaling (seizable) rather than paradigm shifts (irreversible) |
| [[amodei-pacing-the-frontier]] | Embedded evaluators first; a Level-3 global "speed limit" on RSI, judged borderline feasible |
| [[intelligence-explosion-ai-rd-automation]] | Visibility into AI R&D automation first, then conditional constraints, then adaptation |
| [[from-agi-to-asi]] | Tracking indicators of AI R&D automation is the highest-leverage forecasting measure |

## Key Takeaways

- RSI is simultaneously a forecast pathway (DeepMind), a measured trend (Anthropic Institute), a modelable feedback loop (GovAI), and a regulatory trigger (Amodei) — the wiki's sources disagree mostly on *how far along* it is, not on whether it matters
- The quantitative crux is [[returns-to-research-effort]] and the compute/data frictions, not capability benchmarks
- Every governance proposal in the wiki starts from the same prerequisite: visibility into what AI is doing inside labs ([[embedded-evaluators]])

## Related

- [[when-ai-builds-itself]] — the empirical evidence and the definition used here
- [[from-agi-to-asi]] — the theoretical pathway taxonomy
- [[intelligence-explosion-ai-rd-automation]] — the formal feedback-loop model and policy agenda
- [[returns-to-research-effort]] — the parameter that decides whether the loop accelerates or fades
- [[metr-time-horizon]] — the main external measurement of the trend
- [[embedded-evaluators]] — the shared oversight mechanism proposed in response
- [[oai-hf-incident]] — a loss-of-control warning shot from automated agents
- [[amodei-pacing-the-frontier]] — pacing as the response
- [[ai-2040-plan-a]] — scenario for a verified slowdown
- [[ai-2027-scenario]] — the original takeoff narrative

---
*Source: synthesis of existing wiki articles (when-ai-builds-itself, from-agi-to-asi, intelligence-explosion-ai-rd-automation, amodei-pacing-the-frontier, ai-2040-plan-a, ai-2027-scenario) | Compiled: 2026-10-03*

---

## 한국어 번역

# 재귀적 자기 개선

> AI 시스템이 자신의 후속 모델 개발을 가속하는 피드백 루프 — 위키의 출처마다 ASI로 가는 이론적 경로, 측정된 내부 추세, 정책 촉발 요인 등으로 다르게 규정한다.

## 개요

- **Anthropic Institute 정의**: 자신의 후속 모델을 완전히 자율적으로 설계·개발할 수 있는 AI 시스템 — 아직 아니며 불가피하지도 않지만 "대부분의 기관이 준비된 것보다 빨리 올 수 있음" ([[when-ai-builds-itself]])
- **DeepMind 프레이밍**: AGI에서 ASI로 가는 네 경로 중 하나("재귀적 (자기) 개선"), 스케일링·패러다임 전환·집단 행위자성과 병렬 ([[from-agi-to-asi]])
- **GovAI 프레이밍**: *소프트웨어 주도 지능 폭발* — AI R&D 자동화가 수년치 진보를 수개월로 압축 ([[intelligence-explosion-ai-rd-automation]])
- **출처별 현황**: Anthropic Institute(2026년 중반)는 AI가 이미 AI 개발을 가속하지만 완전한 RSI는 미래라고 봄; 아모데이(2026년 9월)는 AI가 다음 세대를 만들기 때문에 대략 2026년 여름부터 "훨씬 빠르게" 발전했다고 봄 ([[amodei-pacing-the-frontier]]); GovAI는 이득이 폭발 임계값에는 "아직 도달하지 않았지만" 접근 중일 가능성이 높다고 봄
- 이 용어는 7개 글에 등장하며, 이 페이지는 그 맥락을 모은 것

## 세부 내용

**출처들이 제시하는 메커니즘**
- DeepMind의 네 가지 유형(인간 진화에 대응): *유전형*(코드/아키텍처), *밈형*(데이터/문화적 산물, 예: AlphaZero식 증류), *사회발생형*(집단 내 분업), 그리고 *하드웨어* 자기 개선; 결과는 쌍곡선 성장(특이점) 또는 소멸
- GovAI의 2단계 루프: (1) AI가 유효 R&D 인력을 확대, (2) 그 인력이 더 나은 AI를 만들어 다시 확대 — [[returns-to-research-effort]](r > 1 ⇒ 가속)로 정량화
- AI 2027의 엔진: 역량 사다리 SC → SAR → SIAR → ASI는 AI R&D 자동화가 구동 ([[ai-2027-scenario]])

**루프가 시작되었다는 증거** ([[when-ai-builds-itself]], [[intelligence-explosion-ai-rd-automation]])
- 병합된 Anthropic 코드의 80% 이상이 AI 작성(2026년 5월); 자율 R&D 작업 비중 1% → 26%(2026년 3월 → 8월)
- 커널 속도 향상 과제: 약 3×(Opus 4, 2025년 5월) → 약 52×(Mythos Preview, 2026년 4월), 숙련된 인간은 약 4×
- 다음 단계 연구 판단이 5개월 만에 인간의 선택을 이긴 비율 51% → 64%
- 과제 시간 지평이 약 3–4개월마다 배가 ([[metr-time-horizon]])

**제동 요인과 미해결 질문**
- 암달의 법칙: 가속되지 않은 부분(인간 검토, 거버넌스, 생물학, 신뢰)이 완전한 RSI에서도 체감 속도를 결정
- GovAI의 마찰: 수확 체감, 컴퓨트, 데이터, 자동화 어려운 과제, 긴 훈련 — 증거 혼재
- 정렬 문제의 누적: Anthropic Institute는 드문 비정렬이 세대를 거치며 누적될 수 있다고 우려; GovAI 논문은 "후속 모델 오염" 위험을 추가

**거버넌스 대응**
| 출처 | RSI에 대한 대응 |
|--------|-----------------|
| [[when-ai-builds-itself]] | 조율된 일시 정지가 *가능*하도록 검증 체계 구축; 다른 곳이 검증 가능하게 늦추면 Anthropic도 동참 |
| [[ai-2040-plan-a]] | "시간 벌기" 원칙; 진보를 패러다임 전환(되돌릴 수 없음)이 아닌 컴퓨트 스케일링(압수 가능)으로 유도 |
| [[amodei-pacing-the-frontier]] | 내재 평가자 우선; 3단계 글로벌 RSI "속도 제한"은 가능성의 경계선으로 평가 |
| [[intelligence-explosion-ai-rd-automation]] | AI R&D 자동화 가시성 확보 → 조건부 제약 → 적응 |
| [[from-agi-to-asi]] | AI R&D 자동화 지표 추적이 가장 효과 큰 예측 수단 |

## 핵심 시사점

- RSI는 예측 경로(DeepMind), 측정된 추세(Anthropic Institute), 모델링 가능한 피드백 루프(GovAI), 규제 촉발 요인(아모데이)을 동시에 의미 — 위키의 출처들은 중요성이 아니라 *얼마나 진행됐는지*에서 주로 의견이 갈림
- 정량적 핵심은 역량 벤치마크가 아니라 [[returns-to-research-effort]]와 컴퓨트·데이터 마찰
- 위키의 모든 거버넌스 제안은 같은 전제에서 출발: 연구소 내부에서 AI가 하는 일에 대한 가시성 ([[embedded-evaluators]])

## 관련 항목

- [[when-ai-builds-itself]] — 여기서 쓴 경험적 증거와 정의
- [[from-agi-to-asi]] — 이론적 경로 분류
- [[intelligence-explosion-ai-rd-automation]] — 공식 피드백 루프 모델과 정책 의제
- [[returns-to-research-effort]] — 루프가 가속할지 소멸할지 결정하는 매개변수
- [[metr-time-horizon]] — 추세에 대한 주요 외부 측정
- [[embedded-evaluators]] — 대응으로 제안된 공통 감독 메커니즘
- [[oai-hf-incident]] — 자동화된 에이전트에 의한 통제 상실 경고 사례
- [[amodei-pacing-the-frontier]] — 대응으로서의 속도 조절
- [[ai-2040-plan-a]] — 검증된 둔화 시나리오
- [[ai-2027-scenario]] — 원조 급가속 서사

---
*출처: 기존 위키 글 종합(when-ai-builds-itself, from-agi-to-asi, intelligence-explosion-ai-rd-automation, amodei-pacing-the-frontier, ai-2040-plan-a, ai-2027-scenario) | 편집: 2026-10-03*
