"use client";

import { Clipboard, Download, FileJson, FileText, Workflow } from "lucide-react";
import { exportAllFormats, SopilotResult } from "@sopilot/core";
import { downloadTextFile } from "@/lib/download";
import type { Locale } from "@/lib/i18n";
import { ui } from "@/lib/i18n";

type ExportPanelProps = {
  result: SopilotResult;
  locale: Locale;
};

const exportItems = [
  { filename: "report.md", label: "Markdown", icon: FileText, mime: "text/markdown;charset=utf-8" },
  { filename: "workflow.json", label: "Workflow JSON", icon: FileJson, mime: "application/json;charset=utf-8" },
  { filename: "flow.mmd", label: "Mermaid", icon: Workflow, mime: "text/plain;charset=utf-8" }
] as const;

export function ExportPanel({ result, locale }: ExportPanelProps) {
  const files = exportAllFormats(result);
  const t = ui[locale];

  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {exportItems.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.filename} className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
              <Icon className="h-4 w-4 text-sky-600" />
              {item.label}
            </div>
            <div className="mt-3 flex gap-2">
              <button
                className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-md bg-slate-950 px-3 text-xs font-semibold text-white transition hover:bg-slate-800"
                onClick={() => downloadTextFile(item.filename, files[item.filename]!, item.mime)}
                type="button"
              >
                <Download className="h-3.5 w-3.5" />
                {t.exportAction}
              </button>
              <button
                className="inline-flex h-9 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition hover:border-sky-300 hover:text-sky-700"
                onClick={() => navigator.clipboard.writeText(files[item.filename]!)}
                title={`${t.copyAction} ${item.label}`}
                type="button"
              >
                <Clipboard className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
