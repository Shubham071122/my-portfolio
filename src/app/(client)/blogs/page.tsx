import BlurFade from "@/components/magicui/blur-fade";
import { getPublishedBlogs } from "../../../../actions/blog";
import BlogListClient from "@/components/blog/blog-list-client";

export const metadata = {
  title: "Blogs",
  description: "My thoughts on software development, life, and more.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const blogs = await getPublishedBlogs();

  return (
    <section className="space-y-12 mb-20">
      <div className="flex flex-col items-center justify-center text-center space-y-6">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="inline-block rounded-xl px-4 py-1.5 text-sm font-bold bg-zinc-100/80 dark:bg-white/[0.08] backdrop-blur-xl border border-zinc-200/50 dark:border-white/[0.12] text-zinc-900 dark:text-zinc-100 shadow-sm mb-4 uppercase tracking-tighter">
            Writing
          </div>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <h1 className="text-4xl font-black tracking-tighter sm:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80">
            Insights & <span className="text-blue-500 italic font-serif">Articles</span>
          </h1>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <p className="mx-auto max-w-[600px] text-muted-foreground text-base sm:text-lg leading-relaxed font-medium">
            Deep dives into Full Stack development, DevOps architecture, and engineering management. Sharing what I learn while building modern applications.
          </p>
        </BlurFade>
      </div>

      <div className="max-w-5xl mx-auto">
        <BlogListClient initialBlogs={blogs} />
      </div>
    </section>
  );
}
