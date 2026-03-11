"use client";

import { AdminTable, TableColumn } from "@/components/admin/admin-table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ConfirmModal } from "@/components/admin/confirm-modal";
import { Blog, BlogStatus } from "@/types/blog";
import { getAdminBlogs, deleteBlog } from "../../../../actions/blog";
import { FileText, Archive, Trash2, Edit } from "lucide-react";

export default function BlogComponent() {
    const router = useRouter();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);

    const handleEdit = (id: string) => {
        router.push(`/admin/blogs/edit/${id}`);
    };

    const handleDelete = (id: string) => {
        setItemToDelete(id);
    };

    const confirmDelete = async () => {
        if (!itemToDelete) return;

        setIsDeleting(true);
        try {
            await deleteBlog(itemToDelete);
            setBlogs((prev) => prev.filter((b) => b.id !== itemToDelete));
            toast.success("Blog deleted successfully");
        } catch (error: any) {
            toast.error(error.message || "Failed to delete blog");
            console.error("DELETE_BLOG_ERROR:", error);
        } finally {
            setIsDeleting(false);
            setItemToDelete(null);
        }
    };

    const columns: TableColumn<Blog>[] = [
        {
            key: "title",
            header: "Blog Post",
            render: (item: Blog) => (
                <div className="flex items-center gap-3 max-w-sm">
                    <Avatar className="h-10 w-10 border rounded-lg">
                        <AvatarImage src={item.thumbnail || ""} alt={item.title} className="object-cover" />
                        <AvatarFallback className="rounded-lg">
                            <FileText className="h-4 w-4" />
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col overflow-hidden">
                        <span className="font-semibold truncate">{item.title}</span>
                        <span className="text-xs text-muted-foreground truncate italic">/{item.slug}</span>
                    </div>
                </div>
            ),
        },
        {
            key: "status",
            header: "Status",
            render: (item: Blog) => {
                const variants: Record<BlogStatus, "default" | "secondary" | "outline" | "destructive"> = {
                    [BlogStatus.PUBLISHED]: "default",
                    [BlogStatus.DRAFT]: "secondary",
                    [BlogStatus.ARCHIVED]: "destructive",
                };
                return (
                    <Badge variant={variants[item.status] || "outline"} className="uppercase text-[10px] tracking-widest font-bold">
                        {item.status}
                    </Badge>
                );
            },
        },
        {
            key: "createdAt",
            header: "Created At",
            render: (item: Blog) => (
                <span className="text-xs font-medium tabular-nums text-muted-foreground">
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    })}
                </span>
            ),
        },
    ];

    useEffect(() => {
        const fetchBlogs = async () => {
            setIsLoading(true);
            try {
                const result = await getAdminBlogs();
                setBlogs(result || []);
            } catch (error: any) {
                toast.error(error.message || "Failed to load blogs");
                console.error("FETCH_BLOGS_ERROR:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div className="space-y-6">
            <AdminTable
                title="Blogs"
                data={blogs}
                columns={columns}
                addPath="/admin/blogs/new"
                onEdit={(item) => handleEdit(item.id)}
                onDelete={(item) => handleDelete(item.id)}
                isLoading={isLoading}
            />

            <ConfirmModal
                isOpen={!!itemToDelete}
                onClose={() => setItemToDelete(null)}
                onConfirm={confirmDelete}
                title="Delete Blog Post"
                description="This action cannot be undone. This will permanently delete this blog post."
                isLoading={isDeleting}
            />
        </div>
    );
}
