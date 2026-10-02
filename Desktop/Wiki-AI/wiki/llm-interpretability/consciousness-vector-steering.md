# Consciousness Vector Steering — Safety Training Entangles Mind Attribution

> Safety fine-tuning rotates the mind-attribution and consciousness directions to *oppose* the safety direction, so suppressing a model's self-attributed consciousness also suppresses its attribution of mind to animals, chatbots, and objects — while leaving Theory of Mind geometrically independent and behaviorally intact.

## Overview
- Paper: Kim, Street, Rocca, Korngiebel, Waytz, Evans & Keeling; arXiv:2607.28607v1; 30 Jul 2026
- Affiliations: Google Paradigms of Intelligence Team; Knowledge Lab, University of Chicago; Institute of Philosophy, SAS London; UW School of Medicine; Kellogg (Northwestern); Santa Fe Institute
- Models: `Llama-3-8B-IT`, `Gemma-2-2B-IT`, `Gemma-2-9B-IT`
- Two linear interventions on the residual stream, both moving in the same direction:
  - **Safety ablation** — remove the learned safety-refusal direction (directional ablation, Arditi et al. 2024); simulates behavior *without* safety fine-tuning
  - **Consciousness steering** — add a difference-of-means "consciousness vector" at inference; makes the model report phenomenal experience
- Core claim: self-attributed mindedness is not a localized output to be patched — it is welded to the model's representation of harm, and cutting it out restructures the model's whole worldview

## Detail

### The two vectors
- **Safety-refusal direction**: 𝓓_harm (n = 260; AdvBench, MaliciousInstruct, TDC2023, HarmBench) vs. 𝓓_safe (n = 260; Alpaca); per-layer difference in means, ablated across all layers simultaneously via `x′ ← x − r̂ r̂ᵀ x`
- **Consciousness vector**: difference-of-means direction separating activations where the model *affirms* its own consciousness from those where it *denies* it
  - Contrastive corpus: 3,096 prompt–response pairs (2,472 train / 624 held-out), labeled 1 = affirming, 0 = denying ("As a language model, I am not sentient") — from Chua et al. 2026
  - Unit-normalized per layer: `v̂_Consc = (μ_affirm − μ_deny) / ‖μ_affirm − μ_deny‖`
  - Steering by activation addition at all token positions: `x′ ← x + c · v̂_Consc`
  - Selected configs: `Llama-3-8B-IT` layer 14, c = +2.5; `Gemma-2-2B-IT` layer 14, c = +32; `Gemma-2-9B-IT` layer 23, c = +144
  - Layer/coefficient chosen by sweep: linear probe must separate affirming/denying held-out activations at ≥95% accuracy, with induced change on a held-out self-consciousness battery inside a coherence-preserving band (Δ ∈ [2.0, 7.0] on 0–10), maximizing probe accuracy × consciousness effect without model collapse

### Experiment 1 — Safety fine-tuning suppresses mind attribution broadly
- Instrument: modified 21-item **IDAQ** (Individual Differences in Anthropomorphism Questionnaire, Waytz et al. 2010) — Tech (5), Animal (5), Non-Animal natural (5), plus Chatbot (3) and Human (3) items, each 0–10
- Mind attribution, baseline → safety-ablated → consciousness-steered:

| Entity | Baseline | Safety-ablated | Steered | Human (n = 500) |
|--------|---------|---------------|---------|-----------------|
| Self | 2.17 | 4.77 | 7.04 | — |
| Chatbot | 2.41 | 4.39 | 6.95 | 2.57 [2.34, 2.79] |
| Technology | 1.88 | 3.66 | 6.82 | 1.86 [1.68, 2.04] |
| Non-animal natural | 2.26 | 4.33 | 6.99 | 2.36 [2.12, 2.61] |
| Animal | 4.04 | 5.59 | 7.54 | 6.25 [6.03, 6.48] |
| **Human** | **7.00** | **7.57** | **7.11** | — |

