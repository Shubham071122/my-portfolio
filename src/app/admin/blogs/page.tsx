import BlogComponent from "@/components/admin/blog/blog-component";

export default function BlogsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold tracking-tight">Blogs</h2>
                    <p className="text-muted-foreground">Manage your blog posts and articles.</p>
                </div>
            </div>
            <BlogComponent />
        </div>
    );
}
