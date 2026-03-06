import { getBlogPosts } from "@/data/blog";
import { StaticPagesClient } from "@/components/admin/static-pages/static-pages-client";

export default async function StaticPagesPage() {
  const posts = await getBlogPosts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Static Pages</h2>
          <p className="text-muted-foreground">Manage your site&#39;s static content and blog posts.</p>
        </div>
      </div>

      <StaticPagesClient posts={posts as any} />
    </div>
  );
}
