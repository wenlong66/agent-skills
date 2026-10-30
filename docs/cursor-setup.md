# Using agent-skills with Cursor

How to wire [agent-skills](../README.md) into **Cursor** using current, supported project context — not legacy monolith files or Kaizen-specific layouts.

Every `.cursor/` path in this guide lives in **your** project (or under `~/.cursor/` for user scope). This repository does not ship a `.cursor/` directory: you create it and sync the skills into it, which is what [step 1](#1-install-skills-into-cursorskills) does.

---

## What Cursor supports today

Cursor combines **rules** (short policies) and **skills** (full workflows):

| Layer | Path | Role |
|-------|------|------|
| **Project rules** | `.cursor/rules/*.mdc` | Always-on or file-scoped instructions (`alwaysApply`, `globs`) |
| **Project skills** | `.cursor/skills/<skill-name>/SKILL.md` | Agent-discovered workflows; read when the task matches the skill `description` |
| **User rules** | Cursor Settings → Rules | Account-wide policies |
| **User skills** (optional) | `~/.cursor/skills/` | Global skills available in every workspace |

Docs: [Rules](https://cursor.com/docs/rules) · [Skills](https://cursor.com/docs/skills).

### Rules vs skills

- **Rules** — concise, stable (“use conventional commits”, “type-annotate public Python APIs”). Prefer one concern per file; avoid large pasted guides.
- **Skills** — step-by-step processes from this repo (`security-and-hardening`, `api-and-interface-design`, etc.). **Do not** copy entire `SKILL.md` bodies into rules; that duplicates `.cursor/skills/` and wastes context.

### Legacy (avoid for new setups)

| Legacy | Prefer |
|--------|--------|
| Root `.cursorrules` | `.cursor/rules/*.mdc` |
| Copying `SKILL.md` → `.cursor/rules/` | `.cursor/skills/<name>/SKILL.md` |
| Loading all skills as always-on rules | 1–2 thin `alwaysApply` rules + skills on demand |

---

## Recommended project layout

```text
your-project/
├── .cursor/
│   ├── rules/                    # Short .mdc policies (yours)
│   │   └── agent-skills.mdc      # Optional: “use project skills” pointer
│   └── skills/                   # What Cursor Agent loads
│       ├── security-and-hardening/
│       ├── api-and-interface-design/
│       └── …                     # Synced from the curated checkout
└── agent-skills/                 # Optional: git submodule or vendor clone
    └── skills/                   # Curated source only
```

**Source of truth for the agent:** `.cursor/skills/`.
Treat `agent-skills/skills/` as the source you sync from; do not edit only that copy and expect Cursor to see it. A fresh clone of `addyosmani/agent-skills` has the upstream catalog, not this curated six-skill collection.

---

## Setup (any repository)

### 1. Install skills into `.cursor/skills/`

**From this local curated checkout** (at project root or elsewhere):

```bash
mkdir -p .cursor/skills
rsync -a /path/to/agent-skills/skills/ .cursor/skills/
```

**First-time copy without overwriting your custom skills:**

```bash
rsync -a --ignore-existing /path/to/agent-skills/skills/ .cursor/skills/
```

**After curated source updates:**

```bash
rsync -a /path/to/agent-skills/skills/ .cursor/skills/
```

Each skill folder must contain `SKILL.md` with YAML frontmatter, at minimum:

```yaml
---
name: api-and-interface-design
description: Guides stable API and interface design. Use when designing APIs, module boundaries, or any public interface.
---
```

Cursor uses `description` (and related metadata) to decide when to apply a skill. Copies of `skills/` do not include repo-root checklists; see [Using References](getting-started.md#using-references).

### 2. Add minimal project rules (optional but useful)

Create `.cursor/rules/agent-skills.mdc`:

```markdown
---
description: Use agent-skills workflows from .cursor/skills
alwaysApply: true
---

Before non-trivial technical work:

1. Read and follow the matching skill under `.cursor/skills/<name>/SKILL.md`.
2. Open supporting references when the skill links to them.
3. Prefer project skills over guessing; user does not need to say "read skill" each time.
```

Add **separate** `.mdc` files for repo-specific standards (style, language, stack), keeping each file focused.

**Rule file format:**

```markdown
---
description: Shown in Cursor rule UI
alwaysApply: false
globs: "**/*.{ts,tsx}"
---

# Your rule content
```

| Field | Use |
|-------|-----|
| `alwaysApply: true` | Every chat in this project |
| `globs` | When matching files are in context |
| `alwaysApply: false` + no globs | Agent-request / manual rule (Cursor UI) |

### 3. User-level skills (optional)

Copy or install skills you want everywhere under `~/.cursor/skills/`. Use for stack-wide guides (e.g. language patterns) that are not part of agent-skills.

Project skills in `.cursor/skills/` take precedence for **this** repo’s workflows.

### 4. Verify

1. **Settings → Rules** — project `.mdc` files listed.
2. **Agent chat** — skills from `.cursor/skills/` appear in the skill list (if your Cursor build exposes it).
3. Run a task that maps to a skill (e.g. “design a public API contract”) without naming the file — the agent should open `api-and-interface-design` when routing works.

---

## How agents should use skills

1. **Discover** — match the task to the installed skill descriptions.
2. **Read** — full process in `.cursor/skills/<name>/SKILL.md`.
3. **Deep dive** — linked supporting files and checklists when the skill says so.
4. **Combine** — e.g. `api-and-interface-design` + `security-and-hardening` for an account endpoint.

Explicit user phrases (“use api-and-interface-design”) still help if the agent drifts.

### Task → skill (quick map)

| You are… | Skill |
|----------|-------|
| Hardening authentication or untrusted-input handling | `security-and-hardening` |
| Designing public contracts | `api-and-interface-design` |
| Defining enforceable project standards | `constraint-driven-development` |
| Building accessible, responsive interfaces | `frontend-ui-engineering` |
| Verifying rendered pages and requests | `browser-testing-with-devtools` |
| Profiling and optimizing bottlenecks | `performance-optimization` |

---

## What not to do

| Avoid | Do instead |
|-------|------------|
| Paste all skills into one rule | Sync to `.cursor/skills/` |
| Maintain two diverging copies | `rsync` from the curated source; commit `.cursor/skills/` |
| Many `alwaysApply: true` rules | One small skill-use hint + focused globs rules |
| Rely on `.cursorrules` only | Migrate to `.mdc` + skills |
| Expect `agent-skills/agents/*.md` to auto-load | Paste in chat, or distill a short rule |

## Context tips

- Keep **always-on** rules small.
- Let **skills** carry long checklists and rationalization tables.
- Add file-specific **globs** rules only when needed (e.g. `**/*.py`, `**/components/**`).
- Nudge by skill name if verification steps are skipped.

## `agents/` directory

Files under `agent-skills/agents/` (security and web-performance personas) are **not** loaded automatically by Cursor. Options:

- Reference the skill equivalent (`security-and-hardening` or `performance-optimization`).
- Paste agent markdown into the chat for one review.
- Extract a **short** checklist into a `.mdc` rule.

## Troubleshooting

| Symptom | Check |
|---------|-------|
| Skill never used | `SKILL.md` under `.cursor/skills/<name>/`? Valid frontmatter `description`? |
| Rules ignored | Extension `.mdc`? Correct `alwaysApply` / `globs`? |
| Stale workflow | Re-`rsync` from the curated `agent-skills/skills/` source |
| Duplicate instructions | Remove skill content from rules; keep one source |
| Wrong skill picked | Narrow `description` in custom skills; nudge in chat |
| "An unexpected error occurred on our servers" right after attaching a skill with `/`, and every later message in that chat fails too | Known Cursor-side issue, tracked in [#494](https://github.com/addyosmani/agent-skills/issues/494). Start a new chat and reference the skill by name in plain text ("Use the api-and-interface-design skill to …") instead of attaching it. |

## Checklist (new project)

- [ ] `mkdir -p .cursor/skills` and sync from the curated checkout.
- [ ] Optional: `.cursor/rules/agent-skills.mdc` with a skill-use hint.
- [ ] Add repo-specific rules as separate small `.mdc` files.
- [ ] Commit `.cursor/skills/` and `.cursor/rules/` so the team shares behavior.
- [ ] Skip giant `.cursorrules` unless required by legacy tooling.

## See also

- [getting-started.md](getting-started.md)
- [../README.md](../README.md) — Cursor quick blurb
- Upstream: [github.com/addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)
