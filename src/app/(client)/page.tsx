import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import { TechIcon } from "@/components/tech-icon";
import Link from "next/link";
import Markdown from "react-markdown";
import { ExperienceCard } from "@/components/experience-card";
import { HeroAvatar } from "@/components/hero-avatar";
import { ContactCTA } from "@/components/contact-cta";

const BLUR_FADE_DELAY = 0.04;

export const metadata = {
  title: DATA.name + " | Full Stack Developer",
  description: DATA.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: DATA.name + " | Full Stack Developer",
    description: DATA.summary,
    url: DATA.url,
    images: [
      {
        url: DATA.avatarUrl.startsWith("http")
          ? DATA.avatarUrl
          : DATA.url + DATA.avatarUrl,
        alt: DATA.name,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: DATA.name + " | Portfolio",
    description: DATA.summary,
    images: [
      DATA.avatarUrl.startsWith("http")
        ? DATA.avatarUrl
        : DATA.url + DATA.avatarUrl,
    ],
  },
};

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="hero" className="relative pt-8 sm:pt-16">
        {/* Modern Glow Effect */}
        <div className="absolute -top-24 -left-12 size-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none z-[-1] dark:bg-blue-500/5" />

        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between gap-6 sm:gap-2">
            <div className="flex-col flex flex-1 space-y-3 text-center sm:text-left">
              <BlurFade delay={BLUR_FADE_DELAY}>
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl xl:text-7xl/none bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground/90 to-foreground/70">
                  Hi, I&apos;m{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-200">
                    {DATA.name.split(" ")[0]}
                  </span>{" "}
                  👋
                </h1>
              </BlurFade>

              <BlurFadeText
                className="max-w-[500px] text-muted-foreground text-base sm:text-xl font-medium leading-relaxed"
                delay={BLUR_FADE_DELAY * 2}
                text={DATA.description}
              />
            </div>

            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <HeroAvatar
                name={DATA.name}
                avatarUrl={DATA.avatarUrl}
                initials={DATA.initials}
              />
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            {DATA.summary}
          </Markdown>
        </BlurFade>
      </section>
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Experience</h2>
          </BlurFade>
          <div className="space-y-6">
            {DATA.work.map((work, id) => (
              <BlurFade
                key={work.company}
                delay={BLUR_FADE_DELAY * 6 + id * 0.05}
              >
                <ExperienceCard
                  logoUrl={work.logoUrl}
                  company={work.company}
                  role={work.title}
                  period={`${work.start} - ${work.end ?? "Present"}`}
                  description={work.description}
                  href={work.href}
                  locationType={work.location === "Remote" ? "Work from Home" : "On Site"}
                  technologies={(work as any).technologies || []}
                  linkedinHref={(work as any).linkedinHref}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          {DATA.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <ExperienceCard
                logoUrl={education.logoUrl}
                company={education.school}
                role={education.degree}
                period={`${education.start} - ${education.end}`}
                locationType="Education"
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <TechIcon name={skill} size={28} />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="projects">
        <div className="space-y-12 w-full py-8 sm:py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-xl px-4 py-1.5 text-sm font-medium bg-zinc-100/80 dark:bg-white/[0.08] backdrop-blur-xl border border-zinc-200/50 dark:border-white/[0.12] text-zinc-900 dark:text-zinc-100 shadow-xl dark:shadow-2xl">
                  My Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Check out my latest work
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;ve worked on a variety of projects, from simple
                  websites to complex web applications. Here are a few of my
                  favorites.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {DATA.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
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
        </div>
      </section>
      <section id="contact" className="relative group">
        {/* Subtle Bottom Glow */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 size-72 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none z-[-1] dark:bg-blue-500/5 transition-all duration-700 group-hover:scale-125 group-hover:opacity-100" />

        <div className="mx-auto max-w-2xl px-4 py-10 pb-16 text-center">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="inline-block rounded-xl px-4 py-1.5 text-sm font-medium mb-4 bg-zinc-100/80 dark:bg-white/[0.08] backdrop-blur-xl border border-zinc-200/50 dark:border-white/[0.12] text-zinc-900 dark:text-zinc-100 shadow-xl dark:shadow-2xl">
              Connect
            </div>

            <h2 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
              Let&apos;s Build Something <span className="bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent italic font-serif">Together</span>
            </h2>

            <p className="mx-auto max-w-[550px] text-muted-foreground text-base sm:text-lg leading-relaxed mb-10">
              Whether you have a specific project in mind, want to discuss a potential collaboration,
              or just want to chat about the future of tech—my inbox is always open.
              Let’s create something amazing.
            </p>

            <ContactCTA linkedInUrl={DATA.contact.social.LinkedIn.url} />
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
