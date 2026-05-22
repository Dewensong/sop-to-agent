"use client";

import { useEffect, useId, useState } from "react";

type MermaidDiagramProps = {
  code: string;
};

export function MermaidDiagram({ code }: MermaidDiagramProps) {
  const id = useId().replace(/:/g, "");
  const [svg, setSvg] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function renderDiagram() {
      try {
        setError(null);
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "base",
          themeVariables: {
            primaryColor: "#ecfdf5",
            primaryBorderColor: "#047857",
            primaryTextColor: "#172033",
            lineColor: "#64748b",
            fontFamily: "Inter, ui-sans-serif, system-ui"
          }
        });
        const rendered = await mermaid.render(`sopilot-${id}`, code);
        if (active) setSvg(rendered.svg);
      } catch (renderError) {
        if (active) {
          setError(renderError instanceof Error ? renderError.message : "Unable to render Mermaid diagram.");
        }
      }
    }

    renderDiagram();

    return () => {
      active = false;
    };
  }, [code, id]);

  if (error) {
    return (
      <pre className="max-h-[420px] overflow-auto rounded-md border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900">
        {error}
        {"\n\n"}
        {code}
      </pre>
    );
  }

  return (
    <div
      aria-label="Generated Mermaid workflow diagram"
      className="mermaid min-h-[260px] overflow-auto rounded-md border border-line bg-white p-4"
      dangerouslySetInnerHTML={{ __html: svg || "<div class='p-4 text-sm text-slate-500'>Rendering workflow diagram...</div>" }}
    />
  );
}
