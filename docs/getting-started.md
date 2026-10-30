# Getting Started with agent-skills

agent-skills works with any AI coding agent that accepts Markdown instructions. This guide covers the universal approach. For tool-specific setup, see the dedicated guides.

This checkout is a curated collection of six skills. Installing `addyosmani/agent-skills` from GitHub fetches the upstream catalog, not this curated checkout. Use the local paths in these guides to install this version.

## How Skills Work

Each skill is a Markdown file (`SKILL.md`) that describes a specific engineering workflow. When loaded into an agent's context, the agent follows the workflow — including verification steps, anti-patterns to avoid, and exit criteria.

**Skills are not reference docs.** They're step-by-step processes the agent follows.

## Quick Start (Any Agent)

### 1. Use the local checkout

Point your host at `/path/to/agent-skills`, or install from it using the open [skills CLI](https://github.com/vercel-labs/skills):

```bash
npx skills add /path/to/agent-skills
npx skills add /path/to/agent-skills --list
```

### 2. Choose a skill

Browse the `skills/` directory. Each subdirectory contains a `SKILL.md` with:
- **When to use** — triggers that indicate this skill applies
- **Process** — step-by-step workflow
- **Verification** — how to confirm the work is done
- **Common rationalizations** — excuses the agent might use to skip steps
- **Red flags** — signs the skill is being violated

### 3. Load the skill into your agent

Use native skill discovery where available. Otherwise, copy the relevant `SKILL.md` content into your agent's system prompt, rules file, or conversation.

**Conversation:** Reference the skill when giving instructions: "Follow the api-and-interface-design process for this endpoint."

### Existing projects need no migration

Install the pack from the existing project's root using the normal setup path for your agent, then keep working in that project. Skills activate for matching tasks; they do not require a new repository layout or a one-time conversion of existing code.

Do not copy this repository's root `AGENTS.md` or `CLAUDE.md` into the project. Those files configure contributors to agent-skills itself. Add only the skills and any project-specific instructions your agent normally reads.

## Context-Aware Loading

Don't load all skills at once — it wastes context. Load skills relevant to the current task:

| Task | Skill |
|------|-------|
| Authentication, untrusted input, or AI/LLM boundaries | `security-and-hardening` |
| Public APIs, module interfaces, or shared contracts | `api-and-interface-design` |
| Written project standards and enforced quality gates | `constraint-driven-development` |
| Components, pages, state management, or accessibility | `frontend-ui-engineering` |
| Runtime page, interaction, or network verification | `browser-testing-with-devtools` |
| Slow loading, endpoints, queries, or databases | `performance-optimization` |

## Skill Anatomy

Every skill follows the same structure:

```
YAML frontmatter (name, description)
├── Overview — What this skill does
├── When to Use — Triggers and conditions
├── Core Process — Step-by-step workflow
├── Examples — Code samples and patterns
├── Common Rationalizations — Excuses and rebuttals
├── Red Flags — Signs the skill is being violated
└── Verification — Exit criteria checklist
```

See [skill-anatomy.md](skill-anatomy.md) for the full specification.

## Using Agents

The `agents/` directory contains pre-configured agent personas:

| Agent | Purpose |
|-------|---------|
| `security-auditor.md` | Vulnerability detection |
| `web-performance-auditor.md` | Core Web Vitals & performance audit (via `/webperf`) |

Load an agent definition when you need specialized review. For example, ask your coding agent to "review this endpoint using the security-auditor agent persona" and provide the agent definition. See [agents.md](agents.md).

## Using Commands

The `.claude/commands/` directory contains two slash commands for Claude Code:

| Command | Workflow |
|---------|----------|
| `/constraints` | constraint-driven-development |
| `/webperf` | web-performance-auditor (specialist agent, web apps only) |

> **Note:** When installed as a Claude Code plugin you may see a warning like
> _"Default commands/ folder is ignored because the manifest sets 'commands'"_.
> This is expected. The root `commands/` directory belongs to the Antigravity CLI
> and is intentionally separate from `.claude/commands/`. All Claude Code slash
> commands load correctly from `.claude/commands/`; the warning is cosmetic.

## Using References

The `references/` directory contains supplementary checklists:

| Reference | Use With |
|-----------|----------|
| `performance-checklist.md` | performance-optimization |
| `security-checklist.md` | security-and-hardening |
| `accessibility-checklist.md` | frontend-ui-engineering |

Load a reference when you need detailed patterns beyond what the skill covers.

If you install one skill with `npx skills add ... --skill <name>`, only the selected `skills/<name>/` directory is copied. The skill still works, but paths to supplementary checklists in the repo-level `references/` directory are unavailable. Use a whole-repo integration, or carry the needed checklist with the installed skill and update its links. This portability gap is tracked in [addyosmani/agent-skills#361](https://github.com/addyosmani/agent-skills/issues/361).

## Tips

1. **Don't skip verification steps** — they're the whole point.
2. **Load skills selectively** — more context isn't always better.
3. **Use the agents for targeted review** — security and performance need different evidence.
