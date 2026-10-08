"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AlignLeft, ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TocItem } from "@/lib/toc";
import { cn } from "@/lib/utils";

interface MobileTocProps {
  items: TocItem[];
}

export default function MobileToc({ items }: MobileTocProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const isClickScrolling = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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

      const scrollPosition = window.scrollY + 120; // Offset for sticky navbar

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

    const unlockScroll = () => {
      isClickScrolling.current = false;
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", unlockScroll, { passive: true });
    window.addEventListener("touchmove", unlockScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", unlockScroll);
      window.removeEventListener("touchmove", unlockScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  if (!items || items.length === 0) return null;

  const currentIndex = items.findIndex((i) => i.id === activeId);
  const currentItem = currentIndex >= 0 ? items[currentIndex] : items[0];
  const currentNumber = currentIndex >= 0 ? currentIndex + 1 : 1;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    e.stopPropagation();

    // Lock programmatic scroll to prevent observer fights
    isClickScrolling.current = true;
    setActiveId(id);
    setIsOpen(false);

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
    <div className="relative xl:hidden">
      {/* Active Section Pill Trigger in Sticky Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white hover:border-zinc-700 transition-all max-w-[150px] sm:max-w-[200px] outline-none focus:outline-none focus-visible:outline-none focus:ring-0 [-webkit-tap-highlight-color:transparent]"
        aria-label="Table of contents"
      >
        <AlignLeft className="size-3.5 text-blue-400 shrink-0" />
        <span className="truncate text-left font-medium">
          {currentItem ? `${currentNumber}. ${currentItem.text}` : "Outline"}
        </span>
        <ChevronDown
          className={cn(
            "size-3 text-zinc-400 shrink-0 transition-transform duration-200",
            isOpen ? "rotate-180 text-white" : ""
          )}
        />
      </button>

      {/* Portaled Bottom Sheet Drawer to escape header backdrop-filter stacking context */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => setIsOpen(false)}
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                />

                {/* Bottom Sheet Drawer with Strict Max Height */}
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 28, stiffness: 320 }}
                  className="relative w-full sm:max-w-md max-h-[50vh] bg-zinc-950 border-t sm:border border-zinc-800 rounded-t-3xl sm:rounded-2xl p-4 sm:p-5 overflow-hidden flex flex-col z-10 shadow-2xl"
                >
                  {/* Pull Indicator Pill */}
                  <div className="w-10 h-1 rounded-full bg-zinc-800 mx-auto mb-2 shrink-0" />

                  {/* Drawer Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800 shrink-0">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                        <AlignLeft className="size-3.5" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-white uppercase ">
                          Table of Contents
                        </h3>
                        <p className="text-[11px] text-zinc-400 font-normal">
                          {items.length} {items.length === 1 ? "section" : "sections"}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
                      aria-label="Close"
                    >
                      <X className="size-4" />
                    </button>
                  </div>

                  {/* Headings List */}
                  <div className="overflow-y-auto py-2.5 space-y-1.5 flex-1 pr-1 overscroll-contain">
                    {items.map((item, index) => {
                      const isActive = activeId === item.id;
                      return (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          onClick={(e) => handleLinkClick(e, item.id)}
                          className={cn(
                            "relative w-full text-left py-2.5 px-3.5 rounded-xl text-xs sm:text-sm leading-snug transition-all flex items-center gap-2.5 select-none no-underline outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 [-webkit-tap-highlight-color:transparent]",
                            item.level === 3 ? "pl-6 sm:pl-7" : "",
                            isActive
                              ? "bg-zinc-900 text-white font-medium before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:rounded-r-md before:bg-blue-500 shadow-sm"
                              : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40"
                          )}
                        >
                          <span
                            className={cn(
                              "text-[10px] font-mono shrink-0 w-4 text-center",
                              isActive ? "text-blue-400 font-bold" : "text-zinc-500"
                            )}
                          >
                            {index + 1}.
                          </span>
                          <span className="line-clamp-2 flex-1">{item.text}</span>
                        </a>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