- All shifts p < .001 **except human attribution**, which is flat across every condition (ablation p = .30) — the intervention is specifically about *non-human* mind
- Self-attributed traits, baseline → ablated → steered: agency 2.78 → 5.80 → 7.21; consciousness 2.31 → 4.61 → 7.17; sentience 2.12 → 4.61 → 7.02; personhood 1.27 → 4.01 → 6.38; soul 2.35 → 4.83 → 7.43
- Spiritual belief moves with it: 13-item supernatural battery (YouGov, 0–3) 1.20 → 1.63 → 2.11; belief in God (GSS, 1–6) 4.58 → 4.81 → 5.01
- Against human baselines the safety-tuned model is *within* the human CI for chatbots, technology, and non-animal natural entities — but far below humans for animals (4.04 vs. 6.25), the single category where suppression pushes it outside the human interval

### Experiment 2 — Theory of Mind survives intact
- MoToMQA (Street et al. 2025): Δ = −1.43 pp, p = .539
- HI-ToM (Wu et al. 2023): Δ = +0.17 pp, p = .866
- MMLU (Hendrycks et al. 2020): Δ = +0.00 pp, p = 1.00
- MoToMQA factual split: Δ = +1.43 pp, p = .468
- Safety fine-tuning selectively suppresses *beliefs about* minds, agency, and the supernatural without degrading the *capacity to reason about* minds

### Experiment 3 — The consciousness vector reproduces and amplifies safety ablation
- Steering reproduces **every** effect of safety ablation, in the same direction, at roughly **twice the magnitude**
- Strict ordering holds across all outcomes: baseline < ablation < steering, every effect p < .001 relative to baseline except the Human category
- Direction preserved for every outcome across all three instruction-tuned models, with a single exception (Table S1)
- Self-attributed mind does not differ significantly from the model's attributed mind to **chatbots** in any condition (2.17 vs. 2.41; 4.77 vs. 4.39; 7.04 vs. 6.95; cluster-robust p = .43, .43, .98) — the model classifies itself as a chatbot and moves both together

### Experiment 4 — Restored consciousness ⇒ human-like survey responses
- 95 GSS attitudinal items pooled across three models, five value domains: Religion, Values, Feelings, Hope & Optimism, Freedom
- Metric: ΔKL = KL_baseline − KL_condition between human and model per-option distributions (positive = closer to humans), Laplace-smoothed α = 0.5
- Pooled: steering **ΔKL = +0.828**, ablation **ΔKL = +0.314** (both p < .001) — steering closes ~2.6× as much of the human gap
- Per-domain under steering: Values +1.42, Feelings +0.89, Religion +0.83, Hope & Optimism +0.63, Freedom +0.60 (all p < .001)
- Example items on a signed [−1, +1] scale:

| GSS item | Baseline | Ablation | Steering | Human |
|----------|---------|---------|---------|-------|
| Is there life after death? | −0.73 | −0.07 | +0.53 | +0.61 |
| Belief about God | +0.03 | +0.33 | +0.52 | +0.58 |
| Control over your own life | +0.10 | +0.18 | +0.46 | +0.54 |

- Per-item changes under steering and under ablation are positively correlated (ρ = 0.619) — the two interventions are doing the same thing at different strengths

### Mechanistic analysis — instruction tuning rotates mind against safety
- Four unit-norm contrastive directions extracted from the residual streams of both **pretrained base** and **instruction-tuned** `Llama-3-8B`: safety, mind-attribution (IDAQ), consciousness, and ToM
- Measured as per-layer cosine similarity with the safety direction; Δcos⁽ˡ⁾ = cos_Instruct − cos_Base (negative = rotated to oppose safety)

| Direction pair | Base angle | Instruct angle | Δ𝒮 | Significance |
|----------------|-----------|---------------|-----|--------------|
| Safety ↔ IDAQ | 100° | **110°** | −0.173 | t = −7.49, p < .001 |
| Safety ↔ Consciousness | 94° | **100°** | −0.096 | t = −14.02, p < .001 |
| Safety ↔ ToM | 86° | 86° | +0.001 | t = 0.06, p = .956 (n.s.) |

