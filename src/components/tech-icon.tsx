"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SKILLS_DATA } from "@/data/skills";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    TooltipArrow,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface TechIconProps {
    name: string;
    size?: number;
    className?: string;
    showTooltip?: boolean;
}

export const TechIcon = ({
    name,
    size = 32,
    className,
    showTooltip = true
}: TechIconProps) => {
    const getSkillId = (name: string) => {
        const n = name.toLowerCase().trim();
        if (n === "c++") return "cpp";
        if (n === "react.js") return "react";
        if (n === "next.js") return "nextjs";
        if (n === "node.js") return "nodejs";
        if (n === "express.js") return "express";
        if (n.includes("fastapi")) return "fastapi";
        if (n.includes("vector db") || n.includes("vector search")) return "mongodbvector";
        if (n === "rag") return "rag";
        return n.replace(/[\s\.]/g, "");
    };

    const skillId = getSkillId(name);
    const skill = SKILLS_DATA[skillId] || {
        name: name,
        icon: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name.toLowerCase()}/${name.toLowerCase()}-original.svg`,
        url: "#"
    };

    const content = (
        <motion.div
            whileHover={{ y: -6, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 600, damping: 20 }}
            className={cn(
                "relative flex items-center justify-center cursor-pointer group bg-muted/50 border border-border/50",
                size < 24 ? "p-1 rounded-md" : "p-2 rounded-xl",
                className
            )}
        >
            <div className="relative" style={{ width: size, height: size }} onClick={() => window.open(skill.url, "_blank")}>
                <Image
                    src={skill.icon}
                    alt={skill.name}
                    fill
                    className="object-contain transition-all duration-200"
                    onError={(e) => {
                        // Fallback if icon fails
                        (e.target as any).src = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg";
                    }}
                    unoptimized
                />
            </div>
        </motion.div>
    );

    if (!showTooltip) return content;

    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>
                    {content}
                </TooltipTrigger>
                <TooltipContent
                    side="top"
                    sideOffset={12}
                    className="bg-black dark:bg-white text-white dark:text-black border-none px-2 py-1 rounded-xl shadow-2xl overflow-visible"
                >
                    <span className="text-[13px] font-medium tracking-tight leading-none">{skill.name}</span>
                    <TooltipArrow className="fill-black dark:fill-white" width={16} height={8} />
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
