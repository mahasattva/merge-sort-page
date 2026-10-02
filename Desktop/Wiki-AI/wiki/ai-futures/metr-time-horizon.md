# METR Time Horizon

> METR's measure of the length of task (in human-expert time) that AI systems can complete — the main external trend line cited for AI progress and AI R&D automation, with doubling-time estimates that differ between wiki sources.

## Overview

- Metric: the length of tasks AI systems can complete, benchmarked against human-expert task time ("Measuring AI ability to complete long tasks", METR, Mar 2025; "Time horizon 1.1", Jan 2026 — cited by [[intelligence-explosion-ai-rd-automation]])
- Level (as reported): seconds-long tasks in 2023 → hours-to-days of expert work for the best systems in 2026
- Anthropic Institute data points: Opus 3 ~4-minute tasks (Mar 2024) → Sonnet 3.7 ~1.5 hours (2025) → Opus 4.6 ~12 hours (2026) ([[when-ai-builds-itself]])
- **Doubling time differs by source**: ~7 months → ~4 months (Anthropic Institute); ~7 months initially → ~3 months since 2024 (GovAI)
- Extrapolation (GovAI, tentative): months-long AI R&D projects automatable by mid-2028 — consistent with Kokotajlo et al. (AI 2027)

## Detail

**Reconciling ~4 vs ~3 months**
- Both sources report acceleration from ~7 months; they differ on the recent rate
- Neither page states the fit window, model set, or metric version behind its figure; why they differ is unresolved in the wiki — treat ~3–4 months as the range
- Practical consequence: at 3 vs 4 months, projected multi-month task horizons arrive roughly 25% sooner on the faster fit

**Cautions raised by the sources**
- Benchmark success may not translate to real-world productivity — many SWE-bench-passing PRs would not be merged (cited in the GovAI paper)
- METR's developer-overestimation research is why Anthropic Institute expects its staff's self-reported ~4× uplift to be too high ([[when-ai-builds-itself]])
- Horizon growth is a capability trend, not itself a measure of [[returns-to-research-effort]] or of the R&D feedback loop

**METR's other roles in the wiki**
- Example third-party evaluator in Amodei's embedded-evaluator proposal ([[amodei-pacing-the-frontier]], [[embedded-evaluators]])
- Co-author (with Redwood Research) of the independent investigation of the OpenAI–Hugging Face incident ([[oai-hf-incident]]); author of a Feb–Mar 2026 frontier risk report cited by GovAI

## Key Takeaways

- The task-horizon trend is the wiki's main external quantitative evidence that AI R&D automation is accelerating, and the basis for the mid-2028 extrapolation
- The wiki carries two different recent doubling times (~4 and ~3 months); anything built on this metric should state which one it uses
- METR is both a measurement source and a candidate institutional model (independent evaluator) — the two roles should not be conflated

## Related

- [[when-ai-builds-itself]] — task-horizon data points and the ~4-month figure
- [[intelligence-explosion-ai-rd-automation]] — the ~3-month figure and mid-2028 extrapolation
- [[recursive-self-improvement]] — the trend this metric is used to track
- [[returns-to-research-effort]] — uses efficiency doubling times rather than task horizons
- [[embedded-evaluators]] — METR as an example evaluator
- [[oai-hf-incident]] — METR's role in investigating it
- [[ai-2027-scenario]] — the original timeline the extrapolation is compared with

---
*Source: synthesis of when-ai-builds-itself, intelligence-explosion-ai-rd-automation, amodei-pacing-the-frontier | Compiled: 2026-10-03*

---

## 한국어 번역

# METR 시간 지평

> AI 시스템이 완수할 수 있는 과제의 길이(인간 전문가 소요 시간 기준)에 대한 METR의 척도 — AI 진보와 AI R&D 자동화를 보여주는 주요 외부 추세선이며, 위키 출처 간에 배가 주기 추정이 다름.