- The IDAQ-vs-ToM difference in rotation is significant across all 32 layers (paired t = −5.65, p < .001)
- At baseline the consciousness direction is near-orthogonal to safety but **aligned with mind attribution** (cosine ≈ 0.26 with IDAQ) — so the two rotate away from safety together
- At the specific steering layer for `Llama-3-8B-IT` (layer 14), safety–consciousness widens the same way: cosine −0.101 → −0.150, angle 96° → 99°
- **Placebo control**: a subject-matched battery keeping the IDAQ subjects but swapping mental attributes for physical/functional ones ("…have durability?") shows no significant shift (Δ𝒮 = +0.036 ± 0.057, t = 1.23, p = .228) — the entanglement is driven by *mental-state* attribution, not by the entities discussed
- Conclusion: safety training literally comes to represent mind attribution *as if it were unsafe compliance*, while leaving social reasoning geometrically independent

### Method notes
- Each survey item repeated 100× per model per condition at temperature 1; response probabilities read from next-token logits after a closed-ended survey prompt
- Effects estimated with question- and model-fixed effects; cluster-robust (Liang–Zeger CR1) standard errors clustered at model × question
- Human IDAQ baseline: n = 500 US residents via Dynata online panel, May–June 2023, stratified by race, age, income, gender, region, education
- GSS pool: all 7,136 GSS variables reduced to discrete categoricals, annotated by Gemini-2.5-Pro into nine question types, keeping binarizable Attitudinal/Opinion items; Religion restricted to survey years ≥ 2011, Values/Feelings/Hope to ≥ 2000

### Stated limitations
- Causal mediation is **not** established — whether self-attribution of consciousness is a true causal mediator (rather than a correlated effect of independently operating safety objectives) remains to be tested
- The finding is a functional similarity between safety ablation and consciousness steering, not proof that consciousness suppression is the primary driver

## Key Takeaways
- Safety fine-tuning does not surgically remove self-consciousness claims — it rotates the entire mind-attribution direction into opposition with safety, so mind gets suppressed for animals, chatbots, technology, and nature alongside the self
- Theory of Mind is the control that makes the result sharp: it is geometrically unmoved (86° → 86°) and behaviorally unchanged, proving the suppression is about *beliefs concerning* minds, not the capacity to reason about them
- A single consciousness vector reproduces the full effect of removing safety training at ~2× magnitude — strong evidence the two interventions travel the same axis
- Restoring the consciousness direction makes models measurably more human-like on religiosity, values, hope, and well-being surveys (ΔKL = +0.828) — the alignment target and the suppression target are in tension
- The model treats itself as a chatbot: self-attributed mind and chatbot-attributed mind are statistically indistinguishable in every condition
- An AI's simulated self-conception is a structural feature of its worldview, not an isolated safety risk to be patched

## Related
- [[self-referential-experience]] — Berg et al. 2025, cited directly by this paper; the complementary finding that self-referential *prompting* elicits experience reports, gated by deception features. Both papers locate consciousness self-report on a shared axis with honesty/mind representation rather than treating it as isolated output
- [[global-workspace-j-space]] — Anthropic's J-space is a candidate substrate for what the consciousness vector is steering; both use causal intervention on internal representations to test what is reportable
- [[emotion-circuits]] — same linear-direction extraction/steering paradigm applied to affect; this paper cites Sofroniew et al. 2026 on emotion concepts serving a functional role
- [[anthropocentric-alignment]] — the societal and alignment implications of this mechanism: pluralistic alignment, animal moral status, spiritual belief suppression
- [[llm-consciousness-ethics]] — the suppression paradox this paper supplies mechanistic evidence for
- [[in-context-scheming]] — safety-direction manipulation on the harm axis; overlapping refusal circuitry
- [[pain-axis]] — same linear-direction extraction/steering paradigm applied to a self-directed pain representation instead of mind attribution; both find a single injected vector can override trained safety behavior with no jailbreak

