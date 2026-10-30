# agent-skills

A curated collection of six production-grade engineering skills for AI coding agents.

> **Scope:** This file configures agents working on this repository itself. Do not copy it into another project or a global agent configuration; the reusable assets are in `skills/`.

## Project Structure

```
skills/              → Six skills, each with SKILL.md
agents/              → security-auditor and web-performance-auditor personas
.claude/commands/    → /constraints and /webperf
.gemini/commands/    → Gemini command wrappers
commands/            → Antigravity command wrappers
references/          → Security, performance, and accessibility checklists
evals/               → Six skill case files and their fixtures
scripts/             → Validators, eval runner, and regression tests
docs/                → Setup guides and skill format documentation
```

## Retained Skills

- `security-and-hardening`
- `api-and-interface-design`
- `constraint-driven-development`
- `frontend-ui-engineering`
- `browser-testing-with-devtools`
- `performance-optimization`

This branch intentionally keeps only these six skills. Do not restore the upstream full-lifecycle catalog, commands, or hooks as an incidental change.

## Conventions

- Each skill lives in `skills/<name>/SKILL.md` with YAML `name` and `description`.
- Descriptions state what the skill does and when to use it.
- Follow [docs/skill-anatomy.md](docs/skill-anatomy.md) for skill structure.
- Keep skill-specific references inside the skill; shared checklists live in `references/`.
- Update matching eval cases and fixtures when behavior changes.
- See [CONTRIBUTING.md](CONTRIBUTING.md) for maintenance guidance.

## Verification

Run from the repository root:

```bash
node scripts/validate-skills.js
node scripts/validate-commands.js
node scripts/validate-reference-links.js
node scripts/validate-versions.js
node scripts/run-evals.js --min-rank1 95
node --test scripts/lib/skill-lint-test.js scripts/*-test.js
```

Behavioral evals cost model tokens and are opt-in; use `--dry-run` to inspect them first. Do not commit or push unless the user asks.
