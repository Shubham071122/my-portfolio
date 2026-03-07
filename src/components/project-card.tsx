"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import { TechIcon } from "./tech-icon";
import { motion } from "framer-motion";
import { ExternalLink, Github, Globe } from "lucide-react";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  const getLinkIcon = (type: string, defaultIcon: React.ReactNode) => {
    const t = type.toLowerCase();
    if (t === "fe" || t === "be" || t.includes("github") || t === "source") {
      return <Github className="size-3" />;
    }
    if (t.includes("website") || t.includes("live") || t.includes("demo")) {
      return <Globe className="size-3" />;
    }
    return defaultIcon || <ExternalLink className="size-3" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Card
        className={cn(
          "group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950 transition-all duration-300 hover:shadow-lg dark:hover:shadow-black/40",
          className
        )}
      >
        <Link
          href={href || "#"}
          className="relative block aspect-video overflow-hidden border-b border-zinc-200 dark:border-zinc-800"
        >
          {video ? (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            image && (
              <Image
                src={image}
                alt={title}
                width={500}
                height={300}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                unoptimized
              />
            )
          )}
        </Link>

        {/* Info Content */}
        <div className="flex flex-col flex-grow py-5 px-3">
          <CardHeader className="p-0 mb-4">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                {title}
              </CardTitle>
              <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                {dates}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <Markdown className="prose max-w-full text-pretty font-sans text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400 dark:prose-invert">
              {description}
            </Markdown>

            {/* Tech Icons - Restored color & original behavior */}
            {tags && tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <TechIcon
                    name={tag}
                    size={16}
                    key={tag}
                    showTooltip={true}
                    className="bg-white/50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 h-8 w-8"
                  />
                ))}
              </div>
            )}
          </CardContent>

          {/* Action Links - Proper Light/Dark Contrast */}
          <CardFooter className="mt-auto p-0 pt-6">
            {links && links.length > 0 && (
              <div className="flex flex-wrap gap-2.5">
                {links.map((link, idx) => (
                  <Link
                    href={link.href}
                    key={idx}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 px-3 py-1.5 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 transition-all hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-50 dark:hover:text-zinc-950"
                  >
                    {getLinkIcon(link.type, link.icon)}
                    <span className="capitalize">{link.type}</span>
                  </Link>
                ))}
              </div>
            )}
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
}
