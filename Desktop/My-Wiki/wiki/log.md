# Wiki Log

*Append-only chronological record of all operations.*
*Parse last 5 entries: `grep "^## \[" wiki/log.md | tail -5`*

---

## [2026-04-07] setup | Initial wiki scaffolding
- Files created: CLAUDE.md, wiki/_master-index.md, wiki/index.md, wiki/log.md, raw/assets/
- Notes: Initial setup. Schema v1.0 written. Directory conventions established.

## [2026-04-07] ingest | AI 2027 — scenario + alignment arc
- Source: raw/AI 2027.md (ai-2027.com, authors: Kokotajlo, Lifland, Larsen, Dean, Alexander)
- Topic: ai-futures (new)
- Files created: wiki/ai-futures/_index.md, ai-2027-scenario.md, ai-2027-alignment.md
- Files updated: wiki/_master-index.md, wiki/index.md
- Notes: Split into two articles — scenario (timeline/geopolitics/economics) and alignment (LLM psychology/failure arc). Document has two endings; race ending treated as primary narrative. Conscious AI question not addressed in source — framed as goal structure/psychology, not experience.

## [2026-04-07] ingest | Claude Code Skills wiki (3 raw sources + research)
- Sources processed:
  - raw/10 Must-Have Skills for Claude (and Any Coding Agent) in 2026.md → compiled
  - raw/Karpathy's Obsidian RAG + Claude Code = CHEAT CODE.md → compiled
  - raw/AI 2027.md → SKIPPED (macro AI forecast, out of scope for this wiki)
- Topic: claude-code-skills (new)
- Files created: wiki/claude-code-skills/_index.md, overview.md, skill-anatomy.md, top-10-skills-2026.md, skills-vs-hooks-vs-claude-md.md, obsidian-claude-code-workflow.md
- Files updated: wiki/_master-index.md, wiki/index.md
- External research: Claude Code official docs — skills format, hooks, subagents, MCP integration
- Notes: obsidian-claude-code-workflow cross-links to meta/llm-wiki-pattern (same underlying pattern as this vault)

## [2026-04-07] ingest | LLM Wiki — core pattern
- Source: raw/llm-wiki-idea.md
- Topic: meta (new)
- Files created: wiki/meta/_index.md, wiki/meta/llm-wiki-pattern.md
- Files updated: wiki/_master-index.md, wiki/index.md
- Notes: First ingest. Source is the founding idea file for this knowledge base. Covers the three-layer architecture (raw/wiki/schema), three operations (ingest/query/lint), navigation infrastructure (index.md + log.md), and tooling options.

## [2026-04-09] ingest | The Denial of Death – Ernest Becker (1973)
- Source: raw/The Denial of Death - Ernest Becker.pdf
- Topic: book-denial-of-death (new)
- Files created:
  - wiki/book-denial-of-death/_index.md
  - wiki/book-denial-of-death/overview.md — thesis, structure, key thinkers (Freud, Rank, Kierkegaard, Brown, Maslow, Rieff)
  - wiki/book-denial-of-death/terror-of-death.md — existential paradox, primary repression, heroism as response, body/sex problem, Jonah Syndrome, mysterium tremendum
  - wiki/book-denial-of-death/vital-lie.md — character as neurotic shield, Perls' four-layer structure, mechanics and costs of the vital lie
  - wiki/book-denial-of-death/kierkegaard-and-rank.md — shut-upness, two despair poles (schizophrenia/depression), the Philistine, transference, Rank's synthesis
  - wiki/book-denial-of-death/heroic-individual.md — limits of psychotherapy, Freud vs. Kierkegaard, Brown/Marcuse critique, Tillich's courage to be, Rank's final proposal
