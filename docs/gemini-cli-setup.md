# Using agent-skills with Gemini CLI

## Setup

### Option 1: Install as Skills (Recommended)

Gemini CLI has a native skills system that auto-discovers `SKILL.md` files in `.gemini/skills/` or `.agents/skills/` directories. Each skill activates on demand when it matches your task.

**Install from this local curated checkout:**

```bash
gemini skills install /path/to/agent-skills/skills/
```

**Install for a specific workspace only:**

```bash
gemini skills install /path/to/agent-skills/skills/ --scope workspace
```

Installing from `https://github.com/addyosmani/agent-skills.git` instead fetches the upstream catalog, not this curated six-skill checkout.

Skills installed at workspace scope go into `.gemini/skills/` (or `.agents/skills/`). User-level skills go into `~/.gemini/skills/`.

Once installed, verify with:

```
/skills list
```

Gemini CLI injects skill names and descriptions into the prompt automatically. When it recognizes a matching task, it asks permission to activate the skill before loading its full instructions.

### Option 2: GEMINI.md (Persistent Context)

For skills you want always loaded as persistent project context rather than on-demand activation, add them to your project's `GEMINI.md`:

```bash
# Only do this if you want the skill always loaded
cat /path/to/agent-skills/skills/security-and-hardening/SKILL.md > GEMINI.md
```

You can also modularize by importing from separate files:

```markdown
# Project Instructions

@skills/security-and-hardening/SKILL.md
@skills/api-and-interface-design/SKILL.md
```

Use `/memory show` to verify loaded context, and `/memory reload` to refresh after changes.

> **Skills vs GEMINI.md:** Skills activate only when relevant, keeping your context window clean. GEMINI.md provides persistent context loaded for every prompt. Prefer skills for task-specific workflows and GEMINI.md for always-on project conventions.

## Recommended Configuration

Keep project conventions in `GEMINI.md` and install the six workflows as on-demand skills:

- `security-and-hardening` — Authentication, untrusted input, dependencies, and AI/LLM security.
- `api-and-interface-design` — Stable API and module contracts.
- `constraint-driven-development` — Written quality standards and enforceable gates.
- `frontend-ui-engineering` — Accessible, responsive UI and complete interaction states.
- `browser-testing-with-devtools` — Runtime page, interaction, and request verification.
- `performance-optimization` — Measured frontend, backend, query, and database optimization.

## Advanced Configuration

### MCP Integration

Some skills leverage [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) tools:

- `browser-testing-with-devtools` uses the `chrome-devtools` MCP extension.
- `performance-optimization` can benefit from performance-related MCP tools.

To enable these, configure the relevant MCP servers under `mcpServers` in your Gemini CLI settings (`~/.gemini/settings.json`, or `.gemini/settings.json` in a project).

### Explicit Context Loading

You can explicitly load any skill into your current session by referencing it with the `@` symbol in your prompt:

```markdown
Use the @skills/api-and-interface-design/SKILL.md skill to define this endpoint's contract.
```

This is useful when you want to ensure a specific workflow is followed without waiting for auto-discovery.

## Slash Commands

The repo ships two slash commands under `.gemini/commands/`. Gemini CLI auto-discovers them when you run from the project root.

| Command | What it does |
|---------|--------------|
| `/constraints` | Invokes constraint-driven-development to define and enforce the project's quality bar |
| `/webperf` | Adopts the web-performance-auditor persona to audit browser-facing apps |

`/constraints` loads a skill; `/webperf` uses a specialist persona in the current session rather than spawning a subagent.

## Usage Tips

1. **Prefer skills over GEMINI.md** — on-demand activation keeps context focused.
2. **Skill descriptions matter** — each description states what the skill does and when to activate it.
3. **Use agents for review** — provide `agents/security-auditor.md` or `agents/web-performance-auditor.md` for targeted audits.
4. **Combine with references** — use checklists from `references/` for security, performance, and accessibility.
