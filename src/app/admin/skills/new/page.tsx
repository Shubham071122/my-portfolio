import Link from "next/link";
import { ChevronRight } from "lucide-react";
import SkillComponentInput from "@/components/admin/skill/skill-component-input";

export default function NewSkillPage() {
    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Link href="/admin" className="hover:text-foreground transition-colors">Dashboard</Link>
                <ChevronRight className="h-4 w-4 opacity-50" />
                <Link href="/admin/skills" className="hover:text-foreground transition-colors">Skills</Link>
                <ChevronRight className="h-4 w-4 opacity-50" />
                <span className="text-foreground font-medium">New Skill</span>
            </nav>
            <SkillComponentInput />
        </div>
    );
}
