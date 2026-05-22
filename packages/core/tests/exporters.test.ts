import { describe, expect, it } from "vitest";
import { exportAllFormats, generateSopilotResult, sampleTemplates } from "../src";

describe("exporters", () => {
  it("exports markdown, json, and mermaid from canonical schemas", () => {
    const template = sampleTemplates[0]!;
    const result = generateSopilotResult(template.input, {
      title: template.title,
      domain: template.domain
    });
    const files = exportAllFormats(result);

    expect(JSON.parse(files["sop.json"]!).title).toBe(template.title);
    expect(JSON.parse(files["workflow.json"]!).nodes.length).toBeGreaterThan(0);
    expect(files["flow.mmd"]).toContain("flowchart TD");
    expect(files["report.md"]).toContain("## Adapter Readiness");
  });
});
