import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { zodToJsonSchema } from "zod-to-json-schema";
import { evaluationSpecSchema, sopSpecSchema, workflowSpecSchema } from "../src/schemas";

const outputDir = resolve(process.cwd(), "../../docs/schema");

await mkdir(outputDir, { recursive: true });

await Promise.all([
  writeFile(
    resolve(outputDir, "sop.schema.json"),
    `${JSON.stringify(zodToJsonSchema(sopSpecSchema, "SopSpec"), null, 2)}\n`
  ),
  writeFile(
    resolve(outputDir, "workflow.schema.json"),
    `${JSON.stringify(zodToJsonSchema(workflowSpecSchema, "WorkflowSpec"), null, 2)}\n`
  ),
  writeFile(
    resolve(outputDir, "evaluation.schema.json"),
    `${JSON.stringify(zodToJsonSchema(evaluationSpecSchema, "EvaluationSpec"), null, 2)}\n`
  )
]);

console.log(`Wrote JSON Schema files to ${outputDir}`);
