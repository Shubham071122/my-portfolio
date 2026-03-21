"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Globe, Linkedin } from "lucide-react";
import { TechIcon } from "./tech-icon";
import { cn } from "@/lib/utils";

interface ExperienceCardProps {
    logoUrl: string;
    company: string;
    role: string;
    period: string;
    location?: string;
    locationType?: string;
    description?: string;
    technologies?: string[];
    href?: string;
    linkedinHref?: string;
}

export const ExperienceCard = ({
    logoUrl,
    company,
    role,
    period,
    location,
    locationType = "On Site",
    description,
    technologies,
    href,
    linkedinHref,
}: ExperienceCardProps) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const isWorking = period.toLowerCase().includes("present");

    const bulletPoints = description
        ? description.split("\n").filter((p) => p.trim().length > 0)
        : [];

    return (
        <div className="group relative transition-all duration-300">
            <div className="flex items-start gap-2 sm:gap-4">
                {/* Logo */}
                <div className="relative flex-shrink-0 mt-1">
                    <div className="relative size-10 sm:size-12 overflow-hidden rounded-full border-2 border-muted bg-white">
                        <Image
                            src={logoUrl}
                            alt={company}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-grow space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4">
                        <div className="space-y-0.5">
                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                <h3
                                    className="text-base sm:text-lg font-bold tracking-tight cursor-pointer hover:underline underline-offset-4 decoration-2 decoration-primary/30"
                                    onClick={() => setIsExpanded(!isExpanded)}
                                >
                                    {company}
                                </h3>
                                <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                                    {href && (
                                        <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                            <Globe size={14} />
                                        </a>
                                    )}
                                    {linkedinHref && (
                                        <a href={linkedinHref} target="_blank" rel="noopener noreferrer" className="hover:text-[#0077b5] transition-colors">
                                            <Linkedin size={14} />
                                        </a>
                                    )}
                                </div>
                                {isWorking && (
                                    <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20">
                                        <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Working</span>
                                    </div>
                                )}
                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className={cn(
                                        "ml-auto sm:ml-1 p-0.5 rounded-md hover:bg-muted transition-all duration-300",
                                        isExpanded ? "rotate-0" : "-rotate-90"
                                    )}
                                >
                                    <ChevronDown size={14} className="text-muted-foreground sm:size-4" />
                                </button>
                            </div>
                            <p className="text-xs sm:text-sm font-medium text-muted-foreground">{role}</p>
                        </div>

                        <div className="flex flex-row sm:flex-col justify-between items-center sm:items-end sm:text-right gap-1 pt-1 sm:pt-0">
                            <p className="text-[10px] sm:text-xs font-semibold tabular-nums text-muted-foreground/80">{period}</p>
                            <p className="text-[10px] sm:text-xs text-muted-foreground/60 font-medium">{locationType}</p>
                        </div>
                    </div>

                    <AnimatePresence initial={false}>
                        {isExpanded && (
                            <motion.div
                                key="content"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                <div className="pt-4 space-y-4">
                                    {/* Technologies */}
                                    {technologies && technologies.length > 0 && (
                                        <div className="space-y-2">
                                            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">Technologies</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {technologies.map((tech) => (
                                                    <div
                                                        key={tech}
                                                        className="flex items-center gap-1.5 rounded-lg bg-muted/30 border border-border/50 px-2.5 py-1 hover:bg-muted/50 transition-colors group/tech"
                                                    >
                                                        <TechIcon name={tech} size={14} showTooltip={false} className="p-0 bg-transparent border-none shadow-none hover:translate-y-0 hover:scale-100" />
                                                        <span className="text-xs font-medium text-muted-foreground group-hover/tech:text-foreground transition-colors">{tech}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Description Bullets */}
                                    <ul className="space-y-2.5">
                                        {bulletPoints.map((point, i) => (
                                            <li key={i} className="flex gap-2 text-sm leading-relaxed text-muted-foreground/90">
                                                <span className="mt-1.5 size-1.5 flex-shrink-0 rounded-[2px] bg-muted-foreground/30 group-hover:bg-primary/40 transition-colors" />
                                                <span>{point.startsWith("-") ? point.substring(2) : point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
