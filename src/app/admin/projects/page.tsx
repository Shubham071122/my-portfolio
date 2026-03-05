import ProjectComponent from "@/components/admin/project/project-component";

export default function ProjectsPage() {

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
                    <p className="text-muted-foreground">Manage your projects.</p>
                </div>
            </div>
            <ProjectComponent />
        </div>
    );
}
