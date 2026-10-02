# Hassabis's Frontier AI Standards Body Proposal

> Demis Hassabis's July 2026 essay argues AGI is a few years away and calls for a US-led, FINRA-modeled "Frontier AI Standards Body" to test and certify frontier models before the race outpaces society's ability to manage it.

## Overview

- Author: Demis Hassabis (DeepMind CEO), published as an X article on 2026-07-14
- Frames AGI as comparable not to the internet or mobile but to the discovery of electricity or fire — "we've essentially found a way to make sand think"
- Diagnosis: an "extremely intense, multilayered commercial and geopolitical race" is pushing capabilities ahead of society's understanding of them
- Prescription: a new independent **Standards Body** to test and certify "Frontier-class" models, starting in the US and intended to seed international standards
- Stance is "cautious optimism" — not a call to halt, but to buy structured time via testing infrastructure rather than a training pause or treaty (contrast [[ai-2040-plan-a]])

## Detail

**The stakes, as framed**
- Potential upside: ~10x the impact of the Industrial Revolution at ~10x the speed; accelerated drug discovery, clean energy, advanced materials; a possible post-scarcity era where resources stop being the limiting factor on progress
- Named risks: cybersecurity harms already observed; nuclear and bio risks expected to emerge as capabilities grow; loss of control over increasingly agentic, recursively self-improving systems ([[when-ai-builds-itself]]); unknown risks that will "only become clearer over time"

**Structure of the proposed Standards Body**
- Modeled on a federally overseen public-private partnership or self-regulatory organization — explicitly compared to FINRA (Financial Industry Regulatory Authority)
- Board includes independent technical experts and open-source representatives
- Funded mostly by industry, to afford world-class technical talent and large-scale compute for testing
- Works with federal agencies and the US National Labs specifically for national-security-relevant testing

**How certification would work**
- A model qualifies as **"Frontier-class"** if it clears benchmark thresholds the Standards Body sets and periodically updates
- Organizations producing Frontier Models become **"Frontier Labs"** — encouraged (not yet required) to adopt best practices: published model cards, strong internal cybersecurity, key-personnel vetting, dedicated safety/security research funding
- **Phase 1 (voluntary)**: labs share models with the Standards Body up to 30 days before release for review
- **Phase 2 (formalized)**: once the assessment protocol proves effective, passing it becomes mandatory for deployment in the US market; labs also work with the body on critical post-release vulnerabilities
- Scope: applies to Frontier-class models regardless of country of origin or open/closed status; non-frontier models (startups, academic work) are explicitly exempted

