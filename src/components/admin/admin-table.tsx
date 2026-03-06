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
import { motion, AnimatePresence } from "framer-motion";

export interface TableColumn<T> {
    key: keyof T | string;
    header: string;
    render?: (item: T) => React.ReactNode;
    sortable?: boolean;
}

type SortOrder = "asc" | "desc" | null;

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
    const [sortKey, setSortKey] = React.useState<string | null>(null);
    const [sortOrder, setSortOrder] = React.useState<SortOrder>(null);

    const handleSort = (key: string) => {
        if (sortKey === key) {
            if (sortOrder === "asc") setSortOrder("desc");
            else if (sortOrder === "desc") {
                setSortOrder(null);
                setSortKey(null);
            }
        } else {
            setSortKey(key);
            setSortOrder("asc");
        }
    };

    const sortedData = React.useMemo(() => {
        if (!sortKey || !sortOrder) return data;

        return [...data].sort((a, b) => {
            const aValue = (a as any)[sortKey];
            const bValue = (b as any)[sortKey];

            if (aValue === bValue) return 0;
            if (aValue === null || aValue === undefined) return 1;
            if (bValue === null || bValue === undefined) return -1;

            const comparison = aValue < bValue ? -1 : 1;
            return sortOrder === "asc" ? comparison : -comparison;
        });
    }, [data, sortKey, sortOrder]);

    const getSortIcon = (key: string) => {
        if (sortKey !== key) return <ArrowUpDown className="h-3 w-3 opacity-50" />;
        if (sortOrder === "asc") return <ArrowUpDown className="h-3 w-3 text-primary" />;
        if (sortOrder === "desc") return <ArrowUpDown className="h-3 w-3 text-primary rotate-180 transition-transform" />;
        return <ArrowUpDown className="h-3 w-3 opacity-50" />;
    };
    return (
        <Card className="w-full overflow-hidden border-none shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/20 px-6 py-5">
                <div className="space-y-1">
                    <CardTitle className="text-2xl font-bold tracking-tight text-foreground">{title}</CardTitle>
                    <p className="text-sm text-muted-foreground font-medium">Manage your {title.toLowerCase()} collection with ease.</p>
                </div>
                <div className="flex items-center gap-3">
                    {addPath ? (
                        <Link href={addPath}>
                            <Button size="sm" className="h-9 px-4 gap-2 font-semibold shadow-sm transition-all hover:shadow-md active:scale-95">
                                <Plus className="h-4 w-4" />
                                Create New
                            </Button>
                        </Link>
                    ) : onAdd ? (
                        <Button size="sm" className="h-9 px-4 gap-2 font-semibold shadow-sm transition-all hover:shadow-md active:scale-95" onClick={onAdd}>
                            <Plus className="h-4 w-4" />
                            Create New
                        </Button>
                    ) : null}
                </div>
            </CardHeader>

            <CardContent className="p-0">
                <div className="relative overflow-x-auto border">
                    <table className="w-full border-collapse text-sm border-b">
                        <thead className="sticky top-0 z-10 bg-muted/80 backdrop-blur-md border-b">
                            <tr>
                                {columns.map((col) => {
                                    const isSortable = col.sortable !== false;
                                    return (
                                        <th
                                            key={col.header}
                                            className="h-12 px-6 text-left align-middle font-bold text-muted-foreground uppercase tracking-wider text-[11px]"
                                        >
                                            <div
                                                className={cn(
                                                    "flex items-center gap-1.5 transition-colors group",
                                                    isSortable && "cursor-pointer hover:text-foreground select-none"
                                                )}
                                                onClick={() => isSortable && handleSort(col.key as string)}
                                            >
                                                {col.header}
                                                {isSortable && (
                                                    <span className="transition-transform duration-200 group-hover:scale-110">
                                                        {getSortIcon(col.key as string)}
                                                    </span>
                                                )}
                                            </div>
                                        </th>
                                    );
                                })}
                                <th className="h-12 px-6 text-right align-middle font-bold text-muted-foreground uppercase tracking-wider text-[11px]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            <AnimatePresence mode="popLayout" initial={false}>
                                {isLoading ? (
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <td colSpan={columns.length + 1} className="h-64 text-center">
                                            <div className="flex flex-col items-center justify-center gap-3">
                                                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                                                <p className="text-sm font-medium text-muted-foreground">Loading records...</p>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ) : sortedData.length === 0 ? (
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <td colSpan={columns.length + 1} className="h-64 text-center">
                                            <div className="flex flex-col items-center justify-center gap-4 py-12">
                                                <div className="rounded-full bg-muted p-4">
                                                    <Search className="h-8 w-8 text-muted-foreground/50" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-base font-semibold">No results found</p>
                                                    <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                                                        We couldn&apos;t find any {title.toLowerCase()} that match your current search or records.
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ) : (
                                    sortedData.map((item, idx) => (
                                        <motion.tr
                                            key={(item as any).id || idx}
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.98 }}
                                            transition={{ duration: 0.2, delay: idx * 0.03 }}
                                            className="group hover:bg-muted/40 transition-colors"
                                        >
                                            {columns.map((col) => (
                                                <td key={col.header} className="px-6 py-4 align-middle border-none transition-all group-hover:translate-x-0.5">
                                                    <div className="font-medium text-foreground/90">
                                                        {col.render ? col.render(item) : (item[col.key as keyof T] as any)}
                                                    </div>
                                                </td>
                                            ))}
                                            <td className="px-6 py-4 align-middle text-right border-none">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {onEdit && (
                                                        <Button
                                                            variant="secondary"
                                                            size="icon"
                                                            className="h-8 w-8 shadow-sm hover:bg-primary hover:text-primary-foreground transition-all"
                                                            onClick={() => onEdit(item)}
                                                        >
                                                            <Edit className="h-3.5 w-3.5" />
                                                        </Button>
                                                    )}
                                                    {onDelete && (
                                                        <Button
                                                            variant="secondary"
                                                            size="icon"
                                                            className="h-8 w-8 shadow-sm hover:bg-destructive hover:text-destructive-foreground transition-all"
                                                            onClick={() => onDelete(item)}
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </CardContent>

            <div className="flex items-center justify-between bg-muted/10 px-6 py-4">
                <div className="text-sm font-medium text-muted-foreground">
                    Showing <span className="text-foreground">1-{data.length}</span> of <span className="text-foreground font-bold">{data.length}</span> records
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-8 min-w-[32px] font-semibold flex items-center gap-1 hover:bg-white dark:hover:bg-muted"
                        disabled
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                    </Button>
                    
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-8 min-w-[32px] font-semibold flex items-center gap-1 hover:bg-white dark:hover:bg-muted"
                        disabled
                    >
                        Next
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </Card>
    );
}
