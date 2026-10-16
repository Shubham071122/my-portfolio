"use client";

import React, { useEffect, useId, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  Check,
  Copy,
  Network,
  Loader2,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
} from "lucide-react";
import mermaid from "mermaid";

interface MermaidDiagramProps {
  chart: string;
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const [svg, setSvg] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Popup pan & zoom state
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const rawId = useId();
  const id = `mermaid-${rawId.replace(/:/g, "")}`;

  const canvasRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const handleOpenPopup = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setIsOpen(true);
  };

  const handleClosePopup = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleReset = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Keyboard navigation & body scroll lock when popup is open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClosePopup();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = origOverflow;
    };
  }, [isOpen, handleClosePopup]);

  // Non-passive wheel zoom
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.1 : 0.9;
      setScale((prev) => Math.min(3, Math.max(0.4, Number((prev * factor).toFixed(2)))));
    };

    canvas.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      canvas.removeEventListener("wheel", onWheel);
    };
  }, [isOpen]);

  // Pointer drag to move canvas
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    setPosition({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
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
    <>
      <div className="not-prose my-5 rounded-xl bg-[#0b0c10]/90 border border-zinc-800/80 shadow-lg overflow-hidden relative group/mermaid">
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
        <div className="overflow-x-auto p-4 sm:p-6 flex justify-center items-center min-h-[140px] bg-gradient-to-b from-zinc-950/40 to-black/60 relative">
          {isLoading ? (
            <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono py-8">
              <Loader2 className="size-4 animate-spin text-blue-400" />
              <span>Rendering diagram...</span>
            </div>
          ) : (
            <>
              <div
                className="w-full flex justify-center [&>svg]:max-w-full [&>svg]:h-auto [&>svg]:mx-auto"
                dangerouslySetInnerHTML={{ __html: svg }}
              />

              {/* Minimal Maximize Button on the Right Bottom Corner */}
              <button
                type="button"
                onClick={handleOpenPopup}
                className="absolute bottom-2.5 right-2.5 p-1.5 rounded-md bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 hover:border-zinc-700 transition-colors shadow-sm"
                title="Open diagram in popup"
                aria-label="Maximize diagram"
              >
                <Maximize2 className="size-3.5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Subtle, Minimal Modal Popup (Not Full Screen) */}
      {mounted &&
        isOpen &&
        createPortal(
          <div
            onClick={handleClosePopup}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-100"
          >
            {/* Popup Dialog Window */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl h-[70vh] sm:h-[75vh] max-h-[720px] bg-[#0c0d12] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Minimal Popup Header - exactly matches main blog */}
              <div className="flex items-center justify-between px-3.5 py-1.5 border-b border-zinc-800/70 bg-zinc-950/60 text-xs">
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <Network className="size-3.5 text-blue-400" />
                  <span className="font-mono text-[10.5px] uppercase tracking-wider text-zinc-300 font-semibold">
                    Mermaid Diagram
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="p-1 rounded text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 transition-colors"
                    title="Reset position"
                  >
                    <RotateCcw className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleClosePopup}
                    className="p-1 rounded text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 transition-colors"
                    title="Close (ESC)"
                    aria-label="Close"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>

              {/* Draggable Canvas Viewport */}
              <div
                ref={canvasRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className={`flex-1 relative overflow-hidden flex items-center justify-center select-none touch-none ${
                  isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              >
                <div
                  style={{
                    transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale})`,
                    transformOrigin: "center center",
                    transition: isDragging ? "none" : "transform 0.08s ease-out",
                  }}
                  className="pointer-events-none select-none p-4 sm:p-6 w-full flex items-center justify-center [&>svg]:w-full [&>svg]:max-w-full [&>svg]:h-auto [&>svg]:mx-auto [&>svg]:block"
                  dangerouslySetInnerHTML={{ __html: svg }}
                />

                {/* Minimal Subtle Zoom Controls at Bottom Right */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1 px-1.5 py-1 rounded-md bg-zinc-900/90 border border-zinc-800 text-zinc-400 text-xs shadow-md backdrop-blur-sm z-10">
                  <button
                    type="button"
                    onClick={() =>
                      setScale((prev) =>
                        Math.max(0.4, Number((prev - 0.2).toFixed(2)))
                      )
                    }
                    className="p-1 rounded hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
                    title="Zoom Out"
                  >
                    <ZoomOut className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-1 text-[11px] font-mono hover:text-zinc-200"
                    title="Reset Zoom"
                  >
                    {Math.round(scale * 100)}%
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setScale((prev) =>
                        Math.min(3, Number((prev + 0.2).toFixed(2)))
                      )
                    }
                    className="p-1 rounded hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
                    title="Zoom In"
                  >
                    <ZoomIn className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
