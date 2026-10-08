"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { slugify } from "@/lib/toc";

import { CodeBlock } from "@/components/blog/code-block";

const extractHeadingText = (children: any): string => {
    if (!children) return "";
    if (typeof children === "string") return children;
    if (Array.isArray(children)) return children.map(extractHeadingText).join("");
    if (children?.props?.children) return extractHeadingText(children.props.children);
    return String(children);
};

export default function MarkdownContent({ content }: { content: string }) {
    return (
        <div className="text-zinc-300 text-[15px] sm:text-[16px] leading-[1.65]">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1({ children }) {
                        const text = extractHeadingText(children);
                        const id = slugify(text);
                        return (
                            <h1 id={id} className="scroll-mt-24 text-2xl sm:text-3xl font-bold tracking-tight text-white mt-8 mb-3">
                                {children}
                            </h1>
                        );
                    },
                    h2({ children }) {
                        const text = extractHeadingText(children);
                        const id = slugify(text);
                        return (
                            <h2 id={id} className="scroll-mt-24 text-xl sm:text-2xl font-bold tracking-tight text-white mt-7 mb-2.5 pb-1.5 border-b border-zinc-800/80">
                                {children}
                            </h2>
                        );
                    },
                    h3({ children }) {
                        const text = extractHeadingText(children);
                        const id = slugify(text);
                        return (
                            <h3 id={id} className="scroll-mt-24 text-lg sm:text-xl font-bold tracking-tight text-white mt-5 mb-2">
                                {children}
                            </h3>
                        );
                    },
                    h4({ children }) {
                        const text = extractHeadingText(children);
                        const id = slugify(text);
                        return (
                            <h4 id={id} className="scroll-mt-24 text-base font-bold text-zinc-100 mt-4 mb-1.5">
                                {children}
                            </h4>
                        );
                    },
                    p({ children }) {
                        return <p className="my-2.5 leading-[1.65] text-zinc-300">{children}</p>;
                    },
                    strong({ children }) {
                        return <strong className="font-semibold text-white">{children}</strong>;
                    },
                    a({ href, children }) {
                        const isExternal = href?.startsWith("http");
                        return (
                            <a
                                href={href}
                                target={isExternal ? "_blank" : undefined}
                                rel={isExternal ? "noopener noreferrer" : undefined}
                                className="text-blue-400 hover:text-blue-300 underline underline-offset-4 decoration-blue-500/40 hover:decoration-blue-400 transition-colors"
                            >
                                {children}
                            </a>
                        );
                    },
                    ul({ children }) {
                        return <ul className="my-2.5 pl-5 list-disc list-outside space-y-1 text-zinc-300">{children}</ul>;
                    },
                    ol({ children }) {
                        return <ol className="my-2.5 pl-5 list-decimal list-outside space-y-1 text-zinc-300">{children}</ol>;
                    },
                    li({ children }) {
                        return <li className="my-0.5 leading-[1.6]">{children}</li>;
                    },
                    blockquote({ children }) {
                        return (
                            <blockquote className="my-4 border-l-2 border-blue-500 pl-4 py-0.5 text-zinc-400 italic bg-blue-500/5 rounded-r-lg">
                                {children}
                            </blockquote>
                        );
                    },
                    hr() {
                        return <hr className="my-6 border-zinc-800" />;
                    },
                    table({ children }) {
                        return (
                            <div className="my-4 w-full overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950/60 shadow-md">
                                <table className="w-full text-left text-sm">
                                    {children}
                                </table>
                            </div>
                        );
                    },
                    thead({ children }) {
                        return (
                            <thead className="border-b border-zinc-800 bg-zinc-900/80 text-xs font-semibold text-zinc-200 uppercase tracking-wider">
                                {children}
                            </thead>
                        );
                    },
                    tbody({ children }) {
                        return (
                            <tbody className="divide-y divide-zinc-800/60 text-xs sm:text-sm text-zinc-300 font-mono">
                                {children}
                            </tbody>
                        );
                    },
                    tr({ children }) {
                        return (
                            <tr className="transition-colors hover:bg-zinc-900/40">
                                {children}
                            </tr>
                        );
                    },
                    th({ children }) {
                        return <th className="px-4 py-2.5 font-semibold text-zinc-200">{children}</th>;
                    },
                    td({ children }) {
                        return <td className="px-4 py-2.5 text-zinc-300">{children}</td>;
                    },
                    code({ node, className, children, ...props }: any) {
                        const isInline = !className?.startsWith("language-") && !String(children).includes("\n");
                        return (
                            <CodeBlock inline={isInline} className={className}>
                                {children}
                            </CodeBlock>
                        );
                    },
                    pre({ children }: any) {
                        return <>{children}</>;
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
