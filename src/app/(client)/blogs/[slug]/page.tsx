import { getBlogBySlug } from "../../../../../actions/blog";
import BlurFade from "@/components/magicui/blur-fade";
import Image from "next/image";
import { notFound } from "next/navigation";
import MarkdownContent from "@/components/blog/markdown-content";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import ShareButton from "@/components/blog/share-button";
import ThumbnailWithFallback from "@/components/blog/thumbnail-with-fallback";

interface BlogDetailsPageProps {
  params: {
    slug: string;
  };
}

const BLUR_FADE_DELAY = 0.04;

export async function generateMetadata({ params }: BlogDetailsPageProps): Promise<Metadata> {
  const blog = await getBlogBySlug(params.slug);
  if (!blog) return {};

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: "article",
      publishedTime: blog.createdAt,
      authors: ["Shubham"],
      images: blog.thumbnail ? [{ url: blog.thumbnail }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: blog.thumbnail ? [blog.thumbnail] : [],
    },
  };
}

export default async function BlogDetailsPage({ params }: BlogDetailsPageProps) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  const wordsPerMinute = 200;
  const wordCount = blog.content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);

  return (
    <article className="max-w-3xl mx-auto space-y-10">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors group mb-8"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Articles
        </Link>
      </BlurFade>

      <div className="space-y-6">
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="flex items-center gap-3 text-sm font-bold text-primary uppercase tracking-widest">
            {blog.hashtags?.[0] || "Architecture"}
          </div>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            {blog.title}
          </h1>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-medium">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric"
              })}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {readTime} min read
            </div>
          </div>
        </BlurFade>
      </div>

      <BlurFade delay={BLUR_FADE_DELAY * 5}>
        <div className="relative aspect-video rounded-3xl overflow-hidden border border-zinc-200/50 dark:border-white/[0.08] shadow-2xl">
          <ThumbnailWithFallback
            src={blog.thumbnail}
            alt={blog.title}
            priority
          />
        </div>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 6}>
        <MarkdownContent content={blog.content} />
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 7}>
        <div className="py-12 border-t border-zinc-200/50 dark:border-white/[0.08] flex gap-6 flex-row sm:items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-zinc-200/50 dark:border-white/[0.08]">
              <Image
                src="/me.jpeg"
                alt="Shubham"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-bold">Shubham</p>
              <p className="text-sm text-muted-foreground">Full Stack Developer</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShareButton title={blog.title} />
          </div>
        </div>
      </BlurFade>
    </article>
  );
}
