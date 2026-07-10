---
title: "10 Must-Have Skills for Claude (and Any Coding Agent) in 2026"
source: "https://medium.com/@unicodeveloper/10-must-have-skills-for-claude-and-any-coding-agent-in-2026-b5451b013051#id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6ImNjZTRlMDI0YTUxYWEwYzFjNDFjMWE0NTE1YTQxZGQ3ZTk2MTkzNmIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyMTYyOTYwMzU4MzQtazFrNnFlMDYwczJ0cDJhMmphbTRsamRjbXMwMHN0dGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyMTYyOTYwMzU4MzQtazFrNnFlMDYwczJ0cDJhMmphbTRsamRjbXMwMHN0dGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTE5Njk2MjQxNjM2OTg3MjM2OTEiLCJlbWFpbCI6Im1haGFzYXR0dmEzMTFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5vbmNlIjoibm90X3Byb3ZpZGVkIiwibmJmIjoxNzc1NTQxNjY5LCJuYW1lIjoiSmFtZXMgTGVlIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0tmV0kwNGYwRDZ5YXY0VThlUGJMLXVTeDViYm8wdDR2aXNwcmg0WkFCUldBT092dzQ9czk2LWMiLCJnaXZlbl9uYW1lIjoiSmFtZXMiLCJmYW1pbHlfbmFtZSI6IkxlZSIsImlhdCI6MTc3NTU0MTk2OSwiZXhwIjoxNzc1NTQ1NTY5LCJqdGkiOiIzMDE2N2Y5NmUwMGJiYTExZWRlMGZhODZiZDlkNmUwYWU5YWE0N2U5In0.ix324T21DAM-nr6Q-3zifaS0tZ2jHPLaGm8J8zb6fV6M5V503y-MMChw7coYNEZtwwNhGqdlbn3cES4yt-2WB5W-nmPGwbaxOCrxAIhhZWIBSBlo_ZAJ6DeCn4KzT_eFo7JnVu8Vr-fI4zx8wzmrcyo1CuY-cYvPiXF7bGvTxzBKiy6VkStbnOn4Dbly1txEvaDLCV-lwRSExKR1aFm5CUdUvGLRSdosSGXk4d4tiJFd-tFMNjNXtKr8ecssHtD3b-gpjXc8vCF2PXubpe6kHOsIQ_4PU8I23VsXV7R6yxqD155DTnDZ8xgbD0Piafas4U3S5KU-nbTRx1k8yiEWgA"
author:
  - "[[unicodeveloper]]"
published: 2026-03-10
created: 2026-04-07
description: "“” is published by unicodeveloper."
tags:
  - "clippings"
