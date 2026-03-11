"use client";

import { BlogForm } from "@/components/admin/blog/blog-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createBlog, updateBlog } from "../../../../actions/blog";
import { Blog, CreateBlogDto } from "@/types/blog";

interface BlogComponentInputProps {
    initialData?: Blog;
}

export default function BlogComponentInput({ initialData }: BlogComponentInputProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const isEditing = !!initialData;

    const handleSave = async (data: CreateBlogDto) => {
    
            setIsLoading(true);
            try {
                if(isEditing && initialData?.id) {
                    await updateBlog(initialData.id, data);
                    toast.success("Blog updated successfully!");
                } else {
                    await createBlog(data);
                    toast.success("Blog created successfully!");
                }
                router.refresh();
            } catch (error: any) {
                toast.error(error.message || "Failed to save blog");
                console.error("Failed to save blog:", error);
            } finally {
                setIsLoading(false);
            }
        };

    return (

        <div className="space-y-6 max-w-4xl mx-auto">
            <BlogForm onSubmit={handleSave} isLoading={isLoading} initialData={initialData} />
        </div>
    );
}
