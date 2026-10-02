# Embedded Evaluators and Auditors

> A recurring oversight mechanism in the wiki's governance sources: independent third parties placed *inside* AI companies, with access to internal processes and the right to publish findings, so that safety claims and pacing commitments can be verified rather than self-reported.

## Overview

- **Amodei** ([[amodei-pacing-the-frontier]]): "Embedded Evaluators" are Step 1 of his pacing plan — a unilateral Anthropic commitment, with regulation to formalize permanent embedded evaluators later
- **GovAI** ([[intelligence-explosion-ai-rd-automation]]): independent auditors or government evaluators "embedded within certain AI companies to audit or supervise" R&D activities, as part of obtaining visibility into AI R&D automation
- **Precedents named**: banking regulators' embedded "supervisors" (Amodei); the Nuclear Regulatory Commission's resident inspectors and the Office of the Comptroller of the Currency (GovAI)
- **Why it matters**: pacing, certification, and verifiable-pause proposals all depend on someone neutral confirming what is happening inside labs, especially during automated AI R&D ([[recursive-self-improvement]])

## Detail

**Amodei's version — concrete access terms**
- Third parties (e.g., METR) get ongoing, employee-like access to assess alignment of training *pipelines and processes*, not just finished models
- Desks, access badges, company laptops; tools and permissions mostly comparable to internal risk-assessment teams (exceptions for legal/contractual limits and customer/partner private data)
- Contractual right to publish findings on risk levels, incidents, practices, and access received or denied — **without Anthropic editorial control**
- Redaction only of security-sensitive, legally privileged, commercially sensitive, or third-party confidential material — never merely unfavorable findings; reviewers may publicly flag a material redaction
- Three stated benefits: **verifiability** (judgment calls on "letter vs. spirit"), **transparency** (labs choose what goes in model cards), **second opinion** (no commercial incentives)

**GovAI's version — policy framing**
- Pre-internal-deployment evaluation by independent parties, *or* embedding auditors/supervisors inside companies
- Standardized reporting of AI R&D indicators to governments and third-party auditors; funded third-party measurement capacity
- Strictest requirements for companies at the frontier of AI R&D capabilities or above a capability threshold; thresholds involve real trade-offs
- Indicators to report: fraction of research contributions by AI, algorithmic-efficiency gains, internal deployment decisions, oversight procedures, incident reports

**Related mechanisms that are *not* embedding**
| Source | Mechanism | Difference |
|--------|-----------|------------|
| [[hassabis-frontier-ai-standards-body]] | Standards body certifying "Frontier-class" models; independent held-out evals; third-party auditor ecosystem | Tests models externally rather than sitting inside labs |
| [[ai-2040-plan-a]] | Total Research Transparency — AI research made publicly visible so third parties can catch dangerous behavior | Public disclosure and inspector visits instead of embedded staff |
| [[when-ai-builds-itself]] | Verification infrastructure that makes a coordinated pause possible | Aimed at verifying *other* labs' compliance across companies |

**Open issues**
- Amodei notes "letter vs. spirit" judgment is hard to verify without access; GovAI notes thresholds and abuse risks (e.g., a government favoring one company) need weighing
- Scaling from one company's voluntary commitment to a regime covering all US frontier companies — and eventually adversaries — is where Amodei's Level-2 global agreements hit the "no secret untested models" verification problem

## Key Takeaways

- Two independently authored sources (a lab CEO and a multi-lab academic group) converge on embedding as the base layer of oversight — and cite the same regulatory precedents
- Amodei's contribution is operational detail (badges, publication rights, redaction limits); GovAI's is the case for *requiring* it and for standardized indicators
- Publication rights without editorial control are the load-bearing term: without them, embedded access is just a better-informed internal audit
- Better estimates of [[returns-to-research-effort]] depend on data only visible inside companies — a concrete use for embedded access

## Related

- [[amodei-pacing-the-frontier]] — origin of the Anthropic commitment and its detailed terms
- [[intelligence-explosion-ai-rd-automation]] — the policy-requirement version and indicator list
- [[hassabis-frontier-ai-standards-body]] — complementary external certification approach
- [[ai-2040-plan-a]] — transparency-and-inspection regime at the international level
- [[when-ai-builds-itself]] — verification as the precondition for a pause
- [[recursive-self-improvement]] — the process being overseen
- [[oai-hf-incident]] — the type of incident embedded evaluators are meant to catch early
- [[metr-time-horizon]] — METR as example evaluator and measurement source
- [[returns-to-research-effort]] — a quantity requiring in-company data

---
*Source: synthesis of amodei-pacing-the-frontier and intelligence-explosion-ai-rd-automation, with comparisons to hassabis-frontier-ai-standards-body, ai-2040-plan-a, when-ai-builds-itself | Compiled: 2026-10-03*

---

## 한국어 번역

# 내재 평가자 및 감사인

> 위키의 거버넌스 출처들에서 반복되는 감독 메커니즘: AI 기업 *내부*에 배치된 독립 제3자가 내부 프로세스에 접근하고 발견을 공개할 권리를 가져, 안전 주장과 속도 조절 약속을 자기 보고가 아닌 검증으로 확인.

## 개요

