# Other hosts

These hosts install the pack but are not in the README's install section, because no maintainer has run the current release on them. Each entry is one line: the host and its install command. To add one, see [Adding a Host Guide](../CONTRIBUTING.md#adding-a-host-guide).

Skills are plain `SKILL.md` folders, so any agent that reads the Agent Skills layout can load them. See [getting-started.md](getting-started.md).

The commands below install the full upstream catalog, not this curated six-skill checkout. For the curated version, copy the local `skills/` directories into the host's skill discovery path or use a local-source integration documented by that host.

- **Dojo Workspace**: `dojo skills add addyosmani/agent-skills`
- **fx**: `git clone https://github.com/addyosmani/agent-skills.git /tmp/agent-skills && mkdir -p .fx/skills && cp -R /tmp/agent-skills/skills/* .fx/skills/` (project scope; use `~/.fx/skills/` instead for every workspace; needs fx 0.0.5 or later)
- **Oh My Pi**: `omp plugin marketplace add addyosmani/agent-skills`, then `omp plugin install agent-skills@addy-agent-skills`
- **Pi**: `pi install git:github.com/addyosmani/agent-skills`
