import { getBlogBySlug, getPublishedBlogs } from "../../../../../actions/blog";
import BlurFade from "@/components/magicui/blur-fade";
import Image from "next/image";
import { notFound } from "next/navigation";
import MarkdownContent from "@/components/blog/markdown-content";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import ShareButton from "@/components/blog/share-button";
import ThumbnailWithFallback from "@/components/blog/thumbnail-with-fallback";
import NextArticle from "@/components/blog/next-article";
import TableOfContents from "@/components/blog/table-of-contents";
import MobileToc from "@/components/blog/mobile-toc";
import ScrollToTop from "@/components/blog/scroll-to-top";
import ReadingProgressBar from "@/components/blog/reading-progress-bar";
import { calculateReadTime } from "@/lib/utils";
import { Suspense } from "react";
import { cookies } from "next/headers";
import BlogHistoryTracker from "@/components/blog/blog-history-tracker";
import { extractToc } from "@/lib/toc";

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

  const readTime = calculateReadTime(blog.content);
  const tocItems = extractToc(blog.content);

  return (
    <div className="relative min-h-screen w-full pb-16">
      <BlogHistoryTracker slug={params.slug} />
      <ScrollToTop />

      {/* Sticky Top Header Bar */}
      <header className="sticky top-0 z-30 w-full border-b border-zinc-800/80 bg-background/90 backdrop-blur-md relative">
        <div className="w-full px-4 sm:px-8 lg:px-12 h-14 flex items-center justify-between">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Blogs</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <MobileToc items={tocItems} />
            <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400 font-medium px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800">
              <Clock className="h-3.5 w-3.5 text-blue-400" />
              {readTime} min read
            </span>
          </div>
        </div>
        <ReadingProgressBar />
      </header>

      {/* Fixed Left Sidebar: Table of Contents on the far left edge of the screen (Desktop xl+) */}
      {tocItems.length > 0 && (
        <aside className="hidden xl:block fixed left-6 2xl:left-10 top-20 w-56 2xl:w-64 max-h-[calc(100vh-6rem)] overflow-y-auto z-20 pr-2">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <TableOfContents items={tocItems} />
          </BlurFade>
        </aside>
      )}

      {/* Centered Main Article Container */}
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 pt-8">
        <article className="space-y-6">
          {/* Header: Hashtags, Title, Description, Meta */}
          <div className="space-y-3">
            {/* Hashtag Badges */}
            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <div className="flex flex-wrap items-center gap-1.5">
                {blog.hashtags && blog.hashtags.length > 0 ? (
                  blog.hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 text-[11px] font-medium text-zinc-300 rounded-md bg-zinc-900 border border-zinc-800"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="px-2.5 py-0.5 text-[11px] font-medium text-zinc-300 rounded-md bg-zinc-900 border border-zinc-800">
                    Engineering
                  </span>
                )}
              </div>
            </BlurFade>

            {/* Title */}
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-[1.25]">
                {blog.title}
              </h1>
            </BlurFade>

            {/* Description */}
            {blog.description && (
              <BlurFade delay={BLUR_FADE_DELAY * 3.5}>
                <p className="text-[15px] sm:text-base text-zinc-400 leading-relaxed">
                  {blog.description}
                </p>
              </BlurFade>
            )}

            {/* Meta Row: Date, Read Time, Share Button */}
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-400 font-medium pt-2 border-b border-zinc-800/80 pb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                    <span>
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-zinc-400" />
                    <span>{readTime} min read</span>
                  </div>
                </div>

                <ShareButton title={blog.title} />
              </div>
            </BlurFade>
          </div>

          {/* Thumbnail Image */}
          {blog.thumbnail && (
            <BlurFade delay={BLUR_FADE_DELAY * 5}>
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-zinc-800 shadow-md">
                <ThumbnailWithFallback
                  src={blog.thumbnail}
                  alt={blog.title}
                  priority
                />
              </div>
            </BlurFade>
          )}

          {/* Markdown Content */}
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <MarkdownContent content={blog.content} />
          </BlurFade>

          {/* Recommended Next Article */}
          <div className="pt-8">
            <Suspense fallback={<RelatedBlogSkeleton />}>
              <RecommendedArticles
                currentSlug={params.slug}
                hashtags={blog.hashtags}
              />
            </Suspense>
          </div>

          {/* Author Footer & Share Row */}
          <BlurFade delay={BLUR_FADE_DELAY * 7.5}>
            <div className="pt-6 border-t border-zinc-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative h-11 w-11 overflow-hidden rounded-xl border border-zinc-800">
                  <Image
                    src="/me.jpeg"
                    alt="Shubham"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Shubham</p>
                  <p className="text-xs text-zinc-400">Full Stack Developer</p>
                </div>
              </div>

              <ShareButton title={blog.title} />
            </div>
          </BlurFade>
        </article>
      </div>
    </div>
  );
}

async function RecommendedArticles({
  currentSlug,
  hashtags,
}: {
  currentSlug: string;
  hashtags: string[];
}) {
  const cookieStore = cookies();
  const historyCookie = cookieStore.get("read_history")?.value;
  let history: string[] = [];
  try {
    if (historyCookie) {
      history = JSON.parse(decodeURIComponent(historyCookie));
    }
  } catch (e) { }

  const allBlogs = await getPublishedBlogs();
  if (!allBlogs || allBlogs.length <= 1) return null;

  const nextBlog =
    allBlogs
      .filter((b) => b.slug !== currentSlug && !history.includes(b.slug))
      .find((b) => b.hashtags?.some((tag) => hashtags?.includes(tag))) ||
    allBlogs.find((b) => b.slug !== currentSlug && !history.includes(b.slug)) ||
    allBlogs[allBlogs.findIndex((b) => b.slug === currentSlug) + 1] ||
    allBlogs[0];

  if (!nextBlog || nextBlog.slug === currentSlug) return null;

  const nextBlogFull = await getBlogBySlug(nextBlog.slug);
  if (!nextBlogFull) return null;

  return (
    <BlurFade delay={BLUR_FADE_DELAY}>
      <div className="space-y-3">
        <h4 className="text-[11px] font-bold text-zinc-400 uppercase tracking-normal">
          Next Article
        </h4>
        <NextArticle blog={nextBlogFull} />
      </div>
    </BlurFade>
  );
}

function RelatedBlogSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-3 w-20 bg-zinc-800 rounded animate-pulse" />
      <div className="h-20 sm:h-24 w-full bg-zinc-900/40 rounded-xl border border-zinc-800/80 animate-pulse" />
    </div>
  );
}