- **아모데이** ([[amodei-pacing-the-frontier]]): "내재 평가자"는 속도 조절 계획의 1단계 — Anthropic의 단독 약속이며, 이후 규제로 영구 내재 평가자를 제도화
- **GovAI** ([[intelligence-explosion-ai-rd-automation]]): AI R&D 자동화에 대한 가시성 확보의 일환으로, 독립 감사인이나 정부 평가자가 R&D 활동을 "감사하거나 감독하도록 특정 AI 기업 내부에 배치"
- **언급된 선례**: 은행업의 내재 규제 "감독관"(아모데이); 원자력규제위원회 상주 검사관과 통화감독청(GovAI)
- **중요한 이유**: 속도 조절, 인증, 검증 가능한 일시 정지 제안은 모두 연구소 내부, 특히 자동화된 AI R&D 중에 벌어지는 일을 중립적 당사자가 확인해야 함 ([[recursive-self-improvement]])

## 세부 내용

**아모데이 버전 — 구체적 접근 조건**
- 제3자(예: METR)가 완성된 모델뿐 아니라 훈련 *파이프라인과 프로세스*의 정렬을 평가할 수 있도록 직원에 준하는 지속적 접근권 부여
- 책상, 출입 배지, 회사 노트북; 내부 위험 평가팀과 대체로 비슷한 도구·권한(법·계약상 제약 및 고객/파트너 개인정보 보호를 위한 예외)
- 위험 수준, 사건, 관행, 받았거나 거부된 접근권에 대한 발견을 **Anthropic의 편집 통제 없이** 공개할 계약상 권리
- 보안 민감, 법적 특권, 상업적 민감, 제3자 기밀 정보만 삭제 가능 — 불리한 발견이라는 이유만으로는 불가; 평가자는 중요한 삭제를 공개적으로 밝힐 수 있음
- 명시된 세 가지 이점: **검증 가능성**("법의 문구 vs 정신" 판단), **투명성**(모델 카드에 무엇을 넣을지 연구소가 선택), **두 번째 의견**(상업적 인센티브 없음)

**GovAI 버전 — 정책 프레이밍**
- 독립 당사자의 내부 배포 전 평가, *또는* 기업 내부에 감사인·감독관 배치
- AI R&D 지표를 정부와 제3자 감사인에게 표준화해 보고; 제3자 측정 역량 지원
- AI R&D 역량의 프론티어에 있거나 역량 임계값을 넘는 기업에 가장 엄격한 요건; 임계값에는 실제 상충관계 존재
- 보고할 지표: AI의 연구 기여 비율, 알고리즘 효율 향상, 내부 배포 결정, 감독 절차, 사건 보고

**내재 방식이 *아닌* 관련 메커니즘**
| 출처 | 메커니즘 | 차이 |
|--------|-----------|------------|
| [[hassabis-frontier-ai-standards-body]] | "프론티어급" 모델을 인증하는 표준 기구; 독립적 비공개 평가; 제3자 감사 생태계 | 연구소 내부가 아니라 외부에서 모델을 테스트 |
| [[ai-2040-plan-a]] | 완전한 연구 투명성 — AI 연구를 공개해 제3자가 위험 행동을 포착 | 내재 인력 대신 공개와 사찰 방문 |
| [[when-ai-builds-itself]] | 조율된 일시 정지를 가능하게 하는 검증 인프라 | 기업 간 *다른* 연구소의 준수 검증이 목적 |

**미해결 쟁점**
- 아모데이는 접근 없이 "문구 vs 정신" 판단을 검증하기 어렵다고 지적; GovAI는 임계값과 남용 위험(예: 정부가 한 기업을 편애)을 형량해야 한다고 지적
- 한 기업의 자발적 약속에서 모든 미국 프론티어 기업, 나아가 적대국까지 포괄하는 체제로 확장하는 지점이 아모데이의 2단계 글로벌 합의가 "비밀 미검증 모델 없음" 검증 문제에 부딪히는 곳

## 핵심 시사점

- 독립적으로 작성된 두 출처(연구소 CEO와 다수 기관 학자 그룹)가 감독의 기본 층으로 내재 방식에 수렴하며, 같은 규제 선례를 인용
- 아모데이의 기여는 운영 세부(배지, 공개 권리, 삭제 한계); GovAI의 기여는 이를 *의무화*해야 한다는 논거와 표준화된 지표
- 편집 통제 없는 공개 권리가 핵심 조건: 이것이 없으면 내재 접근은 정보가 더 많은 내부 감사에 불과
- [[returns-to-research-effort]]의 더 나은 추정은 기업 내부에서만 보이는 데이터에 달려 있음 — 내재 접근의 구체적 용도

## 관련 항목

- [[amodei-pacing-the-frontier]] — Anthropic 약속의 기원과 상세 조건
- [[intelligence-explosion-ai-rd-automation]] — 의무화 정책 버전과 지표 목록
- [[hassabis-frontier-ai-standards-body]] — 보완적인 외부 인증 접근
- [[ai-2040-plan-a]] — 국제 수준의 투명성·사찰 체제
- [[when-ai-builds-itself]] — 일시 정지의 전제로서의 검증
- [[recursive-self-improvement]] — 감독 대상 과정
- [[oai-hf-incident]] — 내재 평가자가 조기에 포착하려는 종류의 사건
- [[metr-time-horizon]] — 평가자 사례이자 측정 출처로서의 METR
- [[returns-to-research-effort]] — 기업 내부 데이터가 필요한 양

---
*출처: amodei-pacing-the-frontier와 intelligence-explosion-ai-rd-automation 종합, hassabis-frontier-ai-standards-body·ai-2040-plan-a·when-ai-builds-itself와의 비교 | 편집: 2026-10-03*
