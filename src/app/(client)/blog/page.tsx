import BlurFade from "@/components/magicui/blur-fade";
import Link from "next/link";

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  return (
    <section className="flex flex-col min-h-[60vh] items-center justify-center text-center space-y-6">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="inline-block rounded-xl px-4 py-1.5 text-sm font-medium bg-zinc-100/80 dark:bg-white/[0.08] backdrop-blur-xl border border-zinc-200/50 dark:border-white/[0.12] text-zinc-900 dark:text-zinc-100 shadow-xl dark:shadow-2xl mb-4">
          Status: In Progress
        </div>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
          Blog <span className="bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent italic font-serif">Coming Soon</span>
        </h1>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <p className="mx-auto max-w-[400px] text-muted-foreground text-base sm:text-lg leading-relaxed">
          I&apos;m currently crafting some deep dives into Full Stack development and DevOps. Stay tuned for fresh content!
        </p>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 4}>
        <div className="flex gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl px-6 py-2 text-sm font-bold transition-all bg-foreground text-background hover:brightness-110 shadow-xl"
          >
            Back Home
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-xl px-6 py-2 text-sm font-bold transition-all bg-zinc-100 dark:bg-white/[0.08] hover:bg-zinc-200 dark:hover:bg-white/[0.12] border border-zinc-200/50 dark:border-white/[0.12]"
          >
            View Projects
          </Link>
        </div>
      </BlurFade>
    </section>
  );
}
