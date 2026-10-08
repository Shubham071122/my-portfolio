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
import { ArrowRight, Briefcase, GraduationCap, Wrench } from "lucide-react";
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
    <main className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col min-h-[100dvh] space-y-12 sm:space-y-16 py-8 sm:py-12">
      {/* Hero Section */}
      <section id="hero" className="relative">
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-20 -left-10 size-80 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none z-[-1]" />

        <div className="mx-auto w-full max-w-2xl space-y-6">
          <div className="flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between gap-6 sm:gap-6">
            <div className="flex-col flex flex-1 space-y-3.5 text-center sm:text-left">
              <BlurFade delay={BLUR_FADE_DELAY}>
                <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
                  Hi, I&apos;m{" "}
                  <span className="text-blue-500 italic font-serif">
                    {DATA.name.split(" ")[0]}
                  </span>
                </h1>
              </BlurFade>

              <BlurFade delay={BLUR_FADE_DELAY * 2}>
                <p className="max-w-[500px] text-muted-foreground text-sm sm:text-base font-medium leading-relaxed">
                  {DATA.description}
                </p>
              </BlurFade>

              <BlurFade delay={BLUR_FADE_DELAY * 3}>
                <div className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed max-w-xl">
                  {DATA.summary}
                </div>
                <Link
                  href="/about"
                  className="text-blue-500 hover:text-blue-400 text-xs sm:text-sm font-semibold mt-2.5 inline-flex items-center gap-1 transition-colors group"
                >
                  <span>Read more about my journey</span>
                  <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </BlurFade>

              <BlurFade delay={BLUR_FADE_DELAY * 4}>
                <div className="pt-1.5">
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

      {/* Experience Section */}
      <section id="work" className="space-y-4">
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Work & <span className="text-blue-500 italic font-serif">Experience</span>
            </h2>
          </div>
        </BlurFade>
        <div className="space-y-3 sm:space-y-3.5">
          {DATA.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 6 + id * 0.04}
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
      </section>

      {/* Education Section */}
      <section id="education" className="space-y-4">
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Academic <span className="text-blue-500 italic font-serif">Background</span>
          </h2>
        </BlurFade>
        <div className="space-y-3 sm:space-y-3.5">
          {DATA.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 8 + id * 0.04}
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

      {/* Skills Section */}
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              Skills & <span className="text-blue-500 italic font-serif">Technologies</span>
            </h2>
          </BlurFade>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.03}>
                <TechIcon name={skill} size={28} />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub Activity */}
      <section id="github-activity">
        <BlurFade delay={BLUR_FADE_DELAY * 10.5}>
          <GitHubCalendarPanel
            accounts={[
              { label: "Personal", username: DATA.contact.social.GitHub.url.split("/").pop() || "Shubham071122" },
              { label: "Work", username: "shubham-kumar-acowale" },
            ]}
          />
        </BlurFade>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="space-y-6">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Featured <span className="text-blue-500 italic font-serif">Projects</span>
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                A selection of applications and experiments I&apos;ve engineered.
              </p>
            </div>
            <Link
              href="/projects"
              className="text-xs sm:text-sm font-semibold text-blue-500 hover:text-blue-400 inline-flex items-center gap-1 group transition-colors self-start sm:self-auto"
            >
              <span>View all projects</span>
              <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
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
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative group pt-2 pb-6">
        {/* Ambient Glow */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 size-80 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none z-[-1]" />

        <BlurFade delay={BLUR_FADE_DELAY * 14}>
          <div className="relative rounded-3xl border border-border/70 bg-muted/20 p-8 sm:p-12 backdrop-blur-md shadow-2xl text-center space-y-6 overflow-hidden">
            <div className="relative z-10 space-y-3">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
                Let&apos;s Build Something <span className="text-blue-500 italic font-serif">Together</span>
              </h2>

              <p className="mx-auto max-w-[500px] text-muted-foreground text-xs sm:text-sm leading-relaxed">
                Whether you have a specific project in mind, want to discuss scalable architecture, or just explore new ideas—my calendar is open.
              </p>
            </div>

            <div className="relative z-10 pt-1 flex items-center justify-center">
              <ContactCTA linkedInUrl={DATA.contact.social.LinkedIn.url} />
            </div>
          </div>
        </BlurFade>
      </section>
    </main>
  );
}
