"use client";

import React, { useState, useEffect } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { codeToHtml } from "shiki";
import { MermaidDiagram } from "@/components/blog/mermaid-diagram";

interface CodeBlockProps {
  children: any;
  className?: string;
  inline?: boolean;
}

// In-memory cache for highlighted HTML to avoid re-highlighting identical snippets
const highlightCache = new Map<string, string>();

const LANGUAGE_MAP: Record<string, { label: string; lang: string }> = {
  ts: { label: "typescript", lang: "typescript" },
  tsx: { label: "tsx", lang: "tsx" },
  typescript: { label: "typescript", lang: "typescript" },
  js: { label: "javascript", lang: "javascript" },
  jsx: { label: "jsx", lang: "jsx" },
  javascript: { label: "javascript", lang: "javascript" },
  bash: { label: "bash", lang: "bash" },
  sh: { label: "sh", lang: "bash" },
  shell: { label: "sh", lang: "bash" },
  zsh: { label: "zsh", lang: "bash" },
  python: { label: "python", lang: "python" },
  py: { label: "python", lang: "python" },
  sql: { label: "sql", lang: "sql" },
  postgresql: { label: "postgresql", lang: "sql" },
  postgres: { label: "postgresql", lang: "sql" },
  json: { label: "json", lang: "json" },
  yaml: { label: "yaml", lang: "yaml" },
  yml: { label: "yaml", lang: "yaml" },
  nginx: { label: "nginx", lang: "nginx" },
  conf: { label: "conf", lang: "nginx" },
  html: { label: "html", lang: "html" },
  css: { label: "css", lang: "css" },
  docker: { label: "dockerfile", lang: "dockerfile" },
  dockerfile: { label: "dockerfile", lang: "dockerfile" },
  go: { label: "go", lang: "go" },
  golang: { label: "go", lang: "go" },
  cpp: { label: "cpp", lang: "cpp" },
  mermaid: { label: "mermaid", lang: "mermaid" },
  text: { label: "diagram", lang: "text" },
  diagram: { label: "diagram", lang: "text" },
  ascii: { label: "topology", lang: "text" },
};

