"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Loader2 } from "lucide-react";
import { getWorkExperienceById } from "../../../../../../actions/work-experience";
import { WorkExperience } from "@/types/workExp";
import WorkExperienceComponentInput from "@/components/admin/workExperience/workExp-component-input";

export default function EditWorkExperiencePage({ params }: { params: { id: string } }) {
    const [isLoading, setIsLoading] = useState(true);
    const [workExperience, setWorkExperience] = useState<WorkExperience>();

    useEffect(() => {
        const fetchWorkExperience = async () => {
            try {
                const data = await getWorkExperienceById(params.id);
                console.log("Experience data:", data);
                setWorkExperience(data);
            } catch (error) {
                console.error("FETCH_EXPERIENCE_ERROR:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchWorkExperience();
    }, [params.id]);

    if (isLoading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!workExperience) {
        return (
            <div className="p-8 text-center text-muted-foreground border rounded-xl border-dashed">
                Work Experience not found
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Link href="/admin" className="hover:text-foreground transition-colors">Dashboard</Link>
                <ChevronRight className="h-4 w-4 opacity-50" />
                <Link href="/admin/work-experience" className="hover:text-foreground transition-colors">Experience</Link>
                <ChevronRight className="h-4 w-4 opacity-50" />
                <span className="text-foreground font-medium">Edit Experience</span>
            </nav>

            <WorkExperienceComponentInput initialData={workExperience} />
        </div>
    );
}
