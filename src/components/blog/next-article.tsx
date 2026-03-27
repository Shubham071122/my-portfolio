import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
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
        className="group relative flex flex-col sm:flex-row items-center gap-6 p-4 sm:p-6 rounded-2xl border border-zinc-200/50 dark:border-white/[0.08] bg-zinc-50/50 dark:bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 shadow-sm hover:shadow-xl"
      >
        {/* Content Section */}
        <div className="flex-1 space-y-3 order-2 sm:order-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[10px] font-bold text-primary uppercase tracking-widest rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
              Read Next
            </span>
          </div>
          
          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-snug group-hover:text-primary transition-colors duration-300">
              {blog.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {blog.description}
            </p>
          </div>

          <div className="flex items-center gap-5 pt-1">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-wider">
              <Clock className="h-3.5 w-3.5" />
              {readTime} min read
            </div>
            <div className="flex items-center gap-1 text-primary text-[10px] font-black uppercase tracking-widest transition-transform group-hover:translate-x-1">
              Article <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Thumbnail Section */}
        <div className="relative w-full sm:w-56 md:w-64 aspect-video rounded-2xl overflow-hidden shrink-0 order-1 sm:order-2 border border-zinc-200/50 dark:border-white/5 shadow-sm">
  <ThumbnailWithFallback
    src={blog.thumbnail}
    alt={blog.title}
    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
  />
</div>

        {/* Glossy Overlay for the whole card */}
        <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none" />
      </Link>
    </BlurFade>
  );
}
