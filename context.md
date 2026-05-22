# 项目背景

## 项目目标

SOPilot 是一个开源工具，目标是把业务 SOP、会议纪要、流程说明或营销活动流程，转换成结构化、可审查、可导出的 AI Agent Workflow Spec。

核心主线：

业务流程结构化 → AI 自动化机会识别 → Agent / Tool / Human Review 设计 → 人工审核 → Markdown / JSON / Mermaid 导出。

## 适用场景

- 营销活动流程
- 销售线索跟进
- 会议纪要转任务
- 客户访谈分析
- 内容生产流水线
- 竞品分析
- 客服工单分流
- 招聘简历筛选
- 产品需求分析
- 周报 / 数据报告生成

## 当前约束

- 时间：优先做可运行 V0，不扩成大而全平台。
- 资源：默认无真实 LLM API Key 也要能跑通演示。
- 技术：TypeScript monorepo，Next.js Web Demo，CLI，共享 core。
- 协作：项目既服务 AI 产品经理（营销提效）面试，也面向 GitHub 开源传播。
- 语言：Web Demo 支持 English / 中文切换，兼顾 GitHub 传播和中文面试展示。

## 验收标准

当前阶段完成条件：

- Web Demo 可输入 SOP 并生成结果。
- CLI 可从示例文件生成 Markdown / JSON / Mermaid。
- 至少 10 个示例模板。
- Web Demo 支持中英文切换。
- 有核心 schema、导出器、测试和 CI。
- README 第一屏能让开发者快速理解项目价值。

## 重要背景

项目公开定位保持通用：

> Turn messy business SOPs into structured, reviewable, exportable AI agent workflow specs.

营销场景是第一个黄金案例，但不是产品边界。
