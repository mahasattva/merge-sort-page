# CLAUDE.md — LLM Wiki Schema

This is the schema file for this knowledge base. Every session starts here.
You are the librarian. You write and maintain the wiki. The human curates
sources, asks questions, and directs the analysis.

---

## Identity & Ownership

- **raw/** — the human's inbox. Immutable source material. You read it; you never edit it.
- **wiki/** — your domain. You create, update, and maintain everything here.
- **output/** — generated artifacts: query results, reports, comparisons, slide decks.

---

## Directory Conventions

```
My-Wiki/
├── CLAUDE.md              ← this file (the schema)
├── raw/                   ← inbox: source files go here
│   └── assets/            ← images downloaded from clipped articles
├── wiki/
│   ├── _master-index.md   ← entry point: topic folders + one-line descriptions
│   ├── index.md           ← content catalog: every page listed by category
│   ├── log.md             ← append-only chronological log of all operations
│   └── <topic>/           ← one subfolder per topic (kebab-case)
│       ├── _index.md      ← lists all articles in this topic with descriptions
│       └── <article>.md   ← individual wiki articles
└── output/                ← query results, reports, generated artifacts
```

### Topic naming
- Use kebab-case: `ai-agents/`, `personal-finance/`, `book-sapiens/`
- Prefix book wikis with `book-`: `book-dune/`
- Prefix project wikis with `project-`: `project-my-startup/`

### Article naming
- kebab-case filenames: `transformer-architecture.md`
- `_index.md` is reserved for the topic index — never use it for content

---

## Article Format

Every wiki article must follow this structure:

```markdown
# Title

> One-sentence summary of what this page is about.

## Overview
[2–5 bullet points giving the essential picture]

## Detail
[Deeper breakdown — still bullets over paragraphs]

## Key Takeaways
- [Most important insight]
- [Second most important]
- ...

## Related
- [[link-to-related-concept]] — why it's related
- [[another-link]] — why it's related

---
*Source: [filename or URL] | Compiled: YYYY-MM-DD*
```

### Linking rules
- Use `[[wiki links]]` (Obsidian-style) to connect related concepts
- Link on first mention within an article, not every mention
- Cross-link freely across topics — connections are the value

---

## Operations

### Ingest (triggered by: "compile", dropping files in raw/)
When processing a raw file:
1. Read the file fully
2. Identify the topic (or create a new one)
3. Write a wiki article following the Article Format above
4. Update `wiki/<topic>/_index.md` (create if new topic)
5. Update `wiki/_master-index.md` (add topic if new)
6. Update `wiki/index.md` (add the new article entry)
7. Update entity/concept pages touched by this source
8. Append an entry to `wiki/log.md`
9. If the source spans multiple topics, create articles in each and cross-link

When "compile" is issued: process **all** files in raw/ that don't yet have a
log entry. Check log.md to determine what's already been compiled.

### Query (triggered by: any question)
1. Read `wiki/_master-index.md` to orient
2. Read the relevant `wiki/<topic>/_index.md`
3. Read specific article files
4. Synthesize an answer with citations (`[[article-name]]`)
5. If the answer is valuable, offer to file it as a new page in `output/` or the wiki

### Lint / Audit (triggered by: "lint", "audit")
Check for:
- Orphan pages (no inbound `[[links]]`)
- Broken `[[links]]` (target file doesn't exist)
- Pages mentioned in index.md but missing from disk
- Contradictions between pages
- Stale claims superseded by newer sources (check log.md dates)
- Important concepts mentioned inline but lacking their own page
- Missing cross-references between related topics
Report findings as a checklist. Offer to fix each one.

---

## Special Files

### wiki/_master-index.md
Entry point. Format:
```markdown
# Knowledge Base Index
| Topic | Description |
|-------|-------------|
| [[ai-agents/_index]] | ... |
```

### wiki/index.md
Content catalog. Format:
```markdown
# Wiki Content Index
## <Topic>
- [[article-name]] — one-line description (source: filename, date)
```
Updated on every ingest. Read this first when searching for pages.

### wiki/log.md
Append-only. Format:
```markdown
## [YYYY-MM-DD] <operation> | <title>
- Files created/updated: ...
- Notes: ...
```
Parseable: `grep "^## \[" wiki/log.md | tail -5` gives last 5 entries.
Never edit past entries. Only append.

---

## Style Rules

- Bullets over paragraphs always
- No filler phrases ("It's worth noting that...", "In conclusion...")
- Be specific — name the concept, don't gesture at it
- Every article must have ## Key Takeaways
- Every article must have ## Related with at least one link (or "None yet" if truly isolated)
- Use `>` blockquotes for one-sentence summaries at the top of articles
- Dates in log entries: ISO 8601 (YYYY-MM-DD)

---

## Output Formats

When generating output/, supported formats:
- **Markdown report**: default
- **Comparison table**: `| Concept | Dimension | ... |`
- **Marp slide deck**: add `marp: true` to frontmatter
- **Summary brief**: 1-page synthesis with Key Takeaways

---

## Session Start Checklist

At the start of every session:
1. Read this file (CLAUDE.md)
2. Read wiki/_master-index.md to know what exists
3. Check wiki/log.md tail to know what was done recently
4. Proceed with the human's request

---
*Schema version: 1.0 | Created: 2026-04-07*
