"use client";

import {
    Plus,
    Search,
    ChevronLeft,
    ChevronRight,
    MoreVertical,
    ArrowUpDown,
    Filter,
    Edit,
    Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export interface TableColumn<T> {
    key: keyof T | string;
    header: string;
    render?: (item: T) => React.ReactNode;
}

interface AdminTableProps<T> {
    title: string;
    description?: string;
    data: T[];
    columns: TableColumn<T>[];
    onAdd?: () => void;
    addPath?: string;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    isLoading?: boolean;
}

export function AdminTable<T>({
    title,
    data,
    columns,
    onAdd,
    addPath,
    onEdit,
    onDelete,
    isLoading
}: AdminTableProps<T>) {
    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between border-b px-0 py-4">
                <div className="space-y-1">
                    <CardTitle className="text-xl font-bold">{title}</CardTitle>
                    <p className="text-sm text-muted-foreground">Manage your {title.toLowerCase()} data here.</p>
                </div>
                <div className="flex items-center gap-2">
                    {addPath ? (
                        <Link href={addPath}>
                            <Button size="sm" className="h-8 gap-1">
                                <Plus className="h-4 w-4" />
                                Add New
                            </Button>
                        </Link>
                    ) : onAdd ? (
                        <Button size="sm" className="h-8 gap-1" onClick={onAdd}>
                            <Plus className="h-4 w-4" />
                            Add New
                        </Button>
                    ) : null}
                </div>
            </CardHeader>

            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                        <thead className="bg-muted/50 border-b">
                            <tr>
                                {columns.map((col) => (
                                    <th
                                        key={col.header}
                                        className="h-10 px-4 text-left align-middle font-medium text-muted-foreground whitespace-nowrap"
                                    >
                                        <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">
                                            {col.header}
                                            <ArrowUpDown className="h-3 w-3" />
                                        </div>
                                    </th>
                                ))}
                                <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={columns.length + 1} className="h-24 text-center">Loading...</td>
                                </tr>
                            ) : data.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length + 1} className="h-24 text-center">No results found.</td>
                                </tr>
                            ) : (
                                data.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-muted/30 transition-colors">
                                        {columns.map((col) => (
                                            <td key={col.header} className="p-4 align-middle">
                                                {col.render ? col.render(item) : (item[col.key as keyof T] as any)}
                                            </td>
                                        ))}
                                        <td className="p-4 align-middle text-right">
                                            <div className="flex justify-end gap-1">
                                                {onEdit && (
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => onEdit(item)}>
                                                        <Edit className="h-4 w-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Button>
                                                )}
                                                {onDelete && (
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => onDelete(item)}>
                                                        <Trash2 className="h-4 w-4" />
                                                        <span className="sr-only">Delete</span>
                                                    </Button>
                                                )}
                                                {!onEdit && !onDelete && (
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreVertical className="h-4 w-4" />
                                                        <span className="sr-only">Open menu</span>
                                                    </Button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </CardContent>

            <div className="flex items-center justify-between border-t px-6 py-4">
                <div className="text-sm text-muted-foreground">
                    Showing <strong>1-{data.length}</strong> of <strong>{data.length}</strong> results
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </Card>
    );
}
