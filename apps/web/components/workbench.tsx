"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Bot,
  Braces,
  CheckCircle2,
  ClipboardCheck,
  Github,
  GitMerge,
  Play,
  ShieldCheck,
  Sparkles,
  Terminal,
  UserCheck,
  Wrench
} from "lucide-react";
import {
  generateSopilotResult,
  getTemplateById,
  sampleTemplates,
  WorkflowMode
} from "@sopilot/core";
import type { LucideIcon } from "lucide-react";
import { ExportPanel } from "@/components/export-panel";
import { MermaidDiagram } from "@/components/mermaid-diagram";
import {
  domainLabel,
  gateTitle,
  Locale,
  localeNames,
  modeLabel,
  nodeTypeLabel,
  readinessLabel,
  riskLevelLabel,
  templateTitle,
  translateKnown,
  ui
} from "@/lib/i18n";

const githubHref = "https://github.com/Dewensong/sop-to-agent";

const modeMeta: Record<WorkflowMode, { icon: LucideIcon; className: string }> = {
  agent: {
    icon: Bot,
    className: "border-emerald-200 bg-emerald-50 text-emerald-800"
  },
  tool: {
    icon: Wrench,
    className: "border-sky-200 bg-sky-50 text-sky-800"
  },
  human_review: {
    icon: UserCheck,
    className: "border-amber-200 bg-amber-50 text-amber-800"
  },
  manual: {
    icon: ClipboardCheck,
    className: "border-slate-200 bg-slate-50 text-slate-700"
  }
};

