# Product Requirement Analysis

Domain: product

## Summary

- SOP nodes: 7
- Automation potential: 57/100
- Human review gates: 1
- Risk level: low

## Workflow Diagram

```mermaid
flowchart TD
  w1["导入 PRD\ntool | A:54 R:28"]
  w2["拆解用户故事\nagent | A:78 R:28"]
  w3["识别依赖系统\nagent | A:78 R:48"]
  w4["生成验收标准\nagent | A:78 R:28"]
  w5["标注风险与疑问\nmanual | A:42 R:28"]
  w6["产品经理审核\nhuman_review | A:18 R:76"]
  w7["输出评审清单\nmanual | A:42 R:28"]
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
  class w2 agent
  class w3 agent
  class w4 agent
  class w5 manual
  class w6 human
  class w7 manual
```

## Node Automation Map

| Step | Type | Mode | Automation | Risk | Rationale |
| --- | --- | --- | ---: | ---: | --- |
| 导入 PRD | handoff | tool | 54 | 28 | This step is integration-heavy and should be mapped to deterministic workflow tools where possible. |
| 拆解用户故事 | task | agent | 78 | 28 | This step is language-heavy or reasoning-heavy and is a strong fit for an AI drafting or analysis agent. |
| 识别依赖系统 | decision | agent | 78 | 48 | This step is language-heavy or reasoning-heavy and is a strong fit for an AI drafting or analysis agent. |
| 生成验收标准 | task | agent | 78 | 28 | This step is language-heavy or reasoning-heavy and is a strong fit for an AI drafting or analysis agent. |
| 标注风险与疑问 | task | manual | 42 | 28 | This step needs clearer structure before automation should be attempted. |
| 产品经理审核 | approval | human_review | 18 | 76 | This step affects business risk or external commitments, so AI should assist but not auto-approve. |
| 输出评审清单 | task | manual | 42 | 28 | This step needs clearer structure before automation should be attempted. |

## Human Review Gates

- **产品经理审核 review gate**: High-risk business decision requires review. Reviewer: Business owner or domain reviewer.

## Adapter Readiness

| Step | LangGraph | n8n | Dify |
| --- | --- | --- | --- |
| 导入 PRD | draft | ready | draft |
| 拆解用户故事 | ready | draft | ready |
| 识别依赖系统 | ready | draft | ready |
| 生成验收标准 | ready | draft | ready |
| 标注风险与疑问 | manual | manual | manual |
| 产品经理审核 | draft | draft | manual |
| 输出评审清单 | manual | manual | manual |

## Warnings

- Some nodes have medium confidence and should be clarified before implementation.
- Adapter exports are draft-oriented in V0 and should be reviewed before importing into n8n, Dify, or LangGraph.

## Recommended Next Questions

- Which systems hold the input data for each step?
- Who owns the final approval for high-risk outputs?
- What metric proves that this workflow improved the business process?
