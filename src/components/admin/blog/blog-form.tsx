"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Save, ArrowLeft, Upload, X, Loader2, Image as ImageIcon, Eye, Edit3, Monitor, Smartphone, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Blog, BlogStatus, CreateBlogDto } from "@/types/blog";
import { uploadMedia } from "../../../../actions/media";
import dynamic from "next/dynamic";
import MarkdownContent from "@/components/blog/markdown-content";
import "easymde/dist/easymde.min.css";
import { motion, AnimatePresence } from "framer-motion";

// Dynamic import for SimpleMDE to avoid SSR issues
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

interface BlogFormProps {
    initialData?: Blog;
    onSubmit: (data: any) => void;
    isLoading?: boolean;
}

export function BlogForm({ initialData, onSubmit, isLoading: parentLoading }: BlogFormProps) {
    const isEditing = !!initialData;
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [internalLoading, setInternalLoading] = useState(false);
    const isLoading = parentLoading || internalLoading;

    const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");
    const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");

    const [title, setTitle] = useState(initialData?.title || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [slug, setSlug] = useState(initialData?.slug || "");
    const [content, setContent] = useState(initialData?.content || "");
    const [status, setStatus] = useState<BlogStatus>(initialData?.status || BlogStatus.DRAFT);
    const [hashtags, setHashtags] = useState<string>(initialData?.hashtags?.join(", ") || "");

    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(initialData?.thumbnail || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setThumbnail(file);
            const reader = new FileReader();
            reader.onloadend = () => setThumbnailPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveThumbnail = () => {
        setThumbnail(null);
        setThumbnailPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleContentChange = useCallback((value: string) => {
        setContent(value);
    }, []);

    const mdeOptions = useMemo(() => {
        return {
            autofocus: false,
            spellChecker: false,
            placeholder: "Write your blog post content here...",
            status: ["lines", "words", "cursor"],
            renderingConfig: {
                singleLineBreaks: false,
                codeSyntaxHighlighting: true,
            },
            uploadImage: true,
            imageUploadFunction: async (file: File, onSuccess: (url: string) => void, onError: (error: string) => void) => {
                try {
                    const formData = new FormData();
                    formData.append("file", file);
                    const response = await uploadMedia(formData);
                    onSuccess(response.url);
                } catch (error) {
                    console.error("IMAGE_UPLOAD_ERROR:", error);
                    onError("Failed to upload image.");
                }
            },
            imageAccept: "image/png, image/jpeg, image/gif, image/webp",
            imageMaxSize: 10 * 1024 * 1024, // 10MB
        };
    }, []);

    const validate = (data: any) => {
        const newErrors: Record<string, string> = {};
        if (!data.title) newErrors.title = "Title is required";
        if (!data.slug) newErrors.slug = "Slug is required";
        if (!data.description) newErrors.description = "Description is required";
        if (!data.content) newErrors.content = "Content is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setInternalLoading(true);

        try {
            let thumbnailUrl = "";

            if (thumbnailPreview) {
                if (thumbnail) {
                    try {
                        const formDataToUpload = new FormData();
                        formDataToUpload.append("file", thumbnail);
                        const mediaResponse = await uploadMedia(formDataToUpload);
                        thumbnailUrl = mediaResponse.url;
                    } catch (err) {
                        console.error("THUMBNAIL_UPLOAD_ERROR:", err);
                        thumbnailUrl = initialData?.thumbnail || "";
                    }
                } else {
                    thumbnailUrl = initialData?.thumbnail || "";
                }
            }

            const finalData: CreateBlogDto = {
                title: title,
                slug: slug,
                description: description,
                thumbnail: thumbnailUrl || undefined,
                content: content,
                hashtags: hashtags.split(",").map(tag => tag.trim()).filter(Boolean),
                status: status,
            };

            if (!validate(finalData)) return;
            await onSubmit(finalData);
        } finally {
            setInternalLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-6xl mx-auto border-none shadow-none bg-transparent">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-card/50 backdrop-blur-xl border p-4 rounded-2xl sticky top-4 z-50">
                <div className="flex items-center gap-4">
                    <Link href="/admin/blogs">
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-muted">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h2 className="text-lg font-bold leading-none mb-1">
                            {isEditing ? "Edit Post" : "New Post"}
                        </h2>
                        <p className="text-xs text-muted-foreground font-medium">
                            {isEditing ? "Optimizing your latest masterpiece" : "Creating something awesome"}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex items-center bg-muted/50 p-1 rounded-xl border">
                        <Button
                            type="button"
                            variant={viewMode === "edit" ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => setViewMode("edit")}
                            className={cn("h-8 gap-1.5 px-3 rounded-lg font-semibold", viewMode === "edit" && "shadow-sm")}
                        >
                            <Edit3 className="h-3.5 w-3.5" />
                            Write
                        </Button>
                        <Button
                            type="button"
                            variant={viewMode === "preview" ? "secondary" : "ghost"}
                            size="sm"
                            onClick={() => setViewMode("preview")}
                            className={cn("h-8 gap-1.5 px-3 rounded-lg font-semibold", viewMode === "preview" && "shadow-sm")}
                        >
                            <Eye className="h-3.5 w-3.5" />
                            Preview
                        </Button>
                    </div>
                    <div className="h-8 w-px bg-border mx-1 hidden sm:block" />
                    <Button
                        onClick={() => (document.getElementById("blog-form-submit") as HTMLButtonElement).click()}
                        className="h-9 gap-1.5 px-5 rounded-xl font-bold bg-primary shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        {isEditing ? "Update" : "Publish"}
                    </Button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 pb-20">
                <button type="submit" id="blog-form-submit" className="hidden" />

                <AnimatePresence mode="wait">
                    {viewMode === "edit" ? (
                        <motion.div
                            key="edit-mode"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-8"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="bg-card border rounded-2xl p-6 shadow-sm space-y-4">
                                        <div className="space-y-1">
                                            <Label htmlFor="title" className="text-xs font-bold text-muted-foreground uppercase tracking-tight">Title</Label>
                                            <Input
                                                id="title"
                                                name="title"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                error={errors.title}
                                                placeholder="Post Title"
                                                className="text-2xl font-bold h-12 bg-transparent border-none px-0 focus-visible:ring-0"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <Label htmlFor="description" className="text-xs font-bold text-muted-foreground uppercase tracking-tight">Description</Label>
                                            <Textarea
                                                id="description"
                                                name="description"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                error={errors.description}
                                                placeholder="Short summary..."
                                                className="min-h-[60px] resize-none bg-transparent border-none px-0 focus-visible:ring-0 text-base"
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-card border rounded-2xl shadow-sm overflow-hidden">
                                        <div className="px-4 py-3 bg-muted/30 border-b">
                                            <Label className="text-xs font-bold text-muted-foreground uppercase">Content</Label>
                                        </div>
                                        <div className="p-0 editor-compact">
                                            <SimpleMDE
                                                value={content}
                                                onChange={handleContentChange}
                                                options={mdeOptions}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-card border rounded-2xl p-6 shadow-sm space-y-6">
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold text-muted-foreground uppercase">Cover Image</Label>
                                            <div
                                                onClick={() => fileInputRef.current?.click()}
                                                className={cn(
                                                    "relative flex flex-col items-center justify-center w-full aspect-video border border-dashed rounded-xl cursor-pointer transition-all overflow-hidden",
                                                    thumbnailPreview ? "border-primary/20 bg-muted/10" : "border-muted-foreground/20 hover:bg-muted/30"
                                                )}
                                            >
                                                {thumbnailPreview ? (
                                                    <div className="relative w-full h-full">
                                                        <Image src={thumbnailPreview} alt="Thumbnail" fill className="object-cover" unoptimized />
                                                        <Button
                                                            type="button"
                                                            variant="destructive"
                                                            size="icon"
                                                            className="absolute top-2 right-2 h-7 w-7 rounded-lg z-10"
                                                            onClick={(e) => { e.stopPropagation(); handleRemoveThumbnail(); }}
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center p-4">
                                                        <ImageIcon className="w-6 h-6 mb-2 text-muted-foreground" />
                                                        <p className="text-xs font-medium text-muted-foreground text-center">Click to upload</p>
                                                    </div>
                                                )}
                                                <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/*" />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="space-y-1.5">
                                                <Label htmlFor="status" className="text-xs font-bold text-muted-foreground uppercase">Status</Label>
                                                <select
                                                    id="status"
                                                    value={status}
                                                    onChange={(e) => setStatus(e.target.value as BlogStatus)}
                                                    className="flex h-10 w-full rounded-xl border border-input bg-background/50 px-3 text-sm font-medium focus:ring-1 focus:ring-primary outline-none"
                                                >
                                                    <option value={BlogStatus.DRAFT}>Draft</option>
                                                    <option value={BlogStatus.PUBLISHED}>Published</option>
                                                    <option value={BlogStatus.ARCHIVED}>Archived</option>
                                                </select>
                                            </div>

                                            <div className="space-y-1.5">
                                                <Label htmlFor="slug" className="text-xs font-bold text-muted-foreground uppercase">URL Slug</Label>
                                                <div className="flex items-center gap-1.5 px-3 h-10 border rounded-xl bg-background/50">
                                                    <span className="text-[10px] font-bold text-muted-foreground opacity-50">/blogs/</span>
                                                    <Input
                                                        id="slug"
                                                        name="slug"
                                                        value={slug}
                                                        onChange={(e) => setSlug(e.target.value)}
                                                        error={errors.slug}
                                                        placeholder="my-cool-post"
                                                        className="h-6 border-none p-0 focus-visible:ring-0 font-medium text-xs"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <Label htmlFor="hashtags" className="text-xs font-bold text-muted-foreground uppercase">Tags</Label>
                                                <Input
                                                    id="hashtags"
                                                    value={hashtags}
                                                    onChange={(e) => setHashtags(e.target.value)}
                                                    placeholder="tag1, tag2..."
                                                    className="h-10 rounded-xl border-input bg-background/50"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="preview-mode"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full flex justify-center"
                        >
                            <div className={cn(
                                "bg-card border rounded-3xl overflow-hidden transition-all duration-300 w-full max-w-4xl",
                                previewDevice === "mobile" && "max-w-[400px]"
                            )}>
                                {/* Device Toggle in Preview */}
                                <div className="flex border-b bg-muted/20 p-2 justify-center gap-1">
                                    <Button
                                        type="button"
                                        variant={previewDevice === "desktop" ? "secondary" : "ghost"}
                                        // size="xs"
                                        onClick={() => setPreviewDevice("desktop")}
                                        className="h-7 gap-1 px-3 text-[10px] font-bold uppercase"
                                    >
                                        <Monitor className="h-3 w-3" />
                                        Laptop
                                    </Button>
                                    <Button
                                        type="button"
                                        variant={previewDevice === "mobile" ? "secondary" : "ghost"}
                                        // size="xs"
                                        onClick={() => setPreviewDevice("mobile")}
                                        className="h-7 gap-1 px-3 text-[10px] font-bold uppercase"
                                    >
                                        <Smartphone className="h-3 w-3" />
                                        Mobile
                                    </Button>
                                </div>

                                <div className="p-6 md:p-10">
                                    <div className="max-w-3xl mx-auto space-y-6 mb-10">
                                        <div className="flex gap-2 flex-wrap">
                                            {hashtags.split(",").map((tag, i) => tag.trim() && (
                                                <span key={i} className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] rounded-md font-bold uppercase">
                                                    {tag.trim()}
                                                </span>
                                            ))}
                                        </div>
                                        <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                                            {title || "No Title"}
                                        </h1>
                                        <p className="text-lg text-muted-foreground leading-relaxed">
                                            {description || "No Description"}
                                        </p>
                                    </div>

                                    {thumbnailPreview && (
                                        <div className="relative aspect-video rounded-2xl overflow-hidden mb-10 border">
                                            <Image src={thumbnailPreview} alt="Cover" fill className="object-cover" unoptimized />
                                        </div>
                                    )}

                                    <MarkdownContent content={content || "_No content_"} />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>
        </Card>
    );
}
