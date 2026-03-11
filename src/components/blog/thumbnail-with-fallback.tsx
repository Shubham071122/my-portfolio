"use client";

import { useState } from "react";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThumbnailWithFallbackProps {
    src?: string;
    alt: string;
    className?: string;
    priority?: boolean;
}

export default function ThumbnailWithFallback({ src, alt, className, priority }: ThumbnailWithFallbackProps) {
    const [error, setError] = useState(false);

    if (!src || error) {
        return (
            <div className={cn("relative w-full h-full bg-gradient-to-br from-blue-500/10 via-transparent to-transparent flex items-center justify-center bg-muted/30", className)}>
                <ImageIcon className="h-8 w-8 text-muted-foreground/20" />
            </div>
        );
    }

    return (
        <Image
            src={src}
            alt={alt}
            fill
            className={cn("object-cover", className)}
            priority={priority}
            unoptimized
            onError={() => setError(true)}
        />
    );
}
