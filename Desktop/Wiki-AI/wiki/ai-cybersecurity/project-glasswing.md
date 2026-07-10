# Project Glasswing

> Anthropic's cross-industry initiative to use Claude Mythos Preview — a frontier model capable of surpassing most humans at finding and exploiting vulnerabilities — for defensive cybersecurity at scale.

## Overview
- Announced 2026-04-09; coalition of 12 launch partners: AWS, Apple, Broadcom, Cisco, CrowdStrike, Google, JPMorganChase, Linux Foundation, Microsoft, NVIDIA, Palo Alto Networks
- Trigger: Claude Mythos Preview (unreleased) has already found thousands of zero-days across every major OS and web browser — autonomously, without human steering
- Core bet: the same capabilities that make AI dangerous for attackers make it invaluable for defenders — act now before they proliferate
- Anthropic committing $100M in Mythos Preview usage credits + $4M in direct donations to open-source security orgs
- Mythos Preview will not be made generally available; controlled access only through Glasswing and related programs

## Detail

### Claude Mythos Preview
- General-purpose unreleased frontier model; name from Ancient Greek for "narrative" / "the stories civilizations use to make sense of the world"
- Represents a qualitative leap in cyber capability: "surpasses all but the most skilled humans at finding and exploiting vulnerabilities"
- Benchmark scores vs Opus 4.6:
  - CyberGym (vulnerability reproduction): **83.1%** vs 66.6%
  - SWE-bench Verified: **93.9%** vs 80.8%
  - SWE-bench Pro: **77.8%** vs 53.4%
  - SWE-bench Multilingual: **87.3%** vs 77.8%
  - Terminal-Bench 2.0: **82.0%** vs 65.4%
  - GPQA Diamond: **94.6%** vs 91.3%
  - OSWorld-Verified: **79.6%** vs 72.7%
- Cyber skills derive from strong agentic coding + reasoning — not a specialized security model

### Vulnerabilities Found
- Thousands of zero-days in every major OS and every major web browser
- Three disclosed examples (all now patched):
  - **OpenBSD**: 27-year-old remote crash vulnerability (connect → crash, no auth required) — survives decades of expert review
  - **FFmpeg**: 16-year-old flaw in a line hit 5 million times by automated testing tools without detection
  - **Linux kernel**: autonomously chained multiple vulnerabilities to escalate from user-level to full root control
- Unrevealed vulnerabilities: cryptographic hash committed today; specifics disclosed after patches land

### Project Structure
- Launch partners use Mythos Preview for defensive security work; Anthropic shares learnings industry-wide
- 40+ additional orgs with access to scan first-party and open-source critical infrastructure
- Post-research-preview pricing: $25/$125 per million input/output tokens (API, Bedrock, Vertex AI, Microsoft Foundry)
- Donations: $2.5M to Alpha-Omega / OpenSSF (Linux Foundation); $1.5M to Apache Software Foundation
- Open-source maintainers can apply via Claude for Open Source program

### Roadmap
- 90-day public report: vulnerabilities fixed, improvements made, lessons learned
- Practical recommendations to evolve security practices: vuln disclosure, patching automation, supply-chain security, secure-by-design, standards for regulated industries
- Government engagement: ongoing discussions with US officials on offensive/defensive cyber implications
- Longer-term: advocate for independent third-party body (public + private sector) to own large-scale cybersecurity projects

### Name Origin
- Named for the glasswing butterfly (*Greta oto*)
- Two metaphors: (1) transparent wings let it hide in plain sight — like latent vulnerabilities; (2) transparency as a survival strategy — like Anthropic's open approach

## Key Takeaways
- Frontier AI has crossed the threshold where it can find vulnerabilities that survived decades of human review and millions of automated tests — this capability will proliferate regardless
- Glasswing is a race-condition response: get AI into defenders' hands at scale before attackers exploit the same capabilities
- Mythos Preview is not being released generally; Glasswing is a controlled, high-trust rollout with disclosed findings
- The $100M commitment + partner ecosystem signals this is a sustained initiative, not a PR announcement
- Next step for general model deployment: new safeguards launching with an upcoming Opus model, to be stress-tested before Mythos-class capabilities go broad

## Related
- [[ai-futures/ai-2027-scenario]] — AI capability ladder context; Mythos Preview is evidence the SC→SAR transition is happening now
- [[ai-futures/ai-2027-alignment]] — dual-use AI risk framing; Glasswing is a real-world instance of the alignment/deployment dilemma
- [[llm-interpretability/emotion-circuits]] — another frontier model capability domain; compare controlled-access deployment strategies
- [[ai-futures/when-ai-builds-itself]] — cites Glasswing as proof that even frozen AI capabilities transform the world; 10,000+ vulnerabilities found in weeks shifted the cyber-defense bottleneck to patching

---
*Source: raw/Project Glasswing Securing critical software for the AI era.md | Compiled: 2026-04-09*

---

## 한국어 번역

# 프로젝트 글라스윙

> Anthropic의 산업 간 이니셔티브: 취약점 발견 및 악용에서 대부분의 인간을 능가할 수 있는 프론티어 모델인 Claude Mythos Preview를 방어적 사이버보안에 대규모로 사용.

