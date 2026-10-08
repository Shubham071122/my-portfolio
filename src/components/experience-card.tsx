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
    status?: string;
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
    status,
}: ExperienceCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const isWorking = period.toLowerCase().includes("present");

    const getStatusConfig = (statusStr: string) => {
        const normalized = statusStr.toLowerCase();
        switch (normalized) {
            case "working":
                return {
                    text: "Working",
                    badgeClass: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500",
                    dotClass: "bg-emerald-500 animate-pulse",
                };
            case "building":
                return {
                    text: "Building",
                    badgeClass: "bg-emerald-500/10 border-emerald-500/20 text-emerald-500",
                    dotClass: "bg-emerald-500 animate-pulse",
                };
            case "paused":
                return {
                    text: "Paused",
                    badgeClass: "bg-amber-500/10 border-amber-500/20 text-amber-500",
                    dotClass: "bg-amber-500",
                };
            case "stopped":
                return {
                    text: "Stopped",
                    badgeClass: "bg-rose-500/10 border-rose-500/20 text-rose-500",
                    dotClass: "bg-rose-500",
                };
            case "completed":
            case "done":
                return {
                    text: "Completed",
                    badgeClass: "bg-blue-500/10 border-blue-500/20 text-blue-500",
                    dotClass: "bg-blue-500",
                };
            default:
                return {
                    text: statusStr,
                    badgeClass: "bg-muted border-border text-muted-foreground",
                    dotClass: "bg-muted-foreground",
                };
        }
    };

    const resolvedStatus = status || (isWorking ? (company.toLowerCase() === "plynk" ? "building" : "working") : undefined);
    const statusConfig = resolvedStatus ? getStatusConfig(resolvedStatus) : null;

    const bulletPoints = description
        ? description.split("\n").filter((p) => p.trim().length > 0)
        : [];

    return (
        <div className="group relative transition-all duration-300 border border-border/60 bg-muted/20 hover:bg-muted/30 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-sm hover:border-blue-500/30 hover:shadow-md dark:hover:shadow-black/20 overflow-hidden">
            <div className="relative z-10 space-y-3">
                {/* Header Row: Logo, Title, Status, Meta, Toggle */}
                <div className="flex items-start gap-3 sm:gap-4">
                    {/* Logo */}
                    <div className="relative flex-shrink-0 mt-0.5">
                        <div className="relative size-10 sm:size-11 overflow-hidden rounded-full border border-border bg-background/80 shadow-sm">
                            <Image
                                src={logoUrl}
                                alt={company}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Header Info */}
                    <div className="flex-grow min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4">
                            <div className="space-y-0.5">
                                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                    <h3
                                        className="text-base font-bold tracking-tight text-foreground cursor-pointer hover:text-blue-500 transition-colors"
                                        onClick={() => setIsExpanded(!isExpanded)}
                                    >
                                        {company}
                                    </h3>
                                    <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                                        {href && (
                                            <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                                <Globe size={13} />
                                            </a>
                                        )}
                                        {linkedinHref && (
                                            <a href={linkedinHref} target="_blank" rel="noopener noreferrer" className="hover:text-[#0077b5] transition-colors">
                                                <Linkedin size={13} />
                                            </a>
                                        )}
                                    </div>
                                    {statusConfig && (
                                        <div className={cn("flex items-center gap-1.5 rounded-full px-2 py-0.5 border text-[10px] font-bold uppercase tracking-widest", statusConfig.badgeClass)}>
                                            <div className={cn("size-1.5 rounded-full", statusConfig.dotClass)} />
                                            <span>{statusConfig.text}</span>
                                        </div>
                                    )}
                                    <button
                                        onClick={() => setIsExpanded(!isExpanded)}
                                        className={cn(
                                            "ml-auto sm:ml-1 p-1 rounded-md hover:bg-muted/50 transition-all duration-300",
                                            isExpanded ? "rotate-0" : "-rotate-90"
                                        )}
                                        aria-label={isExpanded ? "Collapse" : "Expand"}
                                    >
                                        <ChevronDown size={15} className="text-muted-foreground" />
                                    </button>
                                </div>
                                <p className="text-xs sm:text-sm font-medium text-muted-foreground">{role}</p>
                            </div>

                            <div className="flex flex-row sm:flex-col justify-between items-center sm:items-end sm:text-right gap-1 pt-0.5 sm:pt-0">
                                <p className="text-[11px] sm:text-xs font-semibold tabular-nums text-muted-foreground/80">{company.toLocaleLowerCase() === "plynk" && resolvedStatus === "building" ? "" : period}</p>
                                <p className="text-[10px] sm:text-xs text-muted-foreground/60 font-medium">{company.toLocaleLowerCase() === "plynk" && resolvedStatus === "building" ? "" : locationType}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence initial={false}>
                    {isExpanded && (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden pt-1"
                        >
                            <div className="space-y-3.5 border-t border-border/50 pt-3">
                                {/* Technologies */}
                                {technologies && technologies.length > 0 && (
                                    <div className="space-y-1.5">
                                        <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Technologies</h4>
                                        <div className="flex flex-wrap gap-1.5">
                                            {technologies.map((tech) => (
                                                <div
                                                    key={tech}
                                                    className="inline-flex items-center gap-1.5 rounded-md bg-background/60 border border-border px-2 py-0.5 hover:bg-muted/40 transition-colors group/tech"
                                                >
                                                    <TechIcon name={tech} size={12} showTooltip={false} className="p-0 bg-transparent border-none shadow-none hover:translate-y-0 hover:scale-100" />
                                                    <span className="text-[11px] font-medium text-muted-foreground group-hover/tech:text-foreground transition-colors">{tech}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Description Bullets */}
                                <ul className="space-y-2">
                                    {bulletPoints.map((point, i) => (
                                        <li key={i} className="flex items-start gap-2 text-xs sm:text-[13px] leading-relaxed text-muted-foreground">
                                            <span className="mt-1.5 size-1 flex-shrink-0 rounded-full bg-blue-500" />
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
    );
};
