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
    <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-16 space-y-10">
      <div className="flex flex-col items-center justify-center text-center space-y-3">
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Insights & <span className="text-blue-400 italic font-serif">Articles</span>
          </h1>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <p className="mx-auto max-w-[560px] text-zinc-400 text-sm sm:text-base leading-relaxed">
            Deep dives into Full Stack development, DevOps architecture, and engineering experiments. Sharing what I learn while building modern applications.
          </p>
        </BlurFade>
      </div>

      <div className="w-full">
        <BlogListClient initialBlogs={blogs} />
      </div>
    </section>
  );
}
