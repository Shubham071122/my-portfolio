"use client";

import { useState, useEffect } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { Blog } from "@/types/blog";
import Link from "next/link";
import { Search, Calendar, ChevronRight, Loader2, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import ThumbnailWithFallback from "./thumbnail-with-fallback";
import { searchBlogs } from "../../../actions/blog";

interface BlogListClientProps {
    initialBlogs: Blog[];
}

const BLUR_FADE_DELAY = 0.04;

export default function BlogListClient({ initialBlogs }: BlogListClientProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
    const [isLoading, setIsLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (!searchQuery.trim()) {
                setBlogs(initialBlogs);
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            try {
                const results = await searchBlogs(searchQuery);
                setBlogs(results);
            } catch (err) {
                console.error("SEARCH_ERROR:", err);
            } finally {
                setIsLoading(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery, initialBlogs]);

    return (
        <div className="space-y-10">
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <Input
                    type="text"
                    placeholder="Search articles, topics, or hashtags..."
                    className="pl-10 h-11 rounded-xl bg-zinc-900/60 border-zinc-800 text-sm text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 transition-all outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {isLoading && (
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                        <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
                    </div>
                )}
            </div>

            {/* Blog Cards Grid */}
            {blogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {blogs.map((blog, idx) => (
                        <BlurFade key={blog.id} delay={BLUR_FADE_DELAY * (idx + 1)}>
                            <Link href={`/blogs/${blog.slug}`} className="group block h-full">
                                <article className="flex flex-col h-full bg-zinc-900/40 hover:bg-zinc-900/80 rounded-2xl overflow-hidden border border-zinc-800/80 hover:border-zinc-700/90 shadow-lg transition-all duration-300 hover:-translate-y-1">
                                    {/* Thumbnail */}
                                    <div className="relative aspect-[16/9] overflow-hidden bg-zinc-950 border-b border-zinc-800/80">
                                        <ThumbnailWithFallback
                                            src={blog.thumbnail}
                                            alt={blog.title}
                                            className="transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>

                                    {/* Card Content */}
                                    <div className="flex-1 p-5 sm:p-6 flex flex-col space-y-3">
                                        {/* Date and Tag */}
                                        <div className="flex items-center gap-2.5 text-xs text-zinc-400 font-medium">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                                                <span>
                                                    {isMounted ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric"
                                                    }) : "Loading..."}
                                                </span>
                                            </div>
                                            <span>•</span>
                                            <span className="text-blue-400 font-medium">
                                                {blog.hashtags?.[0] || "Article"}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-snug group-hover:text-blue-400 transition-colors line-clamp-2">
                                            {blog.title}
                                        </h2>

                                        {/* Description */}
                                        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed line-clamp-2">
                                            {blog.description}
                                        </p>

                                        {/* Read Article Link */}
                                        <div className="pt-3 mt-auto flex items-center gap-1 text-xs font-semibold text-blue-400 group-hover:text-blue-300 group-hover:gap-1.5 transition-all">
                                            <span>Read Article</span>
                                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        </BlurFade>
                    ))}
                </div>
            ) : (
                <BlurFade delay={BLUR_FADE_DELAY}>
                    <div className="text-center py-16 space-y-3">
                        <div className="inline-flex items-center justify-center p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 mb-2">
                            <Search className="h-6 w-6 text-zinc-400" />
                        </div>
                        <h3 className="text-lg font-bold text-white">No articles found</h3>
                        <p className="text-zinc-400 text-sm max-w-xs mx-auto">
                            We couldn&apos;t find any posts matching &ldquo;{searchQuery}&rdquo;. Try another search term.
                        </p>
                    </div>
                </BlurFade>
            )}
        </div>
    );
}