**What gets evaluated**
- Cybersecurity, biological threats, other high-risk domains
- Agentic-specific tests: attempts to bypass safety guardrails, signs of deception
- Best-practice mandates: digital watermarking of AI-generated images, human-readable output tokens so reasoning stays inspectable (a CoT-faithfulness requirement, relevant to [[global-workspace-j-space]]'s findings on reportable internal state)
- Cadence: benchmarks updated ~quarterly at first; saturated/outdated ones deprecated and replaced
- Benchmark authorship evolves — initially co-developed with Frontier Labs, but the body is meant to eventually build independent held-out tests specifically to prevent overfitting to known evals; a third-party auditor ecosystem is encouraged alongside this

**Escalation path**
- The framework is explicitly designed to "ratchet up" if the situation demands it — including the ability to coordinate a slowdown in development among Frontier Labs, without that being the default starting posture
- Positioned as a US first-mover step meant to catalyze international consensus, since AI's effects aren't contained to one country

**Beyond the technical**
- Hassabis is explicit that solving the technical/governance challenge doesn't resolve the harder downstream questions: what economic models sustain a post-scarcity world, what values and sources of meaning persist, how the human condition itself might change
- Explicitly states these are not questions for technologists to answer alone — "every part of society" needs to be involved

## Key Takeaways

- This is a **testing-and-certification** proposal, not a pause or treaty — it complements rather than competes with slowdown-style proposals like [[ai-2040-plan-a]]'s Consortium/transparency approach
- The FINRA analogy is the load-bearing design choice: industry-funded, technically expert, initially self-regulatory, with government backstop authority available if voluntary compliance fails
- The voluntary-then-mandatory two-phase rollout mirrors a common frontier-AI governance pattern: build legitimacy and technical capacity before imposing binding requirements
- Independent held-out benchmarks (vs. lab-co-developed ones) are called out as necessary specifically to prevent the Standards Body's own evaluations from being gamed or overfit
- Frames AGI arrival timing the same way as [[from-agi-to-asi]] and [[ai-2027-scenario]] — "a few short years away" — but focuses on institution-building rather than capability forecasting

## Related

- [[ai-2040-plan-a]] — a more structural alternative: instead of a testing/certification body, a US-China Consortium built around research transparency and compute-based mutual deterrence
- [[when-ai-builds-itself]] — the recursive self-improvement risk this proposal cites as a reason robust safeguards are needed before capabilities outrun oversight
- [[from-agi-to-asi]] — DeepMind's own technical framing of AGI/ASI pathways and bottlenecks, the capability backdrop this governance proposal is written against
- [[ai-2027-scenario]] — a scenario where no such standards body materializes in time, useful as the counterfactual this proposal is trying to avoid
- [[global-workspace-j-space]] — Anthropic's evidence that model reasoning can be made reportable and inspectable, relevant to the "human-readable output tokens" requirement here
- [[amodei-pacing-the-frontier]] — Amodei cites this proposal by name as a possible venue for antitrust-safe industry coordination, but goes further: embedded evaluators inside labs and explicit capability pacing rather than slowdown only as an escalation option
- [[intelligence-explosion-ai-rd-automation]] — the GovAI intelligence-explosion paper proposes reporting and pre-deployment evaluation requirements for AI R&D automation that a certification body like this could administer

---
*Source: raw/A Framework for Frontier AI and the Dawning of a New Age.md (Demis Hassabis, x.com/demishassabis, published 2026-07-14) | Compiled: 2026-07-17*

---

## 한국어 번역

# 하사비스의 프론티어 AI 표준 기구 제안

> 데미스 하사비스의 2026년 7월 에세이는 AGI가 몇 년 안에 도래할 것이라 주장하며, 경쟁이 사회의 관리 능력을 앞지르기 전에 프론티어 모델을 테스트하고 인증할 미국 주도의, FINRA를 본뜬 "프론티어 AI 표준 기구" 설립을 촉구한다.

## 개요

- 저자: 데미스 하사비스(DeepMind CEO), 2026-07-14 X 아티클로 발표
- AGI를 인터넷이나 모바일이 아니라 전기나 불의 발견에 비유 — "우리는 사실상 모래가 생각하게 만드는 방법을 찾아냈다"
- 진단: "매우 강렬하고 다층적인 상업적·지정학적 경쟁"이 역량을 사회의 이해 수준보다 앞서 나가게 하고 있음
- 처방: "프론티어급" 모델을 테스트하고 인증할 새로운 독립 **표준 기구**를 미국에서 시작하여 국제 표준의 씨앗으로 삼자는 제안
- 입장은 "신중한 낙관주의" — 훈련 중단이나 조약이 아니라 테스트 인프라를 통해 구조화된 시간을 버는 방식 (대비: [[ai-2040-plan-a]])

## 세부 내용

**제시된 이해관계**
- 잠재적 상승: 산업혁명 영향력의 약 10배를 약 10배의 속도로; 신약 개발, 청정 에너지, 신소재 가속화; 자원이 더 이상 진보의 제약이 되지 않는 풍요의 시대 가능성
- 명시된 위험: 이미 관측된 사이버보안 피해; 역량이 커지면서 등장할 것으로 예상되는 핵 및 생물학적 위험; 점점 에이전트화되고 재귀적으로 자기 개선하는 시스템에 대한 통제 상실([[when-ai-builds-itself]]); "시간이 지나야 명확해질" 미지의 위험

**제안된 표준 기구의 구조**
- 연방 감독하의 공공-민간 파트너십 또는 자율규제기구를 모델로 함 — FINRA(미국 금융산업규제기구)와 명시적으로 비교
- 이사회에는 독립적인 기술 전문가와 오픈소스 대표가 포함
- 자금은 주로 업계에서 조달, 세계적 수준의 기술 인력과 대규모 테스트용 컴퓨트 확보
- 국가 안보 관련 테스트를 위해 특별히 연방 기관 및 미국 국립연구소와 협력

**인증 작동 방식**
- 표준 기구가 설정하고 주기적으로 업데이트하는 벤치마크 임계값을 통과하면 모델은 **"프론티어급"** 자격을 얻음
- 프론티어 모델을 만드는 조직은 **"프론티어 랩"**이 됨 — 모델 카드 공개, 강력한 내부 사이버보안, 핵심 인력 검증, 안전·보안 연구 자금 확보 등 모범 사례 채택 권장(아직 의무는 아님)
- **1단계(자발적)**: 랩은 출시 최대 30일 전에 표준 기구와 모델을 공유하여 검토받음
- **2단계(제도화)**: 평가 프로토콜이 효과적임이 입증되면, 미국 시장 배포를 위해 이를 통과하는 것이 의무화됨; 랩은 출시 후 중대한 취약점에 대해서도 표준 기구와 협력
- 범위: 원산지 국가나 개방형/폐쇄형 여부와 무관하게 프론티어급 모델에 적용; 스타트업·학계의 비프론티어 모델은 명시적으로 제외

**평가 대상**
- 사이버보안, 생물학적 위협, 기타 고위험 영역
- 에이전트 특화 테스트: 안전장치 우회 시도, 기만 징후
- 모범 사례 의무화: AI 생성 이미지의 디지털 워터마킹, 추론을 검사 가능하게 유지하는 사람이 읽을 수 있는 출력 토큰(사고연쇄 충실성 요건, [[global-workspace-j-space]]의 보고 가능한 내부 상태 발견과 관련)
- 주기: 초기에는 약 분기별로 벤치마크 업데이트; 포화되거나 낡은 벤치마크는 폐기 및 교체
- 벤치마크 제작 주체의 변화 — 초기에는 프론티어 랩과 공동 개발하지만, 궁극적으로 표준 기구는 알려진 평가에 대한 과적합을 막기 위해 독립적인 비공개 테스트를 자체 구축해야 함; 이와 함께 제3자 감사 생태계 조성도 권장

**단계적 확대 경로**
- 이 프레임워크는 필요시 "강도를 높일" 수 있도록 명시적으로 설계됨 — 기본 출발 태세는 아니지만, 프론티어 랩들 사이의 개발 둔화를 조율할 능력도 포함
- 미국이 먼저 나서는 조치로서 국제적 합의를 촉발하려는 의도로 자리매김됨 — AI의 영향은 한 국가에 국한되지 않기 때문

**기술을 넘어서**
- 하사비스는 기술적·거버넌스 과제를 해결한다고 해서 더 어려운 후속 질문들이 풀리는 것은 아니라고 명시함: 풍요 이후 세계를 지탱할 경제 모델, 지속될 가치와 의미의 원천, 인간 조건 자체가 어떻게 변할 수 있는가
- 이는 기술자들만의 몫이 아니라고 명시적으로 밝힘 — "사회의 모든 부분"이 참여해야 함

## 핵심 요점

- 이것은 **테스트 및 인증** 제안이지 중단이나 조약이 아님 — [[ai-2040-plan-a]]의 컨소시엄/투명성 접근 같은 둔화형 제안과 경쟁하기보다 보완하는 성격
- FINRA 비유가 설계의 핵심: 업계 자금 지원, 기술 전문성, 초기 자율규제, 자발적 준수가 실패할 경우를 대비한 정부의 후견 권한
- 자발적→의무적 2단계 전개는 프론티어 AI 거버넌스에서 흔한 패턴을 따름: 구속력 있는 요건을 부과하기 전에 정당성과 기술 역량을 먼저 구축
- 독립적인 비공개 벤치마크(랩과 공동 개발한 것과 대비)가 필요한 이유로, 표준 기구 자체의 평가가 게임당하거나 과적합되는 것을 막기 위함이라는 점이 명시됨
- AGI 도래 시점을 [[from-agi-to-asi]], [[ai-2027-scenario]]와 동일하게 "몇 년 이내"로 프레이밍하지만, 역량 예측보다는 제도 구축에 초점

## 관련 문서

- [[ai-2040-plan-a]] — 더 구조적인 대안: 테스트·인증 기구 대신, 연구 투명성과 컴퓨트 기반 상호 억지를 중심으로 한 미중 컨소시엄
- [[when-ai-builds-itself]] — 이 제안이 역량이 감독을 앞지르기 전에 견고한 안전장치가 필요한 이유로 인용하는 재귀적 자기 개선 위험
- [[from-agi-to-asi]] — 이 거버넌스 제안이 전제로 삼는 역량 배경인, DeepMind 자체의 AGI/ASI 경로 및 병목에 대한 기술적 프레이밍
- [[ai-2027-scenario]] — 이러한 표준 기구가 제때 마련되지 않았을 때의 시나리오로, 이 제안이 피하려는 반사실적 상황
- [[global-workspace-j-space]] — 모델 추론을 보고 가능하고 검사 가능하게 만들 수 있다는 Anthropic의 증거, 여기서 요구하는 "사람이 읽을 수 있는 출력 토큰" 요건과 관련
- [[amodei-pacing-the-frontier]] — 아모데이가 반독점상 안전한 업계 조율의 가능한 장으로 이 제안을 이름을 들어 인용하지만 더 나아감: 둔화를 단계적 확대 선택지로만 두지 않고, 랩 내부의 내재 평가자와 명시적 역량 속도 조절을 제안
- [[intelligence-explosion-ai-rd-automation]] — GovAI 지능 폭발 논문은 이런 인증 기구가 운영할 수 있는 AI R&D 자동화 보고·배포 전 평가 요건을 제안

---
*출처: raw/A Framework for Frontier AI and the Dawning of a New Age.md (데미스 하사비스, x.com/demishassabis, 2026-07-14 발표) | 편집: 2026-07-17*