function HighlightedCodeBlock({
  rawCode,
  rawLang,
}: {
  rawCode: string;
  rawLang: string;
}) {
  const [isCopied, setIsCopied] = useState(false);
  const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null);

  // Check if content is an ASCII architecture diagram
  const isDiagram =
    rawLang === "text" ||
    rawLang === "diagram" ||
    rawLang === "ascii" ||
    rawCode.includes("┌") ||
    rawCode.includes("│") ||
    rawCode.includes("──►") ||
    rawCode.includes("▲") ||
    rawCode.includes("▼");

  const langConfig = isDiagram
    ? { label: "diagram", lang: "text" }
    : LANGUAGE_MAP[rawLang] || { label: rawLang.toLowerCase(), lang: rawLang };

  useEffect(() => {
    if (isDiagram || !rawCode.trim()) return;

    const cacheKey = `${langConfig.lang}:${rawCode}`;
    if (highlightCache.has(cacheKey)) {
      setHighlightedHtml(highlightCache.get(cacheKey)!);
      return;
    }

    let isMounted = true;
    async function highlight() {
      try {
        const html = await codeToHtml(rawCode, {
          lang: langConfig.lang,
          theme: "tokyo-night",
        });
        if (isMounted) {
          highlightCache.set(cacheKey, html);
          setHighlightedHtml(html);
        }
      } catch {
        try {
          const fallbackHtml = await codeToHtml(rawCode, {
            lang: "text",
            theme: "tokyo-night",
          });
          if (isMounted) {
            highlightCache.set(cacheKey, fallbackHtml);
            setHighlightedHtml(fallbackHtml);
          }
        } catch {
          // Fallback handled in JSX
        }
      }
    }

    highlight();
    return () => {
      isMounted = false;
    };
  }, [rawCode, langConfig.lang, isDiagram]);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(rawCode);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = rawCode;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  if (isDiagram) {
    return (
      <div className="not-prose my-3.5 rounded-lg bg-zinc-950/50 border border-zinc-800/60 overflow-hidden">
        <div className="flex items-center justify-between px-3 py-1 border-b border-zinc-850 bg-zinc-900/20 text-xs">
          <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
            {langConfig.label}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-1.5 py-0.5 rounded text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/40 transition-colors text-[10px] font-mono outline-none"
            title="Copy diagram"
          >
            {isCopied ? (
              <>
                <Check className="size-2.5 text-blue-400" />
                <span className="text-blue-400">copied</span>
              </>
            ) : (
              <>
                <Copy className="size-2.5" />
                <span>copy</span>
              </>
            )}
          </button>
        </div>
        <div className="overflow-x-auto p-3 text-zinc-300">
          <pre className="!m-0 !p-0 !font-mono select-text whitespace-pre !text-[12px] sm:!text-[12.5px] !leading-[1.4]">
            <code className="!font-mono !text-[12px] sm:!text-[12.5px] !leading-[1.4] !p-0 !bg-transparent text-zinc-300 font-normal">{rawCode}</code>
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className="not-prose my-3.5 rounded-lg bg-zinc-950/70 border border-zinc-800/60 overflow-hidden group/code">
      {/* Ultra-Slim Micro-Header */}
      <div className="flex items-center justify-between px-3 py-1 border-b border-zinc-800/40 bg-zinc-900/25 text-xs">
        <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 font-medium">
          {langConfig.label}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-1.5 py-0.5 rounded text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/40 transition-colors text-[10px] font-mono outline-none"
          title="Copy code"
        >
          {isCopied ? (
            <>
              <Check className="size-2.5 text-blue-400" />
              <span className="text-blue-400">copied</span>
            </>
          ) : (
            <>
              <Copy className="size-2.5" />
              <span>copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area: Compact Font & Balanced Spacing */}
      <div className="overflow-x-auto p-3 text-[12.5px] sm:text-[13px] font-mono leading-[1.5]">
        {highlightedHtml ? (
          <div
            className="[&>pre]:!bg-transparent [&>pre]:!m-0 [&>pre]:!p-0 [&>pre]:!text-[12.5px] sm:[&>pre]:!text-[13px] [&>pre>code]:!bg-transparent [&>pre>code]:!font-mono [&>pre>code]:!text-[12.5px] sm:[&>pre>code]:!text-[13px] [&>pre>code]:!leading-[1.5] select-text"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        ) : (
          <pre className="!m-0 !p-0 !font-mono text-zinc-300 select-text !text-[12.5px] sm:!text-[13px] !leading-[1.5]">
            <code className="!font-mono !text-[12.5px] sm:!text-[13px] !leading-[1.5] !p-0 !bg-transparent font-normal">{rawCode}</code>
          </pre>
        )}
      </div>
    </div>
  );
}

export function CodeBlock({ children, className, inline }: CodeBlockProps) {
  // Minimalist Inline Code Snippet (Compact & Subdued)
  if (inline) {
    return (
      <code className={cn("bg-zinc-800/60 text-zinc-200 px-1.5 py-0.5 rounded-md font-mono text-[12px] sm:text-[12.5px] border border-zinc-700/40 select-text", className)}>
        {children}
      </code>
    );
  }

  const rawCode = String(children || "").replace(/\n$/, "").trim();
  const rawLang = className?.replace("language-", "").toLowerCase() || "text";

  // Check if content is Mermaid diagram
  const isMermaid =
    rawLang === "mermaid" ||
    rawCode.startsWith("flowchart") ||
    rawCode.startsWith("sequenceDiagram") ||
    rawCode.startsWith("erDiagram") ||
    rawCode.startsWith("classDiagram") ||
    rawCode.startsWith("stateDiagram") ||
    rawCode.startsWith("gitGraph") ||
    rawCode.startsWith("graph ");

  if (isMermaid) {
    return <MermaidDiagram chart={rawCode} />;
  }

  return <HighlightedCodeBlock rawCode={rawCode} rawLang={rawLang} />;
}
