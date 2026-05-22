# SOPilot Example Library

The examples are designed to make the project immediately understandable and easy to Star. Each one starts from a messy but realistic business process and can be exported into Markdown, JSON, and Mermaid.

Run:

```bash
pnpm sopilot generate examples/marketing-campaign.md --format all --out output/marketing-campaign
pnpm generate:examples
```

## Included Templates

| Example | Domain | Why it matters |
| --- | --- | --- |
| `marketing-campaign.md` | Marketing | A flagship case for campaign planning and review workflows. |
| `content-pipeline.md` | Content | Shows recurring creative workflows without becoming a copywriter app. |
| `sales-lead-followup.md` | Sales | Highlights lead scoring, routing, and sales guardrails. |
| `customer-interview-analysis.md` | Research | Shows evidence retention and human interpretation. |
| `meeting-to-tasks.md` | Operations | Familiar, broad, easy to understand. |
| `competitor-analysis.md` | Strategy | Strong evidence and confidence use case. |
| `support-ticket-triage.md` | Support | Clear routing and escalation gates. |
| `resume-screening.md` | Recruiting | Demonstrates bias and human-decision constraints. |
| `prd-analysis.md` | Product | Useful to PMs and engineering teams. |
| `weekly-data-report.md` | Analytics | Shows fact vs. inference boundaries. |
| `feedback-clustering.md` | Product | Shows clustering and prioritization. |
| `prd-review-risk-check.md` | Product | Shows risk scanning and review questions. |

## Example Bundle Contract

Generated example folders contain:

- `sop.json`
- `workflow.json`
- `evaluation.json`
- `flow.mmd`
- `report.md`

Screenshots should be captured from the Web Demo after selecting the corresponding template. Keeping screenshots generated from the live UI avoids stale static assets during rapid V0 changes.
