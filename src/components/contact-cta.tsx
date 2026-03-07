"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import Link from "next/link";

interface ContactCTAProps {
    linkedInUrl: string;
}

export function ContactCTA({ linkedInUrl }: ContactCTAProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-flex overflow-hidden rounded-2xl border border-border bg-muted/30 p-1 backdrop-blur-sm"
        >
            <Link
                href="/contact"
                className="px-8 py-3 bg-foreground text-background rounded-xl font-bold shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all text-sm sm:text-base hover:brightness-110 active:scale-[0.98] flex items-center justify-center gap-2 border-t border-white/10"
            >
                Start a Conversation
                <Send className="size-4" />
            </Link>
        </motion.div>
    );
}
