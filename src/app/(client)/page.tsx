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

import SocialLinks from "@/components/social-links";
import { ArrowRight } from "lucide-react";
import GitHubCalendarPanel from "@/components/github-calendar";

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
    <main className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col min-h-[100dvh] space-y-10">
      <section id="hero" className="relative pt-8 sm:pt-16">
        {/* Modern Glow Effect */}
        <div className="absolute -top-24 -left-12 size-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none z-[-1] dark:bg-blue-500/5" />

        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between gap-6 sm:gap-4">
            <div className="flex-col flex flex-1 space-y-4 text-center sm:text-left">
              <BlurFade delay={BLUR_FADE_DELAY}>
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground/90 to-foreground/75">
                  Hi, I&apos;m{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-200">
                    {DATA.name.split(" ")[0]}
                  </span>
                </h1>
              </BlurFade>

              <BlurFadeText
                className="max-w-[500px] text-zinc-900 dark:text-zinc-100 text-base sm:text-lg font-bold tracking-tight leading-relaxed"
                delay={BLUR_FADE_DELAY * 2}
                text={DATA.description}
              />

              <BlurFade delay={BLUR_FADE_DELAY * 3}>
                <Markdown className="prose max-w-full text-pretty font-sans text-sm sm:text-base text-muted-foreground leading-relaxed dark:prose-invert">
                  {DATA.summary}
                </Markdown>
                <Link href="/about" className="text-blue-500 hover:underline text-sm font-semibold mt-3 inline-block">
                  Read more about my journey →
                </Link>
              </BlurFade>

              <BlurFade delay={BLUR_FADE_DELAY * 4}>
                <div className="pt-2">
                  <SocialLinks />
                </div>
              </BlurFade>
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
                  status={(work as any).status}
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
      <section id="github-activity">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 10.5}>
            <GitHubCalendarPanel
              accounts={[
                { label: "Personal", username: DATA.contact.social.GitHub.url.split("/").pop() || "Shubham071122" },
                { label: "Work", username: "shubham-kumar-acowale" },
              ]}
            />
          </BlurFade>
        </div>
      </section>
      <section id="projects">
        <div className="space-y-12 w-full py-8 sm:py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
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
            {DATA.projects.slice(0, 2).map((project, id) => (
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
          <BlurFade delay={BLUR_FADE_DELAY * 15}>
            <div className="flex justify-center mt-8">
              <Link
                href="/projects"
                className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700/80 bg-white/80 dark:bg-zinc-900/80 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:text-black dark:hover:text-white text-sm font-medium backdrop-blur-sm transition-all duration-200 shadow-sm hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-md active:scale-[0.98]"
              >
                <span>View All Projects</span>
                <ArrowRight className="size-4 text-zinc-500 dark:text-zinc-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="contact" className="relative group pt-4 pb-8">
        {/* Ambient Glow */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 size-80 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none z-[-1]" />

        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <div className="relative rounded-3xl border border-zinc-800/80 bg-zinc-950/50 p-8 sm:p-12 backdrop-blur-md shadow-2xl text-center space-y-6 overflow-hidden">
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 space-y-3">

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Let&apos;s Build Something <span className="text-blue-400 italic font-serif">Together</span>
              </h2>

              <p className="mx-auto max-w-[500px] text-zinc-400 text-sm sm:text-base leading-relaxed">
                Whether you have a specific project in mind, want to discuss scalable architecture, or just explore new ideas—my calendar is open.
              </p>
            </div>

            <div className="relative z-10 pt-2 flex items-center justify-center">
              <ContactCTA linkedInUrl={DATA.contact.social.LinkedIn.url} />
            </div>
          </div>
        </BlurFade>
      </section>
    </main>
  );
}
