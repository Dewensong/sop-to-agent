import type { NodeType, Readiness, WorkflowMode } from "@sopilot/core";

export type Locale = "en" | "zh";

export const localeNames: Record<Locale, string> = {
  en: "English",
  zh: "中文"
};

export const ui = {
  en: {
    subtitle: "SOP to Agent Workflow Generator",
    github: "GitHub",
    examples: "Examples",
    schema: "Schema",
    cli: "CLI",
    language: "Language",
    inputTitle: "Paste a business SOP",
    inputDescription: "Turn messy process text into JSON, Mermaid, review gates, and agent workflow specs.",
    generate: "Generate",
    template: "Template",
    structuredNodes: "Structured nodes",
    automationPotential: "Automation potential",
    reviewGates: "Review gates",
    riskLevel: "Risk level",
    workflowDraft: "Agent Workflow Draft",
    workflowDraftDescription: "Review mode, automation fit, risk, and adapter readiness.",
    mermaidPreview: "Mermaid Preview",
    mermaidDescription: "Generated from canonical workflow JSON.",
    humanReviewGates: "Human Review Gates",
    noReviewGate: "No explicit review gate detected.",
    export: "Export",
    exportDescription: "Download Markdown, JSON, and Mermaid artifacts.",
    exampleLibrary: "Example Library",
    warnings: "Warnings and Next Questions",
    recommendedQuestions: "Recommended questions",
    automation: "Automation",
    feasibility: "Feasibility",
    risk: "Risk",
    langGraph: "LangGraph",
    n8n: "n8n",
    dify: "Dify",
    unableToGenerate: "Unable to generate workflow.",
    exportAction: "Export",
    copyAction: "Copy",
    heroKicker: "Open-source workflow design layer",
    heroTitle: "Turn business SOPs into agent workflow specs.",
    heroDescription:
      "Paste messy process text and get structured JSON, review gates, Mermaid diagrams, and adapter-ready workflow drafts for n8n, Dify, and LangGraph.",
    heroPrimary: "Generate the sample",
    heroSecondary: "View on GitHub",
    heroCommand: "pnpm sopilot generate examples/marketing-campaign.md --format all",
    flowSop: "Messy SOP",
    flowStructure: "Structured JSON",
    flowAgent: "Agent / Tool design",
    flowReview: "Human review gates",
    flowExport: "Markdown / Mermaid export",
    liveWorkbench: "Live workbench",
    launchStatsTemplates: "12 templates",
    launchStatsNoKey: "No API key demo",
    launchStatsExports: "5 export files",
    launchStatsBilingual: "EN / 中文 UI"
  },
  zh: {
    subtitle: "SOP 到 Agent 工作流生成器",
    github: "GitHub",
    examples: "示例",
    schema: "Schema",
    cli: "CLI",
    language: "语言",
    inputTitle: "粘贴业务 SOP",
    inputDescription: "把杂乱流程文本转成 JSON、Mermaid、审核点和 Agent 工作流规格。",
    generate: "生成",
    template: "模板",
    structuredNodes: "结构化节点",
    automationPotential: "自动化潜力",
    reviewGates: "审核节点",
    riskLevel: "风险等级",
    workflowDraft: "Agent 工作流草案",
    workflowDraftDescription: "查看执行模式、自动化适配度、风险和平台映射准备度。",
    mermaidPreview: "Mermaid 预览",
    mermaidDescription: "由标准 workflow JSON 生成。",
    humanReviewGates: "人工审核节点",
    noReviewGate: "未识别到明确的人工审核节点。",
    export: "导出",
    exportDescription: "下载 Markdown、JSON 和 Mermaid 产物。",
    exampleLibrary: "示例库",
    warnings: "风险提醒与下一步问题",
    recommendedQuestions: "建议追问",
    automation: "自动化",
    feasibility: "可行性",
    risk: "风险",
    langGraph: "LangGraph",
    n8n: "n8n",
    dify: "Dify",
    unableToGenerate: "无法生成工作流。",
    exportAction: "导出",
    copyAction: "复制",
    heroKicker: "开源工作流设计层",
    heroTitle: "把业务 SOP 转成 Agent 工作流规格。",
    heroDescription:
      "粘贴杂乱流程文本，即可得到结构化 JSON、审核节点、Mermaid 流程图，以及面向 n8n、Dify、LangGraph 的 adapter-ready 草案。",
    heroPrimary: "生成示例",
    heroSecondary: "查看 GitHub",
    heroCommand: "pnpm sopilot generate examples/marketing-campaign.md --format all",
    flowSop: "杂乱 SOP",
    flowStructure: "结构化 JSON",
    flowAgent: "Agent / Tool 设计",
    flowReview: "人工审核点",
    flowExport: "Markdown / Mermaid 导出",
    liveWorkbench: "实时工作台",
    launchStatsTemplates: "12 个模板",
    launchStatsNoKey: "无需 API Key",
    launchStatsExports: "5 类导出文件",
    launchStatsBilingual: "中英文界面"
  }
} as const;

