"use client";

import React, { useEffect, useState, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
  className?: string;
}

export default function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(true);
  const isClickScrolling = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!items.length) return;

    if (!activeId && items[0]) {
      setActiveId(items[0].id);
    }

    const handleScroll = () => {
      if (isClickScrolling.current) return;

      const headingElements = items
        .map((item) => ({ id: item.id, el: document.getElementById(item.id) }))
        .filter((item): item is { id: string; el: HTMLElement } => item.el !== null);

      if (headingElements.length === 0) return;

      const scrollPosition = window.scrollY + 130; // Offset for header + padding

      let current = headingElements[0].id;
      for (const { id, el } of headingElements) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= scrollPosition) {
          current = id;
        } else {
          break;
        }
      }

      if (current) {
        setActiveId(current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [items, activeId]);

  if (!items || items.length === 0) return null;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    e.stopPropagation();

    // Lock programmatic scroll to prevent observer/scroll fights
    isClickScrolling.current = true;
    setActiveId(id);

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 850);

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.hash = id;
    }
  };

  return (
    <nav
      aria-label="Table of contents"
      className={cn("w-full select-none", className)}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between cursor-pointer py-1.5 text-zinc-400 hover:text-zinc-200 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[11px] font-bold tracking-widest uppercase text-zinc-400">
          Table of Contents
        </span>
        <button
          type="button"
          aria-label={isOpen ? "Collapse Table of Contents" : "Expand Table of Contents"}
          className="p-1 text-zinc-400 hover:text-zinc-200 transition-colors focus:outline-none"
        >
          {isOpen ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
        </button>
      </div>

      {/* Items List */}
      {isOpen && (
        <div className="mt-2 space-y-1">
          {items.map((item, index) => {
            const isActive = activeId === item.id;
            return (
              <div key={item.id} className="relative transition-all">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className={cn(
                    "relative flex items-center gap-2 w-full text-left py-1.5 px-2.5 rounded-lg text-[13px] leading-snug transition-all outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 select-none no-underline [-webkit-tap-highlight-color:transparent]",
                    isActive
                      ? "bg-zinc-800/90 text-white font-medium before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-1 before:rounded-r-md before:bg-blue-500 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60 font-normal"
                  )}
                >
                  <span
                    className={cn(
                      "text-[11px] font-mono shrink-0 w-4 text-left",
                      isActive ? "text-blue-400 font-semibold" : "text-zinc-500"
                    )}
                  >
                    {index + 1}.
                  </span>
                  <span className="line-clamp-2">{item.text}</span>
                </a>
              </div>
            );
          })}
        </div>
      )}
    </nav>
  );
}