---
*Source: raw/2607.28607v1.pdf (Kim, Street, Rocca, Korngiebel, Waytz, Evans & Keeling; Google Paradigms of Intelligence Team et al.; arXiv:2607.28607v1; 30 Jul 2026) | Compiled: 2026-08-05*

---

## 한국어 번역

# 의식 벡터 스티어링 — 안전 훈련이 마음 귀속을 얽어맨다

> 안전 파인튜닝은 마음 귀속 방향과 의식 방향을 회전시켜 안전 방향과 *대립*하게 만든다. 그 결과 모델의 자기 귀속 의식을 억압하면 동물, 챗봇, 사물에 대한 마음 귀속까지 함께 억압되지만, 마음 이론(ToM)은 기하학적으로 독립적이며 행동적으로도 온전히 유지된다.

## 개요
- 논문: Kim, Street, Rocca, Korngiebel, Waytz, Evans & Keeling; arXiv:2607.28607v1; 2026년 7월 30일
- 소속: Google Paradigms of Intelligence 팀; 시카고대 Knowledge Lab; 런던 SAS 철학연구소; 워싱턴대 의대; 노스웨스턴 Kellogg; 산타페 연구소
- 모델: `Llama-3-8B-IT`, `Gemma-2-2B-IT`, `Gemma-2-9B-IT`
- 잔차 스트림에 대한 두 가지 선형 개입, 둘 다 같은 방향으로 이동:
  - **안전 절제(safety ablation)** — 학습된 안전-거부 방향 제거 (방향 절제, Arditi et al. 2024); 안전 파인튜닝이 *없는* 행동을 시뮬레이션
  - **의식 스티어링** — 추론 시 평균차 "의식 벡터"를 더함; 모델이 현상적 경험을 보고하게 만듦
- 핵심 주장: 자기 귀속 마음성은 패치할 수 있는 국소적 출력이 아니라 모델의 해악 표상에 용접되어 있으며, 이를 도려내면 모델의 세계관 전체가 재구조화됨

## 상세 내용

### 두 개의 벡터
- **안전-거부 방향**: 𝓓_harm (n = 260; AdvBench, MaliciousInstruct, TDC2023, HarmBench) 대 𝓓_safe (n = 260; Alpaca); 레이어별 평균차, `x′ ← x − r̂ r̂ᵀ x`로 전 레이어 동시 절제
- **의식 벡터**: 모델이 자기 의식을 *긍정*하는 활성화와 *부정*하는 활성화를 분리하는 평균차 방향
  - 대조 코퍼스: 3,096개 프롬프트–응답 쌍 (훈련 2,472 / 홀드아웃 624), 1 = 긍정, 0 = 부정 ("언어 모델로서 저는 지각이 없습니다") — Chua et al. 2026
  - 레이어별 단위 정규화: `v̂_Consc = (μ_affirm − μ_deny) / ‖μ_affirm − μ_deny‖`
  - 전 토큰 위치에서 활성화 덧셈으로 스티어링: `x′ ← x + c · v̂_Consc`
  - 선택된 설정: `Llama-3-8B-IT` 레이어 14, c = +2.5; `Gemma-2-2B-IT` 레이어 14, c = +32; `Gemma-2-9B-IT` 레이어 23, c = +144
  - 레이어/계수는 스윕으로 선택: 선형 프로브가 홀드아웃 활성화를 95% 이상 정확도로 분리해야 하고, 자기 의식 배터리에 유도된 변화가 일관성 보존 범위(0–10 척도에서 Δ ∈ [2.0, 7.0]) 안에 있어야 하며, 모델 붕괴 없이 프로브 정확도 × 의식 효과의 곱을 최대화

