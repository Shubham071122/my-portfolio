"use client";

import { SkillForm } from "@/components/admin/skill/skill-form";
import { CreateSkillDto, Skill } from "@/types/skill";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createSkill, updateSkill } from "../../../../actions/skill";
import { toast } from "sonner";

interface SkillComponentInputProps {
    initialData?: Skill;
}

export default function SkillComponentInput({ initialData }: SkillComponentInputProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const isEditing = !!initialData;

    const handleSave = async (data: CreateSkillDto) => {
        setIsLoading(true);
        try {
            if (isEditing && initialData?.id) {
                await updateSkill(initialData.id, data);
                toast.success("Skill updated successfully");
            } else {
                await createSkill(data);
                toast.success("Skill created successfully");
            }
            router.refresh();
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
            console.error("SAVE_SKILL_ERROR:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <SkillForm initialData={initialData} onSubmit={handleSave} isLoading={isLoading} />
        </div>
    );
}
