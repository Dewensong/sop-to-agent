import { EvaluationSpec, SopSpec, SopilotResult, WorkflowSpec } from "./schemas";

export type ExportFormat = "all" | "json" | "markdown" | "mermaid";

export function exportMermaid(sop: SopSpec, workflow: WorkflowSpec): string {
  const lines = ["flowchart TD"];

  for (const node of workflow.nodes) {
    const sopNode = sop.nodes.find((item) => item.id === node.sopNodeId);
    const label = `${escapeMermaidLabel(sopNode?.title ?? node.title)}\\n${node.mode} | A:${node.automationScore} R:${node.riskScore}`;
    lines.push(`  ${node.id}["${label}"]`);
  }

  for (const edge of workflow.edges) {
    const from = workflow.nodes.find((node) => node.sopNodeId === edge.from)?.id;
    const to = workflow.nodes.find((node) => node.sopNodeId === edge.to)?.id;
    if (from && to) {
      lines.push(`  ${from} -->|${edge.label ?? "next"}| ${to}`);
    }
  }

  lines.push("  classDef agent fill:#ecfdf5,stroke:#047857,color:#064e3b");
  lines.push("  classDef tool fill:#eff6ff,stroke:#2563eb,color:#1e3a8a");
  lines.push("  classDef human fill:#fff7ed,stroke:#ea580c,color:#7c2d12");
  lines.push("  classDef manual fill:#f8fafc,stroke:#64748b,color:#334155");

  for (const node of workflow.nodes) {
    const className = node.mode === "human_review" ? "human" : node.mode;
    lines.push(`  class ${node.id} ${className}`);
  }

  return `${lines.join("\n")}\n`;
}

export function exportMarkdown(
  sop: SopSpec,
  workflow: WorkflowSpec,
  evaluation: EvaluationSpec,
  mermaid = exportMermaid(sop, workflow)
): string {
  const lines = [
    `# ${sop.title}`,
    "",
    `Domain: ${sop.domain}`,
    "",
    "## Summary",
    "",
    `- SOP nodes: ${sop.nodes.length}`,
    `- Automation potential: ${evaluation.automationPotential}/100`,
    `- Human review gates: ${workflow.humanGates.length}`,
    `- Risk level: ${evaluation.riskLevel}`,
    "",
    "## Workflow Diagram",
    "",
    "```mermaid",
    mermaid.trim(),
    "```",
    "",
    "## Node Automation Map",
    "",
    "| Step | Type | Mode | Automation | Risk | Rationale |",
    "| --- | --- | --- | ---: | ---: | --- |"
  ];

  for (const node of workflow.nodes) {
    const sopNode = sop.nodes.find((item) => item.id === node.sopNodeId);
    lines.push(
      `| ${safeTable(sopNode?.title ?? node.title)} | ${sopNode?.type ?? "task"} | ${node.mode} | ${node.automationScore} | ${node.riskScore} | ${safeTable(node.rationale)} |`
    );
  }

  lines.push("", "## Human Review Gates", "");

  if (workflow.humanGates.length === 0) {
    lines.push("- No explicit review gate detected. Add one before production use if the workflow touches external commitments, private data, or approvals.");
  } else {
    for (const gate of workflow.humanGates) {
      lines.push(`- **${gate.title}**: ${gate.reason} Reviewer: ${gate.reviewer}.`);
    }
  }

  lines.push("", "## Adapter Readiness", "");
  lines.push("| Step | LangGraph | n8n | Dify |");
  lines.push("| --- | --- | --- | --- |");

  for (const node of workflow.nodes) {
    lines.push(
      `| ${safeTable(node.title)} | ${node.adapterTargets.langGraph} | ${node.adapterTargets.n8n} | ${node.adapterTargets.dify} |`
    );
  }

  lines.push("", "## Warnings", "");
  for (const warning of evaluation.warnings) {
    lines.push(`- ${warning}`);
  }

  lines.push("", "## Recommended Next Questions", "");
  for (const question of evaluation.recommendedNextQuestions) {
    lines.push(`- ${question}`);
  }

  return `${lines.join("\n")}\n`;
}

export function exportAllFormats(result: SopilotResult): Record<string, string> {
  return {
    "sop.json": `${JSON.stringify(result.sop, null, 2)}\n`,
    "workflow.json": `${JSON.stringify(result.workflow, null, 2)}\n`,
    "evaluation.json": `${JSON.stringify(result.evaluation, null, 2)}\n`,
    "flow.mmd": result.mermaid,
    "report.md": result.markdown
  };
}

function escapeMermaidLabel(value: string): string {
  return value.replace(/"/g, "'").replace(/\|/g, "-").slice(0, 80);
}

function safeTable(value: string): string {
  return value.replace(/\|/g, "\\|").replace(/\n/g, " ");
}