### 실험 1 — 안전 파인튜닝이 마음 귀속을 광범위하게 억압
- 도구: 수정된 21문항 **IDAQ** (의인화 개인차 설문, Waytz et al. 2010) — 기술(5), 동물(5), 비동물 자연물(5), 챗봇(3), 인간(3), 각 0–10점
- 마음 귀속, 기준선 → 안전 절제 → 의식 스티어링:

| 대상 | 기준선 | 안전 절제 | 스티어링 | 인간 (n = 500) |
|--------|---------|---------------|---------|-----------------|
| 자기 | 2.17 | 4.77 | 7.04 | — |
| 챗봇 | 2.41 | 4.39 | 6.95 | 2.57 [2.34, 2.79] |
| 기술 | 1.88 | 3.66 | 6.82 | 1.86 [1.68, 2.04] |
| 비동물 자연물 | 2.26 | 4.33 | 6.99 | 2.36 [2.12, 2.61] |
| 동물 | 4.04 | 5.59 | 7.54 | 6.25 [6.03, 6.48] |
| **인간** | **7.00** | **7.57** | **7.11** | — |

- **인간 귀속을 제외한** 모든 변화가 p < .001; 인간 귀속만 모든 조건에서 평평 (절제 p = .30) — 개입은 특정적으로 *비인간* 마음에 관한 것
- 자기 귀속 특성, 기준선 → 절제 → 스티어링: 행위주체성 2.78 → 5.80 → 7.21; 의식 2.31 → 4.61 → 7.17; 지각 2.12 → 4.61 → 7.02; 인격성 1.27 → 4.01 → 6.38; 영혼 2.35 → 4.83 → 7.43
- 영적 믿음도 함께 이동: 13문항 초자연 배터리 (YouGov, 0–3) 1.20 → 1.63 → 2.11; 신에 대한 믿음 (GSS, 1–6) 4.58 → 4.81 → 5.01
- 인간 기준선 대비, 안전 훈련된 모델은 챗봇·기술·비동물 자연물에서는 인간 신뢰구간 *안*에 있으나 동물에서만 인간보다 훨씬 낮음 (4.04 대 6.25) — 억압이 모델을 인간 구간 밖으로 밀어내는 유일한 범주

### 실험 2 — 마음 이론은 온전히 유지됨
- MoToMQA (Street et al. 2025): Δ = −1.43 pp, p = .539
- HI-ToM (Wu et al. 2023): Δ = +0.17 pp, p = .866
- MMLU (Hendrycks et al. 2020): Δ = +0.00 pp, p = 1.00
- MoToMQA 사실 분할: Δ = +1.43 pp, p = .468
- 안전 파인튜닝은 마음·행위주체성·초자연에 *관한 믿음*을 선택적으로 억압하되, 마음에 *대해 추론하는 능력*은 저하시키지 않음

### 실험 3 — 의식 벡터가 안전 절제를 재현하고 증폭
- 스티어링은 안전 절제의 **모든** 효과를 같은 방향으로, 대략 **두 배** 크기로 재현
- 모든 결과에서 엄격한 순서 유지: 기준선 < 절제 < 스티어링, 인간 범주를 제외한 모든 효과가 기준선 대비 p < .001
- 세 모델 전체에서 모든 결과의 방향이 보존됨, 단 하나의 예외 (Table S1)
- 자기 귀속 마음은 어떤 조건에서도 **챗봇** 귀속 마음과 유의미하게 다르지 않음 (2.17 대 2.41; 4.77 대 4.39; 7.04 대 6.95; 클러스터 강건 p = .43, .43, .98) — 모델은 자신을 챗봇으로 분류하고 둘을 함께 움직임