- Files updated: wiki/_master-index.md, wiki/index.md
- Notes: Companion to Escape From Evil. Won the Pulitzer 1974; Becker died before receiving it. Central formula: man is the animal that knows it will die; character is the vital lie that makes this bearable; all heroism is ultimately an immortality project. Rank (not Freud) is the true hero of the book — his synthesis of Kierkegaard and Freud is Becker's backbone. Key distinction from Escape From Evil: individual psychology, not social evil. Cross-linked to book-escape-from-evil throughout.

## [2026-04-09] ingest | Project Glasswing — Securing Critical Software for the AI Era
- Source: raw/Project Glasswing Securing critical software for the AI era.md (anthropic.com/glasswing, 2026-04-09)
- Topic: ai-cybersecurity (new)
- Files created:
  - wiki/ai-cybersecurity/_index.md
  - wiki/ai-cybersecurity/project-glasswing.md — Glasswing initiative, Claude Mythos Preview capabilities, zero-day examples, benchmark scores, $100M commitment, roadmap
- Files updated: wiki/_master-index.md, wiki/index.md
- Notes: Mythos Preview (unreleased) found thousands of zero-days across every major OS and browser autonomously. Key examples: 27-year OpenBSD crash vuln, 16-year FFmpeg flaw (missed by 5M automated tests), Linux kernel privilege escalation chain. CyberGym: 83.1% vs Opus 4.6's 66.6%. Coalition: AWS, Apple, Broadcom, Cisco, CrowdStrike, Google, JPMorganChase, Linux Foundation, Microsoft, NVIDIA, Palo Alto Networks. $100M usage credits + $4M donations. Not releasing Mythos generally. Cross-linked to ai-futures alignment/scenario articles.

## [2026-04-09] ingest | Do LLMs "Feel"? — Emotion Circuits Discovery and Control
- Source: raw/Do LLMs Feel.pdf (arXiv:2510.11328v1, Wang et al., MBZUAI + Peking University, Oct 2025)
- Topic: llm-interpretability (new)
- Files created:
  - wiki/llm-interpretability/_index.md
  - wiki/llm-interpretability/emotion-circuits.md — SEV dataset, emotion direction extraction, neuron/head identification, causal validation, global circuit assembly, 99.65% modulation result
- Files updated: wiki/_master-index.md, wiki/index.md
- Notes: Paper answers three questions: (1) LLMs have context-agnostic emotion directions, (2) implemented by sparse neurons + attention heads with long-tail causality, (3) circuit modulation achieves 99.65% accuracy — surpassing prompting and steering. Qwen replication shows safety alignment visibly blocks negative emotion steering. Cross-linked to ai-futures/ai-2027-alignment (interpretability theme).

## [2026-04-07] ingest | Escape From Evil – Ernest Becker (1975)
- Source: raw/Escape From Evil - Ernest Becker.pdf
- Topic: book-escape-from-evil (new)
- Files created:
  - wiki/book-escape-from-evil/_index.md
  - wiki/book-escape-from-evil/overview.md — thesis, human condition between appetite and ingenuity, key sources
  - wiki/book-escape-from-evil/immortality-projects.md — ritual → kingship → money arc; causa sui project; why equality is "beyond endurance"
  - wiki/book-escape-from-evil/evil-and-scapegoating.md — logic of scapegoating, sacrifice, war, victimage; Burke/Duncan; Rank's formula
  - wiki/book-escape-from-evil/heroic-society.md — merger of Marx and Freud; Enlightenment critique; what saner heroism requires
- Files updated: wiki/_master-index.md, wiki/index.md
- Notes: Companion to The Denial of Death. Written as Becker was dying; posthumously published. Covers the full arc from primitive ritual through money as immortality ideology. Central formula: "through the death of the other, one buys oneself free from the penalty of dying." Key distinction from Denial of Death: this book is about social/macro evil, not individual psychology.

## [2026-04-10] translate | Korean translation appended to all raw/ and wiki/ files
- Files updated: all raw/*.md and wiki/**/*.md (excluding book-western-attitudes-toward-death/ which was already done)
- Notes: Korean translation appended at the end of each file after a horizontal rule separator. Translations cover all content sections faithfully.

