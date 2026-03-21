"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface HeroAvatarProps {
    name: string;
    avatarUrl: string;
    initials: string;
}

export function HeroAvatar({ name, avatarUrl, initials }: HeroAvatarProps) {
    const [canHover, setCanHover] = useState(false);

    useEffect(() => {
        setCanHover(window.matchMedia("(hover: hover)").matches);
    }, []);

    return (
        <motion.div
            whileHover={canHover ? { scale: 1.05, rotate: 2 } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative group"
        >
            <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full opacity-0 lg:group-hover:opacity-100 transition-opacity" />
            <Avatar className="size-36 sm:size-44 border-4 border-background shadow-2xl ring-1 ring-border/50">
                <AvatarImage alt={name} src={avatarUrl} className="object-cover" />
                <AvatarFallback className="text-2xl font-bold bg-muted">{initials}</AvatarFallback>
            </Avatar>
        </motion.div>
    );
}
