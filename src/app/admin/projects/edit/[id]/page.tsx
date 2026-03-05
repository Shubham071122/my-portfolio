"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Loader2 } from "lucide-react";
import { getProjectById } from "../../../../../../actions/project";
import { Project } from "@/types/project";
import ProjectComponentInput from "@/components/admin/project/project-component-input";

export default function EditProjectPage({ params }: { params: { id: string } }) {
    const [isLoading, setIsLoading] = useState(true);
    const [project, setProject] = useState<Project>();

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const data = await getProjectById(params.id);
                console.log("Project data:", data);
                setProject(data);
            } catch (error) {
                console.error("FETCH_PROJECT_ERROR:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProject();
    }, [params.id]);

    if (isLoading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!project) {
        return (
            <div className="p-8 text-center text-muted-foreground border rounded-xl border-dashed">
                Project not found
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Link href="/admin" className="hover:text-foreground transition-colors">Dashboard</Link>
                <ChevronRight className="h-4 w-4 opacity-50" />
                <Link href="/admin/projects" className="hover:text-foreground transition-colors">Projects</Link>
                <ChevronRight className="h-4 w-4 opacity-50" />
                <span className="text-foreground font-medium">Edit Project</span>
            </nav>

            <ProjectComponentInput initialData={project} />
        </div>
    );
}