## 개요
- 2026년 4월 9일 발표; 12개 출범 파트너 연합: AWS, Apple, Broadcom, Cisco, CrowdStrike, Google, JPMorganChase, Linux Foundation, Microsoft, NVIDIA, Palo Alto Networks
- 트리거: Claude Mythos Preview (미출시)가 이미 자율적으로, 인간 개입 없이 모든 주요 OS 및 웹 브라우저에서 수천 개의 제로데이를 발견
- 핵심 베팅: AI를 공격자에게 위험하게 만드는 동일한 역량이 방어자에게 귀중함 — 확산되기 전에 지금 행동
- Anthropic이 Mythos Preview 사용 크레딧에 $1억 + 오픈소스 보안 조직에 직접 기부 $400만 약정
- Mythos Preview는 일반 공개 예정 없음; Glasswing 및 관련 프로그램을 통해 제어된 접근만

## 세부 내용

### Claude Mythos Preview
- 미출시 범용 프론티어 모델; 이름은 "이야기" / "문명이 세상을 이해하는 데 사용하는 이야기들"의 고대 그리스어에서
- 사이버 역량의 질적 도약: "취약점 발견 및 악용에서 가장 숙련된 인간을 제외한 모든 인간을 능가"
- Opus 4.6 대비 벤치마크 점수:
  - CyberGym (취약점 재현): **83.1%** vs 66.6%
  - SWE-bench Verified: **93.9%** vs 80.8%
  - SWE-bench Pro: **77.8%** vs 53.4%
  - SWE-bench Multilingual: **87.3%** vs 77.8%
  - Terminal-Bench 2.0: **82.0%** vs 65.4%
  - GPQA Diamond: **94.6%** vs 91.3%
  - OSWorld-Verified: **79.6%** vs 72.7%
- 사이버 역량은 강력한 에이전트 코딩 + 추론에서 파생 — 특화된 보안 모델이 아님

### 발견된 취약점
- 모든 주요 OS 및 모든 주요 웹 브라우저에서 수천 개의 제로데이
- 세 가지 공개 예시 (모두 현재 패치됨):
  - **OpenBSD**: 27년 된 원격 충돌 취약점 (연결 → 충돌, 인증 불필요) — 수십 년의 전문가 검토 생존
  - **FFmpeg**: 자동화 테스팅 도구가 500만 번 실행한 코드 라인에서 16년 된 결함, 감지 없이
  - **Linux 커널**: 사용자 수준에서 완전한 루트 제어로 에스컬레이션하기 위해 여러 취약점을 자율적으로 연결
- 미공개 취약점: 오늘 암호화 해시 제공; 패치가 적용된 후 세부 사항 공개

### 프로젝트 구조
- 출범 파트너가 방어적 보안 작업에 Mythos Preview 사용; Anthropic이 배운 내용을 산업 전체에 공유
- 40개 이상의 추가 조직이 1차 및 오픈소스 핵심 인프라 스캔 접근권 보유
- 연구 미리보기 후 가격: 입력/출력 토큰 백만 개당 $25/$125 (API, Bedrock, Vertex AI, Microsoft Foundry)
- 기부: Linux Foundation을 통해 Alpha-Omega / OpenSSF에 $250만; Apache Software Foundation에 $150만
- 오픈소스 유지 관리자는 오픈소스를 위한 Claude 프로그램을 통해 신청 가능

### 로드맵
- 90일 공개 보고서: 수정된 취약점, 개선 사항, 교훈
- 보안 관행 진화를 위한 실용적 권고사항: 취약점 공개, 패치 자동화, 공급망 보안, 보안 중심 설계, 규제 산업 표준
- 정부 참여: 공격적/방어적 사이버 영향에 대해 미국 관리들과 지속적인 논의
- 장기: 대규모 사이버보안 프로젝트를 소유할 독립적인 제3자 기관 (공공 + 민간 부문) 지지

### 이름 유래
- 유리날개 나비 (*Greta oto*)의 이름에서
- 두 가지 비유: (1) 투명한 날개가 숨어 있게 함 — 잠재된 취약점처럼; (2) 투명성이 생존 전략 — Anthropic의 열린 접근 방식처럼

## 핵심 시사점
- 프론티어 AI가 수십 년의 인간 검토와 수백만 개의 자동화 테스트를 생존한 취약점을 찾을 수 있는 임계값을 넘었음 — 이 역량은 어쨌든 확산될 것
- Glasswing은 경쟁 조건 대응: 공격자가 동일한 역량을 악용하기 전에 AI를 방어자의 손에 대규모로 넘기기
- Mythos Preview는 일반적으로 출시되지 않음; Glasswing은 공개 발견이 있는 통제된 고신뢰 롤아웃
- $1억 약정 + 파트너 생태계는 이것이 PR 발표가 아닌 지속적인 이니셔티브임을 시사
- 일반 모델 배포를 위한 다음 단계: 다가오는 Opus 모델과 함께 출시될 새로운 안전장치, Mythos 클래스 역량이 광범위하게 배포되기 전에 스트레스 테스트

## 관련 항목
- [[ai-futures/ai-2027-scenario]] — AI 역량 사다리 맥락; Mythos Preview는 SC→SAR 전환이 지금 일어나고 있다는 증거
- [[ai-futures/ai-2027-alignment]] — 이중 사용 AI 위험 프레임; Glasswing은 정렬/배포 딜레마의 실제 사례
- [[llm-interpretability/emotion-circuits]] — 또 다른 프론티어 모델 역량 영역; 통제된 접근 배포 전략 비교
- [[ai-futures/when-ai-builds-itself]] — AI 역량이 동결되어도 세계가 변한다는 증거로 Glasswing을 인용; 몇 주 만에 1만 건 이상의 취약점 발견으로 사이버 방어 병목이 패치로 이동

---
*출처: raw/Project Glasswing Securing critical software for the AI era.md | 편집: 2026-04-09*
