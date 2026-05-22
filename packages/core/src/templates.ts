export type SopTemplate = {
  id: string;
  title: string;
  domain: string;
  description: string;
  input: string;
};

export const sampleTemplates: SopTemplate[] = [
  {
    id: "marketing-campaign",
    title: "Marketing Campaign Workflow",
    domain: "marketing",
    description: "需求收集、活动策划、文案生成、审核、发布和数据复盘。",
    input: `# 营销活动全流程

业务目标：把一次新品营销活动从需求收集推进到复盘，并识别哪些环节可以交给 AI Agent 辅助。

流程：需求收集 -> 活动策划 -> 文案生成 -> 合规与品牌审核 -> 多渠道发布 -> 数据复盘

关键约束：
- 品牌口径和活动预算必须人工确认。
- 文案生成可以由 AI 起草，但上线前必须经过审核。
- 发布后需要汇总渠道数据并输出复盘建议。`
  },
  {
    id: "content-pipeline",
    title: "Content Production Pipeline",
    domain: "content",
    description: "选题、资料、初稿、编辑、分发与复盘。",
    input: `# 内容生产流水线

编辑团队每周需要从热点、用户问题和产品更新中选择主题。

流程：选题池收集 -> 资料检索 -> 大纲生成 -> 初稿撰写 -> 编辑审核 -> 多平台分发 -> 表现复盘

要求：
- 热点来源需要标注出处。
- 初稿可由 AI 生成，但编辑必须确认事实和品牌语气。
- 分发后按点击率、收藏率和转化线索复盘。`
  },
  {
    id: "sales-lead-followup",
    title: "Sales Lead Follow-up",
    domain: "sales",
    description: "线索进入、评分、分配、触达和跟进。",
    input: `# 销售线索跟进工作流

流程：线索进入 -> 线索清洗 -> 意向评分 -> 销售分配 -> 首次触达 -> 跟进记录 -> 成交或沉淀

规则：
- 企业邮箱、手机号、公司规模是必填信息。
- 高意向线索需要 2 小时内触达。
- AI 可以补全公司背景和推荐触达话术，但不能替销售承诺价格。`
  },
  {
    id: "customer-interview-analysis",
    title: "Customer Interview Analysis",
    domain: "research",
    description: "访谈整理、观点提取、需求聚类和机会判断。",
    input: `# 客户访谈分析

流程：上传访谈纪要 -> 清洗敏感信息 -> 提取关键观点 -> 聚类痛点 -> 映射需求机会 -> 研究员审核 -> 输出洞察报告

注意：
- 客户姓名和公司敏感信息需要脱敏。
- AI 聚类结果要保留原始证据片段。
- 最终机会判断由研究员确认。`
  },
  {
    id: "meeting-to-tasks",
    title: "Meeting Notes to Tasks",
    domain: "operations",
    description: "会议纪要转任务、负责人、截止时间和风险。",
    input: `# 会议纪要转任务

流程：导入会议纪要 -> 提取决议 -> 识别行动项 -> 分配负责人 -> 确认截止时间 -> 同步到任务系统 -> 周期性提醒

约束：
- 没有负责人或截止时间的行动项需要人工补齐。
- 任务同步前需要会议主持人确认。
- 提醒频率不能超过团队默认规则。`
  },
  {
    id: "competitor-analysis",
    title: "Competitor Analysis",
    domain: "strategy",
    description: "竞品信息收集、对比、风险判断和报告生成。",
    input: `# 竞品分析流程

流程：确定竞品名单 -> 收集官网和公开资料 -> 提取功能与定价 -> 对比差异 -> 标注风险与机会 -> PM 审核 -> 输出竞品报告

规则：
- 只能使用公开来源。
- 关键结论必须关联证据链接。
- 对未确认的信息要标注置信度。`
  },
  {
    id: "support-ticket-triage",
    title: "Support Ticket Triage",
    domain: "support",
    description: "客服工单分类、优先级、自动回复和升级。",
    input: `# 客服工单分流

流程：接收工单 -> 判断问题类型 -> 识别紧急程度 -> 推荐回复草稿 -> 自动回复低风险问题 -> 升级复杂问题 -> 汇总问题趋势

注意：
- 涉及退款、合规和安全问题必须人工处理。
- AI 回复需要引用知识库条目。
- 高优先级工单需要 30 分钟内升级。`
  },
  {
    id: "resume-screening",
    title: "Recruiting Resume Screening",
    domain: "recruiting",
    description: "简历解析、匹配度评分、面试建议和人工审核。",
    input: `# 招聘简历筛选

流程：收集简历 -> 解析候选人信息 -> 匹配职位要求 -> 生成面试关注点 -> 招聘负责人审核 -> 安排面试 -> 沉淀人才库

约束：
- 不允许基于年龄、性别、婚育等敏感信息筛选。
- AI 只能给出辅助评分和证据，不做最终淘汰决定。
- 推荐面试问题要对应岗位能力。`
  },
  {
    id: "prd-analysis",
    title: "Product Requirement Analysis",
    domain: "product",
    description: "PRD 输入、需求拆解、风险识别和评审清单。",
    input: `# 产品需求分析

流程：导入 PRD -> 拆解用户故事 -> 识别依赖系统 -> 生成验收标准 -> 标注风险与疑问 -> 产品经理审核 -> 输出评审清单

规则：
- 不清晰的需求需要生成追问。
- 高风险依赖需要标注 owner。
- 验收标准必须可测试。`
  },
  {
    id: "weekly-data-report",
    title: "Weekly Data Report",
    domain: "analytics",
    description: "数据提取、异常检测、解释和周报生成。",
    input: `# 周报与数据报告生成

流程：拉取核心指标 -> 检查数据完整性 -> 发现异常波动 -> 解释可能原因 -> 生成周报草稿 -> 业务负责人审核 -> 发送报告

注意：
- 数据缺失时不能生成确定性结论。
- AI 解释必须区分事实、推测和建议。
- 发送前需要负责人确认。`
  },
  {
    id: "feedback-clustering",
    title: "User Feedback Clustering",
    domain: "product",
    description: "反馈收集、清洗、聚类、优先级和行动建议。",
    input: `# 用户反馈聚类

流程：收集多渠道反馈 -> 去重与脱敏 -> 识别情绪和主题 -> 聚类问题 -> 计算影响范围 -> 生成处理建议 -> 产品团队审核

要求：
- 反馈来源包括客服、社群、应用商店和销售记录。
- 每个聚类要保留代表性原文。
- 处理优先级由产品团队最终确认。`
  },
  {
    id: "prd-review-risk-check",
    title: "PRD Review Risk Check",
    domain: "product",
    description: "PRD 评审、风险扫描、追问和跨团队对齐。",
    input: `# PRD 评审与风险检查

流程：提交 PRD -> 检查目标与范围 -> 扫描技术依赖 -> 识别数据与合规风险 -> 生成追问清单 -> 组织评审 -> 记录决策和待办

约束：
- 涉及用户数据、权限和支付的改动需要额外审核。
- AI 可以生成问题清单，但不能替代评审结论。
- 决策必须记录原因和 owner。`
  }
];

export function getTemplateById(id: string): SopTemplate | undefined {
  return sampleTemplates.find((template) => template.id === id);
}
