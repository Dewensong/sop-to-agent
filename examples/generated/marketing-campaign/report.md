# Marketing Campaign Workflow

Domain: marketing

## Summary

- SOP nodes: 6
- Automation potential: 67/100
- Human review gates: 1
- Risk level: low

## Workflow Diagram

```mermaid
flowchart TD
  w1["需求收集\ntool | A:54 R:28"]
  w2["活动策划\nmanual | A:42 R:28"]
  w3["文案生成\nagent | A:78 R:28"]
  w4["合规与品牌审核\nhuman_review | A:18 R:76"]
  w5["多渠道发布\ntool | A:54 R:28"]
  w6["数据复盘\ntool | A:42 R:28"]
  w1 -->|next| w2
  w2 -->|next| w3
  w3 -->|next| w4
  w4 -->|next| w5
  w5 -->|next| w6
  classDef agent fill:#ecfdf5,stroke:#047857,color:#064e3b
  classDef tool fill:#eff6ff,stroke:#2563eb,color:#1e3a8a
  classDef human fill:#fff7ed,stroke:#ea580c,color:#7c2d12
  classDef manual fill:#f8fafc,stroke:#64748b,color:#334155
  class w1 tool
  class w2 manual
  class w3 agent
  class w4 human
  class w5 tool
  class w6 tool
```

## Node Automation Map

| Step | Type | Mode | Automation | Risk | Rationale |
| --- | --- | --- | ---: | ---: | --- |
| 需求收集 | handoff | tool | 54 | 28 | This step is integration-heavy and should be mapped to deterministic workflow tools where possible. |
| 活动策划 | task | manual | 42 | 28 | This step needs clearer structure before automation should be attempted. |
| 文案生成 | task | agent | 78 | 28 | This step is language-heavy or reasoning-heavy and is a strong fit for an AI drafting or analysis agent. |
| 合规与品牌审核 | approval | human_review | 18 | 76 | This step affects business risk or external commitments, so AI should assist but not auto-approve. |
| 多渠道发布 | notification | tool | 54 | 28 | This step is integration-heavy and should be mapped to deterministic workflow tools where possible. |
| 数据复盘 | data | tool | 42 | 28 | This step is integration-heavy and should be mapped to deterministic workflow tools where possible. |

## Human Review Gates

- **合规与品牌审核 review gate**: High-risk business decision requires review. Reviewer: Business owner or domain reviewer.

## Adapter Readiness

| Step | LangGraph | n8n | Dify |
| --- | --- | --- | --- |
| 需求收集 | draft | ready | draft |
| 活动策划 | manual | manual | manual |
| 文案生成 | ready | draft | ready |
| 合规与品牌审核 | draft | draft | manual |
| 多渠道发布 | draft | ready | draft |
| 数据复盘 | draft | ready | draft |

## Warnings

- Some nodes have medium confidence and should be clarified before implementation.
- Adapter exports are draft-oriented in V0 and should be reviewed before importing into n8n, Dify, or LangGraph.

## Recommended Next Questions

- Which systems hold the input data for each step?
- Who owns the final approval for high-risk outputs?
- What metric proves that this workflow improved the business process?