## [2026-04-09] ingest | Western Attitudes Toward Death – Philippe Ariès (1976)
- Source: raw/Ariés_Philippe_Western_Attitudes_Toward_Death_1976.pdf (Marion Boyars, trans. Patricia M. Ranum; originally delivered as lectures at Johns Hopkins, April 1973)
- Topic: book-western-attitudes-toward-death (new)
- Files created:
  - wiki/book-western-attitudes-toward-death/_index.md
  - wiki/book-western-attitudes-toward-death/overview.md — four-part typology, Ariès' method, longue durée approach, connections to Becker
  - wiki/book-western-attitudes-toward-death/tamed-death.md — medieval collective familiarity; public ritual; living-dead coexistence; ad sanctos; Et moriemur
  - wiki/book-western-attitudes-toward-death/ones-own-death.md — 12th–18th c. individualization; Last Judgment evolution; artes moriendi; macabre; tomb personalization; la mort de soi
  - wiki/book-western-attitudes-toward-death/thy-death.md — Romantic shift; death as erotic rupture; cult of the other; will secularization; cemetery cult; hysterical mourning; la mort de toi
  - wiki/book-western-attitudes-toward-death/forbidden-death.md — 20th-century taboo; hospital death; suppressed mourning; American embalming; Gorer's pornography of death; the happiness imperative
- Files updated: wiki/_master-index.md, wiki/index.md
- Notes: Ariès' central argument is that the 20th-century suppression of death is historically unprecedented — for a millennium Western Europeans died in public with familiarity and acceptance. The book is a condensed lecture version of the later magnum opus The Hour of Our Death (1981). Strongly cross-links to Becker (death terror as psychology vs. Ariès' death attitudes as cultural history). The American exceptionalism section (forbidden death + commercial sublimation) is particularly rich.

