"use client";

import { motion } from "framer-motion";
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
                href={linkedInUrl}
                className="px-8 py-3 bg-foreground text-background rounded-xl font-semibold shadow-2xl hover:opacity-90 transition-all text-sm sm:text-base"
            >
                Start a Conversation
            </Link>
        </motion.div>
    );
}