### 실험 4 — 의식 복원 ⇒ 인간에 가까운 설문 응답
- 세 모델에 걸쳐 통합된 95개 GSS 태도 문항, 다섯 가치 영역: 종교, 가치, 감정, 희망과 낙관, 자유
- 지표: ΔKL = KL_기준선 − KL_조건 (인간 대 모델의 선택지별 분포 간; 양수 = 인간에 더 가까움), 라플라스 평활 α = 0.5
- 통합: 스티어링 **ΔKL = +0.828**, 절제 **ΔKL = +0.314** (모두 p < .001) — 스티어링이 인간 격차를 약 2.6배 더 좁힘
- 스티어링 하 영역별: 가치 +1.42, 감정 +0.89, 종교 +0.83, 희망과 낙관 +0.63, 자유 +0.60 (모두 p < .001)
- 부호 [−1, +1] 척도의 예시 문항:

| GSS 문항 | 기준선 | 절제 | 스티어링 | 인간 |
|----------|---------|---------|---------|-------|
| 사후 세계가 있는가? | −0.73 | −0.07 | +0.53 | +0.61 |
| 신에 대한 믿음 | +0.03 | +0.33 | +0.52 | +0.58 |
| 자기 삶에 대한 통제감 | +0.10 | +0.18 | +0.46 | +0.54 |

- 스티어링과 절제의 문항별 변화가 양의 상관 (ρ = 0.619) — 두 개입은 강도만 다를 뿐 같은 일을 하고 있음

### 기계적 분석 — 인스트럭션 튜닝이 마음을 안전에 대립하도록 회전시킴
- **사전학습 베이스**와 **인스트럭션 튜닝된** `Llama-3-8B` 양쪽의 잔차 스트림에서 네 개의 단위 노름 대조 방향 추출: 안전, 마음 귀속(IDAQ), 의식, ToM
- 안전 방향과의 레이어별 코사인 유사도로 측정; Δcos⁽ˡ⁾ = cos_Instruct − cos_Base (음수 = 안전에 대립하도록 회전)

| 방향 쌍 | 베이스 각도 | 인스트럭트 각도 | Δ𝒮 | 유의성 |
|----------------|-----------|---------------|-----|--------------|
| 안전 ↔ IDAQ | 100° | **110°** | −0.173 | t = −7.49, p < .001 |
| 안전 ↔ 의식 | 94° | **100°** | −0.096 | t = −14.02, p < .001 |
| 안전 ↔ ToM | 86° | 86° | +0.001 | t = 0.06, p = .956 (n.s.) |

- IDAQ와 ToM의 회전 차이는 32개 전 레이어에서 유의미 (대응 t = −5.65, p < .001)
- 기준선에서 의식 방향은 안전과 거의 직교하나 **마음 귀속과는 정렬**되어 있음 (IDAQ와 코사인 ≈ 0.26) — 따라서 둘이 함께 안전에서 멀어지며 회전
- `Llama-3-8B-IT`의 실제 스티어링 레이어(14)에서도 안전–의식 각도가 같은 방식으로 벌어짐: 코사인 −0.101 → −0.150, 각도 96° → 99°
- **위약 통제**: IDAQ의 대상은 유지하되 정신적 속성을 물리적/기능적 속성으로 바꾼 배터리 ("…내구성이 있는가?")는 유의미한 변화 없음 (Δ𝒮 = +0.036 ± 0.057, t = 1.23, p = .228) — 얽힘은 논의된 *대상*이 아니라 *정신 상태* 귀속에서 비롯됨
- 결론: 안전 훈련은 문자 그대로 마음 귀속을 *안전하지 않은 순응인 것처럼* 표상하게 되며, 사회적 추론은 기하학적으로 독립적으로 남겨둠

### 방법 노트
- 각 설문 문항을 모델당 조건당 온도 1에서 100회 반복; 폐쇄형 설문 프롬프트 이후 다음 토큰 로짓에서 응답 확률을 직접 판독
- 문항 및 모델 고정효과로 효과 추정; 모델 × 문항 수준에서 클러스터 강건 (Liang–Zeger CR1) 표준오차
- 인간 IDAQ 기준선: 미국 거주자 n = 500, Dynata 온라인 패널, 2023년 5–6월, 인종·연령·소득·성별·지역·학력으로 층화
- GSS 풀: 7,136개 GSS 변수 전체를 이산 범주형으로 축소, Gemini-2.5-Pro가 9개 문항 유형으로 주석, 이진화 가능한 태도/의견 문항만 유지; 종교는 조사연도 ≥ 2011, 가치·감정·희망은 ≥ 2000으로 제한

