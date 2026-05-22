# Recruiting Resume Screening

Domain: recruiting

## Summary

- SOP nodes: 7
- Automation potential: 43/100
- Human review gates: 1
- Risk level: low

## Workflow Diagram

```mermaid
flowchart TD
  w1["收集简历\ntool | A:54 R:28"]
  w2["解析候选人信息\ntool | A:42 R:28"]
  w3["匹配职位要求\nmanual | A:42 R:28"]
  w4["生成面试关注点\nagent | A:78 R:28"]
  w5["招聘负责人审核\nhuman_review | A:18 R:76"]
  w6["安排面试\nmanual | A:42 R:28"]
  w7["沉淀人才库\nmanual | A:42 R:28"]
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
  class w3 manual
  class w4 agent
  class w5 human
  class w6 manual
  class w7 manual
```

## Node Automation Map

| Step | Type | Mode | Automation | Risk | Rationale |
| --- | --- | --- | ---: | ---: | --- |
| 收集简历 | data | tool | 54 | 28 | This step is integration-heavy and should be mapped to deterministic workflow tools where possible. |
| 解析候选人信息 | data | tool | 42 | 28 | This step is integration-heavy and should be mapped to deterministic workflow tools where possible. |
| 匹配职位要求 | task | manual | 42 | 28 | This step needs clearer structure before automation should be attempted. |
| 生成面试关注点 | task | agent | 78 | 28 | This step is language-heavy or reasoning-heavy and is a strong fit for an AI drafting or analysis agent. |
| 招聘负责人审核 | approval | human_review | 18 | 76 | This step affects business risk or external commitments, so AI should assist but not auto-approve. |
| 安排面试 | task | manual | 42 | 28 | This step needs clearer structure before automation should be attempted. |
| 沉淀人才库 | task | manual | 42 | 28 | This step needs clearer structure before automation should be attempted. |

## Human Review Gates

- **招聘负责人审核 review gate**: High-risk business decision requires review. Reviewer: Business owner or domain reviewer.

## Adapter Readiness

| Step | LangGraph | n8n | Dify |
| --- | --- | --- | --- |
| 收集简历 | draft | ready | draft |
| 解析候选人信息 | draft | ready | draft |
| 匹配职位要求 | manual | manual | manual |
| 生成面试关注点 | ready | draft | ready |
| 招聘负责人审核 | draft | draft | manual |
| 安排面试 | manual | manual | manual |
| 沉淀人才库 | manual | manual | manual |

## Warnings

- Some nodes have medium confidence and should be clarified before implementation.
- Adapter exports are draft-oriented in V0 and should be reviewed before importing into n8n, Dify, or LangGraph.

## Recommended Next Questions

- Which systems hold the input data for each step?
- Who owns the final approval for high-risk outputs?
- What metric proves that this workflow improved the business process?
