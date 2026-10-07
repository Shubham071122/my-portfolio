"use client";

import { Phone } from "lucide-react";

interface ContactCTAProps {
    linkedInUrl: string;
}

export function ContactCTA({ linkedInUrl }: ContactCTAProps) {
    return (
        <a
            href="https://cal.com/shubham-kumar-o7eaiq/30-min"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700/80 bg-white/80 dark:bg-zinc-900/80 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:text-black dark:hover:text-white text-sm font-medium backdrop-blur-sm transition-all duration-200 shadow-sm hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-md active:scale-[0.98]"
        >
            <span>Book a Free Call</span>
            <Phone className="size-3.5 text-zinc-500 dark:text-zinc-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
        </a>
    );
}
