import { describe, expect, it } from "vitest";
import { generateSopilotResult, sampleTemplates, sopilotResultSchema } from "../src";

describe("generateSopilotResult", () => {
  it("turns a marketing SOP into validated canonical specs", () => {
    const template = sampleTemplates.find((item) => item.id === "marketing-campaign");
    expect(template).toBeDefined();

    const result = generateSopilotResult(template!.input, {
      title: template!.title,
      domain: template!.domain
    });

    expect(() => sopilotResultSchema.parse(result)).not.toThrow();
    expect(result.sop.nodes).toHaveLength(6);
    expect(result.workflow.nodes.some((node) => node.mode === "agent")).toBe(true);
    expect(result.workflow.humanGates.length).toBeGreaterThanOrEqual(1);
    expect(result.evaluation.automationPotential).toBeGreaterThan(30);
  });

  it("extracts numbered steps when arrows are not present", () => {
    const result = generateSopilotResult(`
# Simple Process
1. Intake request
2. Analyze details
3. Approve recommendation
4. Send report
`);

    expect(result.sop.nodes.map((node) => node.title)).toEqual([
      "Intake request",
      "Analyze details",
      "Approve recommendation",
      "Send report"
    ]);
    expect(result.workflow.nodes.at(2)?.mode).toBe("human_review");
  });
});
