"use client";

import Link from "next/link";
import { ChevronRight, Loader2 } from "lucide-react";
import { Skill } from "@/types/skill";
import { useEffect, useState } from "react";
import { getSkill } from "../../../../../../actions/skill";
import SkillComponentInput from "@/components/admin/skill/skill-component-input";

export default function EditSkillPage({ params }: { params: { id: string } }) {
    const [isLoading, setIsLoading] = useState(true);
    const [skill, setSkill] = useState<Skill>();

    useEffect(() => {
        const fetchSkill = async () => {
            try {
                const data = await getSkill(params.id);
                console.log("Skill data:", data);
                setSkill(data);
            } catch (error) {
                console.error("FETCH_SKILL_ERROR:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSkill();
    }, [params.id]);

    if (isLoading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!skill) {
        return (
            <div className="p-8 text-center text-muted-foreground border rounded-xl border-dashed">
                Skill not found
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Link href="/admin" className="hover:text-foreground transition-colors">Dashboard</Link>
                <ChevronRight className="h-4 w-4 opacity-50" />
                <Link href="/admin/skills" className="hover:text-foreground transition-colors">Skills</Link>
                <ChevronRight className="h-4 w-4 opacity-50" />
                <span className="text-foreground font-medium">Edit Skill</span>
            </nav>

            <SkillComponentInput initialData={skill} />
        </div>
    );
}
