import SkillsComponent from "@/components/admin/skill/skill-component";

export default function SkillsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold tracking-tight">Skills & Technologies</h2>
                    <p className="text-muted-foreground">Manage the tech stack and tools you use.</p>
                </div>
            </div>
            <SkillsComponent />
        </div>
    );
}