const modeLabels: Record<Locale, Record<WorkflowMode, string>> = {
  en: {
    agent: "Agent",
    tool: "Tool",
    human_review: "Human Review",
    manual: "Manual"
  },
  zh: {
    agent: "Agent",
    tool: "Tool",
    human_review: "人工审核",
    manual: "人工处理"
  }
};

const nodeTypeLabels: Record<Locale, Record<NodeType, string>> = {
  en: {
    task: "task",
    decision: "decision",
    approval: "approval",
    handoff: "handoff",
    data: "data",
    notification: "notification"
  },
  zh: {
    task: "任务",
    decision: "判断",
    approval: "审批",
    handoff: "交接",
    data: "数据",
    notification: "通知"
  }
};

const readinessLabels: Record<Locale, Record<Readiness, string>> = {
  en: {
    ready: "ready",
    draft: "draft",
    manual: "manual"
  },
  zh: {
    ready: "可映射",
    draft: "草案",
    manual: "需人工"
  }
};

const riskLevelLabels = {
  en: {
    low: "low",
    medium: "medium",
    high: "high"
  },
  zh: {
    low: "低",
    medium: "中",
    high: "高"
  }
} as const;

const domainLabels: Record<Locale, Record<string, string>> = {
  en: {},
  zh: {
    marketing: "营销",
    content: "内容",
    sales: "销售",
    research: "研究",
    operations: "运营",
    strategy: "战略",
    support: "客服",
    recruiting: "招聘",
    product: "产品",
    analytics: "数据分析",
    general: "通用"
  }
};

const templateTitleZh: Record<string, string> = {
  "marketing-campaign": "营销活动全流程",
  "content-pipeline": "内容生产流水线",
  "sales-lead-followup": "销售线索跟进",
  "customer-interview-analysis": "客户访谈分析",
  "meeting-to-tasks": "会议纪要转任务",
  "competitor-analysis": "竞品分析",
  "support-ticket-triage": "客服工单分流",
  "resume-screening": "招聘简历筛选",
  "prd-analysis": "产品需求分析",
  "weekly-data-report": "周报 / 数据报告生成",
  "feedback-clustering": "用户反馈聚类",
  "prd-review-risk-check": "PRD 评审与风险检查"
};

const knownTranslations: Record<string, string> = {
  "Unable to generate workflow.": "无法生成工作流。",
  "This step affects business risk or external commitments, so AI should assist but not auto-approve.":
    "该节点涉及业务风险或外部承诺，AI 可以辅助，但不应自动通过。",
  "This step is language-heavy or reasoning-heavy and is a strong fit for an AI drafting or analysis agent.":
    "该节点以语言处理或推理为主，适合由 AI Agent 辅助起草或分析。",
  "This step is integration-heavy and should be mapped to deterministic workflow tools where possible.":
    "该节点偏系统集成，应尽量映射为确定性的工作流工具。",
  "This step needs clearer structure before automation should be attempted.":
    "该节点需要先补齐结构和规则，再考虑自动化。",
  "High-risk business decision requires review.": "高风险业务决策需要人工审核。",
  "Human confirmation is required.": "需要人工确认。",
  "Business owner or domain reviewer": "业务负责人或领域审核人",
  "The source SOP has fewer than four steps; workflow coverage may be shallow.":
    "源 SOP 少于 4 个步骤，工作流覆盖可能偏浅。",
  "No human review gate was detected; validate risk and approval requirements.":
    "未识别到人工审核节点，请确认风险和审批要求。",
  "Some nodes have medium confidence and should be clarified before implementation.":
    "部分节点置信度中等，落地前需要进一步澄清。",
  "Adapter exports are draft-oriented in V0 and should be reviewed before importing into n8n, Dify, or LangGraph.":
    "V0 的平台导出定位为草案，导入 n8n、Dify 或 LangGraph 前需要人工复核。",
  "Which systems hold the input data for each step?": "每个步骤的输入数据分别来自哪些系统？",
  "Who owns the final approval for high-risk outputs?": "高风险输出由谁负责最终审批？",
  "What metric proves that this workflow improved the business process?": "用什么指标证明这个工作流改善了业务流程？"
};

export function modeLabel(locale: Locale, mode: WorkflowMode): string {
  return modeLabels[locale][mode];
}

export function nodeTypeLabel(locale: Locale, type: NodeType): string {
  return nodeTypeLabels[locale][type];
}

export function readinessLabel(locale: Locale, readiness: Readiness): string {
  return readinessLabels[locale][readiness];
}

export function riskLevelLabel(locale: Locale, level: "low" | "medium" | "high"): string {
  return riskLevelLabels[locale][level];
}

export function domainLabel(locale: Locale, domain: string): string {
  return domainLabels[locale][domain] ?? domain;
}

export function templateTitle(locale: Locale, id: string, fallback: string): string {
  return locale === "zh" ? templateTitleZh[id] ?? fallback : fallback;
}

export function translateKnown(locale: Locale, value: string): string {
  return locale === "zh" ? knownTranslations[value] ?? value : value;
}

export function gateTitle(locale: Locale, title: string): string {
  if (locale === "en") return title;
  return title.replace(" review gate", " 审核节点");
}
