"use client";

import { WorkExperienceForm } from "@/components/admin/workExperience/work-experience-form";
import { createWorkExperience, updateWorkExperience } from "../../../../actions/work-experience";
import { toast } from "sonner";
import { useState } from "react";
import { CreateWorkExperienceDto, WorkExperience } from "@/types/workExp";
import { useRouter } from "next/navigation";

interface WorkExperienceComponentInputProps {
    initialData?: WorkExperience;
}

export default function WorkExperienceComponentInput({ initialData }: WorkExperienceComponentInputProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const isEditing = !!initialData;

    const handleSave = async (data: CreateWorkExperienceDto) => {

        setIsLoading(true);
        try {
            if(isEditing && initialData?.id) {
                await updateWorkExperience(initialData.id, data);
                toast.success("Record updated successfully!");
            } else {
                await createWorkExperience(data);
                toast.success("Record created successfully!");
            }
            router.refresh();
        } catch (error: any) {
            toast.error(error.message || "Failed to save record");
            console.error("Failed to save:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <WorkExperienceForm onSubmit={handleSave} isLoading={isLoading} initialData={initialData} />
        </div>
    );
}
