import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects",
    description: `Explore the projects built by ${DATA.name}, ranging from AI agents to real-time chat applications and video streaming platforms.`,
};

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsPage() {
    return (
        <main className="flex flex-col min-h-screen py-8 sm:py-12">
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

            <section className="mt-20 text-center">
                <BlurFade delay={0.5}>
                    <h2 className="text-2xl font-bold mb-4">Want to see more?</h2>
                    <p className="text-muted-foreground mb-6">
                        Check out my GitHub for more experiments.
                    </p>
                    <a
                        href={DATA.contact.social.GitHub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-8"
                    >
                        Visit my GitHub
                    </a>
                </BlurFade>
            </section>
        </main>
    );
}
