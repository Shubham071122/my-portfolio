"use client";

import { useState } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { Blog } from "@/types/blog";
import Link from "next/link";
import Image from "next/image";
import { Search, Calendar, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import ThumbnailWithFallback from "./thumbnail-with-fallback";

interface BlogListClientProps {
    initialBlogs: Blog[];
}

const BLUR_FADE_DELAY = 0.04;

export default function BlogListClient({ initialBlogs }: BlogListClientProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredBlogs = initialBlogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.hashtags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="space-y-12">
            <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Search articles, topics, or hashtags..."
                    className="pl-10 h-12 rounded-xl bg-zinc-100/50 dark:bg-white/[0.05] border-zinc-200/50 dark:border-white/[0.1] focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-shadow outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {filteredBlogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredBlogs.map((blog, idx) => (
                        <BlurFade key={blog.id} delay={BLUR_FADE_DELAY * (idx + 1)}>
                            <Link href={`/blogs/${blog.slug}`} className="group block h-full">
                                <article className="flex flex-col h-full bg-white dark:bg-zinc-900/50 rounded-2xl overflow-hidden border border-zinc-200/50 dark:border-white/[0.08] shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1">
                                    <div className="relative aspect-[16/9] overflow-hidden">
                                        <ThumbnailWithFallback
                                            src={blog.thumbnail}
                                            alt={blog.title}
                                            className="transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                    </div>
                                    <div className="flex-1 p-4 sm:p-6 flex flex-col space-y-4">
                                        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="h-3 w-3" />
                                                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric"
                                                })}
                                            </div>
                                            <div className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                                            <div className="text-primary/80">
                                                {blog.hashtags?.[0] || "Article"}
                                            </div>
                                        </div>

                                        <h2 className="text-2xl sm:text-2xl font-black tracking-tight leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                            {blog.title}
                                        </h2>

                                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed line-clamp-3">
                                            {blog.description}
                                        </p>

                                        <div className="pt-4 mt-auto flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-3 transition-all">
                                            Read Article
                                            <ChevronRight className="h-4 w-4" />
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        </BlurFade>
                    ))}
                </div>
            ) : (
                <BlurFade delay={BLUR_FADE_DELAY}>
                    <div className="text-center py-20 space-y-4">
                        <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-muted/50 mb-4">
                            <Search className="h-8 w-8 text-muted-foreground/50" />
                        </div>
                        <h3 className="text-xl font-bold">No articles found</h3>
                        <p className="text-muted-foreground max-w-xs mx-auto">
                            We couldn&apos;t find any posts matching &ldquo;{searchQuery}&rdquo;. Try another search term.
                        </p>
                    </div>
                </BlurFade>
            )}
        </div>
    );
}
