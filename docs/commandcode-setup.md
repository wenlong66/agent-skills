# Using agent-skills with Command Code

[Command Code](https://commandcode.ai) has a native skills system. The built-in `cmd skills` command clones a GitHub repo, recursively discovers every `SKILL.md`, and installs the ones you pick.

The Command Code binary is available as `cmd` (with aliases `cmdc` on Windows and `command-code`). The examples below use `cmd`.

## Install this curated checkout

Copy the six local skill directories into the project skill path:

```bash
mkdir -p .commandcode/skills
cp -R /path/to/agent-skills/skills/* .commandcode/skills/
```

For user scope, use `~/.commandcode/skills/` instead. Per-skill copies do not carry repo-root checklists; see [Using References](getting-started.md#using-references).

## Install from upstream

The remote commands below fetch the full upstream catalog, not this curated six-skill checkout. Select individual retained skills if using that source.

**Project scope** (installs into `.commandcode/skills/` at the current git root — the default):

```bash
cmd skills add addyosmani/agent-skills
```

In an interactive terminal this shows a multi-select of upstream skills. Pipe/non-interactive invocations install all discovered skills.

**Install a specific skill:**

```bash
cmd skills add addyosmani/agent-skills -s security-and-hardening
```

**User scope** (installs into `~/.commandcode/skills/`, available in every project):

```bash
cmd skills add addyosmani/agent-skills --global
```

**Other supported forms:**

```bash
cmd skills add addyosmani/agent-skills@main            # an upstream branch
cmd skills add addyosmani/agent-skills/skills/security-and-hardening
cmd skills add addyosmani/agent-skills --force         # overwrite / update from upstream
```

## Manage

```bash
cmd skills list
cmd skills remove security-and-hardening
cmd skills remove security-and-hardening --global
```

`--force` on `add` re-fetches and overwrites an existing skill from its source. To keep the curated version, update from the local checkout instead.

## Usage

Installed skills are discovered automatically and appear in the TUI slash menu, tagged `[skill]`:

```
/security-and-hardening   [skill] Hardens code against vulnerabilities…
```

Type `/` to browse, or start typing a skill name to filter. Use `/skills` to enable/disable skills.

## Where skills live

Command Code discovers skills from these locations (project entries resolve against the nearest git root):

| Scope | Path |
|-------|------|
| Project | `.commandcode/skills/<name>/SKILL.md` |
| Project (agents-compat) | `.agents/skills/<name>/SKILL.md` |
| User | `~/.commandcode/skills/<name>/SKILL.md` |
| User (agents-compat) | `~/.agents/skills/<name>/SKILL.md` |

`cmd skills add` writes to `.commandcode/skills/` (project) or `~/.commandcode/skills/` (`--global`).
