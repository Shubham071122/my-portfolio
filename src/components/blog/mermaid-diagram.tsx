"use client";

import React, { useEffect, useId, useState } from "react";
import { Check, Copy, Network, Loader2 } from "lucide-react";
import mermaid from "mermaid";

interface MermaidDiagramProps {
  chart: string;
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const [svg, setSvg] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const rawId = useId();
  const id = `mermaid-${rawId.replace(/:/g, "")}`;

  useEffect(() => {
    let isMounted = true;

    async function renderMermaid() {
      if (!chart.trim()) return;

      try {
        setIsLoading(true);
        setHasError(false);

        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "loose",
          fontFamily: "var(--font-mono), monospace",
          themeVariables: {
            darkMode: true,
            background: "#090a0f",
            mainBkg: "#12141a",
            nodeBorder: "#272a38",
            clusterBkg: "#0f1117",
            clusterBorder: "#272a38",
            titleColor: "#e4e4e7",
            textColor: "#d4d4d8",
            lineColor: "#60a5fa",
            edgeLabelBackground: "#18181b",
            primaryColor: "#1e293b",
            primaryBorderColor: "#3b82f6",
            primaryTextColor: "#f8fafc",
            secondaryColor: "#0f172a",
            secondaryBorderColor: "#64748b",
            secondaryTextColor: "#f8fafc",
            tertiaryColor: "#18181b",
            tertiaryBorderColor: "#27272a",
            tertiaryTextColor: "#f8fafc",
            actorBkg: "#18181b",
            actorBorder: "#3b82f6",
            actorTextColor: "#f8fafc",
            actorLineColor: "#3b82f6",
            signalColor: "#60a5fa",
            signalTextColor: "#e4e4e7",
            labelBoxBkgColor: "#18181b",
            labelBoxBorderColor: "#27272a",
            labelTextColor: "#e4e4e7",
            loopTextColor: "#e4e4e7",
            noteBkgColor: "#1e293b",
            noteBorderColor: "#3b82f6",
            noteTextColor: "#f8fafc",
            activationBkgColor: "#3b82f633",
            activationBorderColor: "#3b82f6",
            sequenceNumberColor: "#60a5fa",
            attributeColorOdd: "#12141a",
            attributeColorEven: "#181b24",
          },
        });

        // Clean any potential markdown artifact wrapping
        const cleanChart = chart.trim();
        const { svg: renderedSvg } = await mermaid.render(id, cleanChart);

        if (isMounted) {
          setSvg(renderedSvg);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Mermaid rendering failed:", err);
        if (isMounted) {
          setHasError(true);
          setIsLoading(false);
        }
      }
    }

    renderMermaid();

    return () => {
      isMounted = false;
    };
  }, [chart, id]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(chart);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // Ignored
    }
  };

  // Graceful fallback to code block on syntax error
  if (hasError) {
    return (
      <div className="not-prose my-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 p-4 font-mono text-[12px] text-zinc-300">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800 text-xs text-zinc-500">
          <span>Mermaid (Syntax Error - Raw Code)</span>
          <button onClick={handleCopy} className="hover:text-white transition-colors">
            {isCopied ? "Copied" : "Copy"}
          </button>
        </div>
        <pre className="overflow-x-auto whitespace-pre">
          <code>{chart}</code>
        </pre>
      </div>
    );
  }

  return (
    <div className="not-prose my-5 rounded-xl bg-[#0b0c10]/90 border border-zinc-800/80 shadow-lg overflow-hidden group/mermaid">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-1.5 border-b border-zinc-800/70 bg-zinc-950/60 text-xs">
        <div className="flex items-center gap-1.5 text-zinc-400">
          <Network className="size-3.5 text-blue-400" />
          <span className="font-mono text-[10.5px] uppercase tracking-wider text-zinc-300 font-semibold">
            Mermaid Diagram
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-1.5 py-0.5 rounded text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/40 transition-colors text-[10.5px] font-mono outline-none"
          title="Copy Mermaid Code"
        >
          {isCopied ? (
            <>
              <Check className="size-3 text-blue-400" />
              <span className="text-blue-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="size-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* SVG Diagram Canvas */}
      <div className="overflow-x-auto p-4 sm:p-6 flex justify-center items-center min-h-[140px] bg-gradient-to-b from-zinc-950/40 to-black/60">
        {isLoading ? (
          <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono py-8">
            <Loader2 className="size-4 animate-spin text-blue-400" />
            <span>Rendering diagram...</span>
          </div>
        ) : (
          <div
            className="w-full flex justify-center [&>svg]:max-w-full [&>svg]:h-auto [&>svg]:mx-auto"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        )}
      </div>
    </div>
  );
}
