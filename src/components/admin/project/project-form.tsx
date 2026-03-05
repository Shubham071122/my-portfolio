"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { DateInput } from "@/components/ui/date-input";
import { Save, ArrowLeft, Upload, X, Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Project, ProjectStatus, CreateProjectDto } from "@/types/project";
import { uploadMedia } from "../../../../actions/media";
import { SkillMultiSelect } from "../skill/skill-multi-select";

interface ProjectFormProps {
    initialData?: Project;
    onSubmit: (data: any) => void;
    isLoading?: boolean;
}

export function ProjectForm({ initialData, onSubmit, isLoading: parentLoading }: ProjectFormProps) {
    const isEditing = !!initialData;
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [internalLoading, setInternalLoading] = useState(false);

    const isLoading = parentLoading || internalLoading;

    const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [status, setStatus] = useState<ProjectStatus>(initialData?.status || ProjectStatus.LIVE);

    useEffect(() => {
        if (initialData) {
            const ids = (initialData.skills || [])
                .map((s: any) => typeof s === "string" ? s : s.id || s.skillId)
                .filter(Boolean);

            setSelectedSkillIds(ids);
            setStartDate(initialData.startDate ? new Date(initialData.startDate).toISOString().split('T')[0] : "");
            setEndDate(initialData.endDate ? new Date(initialData.endDate).toISOString().split('T')[0] : "");
            setStatus(initialData.status || ProjectStatus.LIVE);
            setThumbnailPreview(initialData.thumbnail || null);
        }
    }, [initialData]);

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

    const validate = (data: any) => {
        const newErrors: Record<string, string> = {};
        if (!data.title) newErrors.title = "Title is required";
        if (!data.description) newErrors.description = "Description is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setInternalLoading(true);

        try {
            const formData = new FormData(e.currentTarget);
            const rawData = Object.fromEntries(formData.entries());

            let thumbnailUrl = initialData?.thumbnail || "";

            if (thumbnail) {
                try {
                    const formDataToUpload = new FormData();
                    formDataToUpload.append("file", thumbnail);
                    const mediaResponse = await uploadMedia(formDataToUpload);
                    thumbnailUrl = mediaResponse.url;
                } catch (err) {
                    console.error("THUMBNAIL_UPLOAD_ERROR:", err);
                }
            }

            const finalData: CreateProjectDto = {
                title: String(rawData.title || ""),
                description: String(rawData.description || ""),
                liveUrl: String(rawData.liveUrl || "") || undefined,
                gitUrl: String(rawData.gitUrl || "") || undefined,
                beGithubUrl: String(rawData.beGithubUrl || "") || undefined,
                feGithubUrl: String(rawData.feGithubUrl || "") || undefined,
                startDate: startDate ? new Date(startDate) : undefined,
                endDate: endDate ? new Date(endDate) : undefined,
                status: status,
                skillIds: selectedSkillIds,
                thumbnail: thumbnailUrl || undefined,
            };

            if (!validate(finalData)) return;
            await onSubmit(finalData);
        } finally {
            setInternalLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto border-none shadow-none bg-transparent">
            <CardHeader className="px-0">
                <div className="flex items-center gap-4">
                    <Link href="/admin/projects">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <CardTitle className="text-2xl font-bold">
                        {isEditing ? "Edit Project" : "Add Project"}
                    </CardTitle>
                </div>
            </CardHeader>

            <form onSubmit={handleSubmit} className="space-y-8">
                <CardContent className="space-y-6 px-0">
                    {/* Thumbnail Upload Area */}
                    <div className="space-y-2">
                        <Label>Project Thumbnail</Label>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className={cn(
                                "relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-all",
                                thumbnailPreview ? "border-primary/50 bg-muted/30" : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30"
                            )}
                        >
                            {thumbnailPreview ? (
                                <div className="relative w-full h-full p-2">
                                    <img src={thumbnailPreview} alt="Thumbnail Preview" className="w-full h-full object-contain rounded-md" />
                                    <Button
                                        type="button" variant="destructive" size="icon" className="absolute top-4 right-4 h-6 w-6 rounded-full"
                                        onClick={(e) => { e.stopPropagation(); handleRemoveThumbnail(); }}
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-muted-foreground">Recommend: 1200x630px (1.91:1)</p>
                                </div>
                            )}
                            <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/*" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="flex items-center gap-1">Title <span className="text-destructive">*</span></Label>
                            <Input id="title" name="title" defaultValue={initialData?.title} error={errors.title} placeholder="Awesome Project" />
                            {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status" className="flex items-center gap-1">Status</Label>
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value={ProjectStatus.LIVE}>Live</option>
                                <option value={ProjectStatus.WIP}>Work in Progress</option>
                                <option value={ProjectStatus.ARCHIVED}>Archived</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="flex items-center gap-1">Description <span className="text-destructive">*</span></Label>
                        <Textarea id="description" name="description" className="min-h-[120px]" defaultValue={initialData?.description} error={errors.description} placeholder="Describe your project..." />
                        {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="liveUrl">Live URL</Label>
                            <Input id="liveUrl" name="liveUrl" type="url" defaultValue={initialData?.liveUrl} placeholder="https://example.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="gitUrl">Git URL (Main)</Label>
                            <Input id="gitUrl" name="gitUrl" type="url" defaultValue={initialData?.gitUrl} placeholder="https://github.com/..." />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="feGithubUrl">Frontend Git URL</Label>
                            <Input id="feGithubUrl" name="feGithubUrl" type="url" defaultValue={initialData?.feGithubUrl} placeholder="https://github.com/..." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="beGithubUrl">Backend Git URL</Label>
                            <Input id="beGithubUrl" name="beGithubUrl" type="url" defaultValue={initialData?.beGithubUrl} placeholder="https://github.com/..." />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="startDate">Start Date</Label>
                            <DateInput
                                id="startDate"
                                value={startDate}
                                onChange={setStartDate}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="endDate">End Date</Label>
                            <DateInput
                                id="endDate"
                                value={endDate}
                                onChange={setEndDate}
                            />
                        </div>
                    </div>

                    <SkillMultiSelect
                        selectedSkillIds={selectedSkillIds}
                        onChange={setSelectedSkillIds}
                    />
                </CardContent>

                <CardFooter className="px-0 pt-6 flex justify-end gap-3 border-t">
                    <Link href="/admin/projects">
                        <Button variant="outline" type="button" disabled={isLoading}>Cancel</Button>
                    </Link>
                    <Button type="submit" className="gap-2 min-w-[140px]" disabled={isLoading}>
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="h-4 w-4" />
                        )}
                        {isLoading
                            ? (isEditing ? "Updating..." : "Saving...")
                            : (isEditing ? "Update Project" : "Save Project")
                        }
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
