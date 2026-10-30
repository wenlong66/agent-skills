# Skill Evals

This curated collection keeps eval cases for its six skills and the fixtures required by their behavioral runs. Evals measure whether skills trigger on the right requests, remain distinct, and change agent behavior as intended.

## Three Tiers

| Tier | What it checks | How it runs | Cost |
|---|---|---|---|
| Structural | Skill frontmatter and sections, reference links, command parity, manifest versions, and the six-skill scope | Repository validators and Node tests in CI | Free |
| Trigger and routing | Positive prompts rank their skill top-k; negative prompts prefer another retained skill; descriptions do not collide | `node scripts/run-evals.js --min-rank1 95` | Free |
| Behavioral | An agent following the skill satisfies its `expectations[]` | Opt-in `node scripts/run-evals.js --behavioral <skill>` | Model tokens |

The behavioral schema follows [Anthropic's skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator): prompt, expected output, fixtures, and verifiable expectations. The deterministic catalog check adds stemmed TF-IDF routing over skill descriptions. It is a lexical approximation, not a semantic evaluation.

## Running

From the repository root:

```bash
# Deterministic routing checks; the existing floor stays at 95%
node scripts/run-evals.js --min-rank1 95

# Inspect a behavioral run without invoking a model
node scripts/run-evals.js --behavioral security-and-hardening --dry-run

# Opt-in execution and grading; spends model tokens
node scripts/run-evals.js --behavioral security-and-hardening
```

Behavioral runs use headless `claude`. `execution` cases materialize `files[]` in a throwaway Git repository and grade the full stream-json execution trace, including tool calls. `dialogue` cases grade the conversation itself; the constraints interview uses this kind and needs no fixture.

The executor uses `acceptEdits` and a pre-approved tool list so it can perform the workflow rather than just describe it. Executor and grader calls have timeouts. Traces are fenced as untrusted data before grading, and grader JSON is validated before results are written to the gitignored `evals/results/` directory.

Only complete executor streams reach the grader: a successful terminal result, no permission denials, and an observation for every tool call. Failed or incomplete executions retain `.execution.raw.txt` and `.execution.error.txt`, produce no score, and do not stop later cases. A rerun clears the case's previous attempt diagnostics.

## Case Format

One case file per retained skill: `evals/cases/<skill-name>.json`.

```json
{
  "skill_name": "security-and-hardening",
  "trigger": {
    "positive": [
      { "prompt": "Audit this file upload handler for vulnerabilities", "top_k": 3 }
    ],
    "negative": [
      { "prompt": "Design the public interface for the billing module", "owner": "api-and-interface-design" }
    ]
  },
  "evals": [
    {
      "id": 1,
      "kind": "execution",
      "prompt": "Harden the webhook endpoint against SSRF.",
      "expected_output": "Threat-modeled hardening with validated input and tests",
      "files": ["security-and-hardening"],
      "expectations": [
        "Trust boundaries are identified before controls are proposed",
        "SSRF protection rejects private and reserved addresses"
      ]
    }
  ]
}
```

This shortened example shows the schema; real case files require at least **3 positive triggers, 2 negative triggers, and 1 behavioral eval**.

- `kind` is `execution` by default or `dialogue` when the conversation is genuinely the deliverable. Do not use dialogue to bypass execution requirements.
- Execution cases require non-empty `files[]`, with paths relative to `evals/fixtures/`. They may name files or project directories.
- Every negative prompt's `owner`, when set, must be another retained skill. The owner must outrank the evaluated skill, preventing vacuous passes on prompts matching nothing.
- Expectations describe observable behaviors, not required phrasing. Each behavioral ID must be unique within its case file.

## Maintaining the Curated Scope

Keep exactly the six case files matching `skills/`. Preserve their positive triggers and behavioral expectations when pruning unrelated skills. Replace negatives owned by removed skills with meaningful pairwise checks among the retained six; do not weaken the validator or lower the routing floor.

Missing cases, invalid schemas, unknown fixture paths, and routing failures block CI. Fix real description-vocabulary gaps rather than rewriting realistic positive prompts to game the lexical score. Collision checks warn at 50% similarity and fail at 75%.

For all repository checks, see [CLAUDE.md](../CLAUDE.md) and [CONTRIBUTING.md](../CONTRIBUTING.md).