## 개요

- 척도: AI 시스템이 완수할 수 있는 과제의 길이를 인간 전문가의 과제 소요 시간과 비교("Measuring AI ability to complete long tasks", METR, 2025년 3월; "Time horizon 1.1", 2026년 1월 — [[intelligence-explosion-ai-rd-automation]]에서 인용)
- 수준(보고된 바): 2023년에는 몇 초짜리 과제 → 2026년 최고 시스템은 전문가 몇 시간~며칠 분량
- Anthropic Institute 데이터: Opus 3 약 4분 과제(2024년 3월) → Sonnet 3.7 약 1.5시간(2025) → Opus 4.6 약 12시간(2026) ([[when-ai-builds-itself]])
- **배가 주기는 출처마다 다름**: 약 7개월 → 약 4개월(Anthropic Institute); 처음 약 7개월 → 2024년 이후 약 3개월(GovAI)
- 외삽(GovAI, 잠정): 2028년 중반까지 수개월짜리 AI R&D 프로젝트 자동화 가능 — Kokotajlo 외(AI 2027)와 일치

## 세부 내용

**약 4개월 vs 약 3개월 조정**
- 두 출처 모두 약 7개월에서의 가속을 보고하나 최근 속도에서 차이
- 어느 쪽도 수치의 적합 구간, 모델 집합, 척도 버전을 명시하지 않음; 왜 다른지는 위키에서 미해결 — 약 3–4개월을 범위로 취급
- 실질적 결과: 3개월 대 4개월이면 더 빠른 적합에서 수개월 과제 지평 도달이 약 25% 앞당겨짐

**출처들이 제기한 주의점**
- 벤치마크 성공이 실제 생산성으로 이어지지 않을 수 있음 — SWE-bench를 통과한 많은 PR이 병합되지 않을 것(GovAI 논문에서 인용)
- METR의 개발자 과대평가 연구 때문에 Anthropic Institute는 직원들이 보고한 약 4배 향상이 과대하다고 예상 ([[when-ai-builds-itself]])
- 지평 성장은 역량 추세이며, 그 자체로 [[returns-to-research-effort]]나 R&D 피드백 루프의 척도는 아님

**위키 내 METR의 다른 역할**
- 아모데이의 내재 평가자 제안에서 제3자 평가자의 예 ([[amodei-pacing-the-frontier]], [[embedded-evaluators]])
- OpenAI–Hugging Face 사건의 독립 조사 공동 저자(Redwood Research와) ([[oai-hf-incident]]); GovAI가 인용한 2026년 2–3월 프론티어 위험 보고서 저자

## 핵심 시사점

- 과제 지평 추세는 AI R&D 자동화가 가속 중이라는 위키의 주요 외부 정량 증거이며 2028년 중반 외삽의 근거
- 위키는 최근 배가 주기를 두 가지(약 4개월, 약 3개월)로 보유; 이 척도에 기반한 내용은 어느 쪽을 쓰는지 밝혀야 함
- METR는 측정 출처이자 제도적 모델 후보(독립 평가자) — 두 역할을 혼동해서는 안 됨

## 관련 항목

- [[when-ai-builds-itself]] — 과제 지평 데이터와 약 4개월 수치
- [[intelligence-explosion-ai-rd-automation]] — 약 3개월 수치와 2028년 중반 외삽
- [[recursive-self-improvement]] — 이 척도가 추적하는 추세
- [[returns-to-research-effort]] — 과제 지평이 아닌 효율 배가 주기를 사용
- [[embedded-evaluators]] — 평가자 사례로서의 METR
- [[oai-hf-incident]] — 조사에서 METR의 역할
- [[ai-2027-scenario]] — 외삽이 비교되는 원조 타임라인

---
*출처: when-ai-builds-itself, intelligence-explosion-ai-rd-automation, amodei-pacing-the-frontier 종합 | 편집: 2026-10-03*
