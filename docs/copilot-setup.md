# Using agent-skills with GitHub Copilot

This guide covers Copilot in VS Code. For the standalone `copilot` command-line tool, see [copilot-cli-setup.md](copilot-cli-setup.md).

**What an install actually gives you:** the skills. Each installed skill becomes a slash command named after its frontmatter `name` — `/security-and-hardening`, `/api-and-interface-design`, and so on. The skills CLI and the manual copy below install skills only. Neither copies this repo's `/constraints` or `/webperf` wrappers; those are Claude Code commands living in `.claude/commands/`.

## Setup

### Copilot Instructions

Copilot supports creating agent skills using a `.github/skills`, `.claude/skills`, or `.agents/skills` directory in your repository.

Install from this local curated checkout:

```bash
npx skills add /path/to/agent-skills
```

Installing `addyosmani/agent-skills` from GitHub instead fetches the upstream catalog, not this curated six-skill checkout.

Or copy selected skill directories manually:

```bash
mkdir -p .github/skills
cp -R /path/to/agent-skills/skills/security-and-hardening .github/skills/
cp -R /path/to/agent-skills/skills/api-and-interface-design .github/skills/
```

Whichever route you use, the result is one `SKILL.md` per skill directory under one of those three project paths. An installer run with a global/user flag writes somewhere else instead — check its output for the path it used. Run `/skills` in Copilot Chat to open the **Configure Skills** menu and confirm what got discovered.

Per-skill copies do not carry repo-root checklists; see [Using References](getting-started.md#using-references).

For more details, refer to [Creating agent skills for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/create-skills) and the VS Code guide to [agent skills](https://code.visualstudio.com/docs/agent-customization/agent-skills).

### Agent Personas (*.agent.md)

Copilot supports specialized agent personas. Use the agent-skills agents:

> **Important:** GitHub Copilot requires custom agent files to be named `*.agent.md`.
> Files named `*.md` are silently ignored by Copilot.
> See [VS Code custom agents docs](https://code.visualstudio.com/docs/copilot/customization/custom-agents#_custom-agent-file-structure) for details.

```bash
mkdir -p .github/agents
cp /path/to/agent-skills/agents/security-auditor.md .github/agents/security-auditor.agent.md
cp /path/to/agent-skills/agents/web-performance-auditor.md .github/agents/web-performance-auditor.agent.md
```

Invoke agents in Copilot Chat:

- `@security-auditor Check this endpoint for vulnerabilities`
- `@web-performance-auditor Audit Core Web Vitals on this page`

### Custom Instructions (User Level)

For skills you want across all repositories:

1. Open VS Code → Settings → GitHub Copilot → Custom Instructions.
2. Add your most-used skill summaries.

## Recommended Configuration

### .github/copilot-instructions.md

GitHub Copilot supports project-level instructions via `.github/copilot-instructions.md`. Keep project standards short rather than pasting every skill:

```markdown
# Project Coding Standards

- Read CONSTRAINTS.md before making changes; do not weaken it to get green.
- Validate external input and never commit or log secrets.
- Verify browser-facing changes with actual page and network evidence.
- Measure a performance baseline before optimizing and verify the result.
- Run this project's own validation commands before handing work back.
```

## Skill Workflows

Skills are user-invocable by default. Once discovered, the six workflows are available under their own names:

| Workflow | Copilot invocation |
|----------|--------------------|
| Security and hardening | `/security-and-hardening` |
| Stable API contracts | `/api-and-interface-design` |
| Enforced quality standards | `/constraint-driven-development` |
| Accessible, responsive UI | `/frontend-ui-engineering` |
| Browser runtime verification | `/browser-testing-with-devtools` |
| Measured optimization | `/performance-optimization` |

Type `/` to browse what's actually loaded in this workspace. The short `/constraints` and `/webperf` wrappers do not appear in Copilot because it does not read `.claude/commands/`.

Natural language is the fallback, and works in any Copilot surface whether or not the slash commands show up:

> Use the api-and-interface-design skill to define this account endpoint's contract.

> Use the browser-testing-with-devtools skill to verify the form's rendered states and requests.

### If the skill slash commands don't appear

These steps are for when the skills' own names, such as `/security-and-hardening`, are missing. Missing `/constraints` or `/webperf` is expected: those are Claude Code wrappers.

1. **Check where the skills landed.** Each one needs its own directory containing a `SKILL.md`. The project-level paths this guide uses are `.github/skills/`, `.claude/skills/` and `.agents/skills/`. A global/user install may be outside the workspace instead; confirm the actual path against the [VS Code agent skills docs](https://code.visualstudio.com/docs/agent-customization/agent-skills).
2. **Check the frontmatter.** `name` must be present and valid — it is the slash command. A skill whose frontmatter opts out of user invocation won't appear.
3. **Check the Configure Skills menu.** Run `/skills` and confirm the skill is enabled here.
4. **Start a fresh session.** Newly added skills aren't always picked up mid-conversation.
5. **Check versions.** Update VS Code (**Help → About**) and the Copilot Chat extension if either is behind.

## Usage Tips

1. **Keep instructions concise** — summarize key rules rather than including full skill files.
2. **Use agents for targeted review** — security and performance personas use different perspectives and evidence.
3. **Reference in chat** — paste the relevant skill content if native discovery is unavailable.
