"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Save, ArrowLeft, RotateCcw, Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { SkillCategory, CreateSkillDto, Skill } from "@/types/skill";
import { cn } from "@/lib/utils";

interface SkillFormProps {
    initialData?: Skill;
    onSubmit: (data: CreateSkillDto) => void;
    isLoading?: boolean;
}

export function SkillForm({ initialData, onSubmit, isLoading }: SkillFormProps) {
    const isEditing = !!initialData;
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState<CreateSkillDto>({
        name: initialData?.name || "",
        category: initialData?.category || SkillCategory.OTHER,
        isFeatured: initialData?.isFeatured || false,
    });

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = "Skill name is required";
        if (!formData.category) newErrors.category = "Category is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        onSubmit(formData);
    };

    const handleReset = () => {
        setFormData({
            name: initialData?.name || "",
            category: initialData?.category || SkillCategory.OTHER,
            isFeatured: initialData?.isFeatured || false,
        });
        setErrors({});
    };

    return (
        <Card className="w-full max-w-xl mx-auto border-none shadow-none bg-transparent">
            <CardHeader className="px-0">
                <div className="flex items-center gap-4">
                    <Link href="/admin/skills">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <CardTitle className="text-2xl font-bold">
                        {isEditing ? "Edit Skill" : "Add New Skill"}
                    </CardTitle>
                </div>
            </CardHeader>

            <form onSubmit={handleSubmit} className="space-y-8">
                <CardContent className="space-y-6 px-0">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="flex items-center gap-1">
                            Skill Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="name"
                            placeholder="e.g. React, TypeScript, Node.js"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            error={errors.name}
                        />
                        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category" className="flex items-center gap-1">
                            Category <span className="text-destructive">*</span>
                        </Label>
                        <select
                            id="category"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value as SkillCategory })}
                            className={cn(
                                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
                                errors.category && "border-destructive focus-visible:ring-destructive"
                            )}
                        >
                            {Object.values(SkillCategory).map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat.replace("_", " ")}
                                </option>
                            ))}
                        </select>
                        {errors.category && <p className="text-xs text-destructive">{errors.category}</p>}
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                        <Checkbox
                            id="isFeatured"
                            checked={formData.isFeatured}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, isFeatured: e.target.checked })}
                        />
                        <div className="grid gap-1.5 leading-none">
                            <Label htmlFor="isFeatured" className="text-sm font-medium cursor-pointer">
                                Featured Skill
                            </Label>
                            <p className="text-xs text-muted-foreground">
                                Featured skills will be highlighted on your public profile.
                            </p>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="px-0 pt-6 flex justify-end gap-3 border-t">
                    <Button
                        variant="outline"
                        type="button"
                        onClick={handleReset}
                        className="gap-2"
                        disabled={isLoading}
                    >
                        <RotateCcw className="h-4 w-4" />
                        Reset
                    </Button>
                    <Button type="submit" className="gap-2 min-w-[140px]" disabled={isLoading}>
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="h-4 w-4" />
                        )}
                        {
                            isLoading ? (isEditing ? "Updating..." : "Saving...")
                                : (isEditing ? "Update Skill" : "Save Skill")
                        }
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
