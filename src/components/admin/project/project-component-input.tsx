"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreateProjectDto, Project } from "@/types/project";
import { createProject, updateProject } from "../../../../actions/project";
import { ProjectForm } from "./project-form";

interface ProjectComponentInputProps {
    initialData?: Project;
}

export default function ProjectComponentInput({ initialData }: ProjectComponentInputProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const isEditing = !!initialData;

    const handleSave = async (data: CreateProjectDto) => {

        setIsLoading(true);
        try {
            if(isEditing && initialData?.id) {
                await updateProject(initialData.id, data);
                toast.success("Record updated successfully!");
            } else {
                await createProject(data);
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
            <ProjectForm onSubmit={handleSave} isLoading={isLoading} initialData={initialData} />
        </div>
    );
}
