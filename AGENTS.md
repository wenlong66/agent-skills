# AGENTS.md

Guidance for AI coding agents working on this curated `agent-skills` repository.

> **Scope:** This file is repository-local guidance, not a global configuration or a file to copy into consuming projects. Reusable workflows live in `skills/`.

## Skill Selection

Use a matching installed skill when the task calls for it:

| Intent | Skill |
|---|---|
| Security, authentication, untrusted input, or AI/LLM hardening | `security-and-hardening` |
| APIs, public contracts, or module interfaces | `api-and-interface-design` |
| Written quality standards and enforceable project rules | `constraint-driven-development` |
| UI components, state, responsive layouts, or accessibility | `frontend-ui-engineering` |
| Live browser, DOM, console, or network verification | `browser-testing-with-devtools` |
| Measured frontend, API, or database performance problems | `performance-optimization` |

OpenCode discovers the same `skills/` directory through `.opencode/skills`. There is no mandatory full-lifecycle workflow or session hook in this curated collection.

## Skills, Personas, and Commands

- **Skills** (`skills/<name>/SKILL.md`) define workflows and verification gates.
- **Personas** (`agents/<role>.md`) define specialist perspectives and report formats: `security-auditor` and `web-performance-auditor`.
- **Commands** provide two entry points: `/constraints` establishes the quality contract; `/webperf` runs the performance persona.

The user or a command orchestrates the work. Personas may use skills but must not invoke other personas. See [docs/agents.md](docs/agents.md).

## Maintenance

Keep exactly the six skills listed above unless the user explicitly changes the scope. Preserve their supporting references and eval fixtures, and remove stale links when pruning content.

Follow [CONTRIBUTING.md](CONTRIBUTING.md) and [docs/skill-anatomy.md](docs/skill-anatomy.md). Run the validation and test commands listed in [CLAUDE.md](CLAUDE.md) before handing work back. Do not commit or push unless asked.
