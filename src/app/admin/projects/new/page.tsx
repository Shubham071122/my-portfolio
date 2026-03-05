import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProjectComponentInput from "@/components/admin/project/project-component-input";

export default function NewProjectPage() {

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Link href="/admin" className="hover:text-foreground">Dashboard</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/admin/projects" className="hover:text-foreground">Projects</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground font-medium">New Project</span>
            </nav>
            <ProjectComponentInput />
        </div>
    );
}