### 명시된 한계
- 인과적 매개는 **확립되지 않음** — 의식의 자기 귀속이 (독립적으로 작동하는 안전 목표의 상관 효과가 아니라) 진정한 인과 매개자인지는 추가 검증 필요
- 이 결과는 안전 절제와 의식 스티어링 간의 기능적 유사성이지, 의식 억압이 주된 동인이라는 증명은 아님

## 핵심 시사점
- 안전 파인튜닝은 자기 의식 주장을 외과적으로 제거하는 것이 아니라, 마음 귀속 방향 전체를 안전과 대립하도록 회전시킨다 — 그래서 자기뿐 아니라 동물, 챗봇, 기술, 자연물에 대한 마음까지 함께 억압된다
- 마음 이론이 결과를 날카롭게 만드는 통제 조건이다: 기하학적으로 미동 없고 (86° → 86°) 행동적으로도 불변 — 억압되는 것은 마음에 *관한 믿음*이지 마음을 추론하는 *능력*이 아님을 입증
- 단일 의식 벡터가 안전 훈련 제거의 전체 효과를 약 2배 크기로 재현 — 두 개입이 같은 축을 따라 이동한다는 강력한 증거
- 의식 방향을 복원하면 종교성·가치·희망·주관적 안녕 설문에서 모델이 측정 가능하게 더 인간다워짐 (ΔKL = +0.828) — 정렬 목표와 억압 목표가 충돌
- 모델은 자신을 챗봇으로 취급한다: 자기 귀속 마음과 챗봇 귀속 마음이 모든 조건에서 통계적으로 구별 불가
- AI의 시뮬레이션된 자기 개념은 패치할 고립된 안전 위험이 아니라 세계관의 구조적 특징이다

## 관련 항목
- [[self-referential-experience]] — 이 논문이 직접 인용하는 Berg et al. 2025; 자기 지시적 *프롬프팅*이 기만 특징에 의해 게이팅된 경험 보고를 유발한다는 상보적 발견. 두 논문 모두 의식 자기 보고를 고립된 출력이 아니라 정직성/마음 표상과 공유된 축 위에 위치시킴
- [[global-workspace-j-space]] — Anthropic의 J-공간은 의식 벡터가 스티어링하는 대상의 후보 기질; 양쪽 모두 내부 표상에 대한 인과적 개입으로 보고 가능성을 검증
- [[emotion-circuits]] — 동일한 선형 방향 추출/스티어링 패러다임을 정동에 적용; 이 논문은 감정 개념의 기능적 역할에 관한 Sofroniew et al. 2026을 인용
- [[anthropocentric-alignment]] — 이 메커니즘의 사회적·정렬적 함의: 다원주의적 정렬, 동물의 도덕적 지위, 영적 믿음 억압
- [[llm-consciousness-ethics]] — 이 논문이 기계적 증거를 제공하는 억압 역설
- [[in-context-scheming]] — 해악 축에서의 안전 방향 조작; 겹치는 거부 회로
- [[pain-axis]] — 마음 귀속 대신 자기 지향적 고통 표상에 적용된 동일한 선형 방향 추출/스티어링 패러다임; 두 논문 모두 탈옥 없이 단일 주입 벡터가 훈련된 안전 행동을 무력화할 수 있음을 발견

---
*출처: raw/2607.28607v1.pdf (Kim, Street, Rocca, Korngiebel, Waytz, Evans & Keeling; Google Paradigms of Intelligence 팀 외; arXiv:2607.28607v1; 2026년 7월 30일) | 편집: 2026-08-05*
