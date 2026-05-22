#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, extname, resolve } from "node:path";
import { Command } from "commander";
import {
  ExportFormat,
  exportAllFormats,
  generateSopilotResult,
  getTemplateById,
  sampleTemplates
} from "@sopilot/core";

type GenerateOptions = {
  format?: ExportFormat;
  out?: string;
  title?: string;
  domain?: string;
  template?: string;
  stdout?: boolean;
};

const program = new Command();

program
  .name("sopilot")
  .description("Turn business SOPs into structured AI agent workflow specs.")
  .version("0.1.0");

program
  .command("generate")
  .argument("[input]", "Path to SOP markdown/text file. Omit when --template is used.")
  .option("-f, --format <format>", "all, json, markdown, or mermaid", "all")
  .option("-o, --out <dir>", "Output directory", "output")
  .option("--title <title>", "Override generated title")
  .option("--domain <domain>", "Override generated domain")
  .option("-t, --template <id>", "Use a built-in template by id")
  .option("--stdout", "Print selected output to stdout")
  .action(async (input: string | undefined, options: GenerateOptions) => {
    const format = parseFormat(options.format);
    const source = await readSource(input, options.template);
    const template = options.template ? getTemplateById(options.template) : undefined;
    const result = generateSopilotResult(source, {
      title: options.title ?? template?.title,
      domain: options.domain ?? template?.domain
    });

    if (options.stdout) {
      process.stdout.write(formatForStdout(result, format));
      return;
    }

    const outDir = resolve(process.cwd(), options.out ?? "output");
    await writeOutputs(outDir, exportAllFormats(result), format);
    console.log(`Generated SOPilot workflow files in ${outDir}`);
  });

program
  .command("templates")
  .description("List built-in SOP templates.")
  .action(() => {
    for (const template of sampleTemplates) {
      console.log(`${template.id}\t${template.domain}\t${template.title}`);
    }
  });

program
  .command("generate-all")
  .description("Generate example outputs for all built-in templates.")
  .option("-o, --out <dir>", "Output directory", "examples/generated")
  .action(async (options: { out?: string }) => {
    const outRoot = resolve(process.cwd(), options.out ?? "examples/generated");
    for (const template of sampleTemplates) {
      const result = generateSopilotResult(template.input, {
        title: template.title,
        domain: template.domain
      });
      const outputDir = resolve(outRoot, template.id);
      await writeOutputs(outputDir, exportAllFormats(result), "all");
    }
    console.log(`Generated ${sampleTemplates.length} example output bundles in ${outRoot}`);
  });

program.parseAsync().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});

async function readSource(input: string | undefined, templateId: string | undefined): Promise<string> {
  if (templateId) {
    const template = getTemplateById(templateId);
    if (!template) {
      throw new Error(`Unknown template "${templateId}". Run "sopilot templates" to list available templates.`);
    }
    return template.input;
  }

  if (!input) {
    throw new Error("Input file is required unless --template is provided.");
  }

  return readFile(resolve(process.cwd(), input), "utf8");
}

async function writeOutputs(outDir: string, files: Record<string, string>, format: ExportFormat): Promise<void> {
  await mkdir(outDir, { recursive: true });
  const selected = selectFiles(files, format);

  for (const [filename, content] of Object.entries(selected)) {
    const target = resolve(outDir, filename);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, content);
  }
}

function selectFiles(files: Record<string, string>, format: ExportFormat): Record<string, string> {
  if (format === "all") return files;
  if (format === "json") {
    return {
      "sop.json": files["sop.json"]!,
      "workflow.json": files["workflow.json"]!,
      "evaluation.json": files["evaluation.json"]!
    };
  }
  if (format === "markdown") return { "report.md": files["report.md"]! };
  return { "flow.mmd": files["flow.mmd"]! };
}

function formatForStdout(result: ReturnType<typeof generateSopilotResult>, format: ExportFormat): string {
  if (format === "markdown") return result.markdown;
  if (format === "mermaid") return result.mermaid;
  if (format === "json") {
    return `${JSON.stringify(
      {
        sop: result.sop,
        workflow: result.workflow,
        evaluation: result.evaluation
      },
      null,
      2
    )}\n`;
  }
  return result.markdown;
}

function parseFormat(value: ExportFormat | undefined): ExportFormat {
  const format = value ?? "all";
  if (["all", "json", "markdown", "mermaid"].includes(format)) {
    return format;
  }
  throw new Error(`Unsupported format "${format}". Use all, json, markdown, or mermaid.`);
}

export function outputNameForInput(input: string): string {
  return basename(input, extname(input));
}
