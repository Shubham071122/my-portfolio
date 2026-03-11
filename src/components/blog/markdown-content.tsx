"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
    children: any;
    className?: string;
    inline?: boolean;
}

const CodeBlock = ({ children, className, inline }: CodeBlockProps) => {
    const [isCopied, setIsCopied] = useState(false);

    if (inline) {
        return (
            <code className={cn("bg-zinc-100 dark:bg-white/10 px-1.5 py-0.5 rounded-md font-mono text-[13px] text-primary", className)}>
                {children}
            </code>
        );
    }

    const content = String(children).replace(/\n$/, "");
    const language = className?.replace("language-", "") || "code";

    const handleCopy = async () => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(content);
            } else {
                // Fallback for non-secure contexts (like IP based mobile testing)
                const textArea = document.createElement("textarea");
                textArea.value = content;
                textArea.style.position = "fixed";
                textArea.style.left = "-9999px";
                textArea.style.top = "0";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                textArea.remove();
            }
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <div className="not-prose relative group my-8 rounded-xl bg-zinc-600 dark:bg-zinc-900 border border-white/[0.05] overflow-hidden shadow-md px-3">
            <div className="absolute right-3 top-3 flex items-center gap-2 z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                <span className="text-[10px] font-black text-white/30 uppercase tracking-widest bg-zinc-900/50 px-2 py-1 rounded-md border border-white/5">
                    {language}
                </span>
                <button
                    onClick={handleCopy}
                    className="p-2 rounded-md bg-zinc-900/50 border border-white/5 hover:bg-white/10 transition-colors text-white/50 hover:text-white active:scale-95 touch-manipulation"
                    title="Copy code"
                >
                    {isCopied ? (
                        <Check className="h-4 w-4 text-green-400" />
                    ) : (
                        <Copy className="h-4 w-4" />
                    )}
                </button>
            </div>

            <div className="overflow-x-auto">
                <pre className="px-5 py-4 text-[13px] font-mono leading-relaxed text-zinc-300">
                    <code className="block w-full">{children}</code>
                </pre>
            </div>
        </div>
    );
};

export default function MarkdownContent({ content }: { content: string }) {
    return (
        <div className="prose dark:prose-invert prose-headings:font-black prose-headings:tracking-tighter prose-p:leading-relaxed prose-p:text-zinc-600 dark:prose-p:text-zinc-300 prose-img:rounded-3xl prose-a:text-primary prose-code:text-primary max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    code({ node, inline, className, children, ...props }: any) {
                        return (
                            <CodeBlock inline={inline} className={className}>
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