export function Workbench() {
  const [templateId, setTemplateId] = useState("marketing-campaign");
  const [draftText, setDraftText] = useState(sampleTemplates[0]?.input ?? "");
  const [sourceText, setSourceText] = useState(sampleTemplates[0]?.input ?? "");
  const [locale, setLocale] = useState<Locale>("en");
  const t = ui[locale];

  useEffect(() => {
    const storedLocale = window.localStorage.getItem("sopilot-locale");
    if (storedLocale === "en" || storedLocale === "zh") {
      setLocale(storedLocale);
      return;
    }
    if (window.navigator.language.toLowerCase().startsWith("zh")) {
      setLocale("zh");
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale]);

  function changeLocale(nextLocale: Locale) {
    setLocale(nextLocale);
    window.localStorage.setItem("sopilot-locale", nextLocale);
  }

  const generation = useMemo(() => {
    try {
      const template = getTemplateById(templateId);
      return {
        result: generateSopilotResult(sourceText, {
          title: template?.title,
          domain: template?.domain
        }),
        error: null
      };
    } catch (generationError) {
      return {
        result: null,
        error: generationError instanceof Error ? generationError.message : t.unableToGenerate
      };
    }
  }, [sourceText, templateId, t.unableToGenerate]);

  const result = generation.result;

  function loadTemplate(id: string) {
    const template = getTemplateById(id);
    if (!template) return;
    setTemplateId(id);
    setDraftText(template.input);
    setSourceText(template.input);
  }

  function generateAndFocus() {
    setSourceText(draftText);
    document.getElementById("workbench")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="min-h-screen" lang={locale === "zh" ? "zh-CN" : "en"}>
      <Header locale={locale} onLocaleChange={changeLocale} />

      <section className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8" id="workbench">
        <div className="mb-5 grid min-w-0 gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(24rem,0.55fr)] lg:items-end">
          <div className="min-w-0">
            <p className="break-words text-sm font-semibold uppercase tracking-[0.16em] text-sky-700">SOP to Agent Workflow Generator</p>
            <h2 className="mt-2 max-w-3xl text-3xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-4xl">
              {locale === "zh" ? "把业务 SOP 转成可审查的 Agent 工作流规格" : "Turn business SOPs into reviewable agent workflow specs"}
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
              {locale === "zh"
                ? "粘贴流程说明，立即得到结构化节点、自动化机会、人工审核点、Mermaid 图和可导出产物。"
                : "Paste process notes and get structured nodes, automation opportunities, human gates, Mermaid diagrams, and exportable artifacts."}
            </p>
          </div>
          <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <code className="block min-w-0 overflow-hidden text-ellipsis whitespace-nowrap rounded-md bg-slate-950 px-3 py-2 text-xs text-slate-100">
              pnpm sopilot generate examples/marketing-campaign.md --format all
            </code>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-semibold text-slate-600 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <span className="rounded-md bg-slate-50 px-2 py-1">12 templates</span>
              <span className="rounded-md bg-slate-50 px-2 py-1">No API key</span>
              <span className="rounded-md bg-slate-50 px-2 py-1">JSON</span>
              <span className="rounded-md bg-slate-50 px-2 py-1">Mermaid</span>
            </div>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[440px_minmax(0,1fr)]">
          <aside className="surface-panel sticky top-4 self-start p-4">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-slate-950">{t.inputTitle}</h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">{t.inputDescription}</p>
              </div>
              <button className="primary-button" onClick={generateAndFocus} type="button">
                <Play className="h-4 w-4" />
                {t.generate}
              </button>
            </div>

            <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500" htmlFor="template-select">
              {t.template}
            </label>
            <select
              className="mt-2 h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              id="template-select"
              onChange={(event) => loadTemplate(event.target.value)}
              value={templateId}
            >
              {sampleTemplates.map((template) => (
                <option key={template.id} value={template.id}>
                  {templateTitle(locale, template.id, template.title)}
                </option>
              ))}
            </select>

            <div className="code-shell mt-4">
              <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-500">
                <span>SOP.md</span>
                <span>{locale === "zh" ? "可编辑" : "editable"}</span>
              </div>
              <textarea
                aria-label="SOP source text"
                className="min-h-[500px] w-full bg-transparent p-4 font-mono text-sm leading-6 text-slate-800 outline-none"
                onChange={(event) => setDraftText(event.target.value)}
                value={draftText}
              />
            </div>

            {generation.error ? (
              <div className="mt-3 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {generation.error}
              </div>
            ) : null}
          </aside>

          {result ? (
            <section className="grid gap-5">
              <div className="grid gap-4 lg:grid-cols-4" id="schema">
                <MetricCard icon={Braces} label={t.structuredNodes} value={String(result.sop.nodes.length)} tone="cyan" />
                <MetricCard icon={Bot} label={t.automationPotential} value={`${result.evaluation.automationPotential}/100`} tone="green" />
                <MetricCard icon={ShieldCheck} label={t.reviewGates} value={String(result.workflow.humanGates.length)} tone="amber" />
                <MetricCard icon={AlertTriangle} label={t.riskLevel} value={riskLevelLabel(locale, result.evaluation.riskLevel)} tone="violet" />
              </div>

              <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_430px]">
                <div className="surface-panel p-4">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-950">{t.workflowDraft}</h2>
                      <p className="mt-1 text-sm text-slate-600">{t.workflowDraftDescription}</p>
                    </div>
                    <span className="rounded-md border border-sky-200 bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-800">
                      {domainLabel(locale, result.sop.domain)}
                    </span>
                  </div>

                  <div className="grid gap-3">
                    {result.workflow.nodes.map((node, index) => {
                      const meta = modeMeta[node.mode];
                      const Icon = meta.icon;
                      const sopNode = result.sop.nodes.find((item) => item.id === node.sopNodeId);
                      return (
                        <article key={node.id} className="workflow-card">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                                <span className="node-index">{index + 1}</span>
                                {sopNode ? nodeTypeLabel(locale, sopNode.type) : nodeTypeLabel(locale, "task")}
                              </div>
                              <h3 className="mt-2 text-base font-semibold text-slate-950">{node.title}</h3>
                              <p className="mt-2 text-sm leading-6 text-slate-600">{translateKnown(locale, node.rationale)}</p>
                            </div>
                            <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-semibold ${meta.className}`}>
                              <Icon className="h-3.5 w-3.5" />
                              {modeLabel(locale, node.mode)}
                            </span>
                          </div>
                          <div className="mt-4 grid gap-3 sm:grid-cols-3">
                            <Score label={t.automation} value={node.automationScore} />
                            <Score label={t.feasibility} value={node.feasibilityScore} />
                            <Score label={t.risk} value={node.riskScore} tone="risk" />
                          </div>
                          <div className="mt-3 grid gap-2 text-xs text-slate-500 sm:grid-cols-3">
                            <span>{t.langGraph}: {readinessLabel(locale, node.adapterTargets.langGraph)}</span>
                            <span>{t.n8n}: {readinessLabel(locale, node.adapterTargets.n8n)}</span>
                            <span>{t.dify}: {readinessLabel(locale, node.adapterTargets.dify)}</span>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>

                <div className="grid content-start gap-5">
                  <div className="surface-panel p-4">
                    <h2 className="text-lg font-semibold text-slate-950">{t.mermaidPreview}</h2>
                    <p className="mt-1 text-sm text-slate-600">{t.mermaidDescription}</p>
                    <div className="mt-4 rounded-lg border border-slate-200 bg-white p-2">
                      <MermaidDiagram code={result.mermaid} />
                    </div>
                  </div>

                  <div className="surface-panel p-4">
                    <h2 className="text-lg font-semibold text-slate-950">{t.humanReviewGates}</h2>
                    <div className="mt-3 grid gap-2">
                      {result.workflow.humanGates.length === 0 ? (
                        <p className="text-sm text-slate-600">{t.noReviewGate}</p>
                      ) : (
                        result.workflow.humanGates.map((gate) => (
                          <div key={gate.id} className="rounded-md border border-amber-200 bg-amber-50 p-3">
                            <div className="flex items-center gap-2 text-sm font-semibold text-amber-900">
                              <UserCheck className="h-4 w-4" />
                              {gateTitle(locale, gate.title)}
                            </div>
                            <p className="mt-1 text-sm leading-6 text-amber-800">{translateKnown(locale, gate.reason)}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="surface-panel p-4" id="cli">
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-950">{t.export}</h2>
                    <p className="mt-1 text-sm text-slate-600">{t.exportDescription}</p>
                  </div>
                  <code className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
                    sopilot generate examples/marketing-campaign.md --format all --out output/
                  </code>
                </div>
                <ExportPanel locale={locale} result={result} />
              </div>

              <div className="grid gap-5 lg:grid-cols-2" id="examples">
                <div className="surface-panel p-4">
                  <h2 className="text-lg font-semibold text-slate-950">{t.exampleLibrary}</h2>
                  <div className="mt-3 grid gap-2">
                    {sampleTemplates.slice(0, 6).map((template) => (
                      <button
                        className="example-row"
                        key={template.id}
                        onClick={() => loadTemplate(template.id)}
                        type="button"
                      >
                        <span>
                          <strong className="block text-slate-950">{templateTitle(locale, template.id, template.title)}</strong>
                          <span className="text-slate-600">{template.description}</span>
                        </span>
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="surface-panel p-4">
                  <h2 className="text-lg font-semibold text-slate-950">{t.warnings}</h2>
                  <div className="mt-3 grid gap-3">
                    {result.evaluation.warnings.map((warning) => (
                      <div key={warning} className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-700">
                        {translateKnown(locale, warning)}
                      </div>
                    ))}
                    <div className="rounded-md border border-sky-200 bg-sky-50 p-3">
                      <h3 className="text-sm font-semibold text-slate-950">{t.recommendedQuestions}</h3>
                      <ul className="mt-2 list-inside list-disc text-sm leading-6 text-slate-700">
                        {result.evaluation.recommendedNextQuestions.map((question) => (
                          <li key={question}>{translateKnown(locale, question)}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : null}
        </div>
      </section>
    </main>
  );
}

function Header({ locale, onLocaleChange }: { locale: Locale; onLocaleChange: (locale: Locale) => void }) {
  const t = ui[locale];

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <div className="brand-mark">
            <GitMerge className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-normal text-slate-950">SOPilot</h1>
            <p className="text-sm text-slate-600">{t.subtitle}</p>
          </div>
        </div>
        <nav aria-label="Project links" className="flex flex-wrap items-center gap-2">
          <a className="nav-link" href={githubHref} target="_blank" rel="noreferrer">
            <Github className="h-4 w-4" />
            {t.github}
          </a>
          <a className="nav-link" href="#examples">
            <Sparkles className="h-4 w-4" />
            {t.examples}
          </a>
          <a className="nav-link" href="#schema">
            <Braces className="h-4 w-4" />
            {t.schema}
          </a>
          <a className="nav-link" href="#cli">
            <Terminal className="h-4 w-4" />
            {t.cli}
          </a>
          <div aria-label={t.language} className="flex h-10 overflow-hidden rounded-md border border-slate-200 bg-slate-50">
            {(["en", "zh"] as const).map((option) => (
              <button
                aria-pressed={locale === option}
                className={`px-3 text-sm font-semibold transition ${
                  locale === option ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-white"
                }`}
                key={option}
                onClick={() => onLocaleChange(option)}
                type="button"
              >
                {localeNames[option]}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}

function MetricCard({ icon: Icon, label, value, tone }: { icon: LucideIcon; label: string; value: string; tone: "cyan" | "green" | "amber" | "violet" }) {
  return (
    <div className={`metric-card metric-${tone}`}>
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      <div className="mt-2 text-3xl font-semibold text-slate-950">{value}</div>
    </div>
  );
}

function Score({ label, value, tone = "default" }: { label: string; value: number; tone?: "default" | "risk" }) {
  const color = tone === "risk" ? "bg-amber-400" : "bg-sky-500";
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs font-semibold text-slate-500">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-2 rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
