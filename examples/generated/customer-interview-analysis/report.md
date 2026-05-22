# Customer Interview Analysis

Domain: research

## Summary

- SOP nodes: 7
- Automation potential: 43/100
- Human review gates: 2
- Risk level: medium

## Workflow Diagram

```mermaid
flowchart TD
  w1["上传访谈纪要\ntool | A:54 R:28"]
  w2["清洗敏感信息\nhuman_review | A:18 R:76"]
  w3["提取关键观点\nagent | A:78 R:28"]
  w4["聚类痛点\nagent | A:78 R:28"]
  w5["映射需求机会\nmanual | A:42 R:28"]
  w6["研究员审核\nhuman_review | A:18 R:76"]
  w7["输出洞察报告\nmanual | A:42 R:28"]
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
  class w2 human
  class w3 agent
  class w4 agent
  class w5 manual
  class w6 human
  class w7 manual
```

## Node Automation Map

| Step | Type | Mode | Automation | Risk | Rationale |
| --- | --- | --- | ---: | ---: | --- |
| 上传访谈纪要 | data | tool | 54 | 28 | This step is integration-heavy and should be mapped to deterministic workflow tools where possible. |
| 清洗敏感信息 | approval | human_review | 18 | 76 | This step affects business risk or external commitments, so AI should assist but not auto-approve. |
| 提取关键观点 | task | agent | 78 | 28 | This step is language-heavy or reasoning-heavy and is a strong fit for an AI drafting or analysis agent. |
| 聚类痛点 | task | agent | 78 | 28 | This step is language-heavy or reasoning-heavy and is a strong fit for an AI drafting or analysis agent. |
| 映射需求机会 | task | manual | 42 | 28 | This step needs clearer structure before automation should be attempted. |
| 研究员审核 | approval | human_review | 18 | 76 | This step affects business risk or external commitments, so AI should assist but not auto-approve. |
| 输出洞察报告 | task | manual | 42 | 28 | This step needs clearer structure before automation should be attempted. |

## Human Review Gates

- **清洗敏感信息 review gate**: High-risk business decision requires review. Reviewer: Business owner or domain reviewer.
- **研究员审核 review gate**: High-risk business decision requires review. Reviewer: Business owner or domain reviewer.

## Adapter Readiness

| Step | LangGraph | n8n | Dify |
| --- | --- | --- | --- |
| 上传访谈纪要 | draft | ready | draft |
| 清洗敏感信息 | draft | draft | manual |
| 提取关键观点 | ready | draft | ready |
| 聚类痛点 | ready | draft | ready |
| 映射需求机会 | manual | manual | manual |
| 研究员审核 | draft | draft | manual |
| 输出洞察报告 | manual | manual | manual |

## Warnings

- Some nodes have medium confidence and should be clarified before implementation.
- Adapter exports are draft-oriented in V0 and should be reviewed before importing into n8n, Dify, or LangGraph.

## Recommended Next Questions

- Which systems hold the input data for each step?
- Who owns the final approval for high-risk outputs?
- What metric proves that this workflow improved the business process?
