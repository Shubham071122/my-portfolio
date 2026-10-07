import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import { Blog } from "@/types/blog";
import ThumbnailWithFallback from "@/components/blog/thumbnail-with-fallback";
import { calculateReadTime } from "@/lib/utils";

interface NextArticleProps {
  blog: Blog;
  delay?: number;
}

export default function NextArticle({ blog, delay = 0.04 }: NextArticleProps) {
  const readTime = calculateReadTime(blog.content);

  return (
    <BlurFade delay={delay}>
      <Link
        href={`/blogs/${blog.slug}`}
        className="group relative flex items-center justify-between gap-3.5 sm:gap-5 p-3.5 sm:p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-zinc-700/80 transition-all duration-300 shadow-md"
      >
        {/* Content Section */}
        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-medium">
            <div className="flex items-center gap-1">
              <Clock className="size-3 text-zinc-500" />
              <span>{readTime} min read</span>
            </div>
            {blog.hashtags && blog.hashtags.length > 0 && (
              <>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-400 font-medium">#{blog.hashtags[0]}</span>
              </>
            )}
          </div>

          <h3 className="text-sm sm:text-base font-semibold text-zinc-100 tracking-tight leading-snug line-clamp-2 group-hover:text-blue-400 transition-colors">
            {blog.title}
          </h3>

          {blog.description && (
            <p className="hidden sm:block text-xs text-zinc-400 line-clamp-1 leading-relaxed">
              {blog.description}
            </p>
          )}
        </div>

        {/* Compact Thumbnail + Arrow */}
        <div className="flex items-center gap-3 shrink-0">
          {blog.thumbnail && (
            <div className="relative w-20 sm:w-28 aspect-[16/10] rounded-lg overflow-hidden border border-white/10 shadow-sm">
              <ThumbnailWithFallback
                src={blog.thumbnail}
                alt={blog.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}
          <div className="size-7 rounded-lg bg-zinc-800/60 border border-zinc-700/60 flex items-center justify-center text-zinc-400 group-hover:text-blue-400 group-hover:border-blue-500/40 group-hover:bg-blue-500/10 transition-all">
            <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </Link>
    </BlurFade>
  );
}
