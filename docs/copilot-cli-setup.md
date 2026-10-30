# Using agent-skills with GitHub Copilot CLI

The standalone `copilot` command-line tool installs this repository as a plugin and discovers every skill in `skills/`. For Copilot inside VS Code, see [copilot-setup.md](copilot-setup.md) instead — the setup and the invocation model are different.

## Install

**From this local curated checkout**, for a session-scoped development install:

```bash
copilot --plugin-dir /path/to/agent-skills
```

`--plugin-dir` loads the plugin for that session only and installs nothing persistently — use it while editing skills.

The remote commands below fetch the full upstream catalog, not this curated six-skill checkout:

```bash
copilot plugin marketplace add addyosmani/agent-skills
copilot plugin install agent-skills@addy-agent-skills
```

`addy-agent-skills` is the marketplace name declared by upstream, not a GitHub-wide registry; it resolves only after registration. A direct upstream install is also supported:

```bash
copilot plugin install addyosmani/agent-skills
```

## Verify

```bash
copilot plugin list
copilot skill list
```

In an interactive session, `/skills list` shows the same skill catalog. Confirm the six curated skills appear when using the local checkout.

## What you get, and what you don't

The root `plugin.json` is the manifest Copilot CLI reads. It takes precedence over `.claude-plugin/plugin.json`, which belongs to Claude Code. Its `$schema` line declares an [Agent Plugins 1.0.0](https://agent-plugins.org) manifest, which switches the CLI into Agent Plugins mode. The manifest sets no component paths, so they fall back to their defaults:

- **Skills: available.** With no explicit path, the CLI uses the conventional `skills/` directory, and the skills are discovered there.
- **Wrapper commands: not available.** In Agent Plugins mode the CLI reads commands only from `com.github.copilot/commands/`, which this repo doesn't have. The `/constraints` and `/webperf` wrappers under `.claude/commands/` are Claude Code commands, not Copilot commands.

For manifest precedence and per-component path defaults, see the [CLI plugin reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference) and [Creating plugins](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-creating).

## Usage

Name the skill you want, or describe the task and let the agent route to it:

> Use the api-and-interface-design skill to define the account service's public contract.

> Use the security-and-hardening skill to review this login flow.

> Use the performance-optimization skill to measure and investigate these slow queries.

## Troubleshooting

| Symptom | What to check |
|---------|---------------|
| An upstream marketplace install can't resolve `agent-skills@addy-agent-skills` | Register the upstream marketplace first, or use `--plugin-dir` with this curated checkout. |
| Plugin loaded but no skills | Run `copilot skill list` or `/skills list`. Check the root `plugin.json` against the [1.0.0 schema](https://agent-plugins.org/schemas/1.0.0/plugin.schema.json); a schema error prevents loading. |
| `/constraints` or `/webperf` is not found | Expected: those wrappers are not Copilot commands. Ask for the retained skill or persona by name instead. |
| Skills changed locally but the CLI shows the old copy | Start a fresh session with `--plugin-dir` pointing at your curated checkout. |
