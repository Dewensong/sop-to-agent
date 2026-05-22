# 关键决策

## 记录规则

当项目出现重要取舍时，在这里记录：

- 决策是什么
- 为什么这么选
- 放弃了什么方案
- 后续如果反悔，应该看什么信号

## 决策列表

### 2026-05-21：V0 定位为 SOP-to-Agent Workflow Generator

- 决策：SOPilot 不做普通 AI 文案生成器，也不做企业级工作流平台，而是做业务 SOP 到 AI Agent 工作流规格的上游转换器。
- 原因：这样同时匹配 AI 产品经理（营销提效）岗位能力和 GitHub 开源传播心智。
- 放弃：只做营销文案、只做 n8n/Dify/LangGraph 的平台替代品。
- 反悔信号：如果用户只关心执行而不是结构化设计，再考虑更深的运行时能力。

### 2026-05-21：V0 使用无 API Key 的 deterministic mock parser

- 决策：第一版默认不用真实 LLM，使用可测试的启发式 parser 生成结构化结果。
- 原因：降低上手门槛，保证 demo、测试和 CI 稳定；真实 LLM provider 可作为后续增强。
- 放弃：首版强依赖 OpenAI / Anthropic API Key。
- 反悔信号：如果 parser 输出不能满足真实 SOP 场景，再引入可选 LLM provider 和 schema repair。

### 2026-05-21：Web Demo 与 CLI 共用 `packages/core`

- 决策：Web 和 CLI 都调用同一套 schema、生成器和导出器。
- 原因：保证展示结果和开发者命令行结果一致，便于测试和后续 adapter 扩展。
- 放弃：Web 内部单独实现一套生成逻辑。
- 反悔信号：如果 Web 需要复杂交互式编辑，再在 core 外增加 UI-specific view model。

### 2026-05-21：V0 只做 adapter readiness，不做完整平台导入

- 决策：第一版只标注 LangGraph / n8n / Dify readiness，不承诺可运行导出。
- 原因：这些平台格式和能力边界不同，过早承诺会拖垮 MVP。
- 放弃：首版完整 n8n JSON、Dify DSL、LangGraph runnable app。
- 反悔信号：当 canonical schema 稳定且用户明确需要某个平台导出时，优先做 LangGraph draft。

### 2026-05-21：Web Demo 支持 English / 中文切换

- 决策：保留英文开源主入口，同时提供中文 UI 和中文 README。
- 原因：英文更适合 GitHub 传播，中文更适合 AI 产品经理（营销提效）面试演示和 Dewens 自用表达。
- 放弃：只做英文界面，或把整个项目改成中文优先。
- 反悔信号：如果主要发布渠道转为中文社区，可以把中文截图和中文 README 放到更靠前的位置。
