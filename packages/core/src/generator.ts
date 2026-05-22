import {
  EvaluationSpec,
  NodeType,
  Readiness,
  SopEdge,
  SopNode,
  SopSpec,
  SopilotResult,
  WorkflowMode,
  WorkflowNode,
  WorkflowSpec,
  sopilotResultSchema
} from "./schemas";
import { exportMarkdown, exportMermaid } from "./exporters";

type GenerateOptions = {
  title?: string;
  domain?: string;
};

type Classification = {
  type: NodeType;
  mode: WorkflowMode;
  automationScore: number;
  feasibilityScore: number;
  riskScore: number;
  confidence: number;
  tools: string[];
  risks: string[];
  rationale: string;
};

const STEP_PATTERN = /\s*(?:->|→|=>|⇒)\s*/g;
const HAS_STEP_PATTERN = /(?:->|→|=>|⇒)/;

const highRiskWords = [
  "审核",
  "合规",
  "法律",
  "预算",
  "支付",
  "退款",
  "安全",
  "权限",
  "隐私",
  "敏感",
  "淘汰",
  "承诺",
  "升级",
  "复杂",
  "approve",
  "compliance",
  "legal",
  "privacy"
];

const agentWords = [
  "生成",
  "撰写",
  "提取",
  "分析",
  "聚类",
  "总结",
  "汇总",
  "识别",
  "解释",
  "推荐",
  "拆解",
  "generate",
  "analyze",
  "summarize",
  "extract"
];

const toolWords = [
  "发布",
  "同步",
  "发送",
  "提醒",
  "拉取",
  "上传",
  "导入",
  "收集",
  "接收",
  "检索",
  "分发",
  "回复",
  "自动",
  "notify",
  "sync",
  "publish",
  "fetch"
];

const decisionWords = ["判断", "评分", "识别", "确认", "选择", "decision", "score"];
const dataWords = ["数据", "指标", "信息", "资料", "简历", "纪要", "feedback", "data"];
const notificationWords = ["发布", "同步", "发送", "提醒", "分发", "notify", "publish"];

export function generateSopilotResult(sourceText: string, options: GenerateOptions = {}): SopilotResult {
  const cleaned = sourceText.trim();
  if (!cleaned) {
    throw new Error("SOP source text is required.");
  }

  const title = options.title ?? inferTitle(cleaned);
  const domain = options.domain ?? inferDomain(cleaned);
  const steps = extractSteps(cleaned);
  const sopId = toId(title);
  const nodes = steps.map((step, index) => buildSopNode(step, index, steps.length));
  const edges = buildEdges(nodes);
  const workflowNodes = nodes.map((node, index) => buildWorkflowNode(node, index));
  const workflow = buildWorkflow(sopId, workflowNodes, edges);

  const sop: SopSpec = {
    id: sopId,
    title,
    domain,
    sourceText: cleaned,
    assumptions: [
      "The input text is treated as the current source of truth.",
      "Generated workflow specs are drafts that require business and technical review.",
      "The V0 output designs workflow intent but does not execute downstream automations."
    ],
    actors: inferActors(cleaned, workflowNodes),
    systems: inferSystems(cleaned, workflowNodes),
    nodes,
    edges
  };

  const evaluation = buildEvaluation(sop, workflow);
  const mermaid = exportMermaid(sop, workflow);
  const markdown = exportMarkdown(sop, workflow, evaluation, mermaid);

  return sopilotResultSchema.parse({
    sop,
    workflow,
    evaluation,
    mermaid,
    markdown
  });
}

function inferTitle(text: string): string {
  const heading = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => line.startsWith("#"));

  if (heading) {
    return heading.replace(/^#+\s*/, "").trim();
  }

  const firstMeaningfulLine = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find(Boolean);

  return firstMeaningfulLine?.slice(0, 60) || "Untitled SOP";
}

function inferDomain(text: string): string {
  const lower = text.toLowerCase();
  const pairs: Array<[string, string[]]> = [
    ["marketing", ["营销", "campaign", "渠道", "活动", "品牌"]],
    ["sales", ["销售", "线索", "lead", "成交"]],
    ["support", ["客服", "工单", "support", "ticket"]],
    ["recruiting", ["招聘", "简历", "候选人", "resume"]],
    ["product", ["prd", "产品", "需求", "用户故事"]],
    ["analytics", ["数据", "指标", "report", "周报"]],
    ["research", ["访谈", "research", "洞察", "用户反馈"]],
    ["operations", ["会议", "任务", "同步", "流程"]]
  ];

  return pairs.find(([, words]) => words.some((word) => lower.includes(word)))?.[0] ?? "general";
}

