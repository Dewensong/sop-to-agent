# SOPilot Schema

SOPilot keeps three core specs separate so workflow drafts stay reviewable and future adapter exports remain stable.

## `SopSpec`

Describes business-process facts.

- `id`, `title`, `domain`, `sourceText`
- `assumptions`
- `actors`
- `systems`
- `nodes`
- `edges`

Each `SopNode` contains:

- `type`: `task`, `decision`, `approval`, `handoff`, `data`, or `notification`
- `actor`
- `inputs`
- `outputs`
- `tools`
- `risks`
- `acceptanceCriteria`
- `missingInfo`

## `WorkflowSpec`

Describes the proposed automation design.

- `nodes`
- `edges`
- `humanGates`
- `tools`
- `agents`
- `metrics`
- `exportTargets`

Each `WorkflowNode` has:

- `mode`: `agent`, `tool`, `human_review`, or `manual`
- `automationScore`
- `feasibilityScore`
- `riskScore`
- `confidence`
- `rationale`
- `adapterTargets`

## `EvaluationSpec`

Describes trust, ambiguity, and review needs.

- `coverageScore`
- `ambiguityScore`
- `automationPotential`
- `humanReviewCoverage`
- `riskLevel`
- `warnings`
- `recommendedNextQuestions`

## JSON Schema

Run:

```bash
pnpm schema
```

This writes:

- `docs/schema/sop.schema.json`
- `docs/schema/workflow.schema.json`
- `docs/schema/evaluation.schema.json`
