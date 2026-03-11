"use client";

import { AdminTable } from "@/components/admin/admin-table";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar } from "lucide-react";
import React from "react";

interface StaticPagesClientProps {
    posts: any[];
}

export function StaticPagesClient({ posts }: StaticPagesClientProps) {
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
                    /blogs/{item.slug}
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
        <AdminTable
            title="Content Pages"
            data={posts}
            columns={columns}
        />
    );
}