function extractSteps(text: string): string[] {
  const arrowLine = text
    .split(/\r?\n/)
    .find((line) => HAS_STEP_PATTERN.test(line) || line.includes("流程：") || line.toLowerCase().includes("flow:"));

  if (arrowLine && HAS_STEP_PATTERN.test(arrowLine)) {
    return arrowLine
      .replace(/^.*?(?:流程|flow)\s*[:：]\s*/i, "")
      .split(STEP_PATTERN)
      .map(cleanStep)
      .filter(Boolean);
  }

  const listed = text
    .split(/\r?\n/)
    .map((line) => line.match(/^\s*(?:\d+[.)、]|[-*])\s+(.+)$/)?.[1])
    .filter((line): line is string => Boolean(line))
    .map(cleanStep)
    .filter((line) => line.length > 2);

  if (listed.length >= 3) {
    return listed.slice(0, 12);
  }

  const sentenceSteps = text
    .split(/[。.;\n]/)
    .map(cleanStep)
    .filter((line) => line.length >= 4 && !line.startsWith("#"))
    .slice(0, 8);

  return sentenceSteps.length >= 2 ? sentenceSteps : ["Intake request", "Analyze workflow", "Review output"];
}

function cleanStep(step: string): string {
  return step
    .replace(/^[-*#\d.)、\s]+/, "")
    .replace(/[。.;；]+$/, "")
    .trim();
}

function buildSopNode(step: string, index: number, total: number): SopNode {
  const classification = classify(step);
  const id = `n${index + 1}`;
  const previous = index === 0 ? "source brief or business request" : `output from step ${index}`;
  const next = index === total - 1 ? "final report or workflow outcome" : `input for step ${index + 2}`;

  return {
    id,
    title: step,
    description: `Business step ${index + 1}: ${step}.`,
    type: classification.type,
    actor: actorFor(classification.mode),
    inputs: [previous],
    outputs: [next],
    tools: classification.tools,
    risks: classification.risks,
    acceptanceCriteria: [
      "Inputs are complete enough for the next step.",
      "Outputs are explicit, reviewable, and traceable."
    ],
    missingInfo: missingInfoFor(step, classification)
  };
}

function classify(step: string): Classification {
  const lower = step.toLowerCase();
  const hasRisk = includesAny(lower, highRiskWords);
  const hasAgentFit = includesAny(lower, agentWords);
  const hasToolFit = includesAny(lower, toolWords);
  const hasDecision = includesAny(lower, decisionWords);
  const hasData = includesAny(lower, dataWords);
  const hasNotification = includesAny(lower, notificationWords);

  const type: NodeType = hasRisk
    ? "approval"
    : hasNotification
      ? "notification"
      : hasDecision
        ? "decision"
        : hasData
          ? "data"
          : hasToolFit
            ? "handoff"
            : "task";

  const mode: WorkflowMode = hasRisk
    ? "human_review"
    : hasAgentFit
      ? "agent"
      : hasToolFit || hasData
        ? "tool"
        : "manual";

  const automationScore = clampScore((hasAgentFit ? 78 : 42) + (hasToolFit ? 12 : 0) - (hasRisk ? 24 : 0));
  const feasibilityScore = clampScore((hasToolFit ? 82 : hasAgentFit ? 72 : 58) - (hasRisk ? 8 : 0));
  const riskScore = clampScore(hasRisk ? 76 : hasDecision ? 48 : 28);
  const confidence = Number((0.58 + (hasAgentFit || hasToolFit ? 0.18 : 0) - (hasRisk ? 0.06 : 0)).toFixed(2));

  return {
    type,
    mode,
    automationScore,
    feasibilityScore,
    riskScore,
    confidence,
    tools: toolsFor(step, mode),
    risks: risksFor(hasRisk, hasDecision),
    rationale: rationaleFor(mode, hasRisk, hasAgentFit, hasToolFit)
  };
}

function buildWorkflowNode(node: SopNode, index: number): WorkflowNode {
  const classification = classify(node.title);
  const id = `w${index + 1}`;

  return {
    id,
    sopNodeId: node.id,
    title: node.title,
    mode: classification.mode,
    prompt:
      classification.mode === "agent"
        ? `Given the business context and required outputs, complete "${node.title}" with evidence, assumptions, and next-step recommendations.`
        : undefined,
    toolName:
      classification.mode === "tool"
        ? node.tools[0] ?? "Workflow automation connector"
        : undefined,
    inputSchema: {
      type: "object",
      required: ["context", "inputs"],
      properties: {
        context: { type: "string" },
        inputs: { type: "array", items: { type: "string" } }
      }
    },
    outputSchema: {
      type: "object",
      required: ["summary", "evidence", "next"],
      properties: {
        summary: { type: "string" },
        evidence: { type: "array", items: { type: "string" } },
        next: { type: "string" }
      }
    },
    automationScore: classification.automationScore,
    feasibilityScore: classification.feasibilityScore,
    riskScore: classification.riskScore,
    confidence: classification.confidence,
    rationale: classification.rationale,
    adapterTargets: adapterTargetsFor(classification.mode)
  };
}

function buildWorkflow(sopId: string, nodes: WorkflowNode[], edges: SopEdge[]): WorkflowSpec {
  const humanGates = nodes
    .filter((node) => node.mode === "human_review" || node.riskScore >= 70)
    .map((node) => ({
      id: `gate-${node.id}`,
      nodeId: node.id,
      title: `${node.title} review gate`,
      reason: node.riskScore >= 70 ? "High-risk business decision requires review." : "Human confirmation is required.",
      reviewer: "Business owner or domain reviewer",
      requiredInputs: ["draft output", "source evidence", "risk notes"]
    }));

  return {
    id: `workflow-${sopId}`,
    sopId,
    nodes,
    edges,
    humanGates,
    tools: buildTools(nodes),
    agents: buildAgents(nodes),
    metrics: [
      {
        id: "cycle-time",
        name: "Cycle time reduction",
        description: "Compare time from intake to final approved output before and after automation.",
        source: "workflow timestamps"
      },
      {
        id: "review-pass-rate",
        name: "Review pass rate",
        description: "Track how often AI-assisted outputs pass human review without major rework.",
        source: "review records"
      },
      {
        id: "automation-coverage",
        name: "Automation coverage",
        description: "Share of steps designed as agent or tool nodes.",
        source: "workflow spec"
      }
    ],
    exportTargets: ["markdown", "json", "mermaid", "langgraph_draft"]
  };
}

function buildEvaluation(sop: SopSpec, workflow: WorkflowSpec): EvaluationSpec {
  const automated = workflow.nodes.filter((node) => node.mode === "agent" || node.mode === "tool").length;
  const humanReviewCoverage = workflow.humanGates.length > 0 ? 82 : 42;
  const averageRisk = average(workflow.nodes.map((node) => node.riskScore));
  const ambiguityScore = Math.max(18, sop.nodes.flatMap((node) => node.missingInfo).length * 9);

  return {
    coverageScore: clampScore(58 + sop.nodes.length * 5),
    ambiguityScore: clampScore(ambiguityScore),
    automationPotential: clampScore(Math.round((automated / Math.max(workflow.nodes.length, 1)) * 100)),
    humanReviewCoverage,
    riskLevel: averageRisk >= 62 ? "high" : averageRisk >= 38 ? "medium" : "low",
    warnings: buildWarnings(sop, workflow),
    recommendedNextQuestions: [
      "Which systems hold the input data for each step?",
      "Who owns the final approval for high-risk outputs?",
      "What metric proves that this workflow improved the business process?"
    ]
  };
}

function buildEdges(nodes: SopNode[]): SopEdge[] {
  return nodes.slice(0, -1).map((node, index) => ({
    id: `e${index + 1}`,
    from: node.id,
    to: nodes[index + 1]?.id ?? node.id,
    label: "next"
  }));
}

function buildTools(nodes: WorkflowNode[]) {
  const toolNodes = nodes.filter((node) => node.mode === "tool");
  if (toolNodes.length === 0) {
    return [];
  }

  return [
    {
      id: "workflow-connectors",
      name: "Workflow automation connectors",
      purpose: "Fetch, sync, publish, notify, or route structured outputs across existing tools.",
      targetNodes: toolNodes.map((node) => node.id)
    }
  ];
}

function buildAgents(nodes: WorkflowNode[]) {
  const agentNodes = nodes.filter((node) => node.mode === "agent");
  if (agentNodes.length === 0) {
    return [];
  }

  return [
    {
      id: "analysis-agent",
      name: "Process analysis agent",
      responsibility: "Generate structured drafts, extract evidence, identify risks, and recommend next actions.",
      assignedNodeIds: agentNodes.map((node) => node.id)
    }
  ];
}

function inferActors(text: string, workflowNodes: WorkflowNode[]): string[] {
  const actors = new Set<string>(["Business owner"]);
  if (workflowNodes.some((node) => node.mode === "agent")) actors.add("AI agent");
  if (workflowNodes.some((node) => node.mode === "tool")) actors.add("Automation tool");
  if (workflowNodes.some((node) => node.mode === "human_review")) actors.add("Human reviewer");
  if (text.includes("PM") || text.includes("产品")) actors.add("Product manager");
  if (text.includes("销售")) actors.add("Sales owner");
  if (text.includes("客服")) actors.add("Support owner");
  return [...actors];
}

function inferSystems(text: string, workflowNodes: WorkflowNode[]): string[] {
  const systems = new Set<string>(["SOPilot canonical workflow spec"]);
  if (workflowNodes.some((node) => node.mode === "agent")) systems.add("LLM provider");
  if (workflowNodes.some((node) => node.mode === "tool")) systems.add("Workflow automation platform");
  if (text.includes("任务")) systems.add("Task management system");
  if (text.includes("数据") || text.includes("指标")) systems.add("Analytics system");
  return [...systems];
}

function missingInfoFor(step: string, classification: Classification): string[] {
  const items = [];
  if (classification.mode === "tool") items.push("Target system and connector credentials");
  if (classification.mode === "human_review") items.push("Reviewer role and approval SLA");
  if (!/[0-9]/.test(step)) items.push("Expected SLA or measurable acceptance threshold");
  return items;
}

function toolsFor(step: string, mode: WorkflowMode): string[] {
  if (mode === "agent") return ["LLM structured generation", "Evidence extraction"];
  if (mode === "tool") return ["Workflow connector", "Data sync"];
  if (mode === "human_review") return ["Review checklist", "Approval record"];
  if (includesAny(step.toLowerCase(), dataWords)) return ["Data parser"];
  return [];
}

function risksFor(hasRisk: boolean, hasDecision: boolean): string[] {
  const risks = [];
  if (hasRisk) risks.push("Business, legal, brand, privacy, or compliance risk");
  if (hasDecision) risks.push("Decision quality depends on incomplete context");
  if (risks.length === 0) risks.push("Output may be underspecified without clearer acceptance criteria");
  return risks;
}

function rationaleFor(mode: WorkflowMode, hasRisk: boolean, hasAgentFit: boolean, hasToolFit: boolean): string {
  if (mode === "human_review" || hasRisk) return "This step affects business risk or external commitments, so AI should assist but not auto-approve.";
  if (mode === "agent" || hasAgentFit) return "This step is language-heavy or reasoning-heavy and is a strong fit for an AI drafting or analysis agent.";
  if (mode === "tool" || hasToolFit) return "This step is integration-heavy and should be mapped to deterministic workflow tools where possible.";
  return "This step needs clearer structure before automation should be attempted.";
}

function actorFor(mode: WorkflowMode): string {
  if (mode === "agent") return "AI agent";
  if (mode === "tool") return "Automation tool";
  if (mode === "human_review") return "Human reviewer";
  return "Business owner";
}

function adapterTargetsFor(mode: WorkflowMode): { langGraph: Readiness; n8n: Readiness; dify: Readiness } {
  if (mode === "agent") return { langGraph: "ready", n8n: "draft", dify: "ready" };
  if (mode === "tool") return { langGraph: "draft", n8n: "ready", dify: "draft" };
  if (mode === "human_review") return { langGraph: "draft", n8n: "draft", dify: "manual" };
  return { langGraph: "manual", n8n: "manual", dify: "manual" };
}

function buildWarnings(sop: SopSpec, workflow: WorkflowSpec): string[] {
  const warnings = [];
  if (sop.nodes.length < 4) warnings.push("The source SOP has fewer than four steps; workflow coverage may be shallow.");
  if (workflow.humanGates.length === 0) warnings.push("No human review gate was detected; validate risk and approval requirements.");
  if (workflow.nodes.some((node) => node.confidence < 0.65)) warnings.push("Some nodes have medium confidence and should be clarified before implementation.");
  warnings.push("Adapter exports are draft-oriented in V0 and should be reviewed before importing into n8n, Dify, or LangGraph.");
  return warnings;
}

function includesAny(text: string, words: string[]): boolean {
  return words.some((word) => text.includes(word.toLowerCase()));
}

function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function toId(input: string): string {
  const ascii = input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 48);

  if (ascii) return ascii;

  let hash = 0;
  for (const char of input) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return `sop-${hash.toString(16)}`;
}
