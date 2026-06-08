import BlurFade from "@/components/magicui/blur-fade";
import { TechIcon } from "@/components/tech-icon";
import { DATA } from "@/data/resume";
import { getProjectBySlug, getProjectSlug } from "@/lib/project-utils";
import { cn } from "@/lib/utils";
import { ArrowLeft, ExternalLink, Github, Globe } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

type PageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return DATA.projects.map((project) => ({
    slug: getProjectSlug(project.title),
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: "Project",
    };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | ${DATA.name}`,
      description: project.description,
      images: project.image ? [project.image] : undefined,
    },
  };
}

const getLinkIcon = (type: string, defaultIcon: React.ReactNode) => {
  const t = type.toLowerCase();
  if (t === "fe" || t === "be" || t.includes("github") || t === "source") {
    return <Github className="size-4" />;
  }
  if (t.includes("website") || t.includes("live") || t.includes("demo")) {
    return <Globe className="size-4" />;
  }
  return defaultIcon || <ExternalLink className="size-4" />;
};

export default function ProjectDetailsPage({ params }: PageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const details = "details" in project ? project.details : undefined;

  return (
    <main className="min-h-screen py-8 sm:py-12">
      <BlurFade delay={0.04}>
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Projects
        </Link>
      </BlurFade>

      <article className="space-y-8">
        <BlurFade delay={0.08}>
          <header className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-500">
                {project.dates}
              </p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                {project.title}
              </h1>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {project.description}
            </p>
          </header>
        </BlurFade>

        {project.image && (
          <BlurFade delay={0.12}>
            <div className="overflow-hidden rounded-2xl border border-border/70 bg-muted/30">
              <Image
                src={project.image}
                alt={project.title}
                width={1200}
                height={720}
                className="aspect-video w-full object-cover"
                unoptimized
              />
            </div>
          </BlurFade>
        )}

        <BlurFade delay={0.16}>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <div
                key={tech}
                className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 px-2.5 py-1.5"
              >
                <TechIcon
                  name={tech}
                  size={14}
                  showTooltip={false}
                  className="border-none bg-transparent p-0 shadow-none hover:translate-y-0 hover:scale-100"
                />
                <span className="text-xs font-medium text-muted-foreground">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </BlurFade>

        {project.links.length > 0 && (
          <BlurFade delay={0.2}>
            <div className="flex flex-wrap gap-2.5">
              {project.links.map((link) => (
                <Link
                  key={`${link.type}-${link.href}`}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-100 px-3 py-2 text-xs font-semibold text-zinc-700 transition-colors hover:bg-zinc-900 hover:text-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-50 dark:hover:text-zinc-950"
                >
                  {getLinkIcon(link.type, link.icon)}
                  <span>{link.type}</span>
                </Link>
              ))}
            </div>
          </BlurFade>
        )}

        <BlurFade delay={0.24}>
          <Markdown
            className={cn(
              "prose prose-zinc max-w-none text-[15px] leading-7 text-zinc-700 dark:prose-invert dark:text-zinc-300",
              "prose-headings:tracking-tight prose-h2:mt-10 prose-h2:text-2xl prose-h2:font-bold",
              "prose-p:my-5 prose-li:my-1 prose-ul:my-5 prose-strong:text-foreground"
            )}
          >
            {details || project.description}
          </Markdown>
        </BlurFade>
      </article>
    </main>
  );
}