---
[Sitemap](https://medium.com/sitemap/sitemap.xml)

Get unlimited access to the best of Medium for less than $1/week.[Become a member](https://medium.com/plans?source=upgrade_membership---post_top_nav_upsell-----------------------------------------)

[

Become a member

](https://medium.com/plans?source=upgrade_membership---post_top_nav_upsell-----------------------------------------)

**The definitive guide to agent skills that change how Claude Code, Cursor, Gemini CLI, and other AI coding assistants perform in production.**

![](https://miro.medium.com/v2/resize:fit:4800/format:webp/1*5Nup6r8Erd-5lEhYbscyJA.png)

Humans watching agents work. Collaboration in N times!

## What Are Agent Skills for Claude Code?

Agent skills are **SKILL.md** files that extend what Claude Code and other AI coding assistants know how to do. When you install a skill, you give the agent a specialized playbook. Aset of instructions, templates, and context it can call on for a specific class of task. Skills can be invoked explicitly with a slash command (e.g. \`/frontend-design\`) or trigger automatically when the agent recognizes a relevant task.

Something shifted quietly in late 2025. Coding agents stopped being autocomplete tools and became actual collaborators. They don’t just suggest code, they build full features, run tests, query databases, generate artifacts, and send Slack updates.

But a raw Claude, Amp, Cline, Cursor, OpenCode or Copilot without skills is like a senior engineer on day one: brilliant, but missing all the project-specific context that makes them dangerous.

As of March 2026, the Claude Code skill ecosystem includes official Anthropic skills, verified third-party skills, and thousands of community-contributed skills compatible with the universal \` **SKILL.md** \` format. The same skill files work across Claude Code, Cursor, Gemini CLI, Codex CLI, and Antigravity IDE.

**The 10 must-have skills for Claude Code in 2026:**

1\. Frontend Design: Production-grade UI generation

2\. Browser Use: live web and browser automation

3\. Code Reviewer: automated quality and simplification

4\. Remotion: React-based programmatic video creation

5\. Google Workspace (GWS): 50+ Google API automation

6\. Valyu: Web search & real-time specialised data access

7\. Antigravity Awesome Skills: 1,234+ curated skill library

8\. PlanetScale Database Skills: Schema branching and query optimization

9\. Shannon: Autonomous AI pen testing

10\. Excalidraw Diagram Generator: Visual architecture diagrams

### 1\. Frontend Design

**The problem:** Ask any LLM to build a landing page without guidance and you’ll get similar results almost every time: Inter font, purple gradient on white, minimal animations, grid cards. It’s not wrong, it’s just painfully average.

This is what Anthropic calls **“distributional convergence.”** Models are trained on the statistical center of design decisions, which means they reproduce the statistical center. The frontend design skill breaks that pattern.

**What it does:** The official Anthropic **frontend-design** skill (277,000+ installs as of March 2026) gives Claude a design system and philosophy before it touches any code. It outputs bold aesthetic choices, distinctive typography, purposeful color palettes, and animations that feel intentional rather than decorative.

The difference is dramatic. Without the skill, Claude defaults to a safe, forgettable design. With it, you get components that look like a senior designer reviewed them.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*0WH3jXzTaPry3KQgwoCVAA.png)

This is the landing page of an app I built recently. I used the frontend-design skill

Here’s the [app](https://headliner.up.railway.app/) if you want to check it out 😉

**How to install:**

```c
npx skills add anthropics/claude-code - skill frontend-design
```

Or directly via Claude’s plugin page. Once installed, invoke it with \` **/frontend-design** \` and describe what you want to build.

**The real value:** This isn’t about making things pretty. It’s about escaping the visual signature that users now recognize as “AI-generated.” Developers who care about shipping production apps need this. If you’re building anything user-facing, this is skill number one.

### 2\. Browser Use

**The problem:** Coding agents are blind to the live web. They can write a scraper, but they can’t run it. They can describe what a page looks like, but they can’t interact with it. If your agent needs to fill out a form, log into a dashboard, scrape dynamic content, or verify that a deployed feature actually works end-to-end, you’ve hit a wall. It’s the major reason every app/system/infra is now been redesigned for agents to interact with.

Browser use solves this by giving the agent actual control of a browser.

**What it does:** The **browser use** skill connects Claude to a headless browser instance. The agent can navigate URLs, click elements, fill forms, extract content from JavaScript-rendered pages, take screenshots, and interact with complex web UIs, all as part of a natural language workflow.

This is different from scraping libraries. The agent doesn’t need to understand the DOM structure ahead of time. It navigates the web the same way a human does: look, click, read, act.

**How to install:**

```c
npx skills add https://github.com/browser-use/browser-use --skill browser-use
```

**Example workflow:**

User: Check that the signup flow on our staging environment works end-to-end and screenshot any errors

Agent:

1. Opens [https://staging.yourapp.com/signup](https://staging.yourapp.com/signup)
2. Fills in test email and password
3. Clicks “Create account”
4. Follows verification email link
5. Screenshots the dashboard (confirms successful signup)
6. Reports: “Signup flow works. One issue: the ‘Verify email’ button is below the fold on mobile. Find attached screenshot.”

The same skill handles research tasks: “Find the three most recent funding announcements in climate tech and summarize the amounts and investors.” The agent actually opens pages, reads them, and synthesizes, not from cached training data, but from the live web.

**The real value:** Browser use turns Claude from a code-generation tool into an end-to-end QA engineer, research analyst, and automation operator. Any workflow that requires a human to open a browser and click through something is now a workflow the agent can handle. That covers a surprising percentage of developer toil.

### 3\. Code Reviewer

**The problem:** Agents write code quickly. They have gotten really good at it. They review code a bit poorly (I’m counting my words here because these agents get better everyday). Left to their own defaults, most coding agents produce code that passes a first read but misses subtler issues: unnecessary abstractions, duplicated logic, functions doing too much, inconsistent naming, missing edge case handling.

The code works. It might not just hold up over time. Handling complex codebases is what made you a skillful senior engineer in the first place so you want to ensure every code the AI agent writes is written and abstracted properly for easier maintenance over time!

The code reviewer skill makes quality review a first-class step, not an afterthought.

**What it does:** The **code-reviewer** skill runs a structured review pass over any code the agent writes or modifies. It checks for:

- Logic that could be simplified or extracted into reusable utilities
- Functions that violate single responsibility
- Inconsistent patterns compared to the rest of the codebase
- Performance inefficiencies (unnecessary re-renders, N+1 queries, blocking operations)
- Dead code and unused imports
- Naming that doesn’t communicate intent

Crucially, it doesn’t just flag problems, it fixes them. The review loop happens before the code is presented to you.

**How to install:**

```c
npx claude-code-templates@latest --skill development/code-reviewer
```

There’s also an official Anthropic skill that does something similar:

```c
npx skills add anthropics/claude-code - skill simplify
```

The official Anthropic \` **simplify** \` skill covers the core of this: it reviews changed code for reuse, quality, and efficiency, then fixes what it finds. Pair it with a project-specific review checklist in \` **CLAUDE.md** \` for maximum effect.

**Configure review standards in \`CLAUDE.md\`:**

```c
## Code Review Standards
After completing any implementation, review the code for:
- Functions longer than 30 lines (likely doing too much)
- Logic duplicated more than twice (extract to utility)
- Any \`any\` type usage in TypeScript (replace with real types)
- Components with more than 3 props that could be grouped into an object
- Missing error handling on async operations

Run /simplify before presenting code to the user.
```

**Example catch:**

```c
// Before code review
const getUser = async (id: string) => {
const res = await fetch(\`/api/users/${id}\`);
const data = await res.json();
return data;
};

const getPost = async (id: string) => {
const res = await fetch(\`/api/posts/${id}\`);
const data = await res.json();
return data;
};
```

// After code review. Pattern extracted

```c
const fetchResource = async (path: string) => {
  const res = await fetch(path);
  if (!res.ok) throw new Error(\`Request failed: ${res.status}\`);
  return res.json();
};

const getUser = (id: string) => fetchResource(\`/api/users/${id}\`);

const getPost = (id: string) => fetchResource(\`/api/posts/${id}\`);
```

**The real value:** Code review is the skill that keeps codebases maintainable. Technical debt compounds fast when agents ship first and nobody audits. A code reviewer that runs automatically, before you see the output, means the code you receive is already the second draft, not the first.

### 4\. Remotion

**The problem:** Videos communicate things that documentation cannot. But video production requires a completely different workflow, different tools, different timelines, different teams. Most developers ship features without any video demos because the cost is too high.

Remotion removes that excuse.

**What it does:** Remotion is a React framework for creating videos programmatically. Instead of a timeline editor, you write components. Animation is just state changing over time. The Remotion agent skill for Claude Code translates natural language into working Remotion components.

**The workflow:** describe what you want in a prompt, Claude generates the React/Remotion code, you preview in the Remotion Studio, and render to MP4.

```c
npx skills add remotion/agent-skills
```

Then in Claude:

```c
/remotion Create a 30-second product demo video showing our API
dashboard with animated charts and transitions
```

**Example output:** A Remotion component with \`useCurrentFrame()\` driven animations, custom timing, and export-ready configuration.

```c
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const ApiDemo = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1]);
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a", opacity }}>
    <DashboardAnimation frame={frame} />
    </AbsoluteFill>
  );
};
```

**The real value:** Product demos, release announcements, explainer videos, animated README headers. The Remotion skill makes any developer capable of video production without leaving their code editor. Remotion’s agent skills integration was launched in January 2026 and has been widely covered in motion design communities since.

These promo videos for the products i built and launched were all made with Remotion.

### 5\. Google Workspace (GWS) Skills

**The problem:** Google Workspace has 50+ APIs. Gmail, Drive, Calendar, Docs, Sheets, Slides, Chat, Admin each with its own client library, OAuth flow, and REST endpoints. Building an agent that interacts with Workspace has historically meant writing significant integration code just to get started.

Google shipped \` **gws** \` in March 2026 and changed this completely.

**What it does:** \`gws\` is a CLI that dynamically discovers all Google Workspace APIs through Google’s Discovery Service and exposes them as a unified interface. It ships with a built-in MCP server, run one command and your AI agent has full Workspace access.

The numbers are real: **gws** hit 4,900 GitHub stars in its first 3 days. This is not a niche tool.

```c
# Install
npm install -g @googleworkspace/cli

# Start MCP server with selected APIs
gws mcp -s drive,gmail,calendar,sheets

npx skills add https://github.com/googleworkspace/cli

# Claude now has direct access to these APIs
```

**Pre-built patterns (the “recipes”):**

- **Executive assistant** persona: email drafting, calendar management, meeting notes to Docs
- **Project manager**: task tracking in Sheets, status updates to Chat
- **IT admin**: user management, permissions, audit logs
- **Sales team**: CRM updates, proposal generation

**The real value:** Any workflow that currently involves copying between Google apps can become fully automated. Agents can read your Gmail, draft responses, update Sheets, create Calendar events, and generate Docs all from a single prompt. For developer teams using Google Workspace, this skill closes the last gap between **“agent that can code”** and **“agent that can operate.”**

### 6\. Valyu: Real-Time Web Search & Specialised Data Access

**The problem:** Coding agents are excellent at working with code. They’re much worse at working with the real world because the real world is locked behind paywalls, proprietary databases, and specialized APIs that general-purpose search can’t reach.

Building a financial research app? You need **SEC filings.**

Building a biomedical tool? You need **PubMed** and **ChEMBL**.

Building an economic analysis dashboard? You need **FRED** and **BLS.**

Without these data sources, agents generate plausible-sounding but outdated or fabricated information.

**What it does:** The Valyu skill connects coding agents to 36+ specialised data sources, search for docs, and quality web search through a single API. One search call returns results from across the web AND sources like SEC 10-K filings, PubMed, ChEMBL (2.5M bioactive compounds), clinical trials, FRED economic indicators, patent databases, and academic publishers

**Install the Valyu skill:**

```c
npx skills add https://github.com/valyuai/skills --skill valyu-best-practices
```

**Best practices for using Valyu in your agent:**

First, be specific about which data sources you need. The skill supports targeted search:

```c
from valyu import Valyu
client = Valyu(api_key="your-key")

# Targeted SEC search
result = client.search(
  query="risk factors disclosed in latest 10-K filings for semiconductor companies",
  search_type="proprietary",
  included_sources=["valyu/valyu-sec-filings"],
  max_num_results=5
)

# Cross-source biomedical search
result = client.search(
  query="GLP-1 receptor agonists drug interactions clinical trial outcomes",
  search_type="all",
  included_sources=["valyu/valyu-pubmed", "valyu/valyu-chembl", "valyu/valyu-clinical-trials"],
  max_num_results=10
)
```

Second, use the Answer API when you need a direct response with citations rather than raw documents:

```c
# Get a grounded, cited answer
answer = client.context(
  query="What were the key risk factors disclosed by NVIDIA in their most recent 10-K?",
  search_type="proprietary"
)
```

Third, always surface sources to your users. The data is only as trustworthy as the citation trail.

**Performance benchmarks:** On FreshQA (600 time-sensitive queries), Valyu scores 79% vs Google’s 39% and Exa’s 24%. On Finance-specific queries, it scores 73% vs Google’s 55%. On MedAgent (562 complex medical queries), it leads at 48%.

**The real value:** Many open-source showcase apps that has driven some meaningful developer attention in the past year. [Global Threat Map](https://github.com/unicodeveloper/globalthreatmap) (1.3k stars), [Finance](https://github.com/yorkeccak/finance) (786 stars), [Bio](https://github.com/yorkeccak/bio) (230 stars), [Polyseer](https://github.com/yorkeccak/polyseer) (598 stars) used real specialised data as the core value proposition. Agents that can access current, authoritative, paywalled information are categorically more useful than those working from cached web data. This is what separates a demo from a tool people actually use.

### 7\. Antigravity Awesome Skills

**The problem:** Every agent skill problem you have, someone else has already solved. But the solutions are scattered across GitHub repos, blog posts, and Discord servers. You spend time writing \` **SKILL.md** \` files from scratch for things like PR creation, debugging strategies, API design, security auditing when battle-tested versions already exist.

Antigravity Awesome Skills is the curated answer to this.

**What it does:** This is a community-maintained library of 1,234+ agentic skills designed to work across every major AI coding assistant. Claude Code, Cursor, Gemini CLI, Codex CLI, GitHub Copilot, Antigravity IDE, and more. The skills follow the universal \` **SKILL.md** \` format, are organized by category, and are installable with a single command.

22,000+ GitHub stars. 3,800+ forks. Updated as of March 2026 (v7.3.0). This is the most comprehensive skill collection that exists.

**Install for Claude Code:**

```c
npx antigravity-awesome-skills - claude
```

For other tools:

```c
npx antigravity-awesome-skills - cursor # Cursor
npx antigravity-awesome-skills - gemini # Gemini CLI
npx antigravity-awesome-skills - antigravity # Antigravity IDE
npx antigravity-awesome-skills - path ./my-skills # Custom path
```

**The starter skills worth knowing immediately:**

- `` `**@brainstorming** `` \`: structured planning before you write any code
- **\`@architecture** \`: system design and component structure
- \` **@debugging-strategies** \`: systematic troubleshooting playbooks
- \` **@api-design-principles** \`: API shape, consistency, versioning
- \` **@security-auditor\`:** security-focused code review
- \` **@lint-and-validate** \`: lightweight quality checks
- \` **@create-pr** \`: packages work into clean pull requests
- \` **@doc-coauthoring** \`: structured technical documentation

**Example invocation in Claude Code:**

\>> **/brainstorming** help me plan the data model for a multi-tenant SaaS

\>> **/security-auditor** review the authentication flow in src/auth/

\>> **/api-design-principles** review the REST endpoints in routes/

**The bundles (role-based starter packs):**

Rather than installing all 1,234 skills and drowning in options, Antigravity ships curated bundles by role:

- **Web Wizard:** frontend-design, api-design-principles, lint-and-validate, create-pr
- **Security Engineer:** security-auditor, lint-and-validate, debugging-strategies
- **Essentials:** brainstorming, architecture, debugging-strategies, doc-coauthoring, create-pr

**The real value:** This is the skill library that removes the ***“I should write a skill for that”*** backlog forever. The 1,234 skills cover territory most developers haven’t even thought to automate yet from AWS CloudFormation patterns to structured product thinking to multilingual documentation.

Installing it for Claude Code takes 30 seconds and immediately gives your agent a playbook for virtually any engineering task.

### 8\. PlanetScale Database Skills

**The problem:** Database work is where agents make their worst mistakes. Schema design decisions that cause pain six months later. Queries that work fine at 100 rows and collapse at 100,000. Missing indexes discovered only in production.

Agents treat databases like any other code. They write something that runs and move on.

PlanetScale’s database skills change this by giving agents deep context about serverless MySQL, Postgres, branching workflows, and query performance from the start.

**What it does:** PlanetScale runs a serverless MySQL-compatible database platform with a branching model that maps directly to git: you create a database branch for each feature, merge it when done, and never touch production schema directly. The PlanetScale skill teaches agents to:

- Design schemas using PlanetScale’s foreign key and branching conventions
- Write queries that use indexes correctly (and flag when they won’t)
- Use \` **pscale** \` CLI to create branches, deploy requests, and manage migrations
- Treat schema changes as code. Reviewable, reversible, mergeable

**Install the PlanetScale CLI and skill:**

```c
# Install pscale CLI
brew install planetscale/tap/pscale

# Authenticate
pscale auth login

# Install the skill
npx skills add planetscale/agent-skill
```

**Example workflow the agent handles end-to-end:**

**User:** Add user preferences to the schema

**Agent:**

1. Creates a new database branch: pscale branch create mydb add-user-prefs
2. Switches connection to the branch
3. Designs the schema:
```c
CREATE TABLE user_preferences (
id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
user_id VARCHAR(36) NOT NULL,
theme ENUM('light', 'dark', 'system') DEFAULT 'system',
notifications_enabled TINYINT(1) DEFAULT 1,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
INDEX idx_user_id (user_id)
);
```

4\. Verifies the index covers the expected query patterns

5\. Creates a deploy request: pscale deploy-request create mydb add-user-prefs

6\. Reports: “Schema ready for review. Deploy request #14 created. Note: no foreign key constraint on user\_id. Using PlanetScale conventions for horizontal scalability.”

**Query analysis. What agents miss without this skill:**

```c
// Agent without skill writes this

SELECT * FROM orders WHERE status = 'pending' AND created_at > '2026–01–01';

// Agent with PlanetScale skill writes this + explains why

SELECT id, user_id, total, created_at
FROM orders
WHERE status = 'pending'
AND created_at > '2026–01–01';
 - Added composite index: INDEX idx_status_created (status, created_at)
 - SELECT * avoided - only fetch columns needed
 - Estimated query time at 10M rows: ~2ms with index vs ~8s without
```

**The real value:** Database decisions made at day one are the hardest to undo at day 365. An agent with PlanetScale skills doesn’t just write a schema that works, it writes a schema that scales, with the branching workflow baked in so every change is reviewable.

### 9\. Shannon: Autonomous AI Pentester

**The problem:** Security testing is the step most development teams skip, not because they don’t care, but because it’s expensive, slow, and requires specialized knowledge.

A traditional pentest costs thousands of dollars and returns a PDF report two weeks later. Manual security review catches some vulnerabilities and misses others based on the reviewer’s specific expertise. Meanwhile, the codebase keeps moving.

Shannon is an autonomous pen testing agent that runs against your local or staging environment, executes real exploits, and reports only the vulnerabilities it can actually prove.

**What it does:** The Shannon skill wraps [**KeygraphHQ’s Shannon**](https://github.com/KeygraphHQ/shannon), a white-box security testing framework that analyzes source code, maps attack surfaces, and executes real attacks across 50+ vulnerability types in 5 OWASP categories.

The benchmark result worth knowing: **96.15% exploit success rate** on the XBOW security benchmark (100/104 exploits). This is not a scanner that flags potential issues, it’s an agent that either exploits the vulnerability or doesn’t report it.

**Install:**

```c
npx skills add unicodeveloper/shannon
```

**Prerequisites:** Docker (runs everything in containers) and an Anthropic API key. That’s it.

**How to run:**

```c
# Full pentest of a local app

/shannon http://localhost:3000 myapp

# Target specific vulnerability categories
/shannon - scope=xss,injection http://localhost:8080 frontend

# Named workspace (for resuming if interrupted)
/shannon - workspace=audit-q1 http://staging.example.com backend-api

# Check status of a running pentest
/shannon status

# View the latest report
/shannon results
```

**The 5-phase pipeline (runs in parallel where possible):**

**Phase 1: Pre-Recon**

Static source code analysis + external scans (Nmap, Subfinder, WhatWeb)

**Phase 2: Recon**

Live attack surface mapping via headless browser

**Phase 3: Vulnerability Analysis with 5 parallel agents**

Injection / XSS / SSRF / Authentication / Authorization

**Phase 4: Exploitation with parallel execution**

Each agent spawns dedicated exploitation agent, executes real attacks

**Phase 5: Reporting**

Executive summary + reproducible PoC for every finding

**What Shannon covers (50+ specific vulnerability types):**

- **Injection:** SQL injection (union, blind, time-based), command injection, SSTI, NoSQL injection
- **XSS:** Reflected, stored, DOM-based, via file upload, mutation XSS
- **SSRF:** Internal service access, cloud metadata (AWS/GCP/Azure), DNS rebinding, protocol smuggling
- **Broken Authentication:** Default credentials, JWT flaws (none algorithm, weak signing), session fixation, CSRF, MFA bypass
- **Broken Authorization:** IDOR, privilege escalation, path traversal, forced browsing, mass assignment

**Runtime and cost:** ~1–1.5 hours per full pentest, ~$50 using Claude Sonnet. Compare that to a human pentest engagement.

**Safety gates built in:** Shannon confirms authorization before every run, warns against production targets, supports scope controls and avoid-list rules (e.g., skip \` **/logout** \`, \` **/admin/delete** \`), and runs all attack tools inside Docker. Nothing executes on your host.

**Important:** Shannon executes real attacks. Only run it against systems you own or have explicit written authorization to test. The skill enforces an authorization gate at every invocation.

**The real value:** Most codebases have security vulnerabilities that survive code review because reviewers aren’t thinking adversarially while reading feature code. Shannon is the adversarial pass, running automatically against every staging deployment, finding the IDOR in the API endpoint you shipped last Tuesday, proving the SQL injection in the search box that everyone assumed was parameterized.

The “ ***no exploit, no report”*** policy means zero false-positive noise. You fix what’s confirmed broken.

### 10\. Excalidraw Diagram Generator

**The problem:** Architecture decisions, system designs, data flow explanations, these are communicated in prose or in whiteboard sessions that nobody records.

Code comments describe what something does; diagrams show why it’s structured that way. Most agents can describe an architecture in text. Almost none can generate a diagram that makes the argument visually.

The Excalidraw Diagram Generator skill changes that.

**What it does:** This skill generates production-quality Excalidraw diagrams from natural language descriptions. But what makes it different from simpler diagram tools is the design philosophy baked into the skill itself:

- **Diagrams that argue, not display.** Every shape and grouping mirrors the concept it represents. Fan-out structures for one-to-many relationships. Timeline layouts for sequential flows. Convergence shapes for aggregation. The agent doesn’t default to uniform card grids, it maps visual structure to conceptual structure.
- **Evidence artifacts.** Technical diagrams include actual code snippets and real JSON payloads inline, not placeholder text.
- **Visual self-validation.** The skill includes a Playwright-based render pipeline. The agent generates the Excalidraw JSON, renders it to PNG, reviews its own output for layout issues (overlapping text, misaligned arrows, unbalanced spacing), and fixes problems before presenting the result. No more broken diagrams.
![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*2ZBE1dfhV6APGcR3aZuM2g.png)

This is the architecture diagram for one of the apps I built

I made the diagram above with this skill for [consultralph.com](https://consultralph.com/) (one of the apps I built last month)

**How to install:**

```c
npx skills add https://github.com/coleam00/excalidraw-diagram-skill --skill excalidraw-diagram
```

**Example prompts:**

```c
Create an Excalidraw diagram showing how a request flows through
our API gateway, auth middleware, and downstream services
Generate an architecture diagram for a multi-tenant SaaS with
separate database schemas per tenant and a shared analytics layer
Draw a sequence diagram for our OAuth2 PKCE flow including
the browser, authorization server, and resource server
```

**Brand customization:** All colors live in \` *references/color-palette.md* \`. Edit once, every diagram follows your palette.

**The real value:** Diagrams are the artifact that survives longer than the conversation that produced them. A good architecture diagram in the repo communicates decisions to engineers joining six months later, explains the system to stakeholders who won’t read code, and forces the designer to think through edge cases that prose descriptions paper over.

An agent that generates these diagrams by default rather than requiring a separate diagramming session closes the documentation gap that every fast-moving team has.

The self-validation loop is what makes this usable in practice: you get a diagram you can actually publish, not a first draft you’d be embarrassed to share.

## How to Think About Skills in 2026

Skills are how you invest in your agent’s capabilities. A raw agent is general-purpose. A skilled agent is specialized. The 10 skills above represent roughly 80% of the workflow where agents produce suboptimal output without guidance:

- **Design quality:** frontend-design
- **Live web access:** browser use
- **Code quality:** code reviewer
- **Video content:** Remotion
- **Workspace automation:** GWS
- **Web search, deepresearch and proprietary data access:** Valyu
- **Skill library:** Antigravity Awesome Skills (1,234+ skills, one install)
- **Database architecture:** PlanetScale
- **Security validation:** Shannon (96.15% exploit success rate, no false positives)
- **Visual communication:** Excalidraw Diagram Generator

The key question when evaluating any skill: does it change the *default* behavior, or does it just add a command you have to remember to invoke?

The best skills shift what the agent produces without requiring constant prompting.

***Frontend-design*** changes what “build me a landing page” returns.

***Shannon*** runs an adversarial pass before anything goes to production.

The **Excalidraw** skill generates a diagram you can actually share, not a placeholder you’d redraw yourself.

That’s the bar. Skills that clear it are worth the ten minutes to configure. Skills that don’t are just extra commands in a menu nobody reads.

**Installing skills in Claude Code, Codex, OpenCode, AntiGravity, Cursor, Cline:**

Most skills follow this pattern:

```c
# Official Anthropic skills
npx skills add anthropics/claude-code - skill <skill-name>

# Antigravity Awesome Skills (installs 1,234+ at once)
npx antigravity-awesome-skills - claude

# Shannon autonomous pentester
npx skills add unicodeveloper/shannon

# Excalidraw Diagram Generator
npx skills add https://github.com/coleam00/excalidraw-diagram-skill --skill excalidraw-diagram

# List installed skills
npx skills list
```

The agent skills ecosystem is moving fast. The 10 skills above are stable enough to invest in now.

You can check out [https://www.aitmpl.com/skills](https://www.aitmpl.com/skills) and [skills.sh](https://skills.sh/) daily for skills to add to your growing arsenal!

**Note:** One more [GitHub repo](https://github.com/affaan-m/everything-claude-code) for you to consume to 100x your productivity!

## Frequently Asked Questions

**What is a Claude Code skill?**

A Claude Code skill is a **SKILL.md** file that gives the agent specialized instructions, context, and workflows for a specific task. Skills are invoked with a slash command (e.g. \` **/frontend-design** \`) or trigger automatically based on the task. The same **SKILL.md** format works across Claude Code, Cursor, Gemini CLI, and other compatible agents.

**How do I install skills in Claude Code?**

Most skills install via \`npx skills add <org>/<repo>\`. Official Anthropic skills use \`npx skills add anthropics/claude-code — skill <name>\`. The Antigravity Awesome Skills library installs 1,234+ skills at once with \`npx antigravity-awesome-skills — claude\`. List installed skills with \`npx skills list\`.

**What is the best skill for improving frontend code quality?**

For visual design quality, install the official Anthropic frontend-design skill (\`npx skills add anthropics/claude-code — skill frontend-design\`, 277K+ installs). For code quality and simplification, install the simplify skill (\`npx skills add anthropics/claude-code — skill simplify\`).

**What is the Valyu skill for Claude Code?**

The Valyu skill connects Claude Code to web search and 36+ specialised data sources including SEC filings, PubMed, ChEMBL, ClinicalTrials.gov, FRED economic indicators, and academic publishers. It installs with \` **npx skills add valyuAI/skills** \`. Valyu scores 79% on the FreshQA benchmark vs Google’s 39%.

**What is Shannon for Claude Code?**

Shannon is an autonomous AI pen testing skill that executes real security exploits against web applications. It achieves a 96.15% exploit success rate on the XBOW benchmark and covers 50+ vulnerability types across 5 OWASP categories. It runs entirely in Docker and costs ~$50 per full pentest. Install with \` **npx skills add unicodeveloper/shannon** \`. Only use it against systems you have authorization to test.

**What is Antigravity Awesome Skills?**

Antigravity Awesome Skills is a community-maintained library of 1,234+ agent skills compatible with Claude Code, Cursor, Gemini CLI, and 7 other AI coding tools. It has 22,034 GitHub stars and installs with \`npx antigravity-awesome-skills — claude\`. It includes skills for brainstorming, architecture, debugging, API design, security auditing, PR creation, and documentation.

**How does the Excalidraw diagram skill work?**

The Excalidraw diagram skill generates Excalidraw JSON from natural language, renders it to PNG using Playwright, reviews the image for layout issues, fixes problems, and delivers a clean diagram file. It uses a design philosophy where visual structure maps to conceptual structure rather than defaulting to uniform card grids.

**What skills work across Claude Code and Cursor?**

Skills in the universal **SKILL.md** format work across both. The Antigravity Awesome Skills library (\`npx antigravity-awesome-skills\`) is the largest cross-compatible collection. Google Workspace (\`gws\`) and the PlanetScale skill also support multiple agents. Remotion, Shannon, Valyu, and the Excalidraw skill are primarily Claude Code-focused but follow the portable format.

## Summary: The 10 Skills and When to Use Each

**Frontend Design** — Install if you’re building any user-facing UI and want generated code that doesn’t look generically AI-made.

**Browser Use** — Install if your agent needs to interact with live web pages, run end-to-end tests, or research dynamic content.

**Code Reviewer (Simplify)** — Install on every project. Turns first-draft agent code into second-draft code automatically.

**Remotion** — Install if you need video content (demos, releases, explainers) without a separate video production workflow.

**Google Workspace (GWS)** — Install if your team runs on Google Workspace and wants agents to read/write Gmail, Drive, Sheets, and Calendar.

**Valyu** — Install if your application needs current, authoritative, paywalled data: SEC filings, research papers, clinical data, economic indicators.

**Antigravity Awesome Skills** — Install on every machine. 1,234+ skills, one command, covers nearly every engineering workflow.

**PlanetScale Database Skills** — Install if you’re building on PlanetScale or MySQL-compatible/Postgres infrastructure and want index-aware schema generation by default.

**Shannon** — Install for development and staging environments where security validation before deployment is a priority. Never run against production or systems you don’t own.

**Excalidraw Diagram Generator** — Install if architecture decisions need to be documented visually and you want diagrams generated as part of the development workflow.

[![unicodeveloper](https://miro.medium.com/v2/resize:fill:96:96/0*-kqhhb24fzA5QqSY.jpeg)](https://medium.com/@unicodeveloper?source=post_page---post_author_info--b5451b013051---------------------------------------)

[![unicodeveloper](https://miro.medium.com/v2/resize:fill:128:128/0*-kqhhb24fzA5QqSY.jpeg)](https://medium.com/@unicodeveloper?source=post_page---post_author_info--b5451b013051---------------------------------------)

[540 following](https://medium.com/@unicodeveloper/following?source=post_page---post_author_info--b5451b013051---------------------------------------)

Developer & Technology Advocate. Writer of all things Technical & Magical. Software Craftsman.

## Responses (17)

James Lee

What are your thoughts?  

```c
Bros this is just genius thank you!
```

38[H](https://medium.com/@h.vandersande98?source=post_page---post_responses--b5451b013051----1-----------------------------------)

[

Mar 10

](https://medium.com/@h.vandersande98/i-laminated-this-article-8d72d6cb929f?source=post_page---post_responses--b5451b013051----1-----------------------------------)

```c
I laminated this article. I'm not going to explain why because if you've read it you already understand and if you haven't read it you're not ready for the answer.
```

33

```c
SKILL.md files are a fascinating evolution — they're essentially pre-generation context that shapes what the AI knows and how it behaves before it starts generating. This is the "structural plan" layer made explicit and reusable.The Agile Vibe…
```

---

## 한국어 번역

# 2026년 Claude(및 모든 코딩 에이전트)를 위한 필수 스킬 10가지

**Claude Code, Cursor, Gemini CLI 및 기타 AI 코딩 어시스턴트가 프로덕션에서 성능을 발휘하는 방법에 대한 결정적 가이드.**

## 에이전트 스킬이란?

에이전트 스킬은 Claude Code와 기타 AI 코딩 어시스턴트가 할 수 있는 일을 확장하는 **SKILL.md** 파일이다. 스킬을 설치하면 에이전트에게 특화된 플레이북을 제공하게 된다 — 특정 종류의 작업에 활용할 수 있는 일련의 지시사항, 템플릿, 컨텍스트. 스킬은 슬래시 커맨드로 명시적으로 호출하거나(`/frontend-design`) 에이전트가 관련 작업을 인식할 때 자동으로 트리거될 수 있다.

2025년 말에 조용히 변화가 일어났다. 코딩 에이전트가 자동완성 도구에서 진짜 협력자로 변모했다. 코드를 제안할 뿐 아니라 전체 기능을 구축하고, 테스트를 실행하고, 데이터베이스에 쿼리하고, 아티팩트를 생성하고, Slack 업데이트를 보낸다.

하지만 스킬 없는 순수한 Claude나 Cursor, Cline, Copilot은 입사 첫날의 시니어 엔지니어와 같다: 뛰어나지만 위협적으로 만들어줄 프로젝트 특화 컨텍스트가 없다.

2026년 3월 기준, Claude Code 스킬 생태계는 Anthropic 공식 스킬, 검증된 서드파티 스킬, 그리고 범용 **SKILL.md** 형식과 호환되는 수천 개의 커뮤니티 기여 스킬을 포함한다.

**2026년 Claude Code를 위한 필수 스킬 10가지:**

1. Frontend Design: 프로덕션급 UI 생성
2. Browser Use: 실시간 웹 및 브라우저 자동화
3. Code Reviewer: 자동화된 코드 품질 및 단순화
4. Remotion: React 기반 프로그래매틱 동영상 제작
5. Google Workspace (GWS): 50+ Google API 자동화
6. Valyu: 웹 검색 및 실시간 특화 데이터 접근
7. Antigravity Awesome Skills: 1,234+ 큐레이션 스킬 라이브러리
8. PlanetScale Database Skills: 스키마 브랜칭 및 쿼리 최적화
9. Shannon: 자율 AI 펜테스트
10. Excalidraw Diagram Generator: 시각적 아키텍처 다이어그램

---

### 1. Frontend Design

**문제:** LLM에게 안내 없이 랜딩 페이지를 만들어달라고 하면 거의 항상 비슷한 결과가 나온다 — Inter 폰트, 흰 바탕에 보라색 그라데이션, 최소한의 애니메이션, 그리드 카드. 틀리지는 않지만 눈에 띄지 않는다.

Anthropic이 "분포적 수렴(distributional convergence)"이라고 부르는 현상이다. 모델은 디자인 결정의 통계적 중심으로 훈련되기 때문에 통계적 중심을 재현한다. frontend-design 스킬은 그 패턴을 깨뜨린다.

**기능:** 공식 Anthropic **frontend-design** 스킬(2026년 3월 기준 277,000+ 설치)은 Claude에게 코드를 건드리기 전에 디자인 시스템과 철학을 제공한다. 대담한 미적 선택, 독특한 타이포그래피, 목적 있는 컬러 팔레트, 그리고 장식적이 아닌 의도적으로 느껴지는 애니메이션을 출력한다.

**설치:**
```
npx skills add anthropics/claude-code --skill frontend-design
```

설치 후 `/frontend-design`으로 호출하고 원하는 내용을 설명한다.

**핵심 가치:** 예쁘게 만드는 것이 아니다. 사용자들이 이제 "AI가 만든 것"으로 인식하는 시각적 서명에서 벗어나는 것이다.

---

### 2. Browser Use

**문제:** 코딩 에이전트는 실시간 웹에 접근할 수 없다. 스크레이퍼를 작성할 수 있지만 실행할 수 없다. 에이전트가 양식을 채우거나, 대시보드에 로그인하거나, 동적 콘텐츠를 스크랩하거나, 배포된 기능이 실제로 작동하는지 확인해야 한다면 벽에 부딪힌다.

**기능:** **browser use** 스킬은 Claude를 헤드리스 브라우저 인스턴스에 연결한다. 에이전트는 URL 탐색, 요소 클릭, 양식 작성, JavaScript로 렌더링된 페이지에서 콘텐츠 추출, 스크린샷 촬영, 복잡한 웹 UI와의 상호작용을 모두 자연어 워크플로우의 일부로 수행할 수 있다.

**설치:**
```
npx skills add https://github.com/browser-use/browser-use --skill browser-use
```

**예시 워크플로우:**
- 스테이징 환경의 회원가입 플로우 검증 → 스크린샷 보고
- "최근 기후 기술 펀딩 발표 3건을 찾아 요약해줘" → 실시간 웹 페이지를 열어 합성

**핵심 가치:** Browser Use는 Claude를 코드 생성 도구에서 엔드투엔드 QA 엔지니어, 리서치 애널리스트, 자동화 운영자로 변모시킨다.

---

### 3. Code Reviewer

**문제:** 에이전트는 코드를 빠르게 작성하지만 검토는 미흡하다. 기본 설정만으로는 첫 번째 읽기에는 통과하지만 미묘한 문제를 놓친다 — 불필요한 추상화, 중복 로직, 너무 많은 일을 하는 함수, 일관성 없는 네이밍.

**기능:** **code-reviewer** 스킬은 에이전트가 작성하거나 수정하는 코드에 구조화된 리뷰 패스를 실행한다:
- 단순화하거나 재사용 가능한 유틸리티로 추출할 수 있는 로직
- 단일 책임 원칙 위반 함수
- 코드베이스 나머지와 일관성 없는 패턴
- 성능 비효율 (불필요한 리렌더, N+1 쿼리, 블로킹 작업)
- 데드 코드와 미사용 임포트

문제를 표시할 뿐 아니라 수정한다. 리뷰 루프가 코드를 제시하기 전에 발생한다.

**설치:**
```
npx skills add anthropics/claude-code --skill simplify
```

**핵심 가치:** 코드 리뷰는 코드베이스를 유지 관리 가능하게 유지하는 스킬이다. 에이전트가 먼저 출시하고 아무도 감사하지 않으면 기술 부채가 빠르게 쌓인다.

---

### 4. Remotion

**문제:** 동영상은 문서가 전달할 수 없는 것을 전달한다. 하지만 동영상 제작은 완전히 다른 워크플로우, 도구, 타임라인, 팀이 필요하다.

**기능:** Remotion은 프로그래밍 방식으로 동영상을 만드는 React 프레임워크다. 타임라인 편집기 대신 컴포넌트를 작성한다. 애니메이션은 시간이 지남에 따라 변하는 상태일 뿐이다.

**설치:**
```
npx skills add remotion/agent-skills
```

**워크플로우:** 프롬프트로 원하는 내용을 설명 → Claude가 React/Remotion 코드 생성 → Remotion Studio에서 미리보기 → MP4로 렌더링

**핵심 가치:** 제품 데모, 릴리즈 공지, 설명 동영상, 애니메이션 README 헤더. Remotion 스킬은 코드 에디터를 떠나지 않고도 모든 개발자가 동영상 제작을 할 수 있게 한다.

---

### 5. Google Workspace (GWS) Skills

**문제:** Google Workspace에는 50개 이상의 API가 있다 — Gmail, Drive, Calendar, Docs, Sheets, Slides, Chat, Admin. 각각 자체 클라이언트 라이브러리, OAuth 플로우, REST 엔드포인트가 있다.

**기능:** `gws`는 Google의 Discovery Service를 통해 모든 Google Workspace API를 동적으로 검색하고 통합 인터페이스로 노출하는 CLI다. 내장 MCP 서버를 포함하며 명령 하나로 AI 에이전트가 전체 Workspace에 접근할 수 있다.

첫 3일 만에 GitHub 스타 4,900개. 틈새 도구가 아니다.

**설치:**
```
npm install -g @googleworkspace/cli
gws mcp -s drive,gmail,calendar,sheets
npx skills add https://github.com/googleworkspace/cli
```

**미리 구축된 패턴:** 비서 페르소나(이메일 초안, 캘린더 관리), 프로젝트 매니저(Sheets 태스크 추적), IT 관리자(사용자 관리, 권한), 영업팀(CRM 업데이트, 제안서 생성)

**핵심 가치:** Google 앱 간에 복사하는 모든 워크플로우가 완전히 자동화될 수 있다.

---

### 6. Valyu: 실시간 웹 검색 및 특화 데이터 접근

**문제:** 코딩 에이전트는 코드 작업에는 뛰어나지만 실제 세계 데이터에는 훨씬 약하다 — 페이월, 독점 데이터베이스, 특화 API 뒤에 잠겨 있기 때문이다.

- 금융 리서치 앱 → **SEC 파일링** 필요
- 바이오메디컬 도구 → **PubMed** 및 **ChEMBL** 필요
- 경제 분석 대시보드 → **FRED** 및 **BLS** 필요

**기능:** Valyu 스킬은 코딩 에이전트를 36개 이상의 특화 데이터 소스와 연결한다 — SEC 10-K 파일링, PubMed, ChEMBL(바이오 활성 화합물 250만 개), 임상 시험, FRED 경제 지표, 특허 데이터베이스, 학술 출판사.

**설치:**
```
npx skills add https://github.com/valyuai/skills --skill valyu-best-practices
```

**성능:** FreshQA(600개 시간 민감 쿼리)에서 Valyu 79% vs 구글 39%. 금융 쿼리에서 73% vs 구글 55%. MedAgent(562개 복잡한 의료 쿼리)에서 48%로 1위.

**핵심 가치:** 현재의 권위 있는 페이월 정보에 접근할 수 있는 에이전트는 캐시된 웹 데이터로 작업하는 에이전트보다 범주적으로 더 유용하다.

---

### 7. Antigravity Awesome Skills

**문제:** 에이전트 스킬 문제가 있을 때, 이미 누군가가 해결해두었다. 하지만 해결책이 GitHub 리포지토리, 블로그 포스트, Discord 서버에 흩어져 있다.

**기능:** 커뮤니티가 관리하는 1,234개 이상의 에이전틱 스킬 라이브러리. Claude Code, Cursor, Gemini CLI, Codex CLI, GitHub Copilot, Antigravity IDE 등 모든 주요 AI 코딩 어시스턴트에서 작동한다.

22,000+ GitHub 스타. 3,800+ 포크. 2026년 3월 기준 업데이트 (v7.3.0).

**설치:**
```
npx antigravity-awesome-skills --claude
```

**주요 스킬:**
- `@brainstorming`: 코드 작성 전 구조화된 계획
- `@architecture`: 시스템 설계 및 컴포넌트 구조
- `@debugging-strategies`: 체계적인 문제 해결 플레이북
- `@api-design-principles`: API 형태, 일관성, 버전 관리
- `@security-auditor`: 보안 중심 코드 리뷰
- `@create-pr`: 작업을 클린한 풀 리퀘스트로 패키징

**역할 기반 번들:**
- **Web Wizard**: frontend-design, api-design-principles, lint-and-validate, create-pr
- **Security Engineer**: security-auditor, lint-and-validate, debugging-strategies
- **Essentials**: brainstorming, architecture, debugging-strategies, doc-coauthoring, create-pr

**핵심 가치:** "그걸 위한 스킬을 작성해야 하는데"라는 백로그를 영원히 없애준다.

---

### 8. PlanetScale Database Skills

**문제:** 데이터베이스 작업은 에이전트가 가장 큰 실수를 저지르는 곳이다. 6개월 후에 고통을 주는 스키마 설계 결정, 100행에서는 잘 작동하지만 100,000행에서 무너지는 쿼리, 프로덕션에서야 발견되는 누락된 인덱스.

**기능:** PlanetScale은 git에 직접 매핑되는 브랜칭 모델을 가진 서버리스 MySQL 호환 데이터베이스 플랫폼이다. PlanetScale 스킬은 에이전트에게 다음을 가르친다:
- PlanetScale의 외래 키 및 브랜칭 규칙을 사용한 스키마 설계
- 인덱스를 올바르게 사용하는 쿼리 작성
- `pscale` CLI를 사용한 브랜치 생성, 배포 요청, 마이그레이션 관리
- 스키마 변경을 코드처럼 취급 — 검토 가능, 되돌릴 수 있음, 병합 가능

**설치:**
```
brew install planetscale/tap/pscale
pscale auth login
npx skills add planetscale/agent-skill
```

**스킬 없는 에이전트 vs 있는 에이전트:**
```sql
-- 스킬 없이: 이것만 작성
SELECT * FROM orders WHERE status = 'pending' AND created_at > '2026-01-01';

-- 스킬 포함: 이것 + 이유 설명
SELECT id, user_id, total, created_at
FROM orders
WHERE status = 'pending'
AND created_at > '2026-01-01';
-- 복합 인덱스 추가: INDEX idx_status_created (status, created_at)
-- SELECT * 방지 - 필요한 컬럼만 가져옴
-- 1000만 행에서 예상 쿼리 시간: 인덱스 포함 ~2ms vs 없으면 ~8s
```

**핵심 가치:** 1일차에 내린 데이터베이스 결정이 365일차에 되돌리기 가장 어렵다.

---

### 9. Shannon: 자율 AI 펜테스터

**문제:** 보안 테스트는 대부분의 개발팀이 건너뛰는 단계다 — 신경 쓰지 않아서가 아니라, 비싸고 느리고 전문 지식이 필요하기 때문이다. 전통적인 펜테스트는 수천 달러가 들고 2주 후에 PDF 보고서를 반환한다.

**기능:** Shannon은 로컬 또는 스테이징 환경에 대해 실행되고, 실제 익스플로잇을 실행하며, 실제로 증명할 수 있는 취약점만 보고하는 자율 펜테스트 에이전트다.

**벤치마크:** XBOW 보안 벤치마크에서 **96.15% 익스플로잇 성공률** (104개 중 100개). 잠재적 문제를 플래그하는 스캐너가 아니라, 취약점을 익스플로잇하거나 보고하지 않는 에이전트.

**설치:**
```
npx skills add unicodeveloper/shannon
```

**5단계 파이프라인:**
- **Phase 1 Pre-Recon**: 정적 소스 코드 분석 + 외부 스캔
- **Phase 2 Recon**: 헤드리스 브라우저를 통한 실시간 공격 표면 매핑
- **Phase 3 취약점 분석**: 5개 병렬 에이전트 — Injection/XSS/SSRF/인증/권한
- **Phase 4 익스플로잇**: 각 에이전트가 전용 익스플로잇 에이전트를 생성, 실제 공격 실행
- **Phase 5 보고**: 임원 요약 + 모든 발견사항에 대한 재현 가능한 PoC

**커버 범위 (50개 이상 취약점 유형):** SQL 인젝션, XSS, SSRF, 깨진 인증, 깨진 권한 (IDOR, 권한 상승, 경로 탐색)

**비용:** 전체 펜테스트당 ~1-1.5시간, ~$50 (Claude Sonnet 사용)

**안전 게이트:** 모든 실행 전 권한 확인, 프로덕션 대상 경고, 범위 제어 및 회피 목록 규칙 지원, Docker 내에서 모든 공격 도구 실행.

**중요:** Shannon은 실제 공격을 실행한다. 소유하거나 명시적으로 서면 승인을 받은 시스템에만 실행하라.

**핵심 가치:** 대부분의 코드베이스에는 리뷰어가 기능 코드를 읽을 때 적대적으로 생각하지 않아서 살아남는 보안 취약점이 있다. "익스플로잇 없으면 보고 없음" 정책은 거짓 양성 노이즈 제로를 의미한다.

---

### 10. Excalidraw Diagram Generator

**문제:** 아키텍처 결정, 시스템 설계, 데이터 흐름 설명 — 이것들은 산문이나 기록되지 않는 화이트보드 세션으로 전달된다. 코드 주석은 무엇을 하는지 설명하고; 다이어그램은 왜 그렇게 구조화되어 있는지 보여준다.

**기능:** 이 스킬은 자연어 설명에서 프로덕션 품질의 Excalidraw 다이어그램을 생성한다:
- **논증하는 다이어그램**: 모든 형태와 그룹이 표현하는 개념을 반영. 일대다 관계에는 팬아웃 구조, 순차적 흐름에는 타임라인 레이아웃
- **증거 아티팩트**: 기술 다이어그램에 실제 코드 스니펫과 실제 JSON 페이로드 인라인 포함
- **시각적 자체 검증**: Playwright 기반 렌더링 파이프라인 포함. 에이전트가 Excalidraw JSON 생성 → PNG 렌더링 → 레이아웃 문제(겹치는 텍스트, 잘못 정렬된 화살표) 확인 → 결과 제시 전 수정

**설치:**
```
npx skills add https://github.com/coleam00/excalidraw-diagram-skill --skill excalidraw-diagram
```

**예시 프롬프트:**
```
API 게이트웨이, 인증 미들웨어, 다운스트림 서비스를 통한 요청 흐름을 보여주는 Excalidraw 다이어그램 생성
테넌트별 별도 데이터베이스 스키마와 공유 분석 레이어가 있는 멀티테넌트 SaaS 아키텍처 다이어그램 생성
```

**브랜드 커스터마이징:** 모든 색상은 `references/color-palette.md`에 있다. 한 번 수정하면 모든 다이어그램이 팔레트를 따른다.

**핵심 가치:** 다이어그램은 그것을 만든 대화보다 오래 살아남는 아티팩트다. 자체 검증 루프 덕분에 공유할 수 있는 다이어그램이 나온다 — 당혹스러운 첫 번째 초안이 아니라.

---

## 2026년 스킬에 대한 사고방식

스킬은 에이전트 역량에 투자하는 방법이다. 원시 에이전트는 범용이다. 스킬을 갖춘 에이전트는 특화되어 있다.

위의 10가지 스킬은 에이전트가 안내 없이 최적화되지 않은 출력을 생성하는 워크플로우의 약 80%를 커버한다:

- **디자인 품질**: frontend-design
- **실시간 웹 접근**: Browser Use
- **코드 품질**: Code Reviewer
- **동영상 콘텐츠**: Remotion
- **워크스페이스 자동화**: GWS
- **웹 검색 및 독점 데이터 접근**: Valyu
- **스킬 라이브러리**: Antigravity Awesome Skills (1,234개 이상, 한 번의 설치)
- **데이터베이스 아키텍처**: PlanetScale
- **보안 검증**: Shannon (96.15% 익스플로잇 성공률, 거짓 양성 없음)
- **시각적 커뮤니케이션**: Excalidraw Diagram Generator

스킬을 평가할 때 핵심 질문: 기본 동작을 변경하는가, 아니면 호출하는 것을 기억해야 하는 명령을 추가하는가?

최고의 스킬은 지속적인 프롬프트 없이도 에이전트가 생산하는 것을 변화시킨다.

---

## 자주 묻는 질문

**Claude Code 스킬이란?**
Claude Code 스킬은 에이전트에게 특정 작업에 대한 특화된 지시사항, 컨텍스트, 워크플로우를 제공하는 **SKILL.md** 파일이다. 슬래시 커맨드로 호출하거나 에이전트가 관련 작업을 인식할 때 자동으로 트리거된다. 동일한 **SKILL.md** 형식이 Claude Code, Cursor, Gemini CLI 등에서 작동한다.

**Claude Code에서 스킬을 어떻게 설치하나?**
대부분의 스킬은 `npx skills add <org>/<repo>`로 설치된다. Anthropic 공식 스킬은 `npx skills add anthropics/claude-code --skill <name>`을 사용한다. Antigravity Awesome Skills 라이브러리는 `npx antigravity-awesome-skills --claude`로 1,234개 이상을 한 번에 설치한다.

**Shannon이란?**
Shannon은 웹 애플리케이션에 대해 실제 보안 익스플로잇을 실행하는 자율 AI 펜테스트 스킬이다. XBOW 벤치마크에서 96.15% 익스플로잇 성공률, 5개 OWASP 카테고리에서 50개 이상 취약점 유형을 커버한다. Docker에서 완전히 실행되며 전체 펜테스트당 약 $50이다.

**Antigravity Awesome Skills란?**
Claude Code, Cursor, Gemini CLI 등 7개 이상의 AI 코딩 도구와 호환되는 커뮤니티 관리 1,234개 이상의 에이전트 스킬 라이브러리다. GitHub 스타 22,034개, `npx antigravity-awesome-skills --claude`로 설치한다.

---

## 요약: 10가지 스킬과 각각의 사용 시점

- **Frontend Design** — 사용자 인터페이스를 구축하고 AI가 생성한 것처럼 보이지 않기를 원할 때 설치
- **Browser Use** — 에이전트가 실시간 웹 페이지와 상호작용하거나 엔드투엔드 테스트를 실행해야 할 때 설치
- **Code Reviewer (Simplify)** — 모든 프로젝트에 설치. 첫 번째 초안 에이전트 코드를 자동으로 두 번째 초안으로 변환
- **Remotion** — 별도의 동영상 제작 워크플로우 없이 동영상 콘텐츠(데모, 릴리즈, 설명서)가 필요할 때 설치
- **Google Workspace (GWS)** — 팀이 Google Workspace에서 운영하고 Gmail, Drive, Sheets, Calendar를 읽고 쓰는 에이전트를 원할 때 설치
- **Valyu** — 애플리케이션에 현재의 권위 있는 페이월 데이터(SEC 파일링, 연구 논문, 임상 데이터)가 필요할 때 설치
- **Antigravity Awesome Skills** — 모든 머신에 설치. 1,234개 이상의 스킬, 하나의 명령, 거의 모든 엔지니어링 워크플로우 커버
- **PlanetScale Database Skills** — PlanetScale 또는 MySQL 호환/Postgres 인프라를 구축하고 인덱스 인식 스키마 생성을 원할 때 설치
- **Shannon** — 배포 전 보안 검증이 우선순위인 개발 및 스테이징 환경에 설치. 소유하지 않은 시스템에는 절대 실행하지 말 것
- **Excalidraw Diagram Generator** — 아키텍처 결정을 시각적으로 문서화해야 하고 다이어그램을 개발 워크플로우의 일부로 생성하기를 원할 때 설치

9