# Contributing to Agent Skills

This checkout maintains six production-grade engineering skills for AI coding agents. Keep contributions within the [selected skill list](README.md); improve an existing skill rather than restoring unrelated skills or lifecycle tooling.

## Modifying Existing Skills

- Keep changes focused and minimal.
- Preserve the existing structure and tone.
- Follow [docs/skill-anatomy.md](docs/skill-anatomy.md).
- Keep YAML frontmatter valid, with `name` and `description` and no vendor or runtime keys at the top level. Runtime controls belong under `metadata` or in a per-agent adapter; see [docs/advanced-per-agent-configuration.md](docs/advanced-per-agent-configuration.md).
- Start the description with what the skill does in third person, followed by clear `Use when` trigger conditions.
- Describe capabilities rather than model-specific workarounds; see [Write the Procedure, Not the Workaround](docs/skill-anatomy.md#write-the-procedure-not-the-workaround).

### Skill Quality Bar

Skills should be:

- **Specific** — Actionable steps, not vague advice.
- **Verifiable** — Clear exit criteria with evidence requirements.
- **Battle-tested** — Based on real engineering workflows, not theoretical ideals.
- **Minimal** — Only the content needed to guide the agent correctly.

### Structure and Evals

Every retained skill has:

- `SKILL.md` in the skill directory.
- YAML frontmatter with valid `name` and `description`.
- Overview, When to Use, Process, Common Rationalizations, Red Flags, and Verification sections.
- An eval case file at `evals/cases/<skill-name>.json` — at least 3 positive triggers, 2 negative triggers (with a retained skill as `owner` where possible), and 1 behavioral eval. Execution evals need real files under `evals/fixtures/`; conversation-shaped deliverables may use `kind: "dialogue"`. See [evals/README.md](evals/README.md).

Preserve these checks when editing a skill. Run the validators and deterministic evals described in [evals/README.md](evals/README.md); behavioral runs are opt-in and spend tokens.

### What Not to Do

- Don't duplicate content between skills — reference other retained skills instead.
- Don't add vague advice instead of actionable processes.
- Don't create supporting files unless content exceeds 100 lines.
- Don't create an empty `scripts/` directory just to match another skill.
- Keep shared checklists in root `references/` and skill-specific material with its skill.

## Adding a Host Guide

Document installation from this local curated checkout. Remote `addyosmani/agent-skills` commands fetch the upstream catalog, so label them as upstream rather than claiming they install this six-skill version.

Hosts without a maintained setup page can be listed in [docs/other-hosts.md](docs/other-hosts.md). A dedicated guide should describe an installation a maintainer has verified and is willing to keep current.

## Repo-scoped files

`AGENTS.md` and `CLAUDE.md` at the repo root configure agents working on this repository itself. When writing setup guides, do not instruct users to copy these files into their own projects or into a global agent configuration; the reusable assets are the skills in `skills/`.

## Reporting Issues

Open an issue if you find:

- Incorrect or outdated guidance in a retained skill.
- A missing case within one of the six retained workflows.
- Inconsistencies between the retained skills.

The [skill-gap issue form](.github/ISSUE_TEMPLATE/skill-gap.yml) asks for the affected skill, the relevant excerpt, your project context, and what you did instead — enough for maintainers to triage without a freeform write-up.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
