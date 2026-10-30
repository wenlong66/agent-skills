# Using agent-skills with Antigravity CLI (agy)

The `agent-skills` package can be installed as a native plugin in the Antigravity CLI (`agy`), giving the agent access to structured workflows and personas.

## Setup

### Option 1: Native Plugin Installation (Recommended)

Antigravity CLI has a first-class [plugin system](https://www.agy.dev/docs/plugins/) that registers skills and agents. The repository also carries legacy command TOMLs, but affected `agy` releases do not expose their converted wrappers; see [Command Compatibility](#command-compatibility).

**Install this local curated checkout:**

```bash
agy plugin install /path/to/agent-skills
```

This will validate the plugin and install it into your global Antigravity configuration directory (`~/.gemini/config/plugins/agent-skills/`). Installing `https://github.com/addyosmani/agent-skills.git` instead fetches the full upstream catalog, not this curated six-skill checkout.

> **Note:** on current agy releases the plugin lands under `~/.gemini/config/plugins/`, not the legacy `~/.gemini/antigravity-cli/plugins/` path used by older versions. If you don't see the plugin at the legacy path, check `~/.gemini/config/plugins/agent-skills/` first.

### Option 2: Import from Gemini CLI

If you have already installed the curated skills under your legacy Gemini CLI installation, you can import them directly:

```bash
agy plugin import gemini
```

Once installed, verify the active plugin:

```bash
agy plugin list
```

---

## Command Compatibility

This checkout retains two legacy definitions in `commands/*.toml`. Antigravity's [migration tooling](https://www.agy.dev/docs/cli/gcli-migration/) reports legacy definitions as "converted to skills." In affected `agy` 1.1.x releases, validation succeeds but the converted wrappers do not appear in the slash-command or skill catalog. A successful `agy plugin validate` therefore confirms the files are well formed, not that `/constraints` or `/webperf` is available. This is tracked in [agent-skills #445](https://github.com/addyosmani/agent-skills/issues/445) and upstream in [antigravity-cli #788](https://github.com/google-antigravity/antigravity-cli/issues/788).

Use the native plugin skills or personas directly while that importer limitation applies:

| Intended wrapper | Direct Antigravity invocation | Notes |
|------------------|-------------------------------|-------|
| `/constraints` | `/agent-skills:constraint-driven-development` | Defines and enforces the project's quality bar |
| `/webperf` | Select `web-performance-auditor` from `/agents` | This workflow is a persona, not a skill |

Do not add YAML frontmatter to the TOML files as a workaround. Gemini CLI reads the parallel TOML command format with a strict parser, and `---` frontmatter makes those files invalid TOML without changing Antigravity's conversion behavior.

---

## Skills & Discovery

Antigravity automatically discovers skills inside the plugin's `skills/` directory.

- Antigravity matches user tasks and intents to relevant skills on demand.
- If a task matches a skill, the agent will load the skill and prompt you for permission before executing.

## Verification & Validation

To validate that your local plugin is correctly structured and contains all six skills, run:

```bash
agy plugin validate /path/to/agent-skills
```

Then start a fresh session and type `/agent-skills:` to inspect the namespaced skill catalog. If the validator reports that commands were converted but `/constraints` returns `No matches`, use the direct invocations above; reinstalling or adding a TOML `name` field does not resolve the known importer limitation.

## How It Works

### 1. On-Demand Skill Activation

Antigravity CLI automatically discovers the `SKILL.md` files located in the `skills/` directory of the installed plugin. Using the trigger descriptions in each skill's frontmatter, the agent activates the appropriate workflow when it detects matching developer intent.

For example:

- **Design a public API** → `api-and-interface-design`.
- **Build an accessible page** → `frontend-ui-engineering`.
- **Harden an account system** → `security-and-hardening`.

### 2. Specialized Agent Personas

The plugin registers reusable subagent definitions from the `agents/` directory:

- `security-auditor.md`
- `web-performance-auditor.md`

You can invoke these personas directly within your session or when delegating tasks using subagents.

## Configuration & Customization

### Project-Specific Enforcements (`AGENTS.md`)

Create a project-specific `AGENTS.md` in the root of your workspace to describe your project's conventions, test commands, and required skill workflows.

This repository's root `AGENTS.md` and `CLAUDE.md` configure agents contributing to Agent Skills itself. Do not copy or link them into your project or global agent configuration; the reusable assets are the skills in `skills/`. See [Repo-scoped files](../CONTRIBUTING.md#repo-scoped-files).

### Sandbox Mode

If you want to run skills or scripts with limited terminal permissions, launch the CLI with:

```bash
agy --sandbox
```

## Usage Tips

1. **Keep plugins up to date:** use `agy update` to update the CLI; update the plugin from your curated local source.
2. **Review before execution:** use `Ctrl+r` to enter the Artifact Review screen to review, edit, or approve changes.
3. **Control permissions:** keep approval prompts enabled for actions outside the approved scope.
