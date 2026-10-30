# Agent Skills — Curated Six

[中文](README_zh.md)

Six production-grade engineering skills selected from [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills), focused on account systems, AI applications, shared APIs, and web interfaces. This branch intentionally excludes the rest of the upstream catalog and its dedicated commands, hooks, and eval assets.

## Skills

| Skill | Why it is retained |
|---|---|
| [security-and-hardening](skills/security-and-hardening/SKILL.md) | Directly benefits account systems and AI applications: authentication, input validation, secrets, privacy, and LLM boundaries. |
| [api-and-interface-design](skills/api-and-interface-design/SKILL.md) | Stable contracts for shared libraries, account APIs, and reuse across applications. |
| [constraint-driven-development](skills/constraint-driven-development/SKILL.md) | Turns requirements for AI-generated output into written, mechanically checkable project rules. |
| [frontend-ui-engineering](skills/frontend-ui-engineering/SKILL.md) | Complete UI states and frontend standards for admin dashboards, configuration pages, and product screens. |
| [browser-testing-with-devtools](skills/browser-testing-with-devtools/SKILL.md) | Verifies actual pages, interactions, console output, and network requests. Requires Chrome DevTools MCP. |
| [performance-optimization](skills/performance-optimization/SKILL.md) | Measured workflows for frontend loading, API latency, queries, and database performance. |

## Use This Curated Checkout

Run from this repository's root:

```bash
# Inspect or install the six local skills
npx skills add . --list
npx skills add .

# Or install a single skill
npx skills add . --skill security-and-hardening

# Load the local plugin in Claude Code
claude --plugin-dir .
```

For a persistent local Claude Code marketplace installation:

```text
/plugin marketplace add /absolute/path/to/agent-skills
/plugin install agent-skills@addy-agent-skills
```

The marketplace points to this checkout, not to the upstream repository. Installing `addyosmani/agent-skills` remotely still installs the upstream catalog; it does **not** select this branch's six-skill subset. Host-specific local setup is documented in [docs/getting-started.md](docs/getting-started.md).

> Per-skill installation copies only `skills/<name>/`, not the root `references/` directory. Keep a whole-repository integration when you need the shared checklists, or copy the referenced checklist into the installed skill and update its path.

## Commands and Personas

Only two command wrappers remain, with equivalents for Claude Code, Gemini CLI, and Antigravity:

| Command | Purpose |
|---|---|
| `/constraints` | Establish a written quality contract using `constraint-driven-development`. |
| `/webperf` | Run the `web-performance-auditor` persona with runtime performance evidence. |

The two retained personas are [security-auditor](agents/security-auditor.md) and [web-performance-auditor](agents/web-performance-auditor.md). See [docs/agents.md](docs/agents.md) for composition and invocation. Skills can also be selected directly by name; there is no full-lifecycle router or session hook.

## Supporting References

- [Security checklist](references/security-checklist.md)
- [Performance checklist](references/performance-checklist.md)
- [Accessibility checklist](references/accessibility-checklist.md)
- [Hardening patterns](skills/security-and-hardening/references/hardening-patterns.md)
- [Optimization patterns](skills/performance-optimization/references/optimization-patterns.md)
- [Constraint floor guard](skills/constraint-driven-development/references/floor-guard.md)

## Validation

No package installation is required for these dependency-free checks:

```bash
node scripts/validate-skills.js
node scripts/validate-commands.js
node scripts/validate-reference-links.js
node scripts/validate-versions.js
node scripts/run-evals.js --min-rank1 95
node --test scripts/lib/skill-lint-test.js scripts/*-test.js
```

The [eval guide](evals/README.md) explains deterministic routing checks and optional, token-consuming behavioral runs. Each retained skill keeps its eval cases and any required fixtures. See [CONTRIBUTING.md](CONTRIBUTING.md) for maintenance guidance and [docs/skill-anatomy.md](docs/skill-anatomy.md) for the skill format.

## Attribution and License

Based on Agent Skills by Addy Osmani and upstream contributors. Original project: [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills).

[MIT](LICENSE).
