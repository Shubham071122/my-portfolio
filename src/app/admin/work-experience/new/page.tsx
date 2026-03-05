import Link from "next/link";
import { ChevronRight } from "lucide-react";
import WorkExperienceComponentInput from "@/components/admin/workExperience/workExp-component-input";

export default function NewWorkExperiencePage() {

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Link href="/admin" className="hover:text-foreground">Dashboard</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/admin/work-experience" className="hover:text-foreground">Work Experience</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground font-medium">New Record</span>
            </nav>
            <WorkExperienceComponentInput />
        </div>
    );
}
