import { z } from "zod";

export const nodeTypeSchema = z.enum([
  "task",
  "decision",
  "approval",
  "handoff",
  "data",
  "notification"
]);

export const workflowModeSchema = z.enum([
  "agent",
  "tool",
  "human_review",
  "manual"
]);

export const readinessSchema = z.enum(["ready", "draft", "manual"]);

export const sopEdgeSchema = z.object({
  id: z.string(),
  from: z.string(),
  to: z.string(),
  label: z.string().optional(),
  condition: z.string().optional()
});

export const sopNodeSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  type: nodeTypeSchema,
  actor: z.string(),
  inputs: z.array(z.string()),
  outputs: z.array(z.string()),
  tools: z.array(z.string()),
  risks: z.array(z.string()),
  acceptanceCriteria: z.array(z.string()),
  missingInfo: z.array(z.string())
});

export const sopSpecSchema = z.object({
  id: z.string(),
  title: z.string(),
  domain: z.string(),
  sourceText: z.string(),
  assumptions: z.array(z.string()),
  actors: z.array(z.string()),
  systems: z.array(z.string()),
  nodes: z.array(sopNodeSchema),
  edges: z.array(sopEdgeSchema)
});

export const workflowNodeSchema = z.object({
  id: z.string(),
  sopNodeId: z.string(),
  title: z.string(),
  mode: workflowModeSchema,
  prompt: z.string().optional(),
  toolName: z.string().optional(),
  inputSchema: z.record(z.unknown()).optional(),
  outputSchema: z.record(z.unknown()).optional(),
  automationScore: z.number().min(0).max(100),
  feasibilityScore: z.number().min(0).max(100),
  riskScore: z.number().min(0).max(100),
  confidence: z.number().min(0).max(1),
  rationale: z.string(),
  adapterTargets: z.object({
    langGraph: readinessSchema,
    n8n: readinessSchema,
    dify: readinessSchema
  })
});

export const humanGateSchema = z.object({
  id: z.string(),
  nodeId: z.string(),
  title: z.string(),
  reason: z.string(),
  reviewer: z.string(),
  requiredInputs: z.array(z.string())
});

export const toolSpecSchema = z.object({
  id: z.string(),
  name: z.string(),
  purpose: z.string(),
  targetNodes: z.array(z.string())
});

export const agentSpecSchema = z.object({
  id: z.string(),
  name: z.string(),
  responsibility: z.string(),
  assignedNodeIds: z.array(z.string())
});

export const metricSpecSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  source: z.string()
});

export const workflowSpecSchema = z.object({
  id: z.string(),
  sopId: z.string(),
  nodes: z.array(workflowNodeSchema),
  edges: z.array(sopEdgeSchema),
  humanGates: z.array(humanGateSchema),
  tools: z.array(toolSpecSchema),
  agents: z.array(agentSpecSchema),
  metrics: z.array(metricSpecSchema),
  exportTargets: z.array(z.enum(["markdown", "json", "mermaid", "langgraph_draft"]))
});

export const evaluationSpecSchema = z.object({
  coverageScore: z.number().min(0).max(100),
  ambiguityScore: z.number().min(0).max(100),
  automationPotential: z.number().min(0).max(100),
  humanReviewCoverage: z.number().min(0).max(100),
  riskLevel: z.enum(["low", "medium", "high"]),
  warnings: z.array(z.string()),
  recommendedNextQuestions: z.array(z.string())
});

export const sopilotResultSchema = z.object({
  sop: sopSpecSchema,
  workflow: workflowSpecSchema,
  evaluation: evaluationSpecSchema,
  mermaid: z.string(),
  markdown: z.string()
});

export type NodeType = z.infer<typeof nodeTypeSchema>;
export type WorkflowMode = z.infer<typeof workflowModeSchema>;
export type Readiness = z.infer<typeof readinessSchema>;
export type SopEdge = z.infer<typeof sopEdgeSchema>;
export type SopNode = z.infer<typeof sopNodeSchema>;
export type SopSpec = z.infer<typeof sopSpecSchema>;
export type WorkflowNode = z.infer<typeof workflowNodeSchema>;
export type WorkflowSpec = z.infer<typeof workflowSpecSchema>;
export type EvaluationSpec = z.infer<typeof evaluationSpecSchema>;
export type SopilotResult = z.infer<typeof sopilotResultSchema>;
