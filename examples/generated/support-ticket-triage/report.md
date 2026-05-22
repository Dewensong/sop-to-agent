# Support Ticket Triage

Domain: support

## Summary

- SOP nodes: 7
- Automation potential: 71/100
- Human review gates: 1
- Risk level: medium

## Workflow Diagram

```mermaid
flowchart TD
  w1["接收工单\ntool | A:54 R:28"]
  w2["判断问题类型\nmanual | A:42 R:48"]
  w3["识别紧急程度\nagent | A:78 R:48"]
  w4["推荐回复草稿\nagent | A:90 R:28"]
  w5["自动回复低风险问题\ntool | A:54 R:28"]
  w6["升级复杂问题\nhuman_review | A:18 R:76"]
  w7["汇总问题趋势\nagent | A:78 R:28"]
  w1 -->|next| w2
  w2 -->|next| w3
  w3 -->|next| w4
  w4 -->|next| w5
  w5 -->|next| w6
  w6 -->|next| w7
  classDef agent fill:#ecfdf5,stroke:#047857,color:#064e3b
  classDef tool fill:#eff6ff,stroke:#2563eb,color:#1e3a8a
  classDef human fill:#fff7ed,stroke:#ea580c,color:#7c2d12
  classDef manual fill:#f8fafc,stroke:#64748b,color:#334155
  class w1 tool
  class w2 manual
  class w3 agent
  class w4 agent
  class w5 tool
  class w6 human
  class w7 agent
```

## Node Automation Map

| Step | Type | Mode | Automation | Risk | Rationale |
| --- | --- | --- | ---: | ---: | --- |
| 接收工单 | handoff | tool | 54 | 28 | This step is integration-heavy and should be mapped to deterministic workflow tools where possible. |
| 判断问题类型 | decision | manual | 42 | 48 | This step needs clearer structure before automation should be attempted. |
| 识别紧急程度 | decision | agent | 78 | 48 | This step is language-heavy or reasoning-heavy and is a strong fit for an AI drafting or analysis agent. |
| 推荐回复草稿 | handoff | agent | 90 | 28 | This step is language-heavy or reasoning-heavy and is a strong fit for an AI drafting or analysis agent. |
| 自动回复低风险问题 | handoff | tool | 54 | 28 | This step is integration-heavy and should be mapped to deterministic workflow tools where possible. |
| 升级复杂问题 | approval | human_review | 18 | 76 | This step affects business risk or external commitments, so AI should assist but not auto-approve. |
| 汇总问题趋势 | task | agent | 78 | 28 | This step is language-heavy or reasoning-heavy and is a strong fit for an AI drafting or analysis agent. |

## Human Review Gates

- **升级复杂问题 review gate**: High-risk business decision requires review. Reviewer: Business owner or domain reviewer.

## Adapter Readiness

| Step | LangGraph | n8n | Dify |
| --- | --- | --- | --- |
| 接收工单 | draft | ready | draft |
| 判断问题类型 | manual | manual | manual |
| 识别紧急程度 | ready | draft | ready |
| 推荐回复草稿 | ready | draft | ready |
| 自动回复低风险问题 | draft | ready | draft |
| 升级复杂问题 | draft | draft | manual |
| 汇总问题趋势 | ready | draft | ready |

## Warnings

- Some nodes have medium confidence and should be clarified before implementation.
- Adapter exports are draft-oriented in V0 and should be reviewed before importing into n8n, Dify, or LangGraph.

## Recommended Next Questions

- Which systems hold the input data for each step?
- Who owns the final approval for high-risk outputs?
- What metric proves that this workflow improved the business process?
