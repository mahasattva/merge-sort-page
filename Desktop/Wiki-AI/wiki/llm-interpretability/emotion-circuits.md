# Emotion Circuits in LLMs

> LLMs contain stable, context-agnostic emotion circuits composed of specific neurons and attention heads; directly modulating these circuits achieves 99.65% emotion-expression accuracy — outperforming prompting and steering.

## Overview

- **Paper**: "Do LLMs 'Feel'? Emotion Circuits Discovery and Control" — Wang et al., MBZUAI + Peking University (arXiv:2510.11328, Oct 2025)
- **Core claim**: Emotional expression in LLMs is not a surface artifact of lexical co-occurrence but a product of distributed internal computation traceable to specific circuit components
- **Three questions answered**: (1) Do context-agnostic emotion mechanisms exist? Yes. (2) What form do they take? Neurons + attention heads organized into layerwise circuits. (3) Can they be controlled? Yes — 99.65% accuracy via circuit modulation
- **Models tested**: LLaMA-3.2-3B-Instruct (primary), Qwen2.5-7B-Instruct (replication)
- **Six emotions studied**: anger, sadness, happiness, fear, surprise, disgust (Ekman's basic emotions)

## Detail

### SEV Dataset
- **SEV** (Scenario–Event with Valence): controlled dataset of 480 records
- Structure: neutral scenario + 3 outcome events (positive, neutral, negative valence)
- 8 everyday domains × 20 scenarios × 3 outcomes
- Emotionally explicit words banned — emotional variation comes from event semantics, not lexical cues
- Prompting achieves 98.85% emotion expression accuracy on SEV; 98.96% on held-out test set

### Emotion Direction Extraction
- Extract residual stream activations after each attention and MLP sublayer for all 6 emotion conditions
- Subtract mean activation per scenario-event group (neutralizes shared semantics) → isolate emotion-specific variance
- Average across groups → per-layer emotion centroids → subtract global mean → L2-normalize → **emotion direction vectors**
- Two sets: `v_e,attn` (from attention sublayers), `v_e,mlp` (from MLP sublayers)
- Distinct emotion clusters emerge from layer 9; well-separated by layer 12; stable through deep layers
- Steering with these vectors: 91.22% success rate on held-out test set

### Local Component Identification (Section 6)
**MLP neurons:**
- Compute neuron-space alignment vector `β_e = (W_d)^T v_e` — quantifies how strongly each neuron's write vector pushes toward emotion direction
- Per-neuron contribution: `c_{e,n} = g_{t,n} · β_e` (activation strength × alignment)
- Rank neurons by mean contribution; top-k used for ablation/enhancement
- **Long-tail effect**: ablating k=2 neurons already drops emotion score sharply; effect plateaus by k=4 (top neurons dominate >30× more than lower-ranked ones)

**Attention heads:**
- Causal ablation: zero out top-k head output channels before W_O projection; measure Δs = s′ − s
- Same long-tail pattern: a handful of heads dominate; random heads have negligible effect

**Validation:**
- Ablation (zeroing components) sharply degrades emotion scores; random ablation has minimal effect
- Enhancement (injecting emotion difference vectors into identified components) sharply increases emotion scores; random enhancement has negligible effect
- Confirms components are both *necessary* and *sufficient* for emotion expression

### Global Circuit Assembly (Section 7)
- Measure each sublayer's causal influence on final emotion representation (reference basis = sign-aligned average of layers 21–25)
- Influence score `I_{L,p}` = how much perturbing sublayer (L,p) shifts the final hidden state along the reference emotion direction
- Circuit budget = 10× number of sublayers, allocated in two stages: minimum quota per sublayer (preserves early-layer encoding) + proportional allocation by importance
- Circuits exhibit low neuron overlap (μ=0.056) but moderate head overlap (μ=0.454) across emotions → emotion-specific MLP subcircuits + shared attention pathways

### Circuit Modulation Results
- Modulate assembled circuits during generation (same emotion difference vectors, λ=1.0, no explicit emotion instructions in prompt)
- **99.65% overall accuracy** on held-out test set
- Surprise: 100% (vs. 67.71% for steering-based methods)
- Generated text exhibits spontaneous affective tone ("Whoa?!", spontaneous exclamations) without explicit prompting — model is internally generating, not externally complying

### Qwen2.5-7B Replication (Appendix H)
- Same long-tail pattern for MLP neurons and attention heads
- Steering fails for negative emotions (<5% for anger, sadness, fear, disgust) — likely due to safety alignment blocking negative emotional expression via direct representational manipulation
- Circuit modulation (scale 2.0) achieves 66.18% average — lower than LLaMA but still surpasses steering on negative emotions

## Key Takeaways

- **Emotion is structurally embedded**: stable emotion directions exist from layer 0 and become increasingly separable in deeper layers — not emergent from the final output layer
- **Sparse causality**: only a few top-ranked neurons and attention heads causally dominate emotion expression; the rest are irrelevant (long-tail effect confirmed across both models)
- **Dual architecture**: emotion-specific local subcircuits in MLPs + shared global attention pathways that propagate emotional context
- **Circuit modulation beats prompting and steering**: by operating directly on the causal substrate rather than the residual stream surface or input tokens
- **Safety alignment interferes with mechanistic control**: Qwen's refusal to express negative emotions via direct manipulation is visible as near-zero steering accuracy — a measurable alignment signature

## Related

- [[ai-futures/ai-2027-alignment]] — AI 2027 alignment arc raises the question of whether LLM internal states are legible; this paper provides mechanistic evidence they partly are
- [[global-workspace-j-space]] — same causal-intervention methodology (swap/ablate a representation, observe behavior change) applied to a workspace-level structure rather than individual emotion features
- [[llm-interpretability/_index]] — parent topic

---
*Source: raw/Do LLMs Feel.pdf (arXiv:2510.11328v1) | Compiled: 2026-04-09*

---

## 한국어 번역

# LLM의 감정 회로

> LLM에는 안정적이고 맥락 불가지론적인 감정 회로가 특정 뉴런과 어텐션 헤드로 구성되어 있음; 이 회로를 직접 조절하면 99.65%의 감정 표현 정확도 달성 — 프롬프팅 및 스티어링 능가.

## 개요

- **논문**: "LLM은 '느끼는가'? 감정 회로 발견 및 제어" — Wang et al., MBZUAI + 베이징대학교 (arXiv:2510.11328, 2025년 10월)
- **핵심 주장**: LLM의 감정 표현은 어휘적 공동 발생의 표면적 인공물이 아니라 특정 회로 구성요소로 추적 가능한 분산 내부 계산의 산물
- **세 가지 질문 답변**: (1) 맥락 불가지론적 감정 메커니즘이 존재하는가? 예. (2) 어떤 형태인가? 레이어별 회로로 조직된 뉴런 + 어텐션 헤드. (3) 제어 가능한가? 예 — 회로 조절을 통해 99.65% 정확도
- **테스트된 모델**: LLaMA-3.2-3B-Instruct (주), Qwen2.5-7B-Instruct (복제)
- **연구된 6가지 감정**: 분노, 슬픔, 행복, 공포, 놀라움, 혐오 (Ekman의 기본 감정)

## 상세 내용

### SEV 데이터셋
- **SEV** (시나리오-사건 및 가치): 480개 레코드의 통제된 데이터셋
- 구조: 중립 시나리오 + 3가지 결과 사건 (긍정, 중립, 부정 가치)
- 8개 일상 영역 × 20개 시나리오 × 3개 결과
- 감정적으로 명시적인 단어 금지 — 감정 변화는 어휘적 단서가 아닌 사건 의미론에서 발생
- 프롬프팅은 SEV에서 98.85% 감정 표현 정확도; 홀드아웃 테스트 세트에서 98.96% 달성

### 감정 방향 추출
- 6가지 감정 조건 모두에 대해 각 어텐션 및 MLP 서브레이어 후 잔차 스트림 활성화 추출
- 시나리오-사건 그룹별 평균 활성화 차감 (공유 의미론 중립화) → 감정 특화 분산 격리
- 그룹에 걸쳐 평균화 → 레이어별 감정 중심 → 전역 평균 차감 → L2 정규화 → **감정 방향 벡터**
- 레이어 9부터 별개 감정 클러스터 출현; 레이어 12까지 잘 분리됨; 심층 레이어에서 안정적
- 이 벡터로 스티어링: 홀드아웃 테스트 세트에서 91.22% 성공률

### 로컬 구성요소 식별 (섹션 6)
**MLP 뉴런:**
- 뉴런 공간 정렬 벡터 `β_e = (W_d)^T v_e` 계산 — 각 뉴런의 쓰기 벡터가 감정 방향을 얼마나 강하게 밀어내는가 정량화
- 뉴런별 기여도: `c_{e,n} = g_{t,n} · β_e` (활성화 강도 × 정렬)
- 평균 기여도로 뉴런 순위; 상위-k를 절제/향상에 사용
- **긴 꼬리 효과**: k=2 뉴런 절제만으로도 감정 점수가 크게 하락; k=4에서 효과 정체 (상위 뉴런이 하위 순위보다 30배 이상 지배)

**어텐션 헤드:**
- 인과적 절제: W_O 투영 전에 상위-k 헤드 출력 채널 제로 아웃; Δs = s′ − s 측정
- 같은 긴 꼬리 패턴: 소수의 헤드가 지배; 무작위 헤드는 무시할 만한 효과

**검증:**
- 절제 (구성요소 제로화)가 감정 점수를 크게 저하; 무작위 절제는 최소한의 효과
- 향상 (식별된 구성요소에 감정 차이 벡터 주입)이 감정 점수를 크게 증가; 무작위 향상은 무시할 만한 효과
- 구성요소가 감정 표현에 *필요하고* *충분함* 모두 확인

### 전역 회로 조립 (섹션 7)
- 각 서브레이어의 최종 감정 표현에 대한 인과적 영향 측정
- 영향 점수 `I_{L,p}` = 서브레이어 (L,p) 교란이 참조 감정 방향을 따라 최종 숨겨진 상태를 얼마나 이동하는가
- 회로 예산 = 10× 서브레이어 수, 두 단계로 할당: 서브레이어당 최소 할당량 (초기 레이어 인코딩 보존) + 중요도에 비례한 할당
- 회로는 낮은 뉴런 겹침 (μ=0.056)을 보이지만 감정 간 중간 정도의 헤드 겹침 (μ=0.454) → 감정별 MLP 서브회로 + 공유 어텐션 경로

### 회로 조절 결과
- 생성 중 조립된 회로 조절 (같은 감정 차이 벡터, λ=1.0, 프롬프트에 명시적 감정 지침 없음)
- 홀드아웃 테스트 세트에서 **99.65% 전반적 정확도**
- 놀라움: 100% (스티어링 기반 방법의 67.71% 대비)
- 생성된 텍스트가 명시적 프롬프팅 없이 자발적 정서적 톤 나타냄 ("Whoa?!", 자발적 감탄사) — 모델이 외부적으로 준수하는 것이 아니라 내부적으로 생성

### Qwen2.5-7B 복제 (부록 H)
- MLP 뉴런과 어텐션 헤드에서 같은 긴 꼬리 패턴
- 부정적 감정에 대한 스티어링 실패 (<5% 분노, 슬픔, 공포, 혐오) — 직접적인 표현적 조작을 통한 부정적 감정 표현을 안전 정렬이 차단할 가능성
- 회로 조절 (스케일 2.0)이 평균 66.18% 달성 — LLaMA보다 낮지만 부정적 감정에서 스티어링 능가

## 핵심 시사점

- **감정은 구조적으로 내재됨**: 안정적 감정 방향이 레이어 0부터 존재하고 심층 레이어에서 점점 더 분리 가능해짐 — 최종 출력 레이어에서 나타나는 것이 아님
- **희소 인과성**: 소수의 상위 순위 뉴런과 어텐션 헤드만이 감정 표현을 인과적으로 지배; 나머지는 관련 없음 (두 모델에서 긴 꼬리 효과 확인)
- **이중 아키텍처**: MLP의 감정별 로컬 서브회로 + 감정적 맥락을 전파하는 공유 전역 어텐션 경로
- **회로 조절이 프롬프팅 및 스티어링 능가**: 입력 토큰이나 잔차 스트림 표면이 아닌 인과적 기질에 직접 작동하여
- **안전 정렬이 기계적 제어를 방해**: Qwen이 직접 조작을 통해 부정적 감정 표현을 거부하는 것이 거의 0에 가까운 스티어링 정확도로 측정 가능한 정렬 특징으로 나타남

## 관련 항목

- [[ai-futures/ai-2027-alignment]] — AI 2027 정렬 호는 LLM 내부 상태가 읽기 가능한지 질문; 이 논문은 부분적으로 그렇다는 기계적 증거 제공
- [[llm-interpretability/_index]] — 부모 주제
- [[global-workspace-j-space]] — 동일한 인과적 개입 방법론(표상을 교체/제거하고 행동 변화를 관찰)을 개별 감정 특징이 아닌 작업공간 수준 구조에 적용

---
*출처: raw/Do LLMs Feel.pdf (arXiv:2510.11328v1) | 편집: 2026-04-09*
