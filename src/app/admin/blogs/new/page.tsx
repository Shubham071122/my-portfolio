import Link from "next/link";
import { ChevronRight } from "lucide-react";
import BlogComponentInput from "@/components/admin/blog/blog-component-input";

export default function NewBlogPage() {

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Link href="/admin" className="hover:text-foreground">Dashboard</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/admin/blogs" className="hover:text-foreground">Blogs</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground font-medium">New Blog</span>
            </nav>
            <BlogComponentInput />
        </div>
    );
}
