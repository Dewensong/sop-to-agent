# User Feedback Clustering

Domain: product

## Summary

- SOP nodes: 7
- Automation potential: 57/100
- Human review gates: 1
- Risk level: low

## Workflow Diagram

```mermaid
flowchart TD
  w1["收集多渠道反馈\ntool | A:54 R:28"]
  w2["去重与脱敏\nmanual | A:42 R:28"]
  w3["识别情绪和主题\nagent | A:78 R:48"]
  w4["聚类问题\nagent | A:78 R:28"]
  w5["计算影响范围\nmanual | A:42 R:28"]
  w6["生成处理建议\nagent | A:78 R:28"]
  w7["产品团队审核\nhuman_review | A:18 R:76"]
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
  class w5 manual
  class w6 agent
  class w7 human
```

## Node Automation Map

| Step | Type | Mode | Automation | Risk | Rationale |
| --- | --- | --- | ---: | ---: | --- |
| 收集多渠道反馈 | handoff | tool | 54 | 28 | This step is integration-heavy and should be mapped to deterministic workflow tools where possible. |
| 去重与脱敏 | task | manual | 42 | 28 | This step needs clearer structure before automation should be attempted. |
| 识别情绪和主题 | decision | agent | 78 | 48 | This step is language-heavy or reasoning-heavy and is a strong fit for an AI drafting or analysis agent. |
| 聚类问题 | task | agent | 78 | 28 | This step is language-heavy or reasoning-heavy and is a strong fit for an AI drafting or analysis agent. |
| 计算影响范围 | task | manual | 42 | 28 | This step needs clearer structure before automation should be attempted. |
| 生成处理建议 | task | agent | 78 | 28 | This step is language-heavy or reasoning-heavy and is a strong fit for an AI drafting or analysis agent. |
| 产品团队审核 | approval | human_review | 18 | 76 | This step affects business risk or external commitments, so AI should assist but not auto-approve. |

## Human Review Gates

- **产品团队审核 review gate**: High-risk business decision requires review. Reviewer: Business owner or domain reviewer.

## Adapter Readiness

| Step | LangGraph | n8n | Dify |
| --- | --- | --- | --- |
| 收集多渠道反馈 | draft | ready | draft |
| 去重与脱敏 | manual | manual | manual |
| 识别情绪和主题 | ready | draft | ready |
| 聚类问题 | ready | draft | ready |
| 计算影响范围 | manual | manual | manual |
| 生成处理建议 | ready | draft | ready |
| 产品团队审核 | draft | draft | manual |

## Warnings

- Some nodes have medium confidence and should be clarified before implementation.
- Adapter exports are draft-oriented in V0 and should be reviewed before importing into n8n, Dify, or LangGraph.

## Recommended Next Questions

- Which systems hold the input data for each step?
- Who owns the final approval for high-risk outputs?
- What metric proves that this workflow improved the business process?
