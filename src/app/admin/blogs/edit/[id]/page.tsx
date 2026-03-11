"use client";

import { getBlogById, updateBlog } from "../../../../../../actions/blog";
import { useEffect, useState } from "react";
import { Blog } from "@/types/blog";
import { ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";
import BlogComponentInput from "@/components/admin/blog/blog-component-input";

export default function EditBlogPage({ params }: { params: { id: string } }) {
    const [blog, setBlog] = useState<Blog>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const data = await getBlogById(params.id);
                setBlog(data);
            } catch (error) {
                console.log("FETCH_BLOG_ERROR:", error)
            } finally {
                setIsLoading(false);
            }
        };

        if (params.id) fetchBlog();
    }, [params.id]);

    if (isLoading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="p-8 text-center text-muted-foreground border rounded-xl border-dashed">
                Blog not found
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Link href="/admin" className="hover:text-foreground transition-colors">Dashboard</Link>
                <ChevronRight className="h-4 w-4 opacity-50" />
                <Link href="/admin/blogs" className="hover:text-foreground transition-colors">Blogs</Link>
                <ChevronRight className="h-4 w-4 opacity-50" />
                <span className="text-foreground font-medium">Edit Blog</span>
            </nav>

            <BlogComponentInput initialData={blog} />
        </div>
    );
}
