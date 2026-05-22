# Content Production Pipeline

Domain: content

## Summary

- SOP nodes: 7
- Automation potential: 71/100
- Human review gates: 1
- Risk level: low

## Workflow Diagram

```mermaid
flowchart TD
  w1["选题池收集\ntool | A:54 R:28"]
  w2["资料检索\ntool | A:54 R:28"]
  w3["大纲生成\nagent | A:78 R:28"]
  w4["初稿撰写\nagent | A:78 R:28"]
  w5["编辑审核\nhuman_review | A:18 R:76"]
  w6["多平台分发\ntool | A:54 R:28"]
  w7["表现复盘\nmanual | A:42 R:28"]
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
  class w2 tool
  class w3 agent
  class w4 agent
  class w5 human
  class w6 tool
  class w7 manual
```

## Node Automation Map

| Step | Type | Mode | Automation | Risk | Rationale |
| --- | --- | --- | ---: | ---: | --- |
| 选题池收集 | handoff | tool | 54 | 28 | This step is integration-heavy and should be mapped to deterministic workflow tools where possible. |
| 资料检索 | data | tool | 54 | 28 | This step is integration-heavy and should be mapped to deterministic workflow tools where possible. |
| 大纲生成 | task | agent | 78 | 28 | This step is language-heavy or reasoning-heavy and is a strong fit for an AI drafting or analysis agent. |
| 初稿撰写 | task | agent | 78 | 28 | This step is language-heavy or reasoning-heavy and is a strong fit for an AI drafting or analysis agent. |
| 编辑审核 | approval | human_review | 18 | 76 | This step affects business risk or external commitments, so AI should assist but not auto-approve. |
| 多平台分发 | notification | tool | 54 | 28 | This step is integration-heavy and should be mapped to deterministic workflow tools where possible. |
| 表现复盘 | task | manual | 42 | 28 | This step needs clearer structure before automation should be attempted. |

## Human Review Gates

- **编辑审核 review gate**: High-risk business decision requires review. Reviewer: Business owner or domain reviewer.

## Adapter Readiness

| Step | LangGraph | n8n | Dify |
| --- | --- | --- | --- |
| 选题池收集 | draft | ready | draft |
| 资料检索 | draft | ready | draft |
| 大纲生成 | ready | draft | ready |
| 初稿撰写 | ready | draft | ready |
| 编辑审核 | draft | draft | manual |
| 多平台分发 | draft | ready | draft |
| 表现复盘 | manual | manual | manual |

## Warnings

- Some nodes have medium confidence and should be clarified before implementation.
- Adapter exports are draft-oriented in V0 and should be reviewed before importing into n8n, Dify, or LangGraph.

## Recommended Next Questions

- Which systems hold the input data for each step?
- Who owns the final approval for high-risk outputs?
- What metric proves that this workflow improved the business process?
