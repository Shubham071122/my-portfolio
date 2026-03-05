import { AdminTable } from "@/components/admin/admin-table";
import { getBlogPosts } from "@/data/blog";
import { Badge } from "@/components/ui/badge";
import { FileText, Eye, Calendar } from "lucide-react";

export default async function StaticPagesPage() {
  const posts = await getBlogPosts();

  const columns = [
    {
      key: "title",
      header: "Page Title",
      render: (item: any) => (
        <div className="flex items-center gap-3">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{item.metadata.title}</span>
        </div>
      ),
    },
    {
      key: "slug",
      header: "URL Path",
      render: (item: any) => (
        <code className="text-[10px] bg-muted px-1 py-0.5 rounded">
          /blog/{item.slug}
        </code>
      ),
    },
    {
      key: "publishedAt",
      header: "Last Published",
      render: (item: any) => (
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          {new Date(item.metadata.publishedAt).toLocaleDateString("en-US", { 
            month: "short", 
            day: "numeric", 
            year: "numeric" 
          })}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: () => (
        <Badge className="bg-green-500/10 text-green-500" variant="outline">
          Published
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Static Pages</h2>
          <p className="text-muted-foreground">Manage your site&#39;s static content and blog posts.</p>
        </div>
      </div>

      <AdminTable 
        title="Content Pages" 
        data={posts as any} 
        columns={columns} 
      />
    </div>
  );
}
