# Agent Personas

Specialist personas that play a single role with a single perspective. Each persona is a Markdown file consumed as a system prompt by your harness (Claude Code, Cursor, Copilot, etc.).

| Persona | Role | Best for |
|---------|------|----------|
| [security-auditor](../agents/security-auditor.md) | Security Engineer | Vulnerability detection, OWASP-style audit |
| [web-performance-auditor](../agents/web-performance-auditor.md) | Web Performance Engineer | Core Web Vitals audit, loading/rendering/network analysis |

## How personas relate to skills and commands

Three layers, each with a distinct job:

| Layer | What it is | Example | Composition role |
|-------|-----------|---------|------------------|
| **Skill** | A workflow with steps and exit criteria | `performance-optimization` | The *how* — invoked from inside a persona or command |
| **Persona** | A role with a perspective and an output format | `web-performance-auditor` | The *who* — adopts a viewpoint, produces a report |
| **Command** | A user-facing entry point | `/webperf` | The *when* — composes personas and skills |

The user (or a slash command) is the orchestrator. **Personas do not call other personas.** A persona may invoke relevant skills.

## When to use each

### Direct persona invocation

Pick this when you want one perspective on the current change and the user is in the loop.

- "Are there security issues in `auth.ts`?" → invoke `security-auditor` directly.
- "Audit Core Web Vitals on the product page" → invoke `web-performance-auditor` directly.

### Slash command

`/webperf` wraps `web-performance-auditor` for performance-focused audits on web apps. Without live measurements or provided artifacts, it reports potential impact rather than inventing metrics.

`/constraints` runs the `constraint-driven-development` skill in the main session; it does not launch a persona.

## Rules for personas

1. A persona is a single role with a single output format.
2. **Personas do not invoke other personas.** Composition is the job of slash commands or the user. On Claude Code this is also a hard platform constraint — subagents cannot spawn other subagents.
3. A persona may invoke skills (the *how*).
4. Every persona file ends with a "Composition" block stating where it fits.

## Claude Code interop

The personas in this repo are designed to work as Claude Code subagents and as Agent Teams teammates without modification:

- **As subagents:** auto-discovered when this plugin is enabled (no path config needed). Use the Agent tool with `subagent_type: security-auditor` or `web-performance-auditor`; `/webperf` is the command entry point for the latter.
- **As Agent Teams teammates** (experimental, requires `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`): reference the same persona name when spawning a teammate. The persona's body is appended to the teammate's system prompt as additional instructions, not a replacement.

Subagents report results back to the main agent. Agent Teams let teammates message each other directly. The user chooses the coordination mode; neither persona delegates to another persona.

Plugin agents do not support `hooks`, `mcpServers`, or `permissionMode` frontmatter — those fields are silently ignored. Configure required tools at the host level.
