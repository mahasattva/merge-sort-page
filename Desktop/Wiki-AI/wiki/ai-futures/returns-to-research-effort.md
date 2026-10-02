# Returns to Research Effort (the r-model)

> The parameter r = ω/ε that decides whether automating AI R&D produces accelerating progress (r > 1), steady progress (r = 1), or fading progress (r < 1) — and the GovAI paper's worked calculation of how fast acceleration could be.

## Overview

- Source model: software quality A grows as dA/dt = A^(1−ω) · E^ε, where E = effective R&D labor, ω = returns to scale on labor, ε = diminishing returns to finding new ideas ([[intelligence-explosion-ai-rd-automation]], Supplementary Materials)
- Under full automation E ∝ A (more efficient AI ⇒ more AI researchers, or more capable ones), giving dA/dt = c·A^(ε−ω+1)
- Growth *rate* rises with A only if ω > ε, i.e. **r = ω/ε > 1**
- Empirical estimates (Ho & Whitfill, three AI subfields): central r between 1.2 and 1.9; averaged ω = 1.40, ε = 1.01
- Headline result: tenfold faster progress within ~1.5 years; a year of today's progress in ~5 weeks — if r stays at these levels and no other bottleneck binds

## Detail

**Interpretation of r**
| r | Meaning |
|---|---------|
| < 1 | Diminishing returns dominate; AI progress fades over time |
| = 1 | Labor growth and diminishing returns offset; constant rate |
| > 1 | Labor growth wins; progress accelerates while the condition holds |

**Worked calculation (as given in the paper)**
- ω − ε = 0.39 → each doubling of A multiplies the growth rate by 2^0.39 ≈ 1.31, so each doubling takes ~76% as long as the previous one
- Tenfold growth-rate increase needs log₂(10)/0.39 ≈ 8.5 doublings
- First doubling ≈ 4.5 months (training-compute-efficiency doubling time); geometric sum over 9 doublings ≈ 17 months ≈ 1.5 years
- r must eventually fall below 1 at computational and physical limits

**Why true r might differ**
- *Upward bias*: estimates come from a period of rapid compute scaling, confounding software with compute; some gains (e.g., transformers) are scale-dependent; r here counts labor only, so it is lower than if all inputs were counted
- *Reasons true r could be higher*: post-training and tool-use scaffolding are ignored; many mediocre researchers may not substitute for one genius, so capability gains may expand effective labor superlinearly; compute bottlenecks can be circumvented
- *Proxy noise*: labor proxied by unique paper authors per subfield; domain boundaries matter
- *Model validity*: validated only at few-percent annual growth; implies infinite progress in finite time at infinite labor, which serial problems and hardware speed rule out
- 90% credible intervals for r: (0.727–2.094), (0.380–2.708), (1.069–3.212) — only the third lies fully above 1

**Not captured by r**: compute and data bottlenecks (ignored for simplicity in the model), time-intensive steps such as 3+ month training runs

## Key Takeaways

- r is the single number the intelligence-explosion debate turns on — and the wiki's only quantified estimate rests on one source's three subfield fits with wide intervals
- The "~1.5 years to 10×" result is conditional on r staying at current estimates and on no other bottleneck binding; the paper itself flags compute, hard-to-automate tasks, and training time as unresolved
- Estimating r better requires data inside companies on how R&D spending splits between humans, experiment compute, and compute running AI researchers — a concrete argument for [[embedded-evaluators]] and mandatory reporting
- Anthropic Institute's Amdahl's-law argument ([[when-ai-builds-itself]]) is the qualitative counterpart: parts that don't speed up set the pace

## Related

- [[intelligence-explosion-ai-rd-automation]] — the paper this model comes from
- [[recursive-self-improvement]] — the phenomenon r governs
- [[when-ai-builds-itself]] — measured acceleration that r-based forecasts need to be reconciled with
- [[from-agi-to-asi]] — DeepMind's hyperbolic-growth-or-fizzle framing is the same fork expressed qualitatively
- [[metr-time-horizon]] — external trend data used to set the first-doubling time and the mid-2028 extrapolation

---
*Source: raw/intelligence-explosion.pdf (GovAI Frontier AI Working Paper Series No. 2/2026, main text + Supplementary Materials) | Compiled: 2026-10-03*

---

## 한국어 번역

# 연구 노력 수익률 (r 모델)

> AI R&D 자동화가 가속하는 진보(r > 1), 일정한 진보(r = 1), 소멸하는 진보(r < 1) 중 무엇을 낳을지 결정하는 매개변수 r = ω/ε — 그리고 가속이 얼마나 빠를 수 있는지에 대한 GovAI 논문의 계산 예시.

## 개요

