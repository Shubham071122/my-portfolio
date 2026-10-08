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
import { ArrowRight, ExternalLink, Github, Globe } from "lucide-react";
import { getProjectSlug } from "@/lib/project-utils";

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
  description,
  dates,
  tags,
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
  const detailsHref = `/projects/${getProjectSlug(title)}`;

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
          "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-muted/20 hover:bg-muted/30 backdrop-blur-md transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg dark:hover:shadow-black/40",
          className
        )}
      >
        <Link
          href={detailsHref}
          className="relative block aspect-video overflow-hidden border-b border-border/60 bg-muted/40"
        >
          {video ? (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            image && (
              <Image
                src={image}
                alt={title}
                width={500}
                height={300}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                unoptimized
              />
            )
          )}
        </Link>

        {/* Info Content */}
        <div className="flex flex-col flex-grow p-5 sm:p-6">
          <CardHeader className="p-0 mb-3">
            <div className="space-y-1">
              <CardTitle className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                <Link href={detailsHref} className="transition-colors hover:text-blue-500">
                  {title}
                </Link>
              </CardTitle>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">
                {dates}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <Markdown className="prose max-w-full text-pretty font-sans text-xs sm:text-[13px] leading-relaxed text-muted-foreground dark:prose-invert">
              {description}
            </Markdown>

            {/* Tech Icons */}
            {tags && tags.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <TechIcon
                    name={tag}
                    size={15}
                    key={tag}
                    showTooltip={true}
                    className="bg-background/60 border-border/80 h-7 w-7"
                  />
                ))}
              </div>
            )}
          </CardContent>

          {/* Action Links */}
          <CardFooter className="mt-auto p-0 pt-5">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={detailsHref}
                className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-1.5 text-[11px] font-semibold text-background transition-all hover:opacity-90 shadow-sm"
              >
                <span>Details</span>
                <ArrowRight className="size-3" />
              </Link>
              {links?.map((link, idx) => (
                <Link
                  href={link.href}
                  key={idx}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-background/80 hover:bg-muted border border-border px-2.5 py-1.5 text-[11px] font-semibold text-muted-foreground hover:text-foreground transition-all shadow-sm"
                >
                  {getLinkIcon(link.type, link.icon)}
                  <span className="capitalize">{link.type}</span>
                </Link>
              ))}
            </div>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
}
