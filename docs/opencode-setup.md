# OpenCode Setup

This guide explains how to use Agent Skills with OpenCode. The reusable assets are the markdown skills in the `skills/` directory; the root `AGENTS.md` file in this repository is repo-scoped and should not be copied into other projects.

## Overview

OpenCode discovers skills from several locations. Use its built-in `skill` tool and a project-local `AGENTS.md` that you write for your own repository to select the relevant workflow.

## Installation

There are two ways to get the skills into your project:

1. Install from this local curated checkout with the `skills` CLI.
2. Copy selected skill directories manually.

After either step, create your own project-local `AGENTS.md`.

### Option 1: Install with `npx skills`

The open [skills CLI](https://github.com/vercel-labs/skills) accepts the local checkout:

```bash
npx skills add /path/to/agent-skills
npx skills add /path/to/agent-skills --list
```

Install a single skill:

```bash
npx skills add /path/to/agent-skills --skill api-and-interface-design
```

Installing `addyosmani/agent-skills` from GitHub instead fetches the upstream catalog, not this curated six-skill checkout.

By default `npx skills` installs into a tool-specific directory (often `.claude/skills/` or a shared location). OpenCode will discover skills placed there because it reads `.claude/skills/<name>/SKILL.md` and the generic `.agents/skills/<name>/SKILL.md` paths.

If the skills land somewhere OpenCode does not scan, copy or symlink them into one of the discovery paths listed below:

```bash
mkdir -p .opencode/skills
cp -r .claude/skills/<skill-name> .opencode/skills/
```

> **Note:** Per-skill installs copy only the skill directory itself. For shared repo-root checklists, see [Using References](getting-started.md#using-references).

### Option 2: Copy from this checkout

Copy the desired skills into one of the OpenCode skill discovery paths.

#### Project-local installation

```bash
mkdir -p .opencode/skills
cp -r /path/to/agent-skills/skills/api-and-interface-design .opencode/skills/
cp -r /path/to/agent-skills/skills/security-and-hardening .opencode/skills/
```

#### Global installation

```bash
mkdir -p ~/.config/opencode/skills
cp -r /path/to/agent-skills/skills/<skill-name> ~/.config/opencode/skills/
```

#### Cross-compatible paths

OpenCode also discovers skills placed in Claude-compatible or generic agent paths:

- `.claude/skills/<name>/SKILL.md`
- `~/.claude/skills/<name>/SKILL.md`
- `.agents/skills/<name>/SKILL.md`
- `~/.agents/skills/<name>/SKILL.md`

If you already share skills across Claude Code and OpenCode, any of these locations work.

### What to copy

Copy the directories under `skills/` (for example `skills/api-and-interface-design/`). Each directory must contain a `SKILL.md` file. Do not copy the repository's root `AGENTS.md` or `CLAUDE.md`; those files configure development of this repository itself.

## Project `AGENTS.md`

Create an `AGENTS.md` in **your own project** root. This tells OpenCode when and how to invoke the installed skills and should be adapted to your stack.

```markdown
# Agent Skills (OpenCode)

This project uses skills installed under `.opencode/skills/` (or a compatible path).

## Core Rules

- If a task matches a skill, invoke it with the `skill` tool before acting.
- Skills are located in `.opencode/skills/<skill-name>/SKILL.md`.
- Follow the skill workflow, including its verification requirements.

## Intent → Skill Mapping

- Authentication, untrusted input, or AI/LLM security → `security-and-hardening`
- API or interface contracts → `api-and-interface-design`
- Project standards and quality gates → `constraint-driven-development`
- UI work → `frontend-ui-engineering`
- Browser interaction or request verification → `browser-testing-with-devtools`
- Performance investigation → `performance-optimization`

## Execution Model

1. Determine whether a skill applies.
2. Load it with `skill({ name: "<skill-name>" })`.
3. Follow the workflow and report the verification evidence.
```

Save this as `AGENTS.md` in your project root. OpenCode will load it automatically. See [Repo-scoped files](../CONTRIBUTING.md#repo-scoped-files) for why this is separate from this repository's own guidance.

## How It Works

OpenCode walks the following paths (project-local first, then global):

- `.opencode/skills/<name>/SKILL.md`
- `~/.config/opencode/skills/<name>/SKILL.md`
- `.claude/skills/<name>/SKILL.md`
- `~/.claude/skills/<name>/SKILL.md`
- `.agents/skills/<name>/SKILL.md`
- `~/.agents/skills/<name>/SKILL.md`

Each skill must contain a `SKILL.md` file with a valid `name` and `description` in its frontmatter. Your project's `AGENTS.md` guides the agent to map requests to the relevant workflow.

For example, "design the account API" maps to `api-and-interface-design`; "harden this login flow" maps to `security-and-hardening`; "verify this form in the browser" maps to `browser-testing-with-devtools`.

## Limitations

- Skill invocation depends on model compliance.
- OpenCode does not install skills automatically; copy or install the directories you need.
- Per-skill copies may need shared reference files and adjusted links.
- This checkout does not ship OpenCode command wrappers; use the skill names directly.

## Summary

1. Install the retained skills from the local checkout into a discovery path.
2. Create your own project-local `AGENTS.md` with the rules and intent mapping above.
3. OpenCode discovers the skills and your `AGENTS.md` guides their use.

This keeps the reusable skills separate from repository-specific contributor configuration.