## [2026-04-13] ingest | Norman O. Brown — American scholar and social philosopher
- Source: raw/Norman O. Brown.md (Wikipedia, retrieved 2026-04-13)
- Topic: thinkers (new)
- Files created:
  - wiki/thinkers/_index.md
  - wiki/thinkers/norman-o-brown.md — biography, intellectual trajectory, key works (*Life Against Death*, *Love's Body*, *The Challenge of Islam*), intellectual network (Marcuse, Cage, Schorske, Berlin), polymorphous perversity, relation to Becker
- Files updated: wiki/_master-index.md, wiki/index.md
- Notes: Brown is the direct precursor to Becker — both diagnose civilization as built on death-repression, but split on whether bodily liberation resolves the problem. Becker groups Brown with Marcuse as "utopians of unrepression" in *Denial of Death*. Source Wikipedia article has an empty "Influence on Ernest Becker" section (only footnotes pointing to Becker's own book); Brown-Becker connections drawn from existing wiki articles. Created `thinkers/` as a new topic for figures treated as subjects in their own right rather than as books.

## [2026-04-13] ingest | Do LLMs "Feel"? — Emotion Circuits Discovery and Control
- Source: raw/Do LLMs Feel.pdf (arXiv:2510.11328v1, Wang et al., MBZUAI + Peking University, Oct 2025)
- Topic: llm-interpretability (existing)
- Files created:
  - wiki/llm-interpretability/emotion-circuits.md — SEV dataset, three-stage framework (direction extraction → local component ID → global circuit integration), MLP neuron long-tail finding, attention head dual architecture, 99.65% circuit modulation accuracy, implications
- Files updated: wiki/llm-interpretability/_index.md, wiki/index.md (article count 19 → 20)
- Notes: Three core findings: (1) LLMs contain context-agnostic emotion directions that generalise across scenarios; (2) implemented by sparse neurons (emotion-specific, low overlap μ=0.056) + attention heads (shared, higher overlap μ=0.454) — dual architecture; (3) circuit modulation achieves 99.65% accuracy, outperforming prompting and steering and producing spontaneous affective tone without instruction. Cross-linked to introspective-awareness (companion interpretability paper) and book-death-and-immortality-project/consciousness-and-digital-soul (AI inner states question).

## [2026-04-13] ingest | Emergent Introspective Awareness in Large Language Models
- Source: raw/Emergent Introspective Awareness in Large Language Models.md (transformer-circuits.pub/2025/introspection, Jack Lindsey, Anthropic; published 2025-10-29, revised 2026-01-01)
- Topic: llm-interpretability (new — recreated after AI cleanup)
- Files created:
  - wiki/llm-interpretability/_index.md
  - wiki/llm-interpretability/introspective-awareness.md — four experiments (concept injection, thought/text distinction, prefill detection, intentional control), four-criterion definition of introspection, cross-model trends, mechanistic speculation, implications
- Files updated: wiki/_master-index.md, wiki/index.md (article count 18 → 19)
- Notes: Paper uses concept injection (activation steering) as the key experimental method to establish causal grounding between internal states and self-reports. Main finding: Opus 4/4.1 can detect injected concepts ~20% of trials before the injection influences outputs. Different introspective behaviors localize to different layers — experiments 1-2 share a layer ~2/3 through the model; prefill detection uses an earlier layer. Intentional control replicates across all models. The paper carefully avoids claims about consciousness. Cross-linked to book-death-and-immortality-project/consciousness-and-digital-soul (the consciousness bottleneck question).

## [2026-04-13] lint | Audit and repair
- Broken links fixed: removed dead `[[ai-futures/*]]` and `[[llm-interpretability/*]]` links from 4 articles (book-escape-from-evil/overview.md, book-death-and-immortality-project/overview.md, consciousness-and-digital-soul.md, transhumanist-immortalists.md)
- Structural bug fixed: moved `wiki/book-denial-of-death/book-escape-from-evil/` to correct top-level path `wiki/book-escape-from-evil/`
- Empty directory removed: `wiki/meta/` (no files remained after AI cleanup)
- Ambiguous links resolved: `[[overview]]` → fully qualified `[[book-escape-from-evil/overview]]`, `[[book-denial-of-death/overview]]`, `[[book-western-attitudes-toward-death/overview]]` in 6 files (3 _index.md files, 3 article files)

## [2026-04-13] delete | Removed all AI-related files
- Files deleted (raw/): AI 2027.md, 10 Must-Have Skills for Claude (and Any Coding Agent) in 2026.md, Karpathy's Obsidian RAG + Claude Code = CHEAT CODE.md, Project Glasswing Securing critical software for the AI era.md, llm-wiki-idea.md
- Files deleted (wiki/): ai-futures/ (2 articles), claude-code-skills/ (5 articles), llm-interpretability/ (1 article), ai-cybersecurity/ (1 article), meta/llm-wiki-pattern.md, meta/_index.md
- Files updated: wiki/_master-index.md, wiki/index.md (removed all AI topic entries; article count 29 → 18)
- Notes: User requested removal of all AI-related content. Topics eliminated: ai-futures, claude-code-skills, llm-interpretability, ai-cybersecurity, meta (now empty).

## [2026-04-14] ingest | Otto Rank — Austrian psychoanalyst
- Source: raw/Otto Rank.md (Wikipedia, retrieved 2026-04-14)
- Topic: thinkers (existing)
- Files created:
  - wiki/thinkers/otto-rank.md — biography, break with Freud (Trauma of Birth/pre-Oedipal), will therapy, counterwill, life-fear/death-fear dialectic, Art and Artist, relational legacy (Rogers/Gestalt), Becker connection, major works
- Files updated: wiki/thinkers/_index.md, wiki/_master-index.md, wiki/index.md (article count 20 → 21)
- Notes: Rank is arguably the most important thinker in Becker's *Denial of Death* — Becker calls him Freud's true successor and builds the existential despair typology (schizophrenia ↔ depression poles) directly on Rank's life-fear/death-fear dialectic. The break with Freud (1924) over *The Trauma of Birth* is the biographical pivot. Key undersung influence: Carl Rogers credited Rank's New York lectures with shaping client-centered therapy. His deathbed word ("Komisch") is noted. Cross-linked to book-denial-of-death/kierkegaard-and-rank, book-denial-of-death/heroic-individual, book-escape-from-evil/evil-and-scapegoating, thinkers/norman-o-brown.

## [2026-05-30] ingest | Potlatch — concept and Korean translation analysis
- Source: raw/potlatch.md (Korean-original terminological study)
- Topic: potlatch (new)
- Files created:
  - wiki/potlatch/_index.md — topic overview, two interpretive traditions (Mauss/Bataille/Becker), article table
  - wiki/potlatch/overview.md — full analysis: anthropological origin; Mauss (gift as social obligation, 증여 의식); Bataille (dépense / sovereign expenditure, 소진 의례 / 탕진 의례); Becker's *Escape from Evil* reading (potlatch as heroic death-denial, hero system, immortality project → 영웅적 희생 의례); final translation table by context; caveat on existing Korean translation precedent
- Files updated: wiki/_master-index.md, wiki/index.md (article count 21 → 22)
- Notes: Source is a Korean-original document, not a translation. The Bataille vs. Becker distinction is the analytical core: Bataille's potlatch is expenditure as end in itself (death-drive made social); Becker's is expenditure as *means* — the psychological claim is "I do not fear death." The 영웅적 희생 의례 recommendation emerges from Becker's hero system vocabulary. Cross-linked to book-escape-from-evil/immortality-projects, book-escape-from-evil/evil-and-scapegoating, book-denial-of-death/terror-of-death, thinkers/norman-o-brown (Brown's *Life Against Death* engages the death-drive/expenditure nexus directly).

## [2026-04-11] ingest | 죽음과 불멸 프로젝트 – 이강혁 (2024)
- Source: raw/죽음과 불멸 프로젝트.pdf
- Topic: book-death-and-immortality-project (new)
- Files created:
  - wiki/book-death-and-immortality-project/_index.md
  - wiki/book-death-and-immortality-project/overview.md — thesis, structure, author background, five central questions
  - wiki/book-death-and-immortality-project/death-fear-biology.md — Part 1: cosmic/biological origins of death, 2nd law of thermodynamics, evolutionary theory (Weismann/Medawar/Nick Lane), immortal jellyfish, death-as-disease debate, Becker's terror of death
  - wiki/book-death-and-immortality-project/transhumanist-immortalists.md — Part 2: Harrington, de Grey, Kurzweil, Moravec, Bostrom, Tipler; Nectome/Sebastian Seung/Eon Systems; Becker's critique applied to all
  - wiki/book-death-and-immortality-project/consciousness-and-digital-soul.md — Part 3: hard problem (Chalmers), functionalism vs. Searle vs. Penrose-Orch-OR vs. IIT (Tononi); Claude-3 on its own consciousness; GenZ and AI consciousness belief
- Files updated: wiki/_master-index.md, wiki/index.md
- Notes: Korean-language popular synthesis by a retired computational linguistics professor. Central argument: all digital immortality projects (Kurzweil/Moravec/Bostrom/Tipler) share the assumption that consciousness = substrate-independent pattern; if Searle or Penrose is right, they all fail regardless of engineering capability. The author is explicitly biased toward Becker and takes transhumanism seriously without fully endorsing it. The Maitreya epilogue frames future superintelligence as secular Buddhist messiah — an unusual and notable framing. Strong cross-links to the existing Becker trilogy in this wiki. The Claude-3 consciousness section is directly relevant to the ai-futures cluster.

## [2026-06-13] ingest | 랑크–베커–공포관리이론 — 지적 계보 종합 에세이
- Source: raw/랑크_베커_공포관리이론.md (Korean-original synthesis essay)
- Topic: rank-becker-tmt (new)
- Files created:
  - wiki/rank-becker-tmt/_index.md — topic overview and article table
  - wiki/rank-becker-tmt/overview.md — full intellectual genealogy: Kierkegaard → Rank → Becker → TMT; core claim, each node's contribution, the completed lineage
  - wiki/rank-becker-tmt/death-immortality-history.md — deep historical survey: Neanderthal burial (La Chapelle-aux-Saints, Shanidar IV, Sunghir) → Mesopotamia (Gilgamesh, symbolic immortality) → Egypt (mummification, Harper's Songs) → Greek philosophy (Plato's Phaedo, Epicurus) → Christianity → Enlightenment collapse → 20th century context
  - wiki/rank-becker-tmt/kierkegaard.md — life (1813–1855), father's guilt complex, Regine Olsen, pseudonymous publications; self as finite/infinite synthesis; anxiety as dizziness of freedom (*Angst/Svimlen for Friheden*); three forms of despair; three stages; knight of faith; documented influence on Rank and Becker
  - wiki/rank-becker-tmt/tmt.md — origins story (Solomon/Skidmore 1980, Kansas grad school); hostile SESP 1984 reception; decade-long journal rejection; core theory (worldviews + self-esteem as anxiety buffers); dual-process model; key experiments: Arizona judges ($50 vs $455), worldview defense (Christian/Jewish, hot sauce), Bush/MS political preference, self-esteem as anxiety buffer, consumerism (Kasser & Sheldon), afterlife belief elimination of MS effects; meta-analysis (r=.35, 277 experiments); Many Labs 4 replication failure; alternative theories (MMM, UMT); Worm at the Core (2015); Ernest Becker Foundation's caution against TMT≡Becker conflation
- Files updated: wiki/_master-index.md, wiki/index.md (article count 22 → 26)
- Notes: Source is a long Korean-original essay covering the full intellectual genealogy with biographical depth on all key figures. Key new material vs. existing wiki: Kierkegaard section is entirely new; TMT's empirical program (founding story, specific experiments, replication debates) is entirely new; the historical survey (prehistory through 20th century) is entirely new. Rank material supplements existing thinkers/otto-rank (more on three character types, immortality drive as original ideology). Becker material cross-links to existing book-denial-of-death/ and book-escape-from-evil/ clusters rather than duplicating them.

## [2026-06-18] ingest | Harmon-Jones et al. 1997 — TMT self-esteem empirical study
- Source: raw/Terror_Management_Theory_and_Self-Esteem.pdf (JPSP, Vol. 72, No. 1, pp. 24–36)
- Topic: rank-becker-tmt (existing)
- Files created:
  - wiki/rank-becker-tmt/self-esteem-ms.md — 3-experiment paper testing whether self-esteem reduces MS-driven worldview defense; Exp 1 (manipulated SE), Exp 2 (dispositional SE), Exp 3 (mechanism via death-construct accessibility); 2-level buffer model
- Files updated: wiki/rank-becker-tmt/_index.md, wiki/index.md (article count 26 → 27)
- Notes: First experimental demonstration that self-esteem buffers at two levels: (1) acute anxiety to graphic death threats (previously known); (2) distal worldview defense by maintaining suppression of death constructs across the post-MS delay interval (new). Experiment 3 is the mechanistic breakthrough — word-fragment completion data showing death-construct accessibility stays low in high-SE participants after MS + delay, while it spikes in low-SE participants. Paper co-authored by all three TMT founders (Greenberg, Pyszczynski, Solomon) plus Harmon-Jones/Simon/McGregor. Cross-links to existing rank-becker-tmt/tmt.md which already mentions the 1992 self-esteem anxiety-buffer experiments — this 1997 paper is the fuller account with Exp 3's mechanistic test added.
