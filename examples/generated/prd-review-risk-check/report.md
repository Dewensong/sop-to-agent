# PRD Review Risk Check

Domain: product

## Summary

- SOP nodes: 7
- Automation potential: 14/100
- Human review gates: 1
- Risk level: low

## Workflow Diagram

```mermaid
flowchart TD
  w1["提交 PRD\nmanual | A:42 R:28"]
  w2["检查目标与范围\nmanual | A:42 R:28"]
  w3["扫描技术依赖\nmanual | A:42 R:28"]
  w4["识别数据与合规风险\nhuman_review | A:54 R:76"]
  w5["生成追问清单\nagent | A:78 R:28"]
  w6["组织评审\nmanual | A:42 R:28"]
  w7["记录决策和待办\nmanual | A:42 R:28"]
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
  class w1 manual
  class w2 manual
  class w3 manual
  class w4 human
  class w5 agent
  class w6 manual
  class w7 manual
```

## Node Automation Map

| Step | Type | Mode | Automation | Risk | Rationale |
| --- | --- | --- | ---: | ---: | --- |
| 提交 PRD | task | manual | 42 | 28 | This step needs clearer structure before automation should be attempted. |
| 检查目标与范围 | task | manual | 42 | 28 | This step needs clearer structure before automation should be attempted. |
| 扫描技术依赖 | task | manual | 42 | 28 | This step needs clearer structure before automation should be attempted. |
| 识别数据与合规风险 | approval | human_review | 54 | 76 | This step affects business risk or external commitments, so AI should assist but not auto-approve. |
| 生成追问清单 | task | agent | 78 | 28 | This step is language-heavy or reasoning-heavy and is a strong fit for an AI drafting or analysis agent. |
| 组织评审 | task | manual | 42 | 28 | This step needs clearer structure before automation should be attempted. |
| 记录决策和待办 | task | manual | 42 | 28 | This step needs clearer structure before automation should be attempted. |

## Human Review Gates

- **识别数据与合规风险 review gate**: High-risk business decision requires review. Reviewer: Business owner or domain reviewer.

## Adapter Readiness

| Step | LangGraph | n8n | Dify |
| --- | --- | --- | --- |
| 提交 PRD | manual | manual | manual |
| 检查目标与范围 | manual | manual | manual |
| 扫描技术依赖 | manual | manual | manual |
| 识别数据与合规风险 | draft | draft | manual |
| 生成追问清单 | ready | draft | ready |
| 组织评审 | manual | manual | manual |
| 记录决策和待办 | manual | manual | manual |

## Warnings

- Some nodes have medium confidence and should be clarified before implementation.
- Adapter exports are draft-oriented in V0 and should be reviewed before importing into n8n, Dify, or LangGraph.

## Recommended Next Questions

- Which systems hold the input data for each step?
- Who owns the final approval for high-risk outputs?
- What metric proves that this workflow improved the business process?