- 원 모델: 소프트웨어 품질 A는 dA/dt = A^(1−ω) · E^ε로 성장; E = 유효 R&D 노동, ω = 노동에 대한 규모 수익, ε = 새 아이디어 발견의 수확 체감 ([[intelligence-explosion-ai-rd-automation]], 보충자료)
- 완전 자동화에서 E ∝ A(더 효율적인 AI ⇒ 더 많거나 더 유능한 AI 연구자) → dA/dt = c·A^(ε−ω+1)
- 성장 *률*이 A와 함께 증가하려면 ω > ε, 즉 **r = ω/ε > 1**
- 경험적 추정(Ho & Whitfill, AI 세부 분야 3곳): r 중앙 추정치 1.2–1.9; 평균 ω = 1.40, ε = 1.01
- 핵심 결과: 약 1.5년 내 10배 빠른 진보; 오늘 속도 기준 1년치 진보가 약 5주 — r이 이 수준을 유지하고 다른 병목이 작용하지 않는 경우

## 세부 내용

**r의 해석**
| r | 의미 |
|---|---------|
| < 1 | 수확 체감이 우세; AI 진보가 시간이 지나며 소멸 |
| = 1 | 노동 증가와 수확 체감이 상쇄; 일정한 속도 |
| > 1 | 노동 증가가 우세; 조건이 유지되는 동안 진보 가속 |

**계산 예시(논문 제시)**
- ω − ε = 0.39 → A가 두 배가 될 때마다 성장률이 2^0.39 ≈ 1.31배, 각 배가는 직전의 약 76% 시간 소요
- 성장률 10배 증가에 log₂(10)/0.39 ≈ 8.5회 배가 필요
- 첫 배가 ≈ 4.5개월(훈련 컴퓨트 효율 배가 주기); 9회 배가의 등비합 ≈ 17개월 ≈ 1.5년
- r은 계산·물리적 한계에서 결국 1 아래로 떨어져야 함

**실제 r이 다를 수 있는 이유**
- *상향 편향*: 추정치가 급속한 컴퓨트 확대기에서 나와 소프트웨어와 컴퓨트가 교란됨; 일부 이득(예: 트랜스포머)은 규모 의존적; 여기서 r은 노동만 계산하므로 모든 투입을 계산할 때보다 낮음
- *실제 r이 더 높을 수 있는 이유*: 사후 훈련과 도구 사용 스캐폴딩 무시; 평범한 연구자 다수가 천재 한 명을 대체하지 못할 수 있어 역량 향상이 유효 노동을 선형 이상으로 확대할 수 있음; 컴퓨트 병목은 우회 가능
- *대리 변수 잡음*: 노동을 세부 분야별 고유 논문 저자 수로 대리; 분야 경계가 중요
- *모델 타당성*: 연 수 퍼센트 성장에서만 검증됨; 무한 노동에서 유한 시간 내 무한 진보를 함의하나 순차적 문제와 하드웨어 속도가 이를 배제
- r의 90% 신용구간: (0.727–2.094), (0.380–2.708), (1.069–3.212) — 세 번째만 구간 전체가 1 위

**r이 포착하지 못하는 것**: 컴퓨트·데이터 병목(모델 단순화를 위해 무시), 3개월 이상 훈련 같은 시간 집약적 단계

## 핵심 시사점

- r은 지능 폭발 논쟁이 달려 있는 단일 수치 — 그리고 위키의 유일한 정량 추정은 한 출처의 세부 분야 3개 적합치와 넓은 구간에 의존
- "약 1.5년에 10배" 결과는 r이 현재 추정치를 유지하고 다른 병목이 없다는 조건부; 논문 스스로 컴퓨트, 자동화 어려운 과제, 훈련 시간을 미해결로 지적
- r을 더 잘 추정하려면 R&D 지출이 인간, 실험 컴퓨트, AI 연구자 구동 컴퓨트에 어떻게 나뉘는지 기업 내부 데이터가 필요 — [[embedded-evaluators]]와 의무 보고를 뒷받침하는 구체적 논거
- Anthropic Institute의 암달의 법칙 논거([[when-ai-builds-itself]])는 질적 대응물: 가속되지 않는 부분이 속도를 결정

## 관련 항목

- [[intelligence-explosion-ai-rd-automation]] — 이 모델의 출처 논문
- [[recursive-self-improvement]] — r이 지배하는 현상
- [[when-ai-builds-itself]] — r 기반 예측과 조정되어야 할 측정된 가속
- [[from-agi-to-asi]] — DeepMind의 쌍곡선 성장 또는 소멸이라는 프레이밍은 같은 분기점의 질적 표현
- [[metr-time-horizon]] — 첫 배가 시간과 2028년 중반 외삽을 설정하는 데 쓰인 외부 추세 데이터

---
*출처: raw/intelligence-explosion.pdf (GovAI Frontier AI Working Paper Series No. 2/2026, 본문 + 보충자료) | 편집: 2026-10-03*
