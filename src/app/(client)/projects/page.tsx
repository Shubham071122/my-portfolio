import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";
import { ArrowUpRight, Github } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects",
    description: `Explore the projects built by ${DATA.name}, ranging from AI agents to real-time chat applications and video streaming platforms.`,
};

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsPage() {
    return (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col min-h-screen py-8 sm:py-12">
            <section id="projects-header" className="space-y-4 mb-12">
                <BlurFade delay={BLUR_FADE_DELAY}>
                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-center sm:text-left">
                        My <span className="text-blue-500 italic font-serif">Work</span>
                    </h1>
                    <p className="text-muted-foreground text-base sm:text-xl max-w-[800px] mt-4">
                        A collection of projects I&apos;ve built, ranging from experimental AI agents to production-ready web applications. Each project represents a unique challenge and a step forward in my journey.
                    </p>
                </BlurFade>
            </section>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {DATA.projects.map((project, id) => (
                    <BlurFade
                        key={project.title}
                        delay={BLUR_FADE_DELAY * 2 + id * 0.05}
                    >
                        <ProjectCard
                            href={project.href}
                            key={project.title}
                            title={project.title}
                            description={project.description}
                            dates={project.dates}
                            tags={project.technologies}
                            image={project.image}
                            video={project.video}
                            links={project.links}
                        />
                    </BlurFade>
                ))}
            </div>

            <section className="mt-20 relative">
                <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full pointer-events-none -z-10" />

                <BlurFade delay={0.5}>
                    <div className="rounded-2xl border border-zinc-200/60 dark:border-zinc-800/80 bg-gradient-to-b from-zinc-50/50 to-zinc-100/50 dark:from-zinc-900/40 dark:to-zinc-950/40 p-8 sm:p-10 text-center space-y-4 backdrop-blur-sm">
                        <div className="space-y-2">
                            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                                Want to see <span className="text-blue-500 italic font-serif">more?</span>
                            </h2>
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                                Explore all repositories, open-source experiments, and works in progress directly on GitHub.
                            </p>
                        </div>

                        <div className="pt-2 flex justify-center">
                            <a
                                href={DATA.contact.social.GitHub.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700/80 bg-white/90 dark:bg-zinc-900/90 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm font-medium transition-all duration-200 shadow-sm hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-md active:scale-[0.98]"
                            >
                                <Github className="size-4 text-zinc-700 dark:text-zinc-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
                                <span>Visit my GitHub</span>
                                <ArrowUpRight className="size-3.5 text-zinc-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                            </a>
                        </div>
                    </div>
                </BlurFade>
            </section>
        </main>
    );
}
