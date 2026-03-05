"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DateInput } from "@/components/ui/date-input";
import { Save, ArrowLeft, Upload, X, Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { WorkExperience } from "@/types/workExp";
import { uploadMedia } from "../../../../actions/media";
import { SkillMultiSelect } from "../skill/skill-multi-select";

interface WorkExperienceFormProps {
    initialData?: WorkExperience;
    onSubmit: (data: any) => void;
    isLoading?: boolean;
}

export function WorkExperienceForm({ initialData, onSubmit, isLoading: parentLoading }: WorkExperienceFormProps) {
    const isEditing = !!initialData;
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isCurrent, setIsCurrent] = useState(initialData?.isCurrent || false);
    const [internalLoading, setInternalLoading] = useState(false);

    const isLoading = parentLoading || internalLoading;

    const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        if (initialData) {
            const ids = (initialData.skills || [])
                .map((s: any) => typeof s === "string" ? s : s.skillId)
                .filter(Boolean);

            setSelectedSkillIds(ids);
            setStartDate(initialData.startDate || "");
            setEndDate(initialData.endDate || "");
            setIsCurrent(initialData.isCurrent || false);
            setThumbnailPreview(initialData.thumbnailUrl || null);
        }
    }, [initialData]);

    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(initialData?.thumbnailUrl || null);
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
        if (!data.company) newErrors.company = "Company name is required";
        if (!data.position) newErrors.position = "Position is required";
        if (!startDate) newErrors.startDate = "Start date is required";
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

            let thumbnailUrl = initialData?.thumbnailUrl || "";

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

            const finalData = {
                company: String(rawData.company || ""),
                position: String(rawData.position || ""),
                location: String(rawData.location || ""),
                websiteUrl: String(rawData.websiteUrl || ""),
                linkedinUrl: String(rawData.linkedinUrl || ""),
                description: String(rawData.description || ""),
                startDate: startDate ? new Date(startDate as string).toISOString() : "",
                endDate: (isCurrent || !endDate) ? null : new Date(endDate as string).toISOString(),
                isCurrent,
                skillIds: selectedSkillIds,
                thumbnailUrl: thumbnailUrl,
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
                    <Link href="/admin/work-experience">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <CardTitle className="text-2xl font-bold">
                        {isEditing ? "Edit Work Experience" : "Add Work Experience"}
                    </CardTitle>
                </div>
            </CardHeader>

            <form onSubmit={handleSubmit} className="space-y-8">
                <CardContent className="space-y-6 px-0">
                    {/* Thumbnail Upload Area */}
                    <div className="space-y-2">
                        <Label>Thumbnail Image</Label>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className={cn(
                                "relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
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
                                    <p className="text-xs text-muted-foreground">SVG, PNG, JPG (MAX. 800x400px)</p>
                                </div>
                            )}
                            <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/*" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="company" className="flex items-center gap-1">Company <span className="text-destructive">*</span></Label>
                            <Input id="company" name="company" defaultValue={initialData?.company} error={errors.company} />
                            {errors.company && <p className="text-xs text-destructive">{errors.company}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="position" className="flex items-center gap-1">Position <span className="text-destructive">*</span></Label>
                            <Input id="position" name="position" defaultValue={initialData?.position || initialData?.position} error={errors.position} />
                            {errors.position && <p className="text-xs text-destructive">{errors.position}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="startDate" className="flex items-center gap-1">Start Date <span className="text-destructive">*</span></Label>
                            <DateInput
                                id="startDate"
                                value={startDate}
                                onChange={setStartDate}
                                error={errors.startDate}
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="endDate">End Date</Label>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="isCurrent" checked={isCurrent} onChange={() => setIsCurrent(!isCurrent)} />
                                    <Label htmlFor="isCurrent" className="text-xs font-normal cursor-pointer">I currently work here</Label>
                                </div>
                            </div>
                            <DateInput
                                id="endDate"
                                value={endDate}
                                onChange={setEndDate}
                                disabled={isCurrent}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" name="location" defaultValue={initialData?.location} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="websiteUrl">Website URL</Label>
                            <Input id="websiteUrl" name="websiteUrl" type="url" defaultValue={initialData?.websiteUrl || initialData?.websiteUrl} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                        <Input id="linkedinUrl" name="linkedinUrl" type="url" defaultValue={initialData?.linkedinUrl} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="flex items-center gap-1">Description <span className="text-destructive">*</span></Label>
                        <Textarea id="description" name="description" className="min-h-[120px]" defaultValue={initialData?.description} error={errors.description} />
                        {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
                    </div>

                    <SkillMultiSelect
                        selectedSkillIds={selectedSkillIds}
                        onChange={setSelectedSkillIds}
                    />
                </CardContent>

                <CardFooter className="px-0 pt-6 flex justify-end gap-3 border-t">
                    <Link href="/admin/work-experience">
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
                            : (isEditing ? "Update Experience" : "Save Experience")
                        }
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
