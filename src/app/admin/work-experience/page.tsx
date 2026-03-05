import WorkExperienceComponent from "@/components/admin/workExperience/workExp-component";

export default function WorkExperiencePage() {

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Work Experience</h2>
          <p className="text-muted-foreground">Manage your career history and roles.</p>
        </div>
      </div>
    <WorkExperienceComponent />
    </div>
  );
}
