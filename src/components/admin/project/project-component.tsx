'use client'

import { AdminTable, TableColumn } from "@/components/admin/admin-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ConfirmModal } from "@/components/admin/confirm-modal";
import { Project, ProjectStatus } from "@/types/project";
import { getProjects, deleteProject } from "../../../../actions/project";

export default function ProjectComponent() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    router.push(`/admin/projects/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    setItemToDelete(id);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    setIsDeleting(true);
    try {
      await deleteProject(itemToDelete);
      setProjects(prev => prev.filter(p => p.id !== itemToDelete));
      toast.success("Project deleted successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete project");
      console.error("DELETE_PROJECT_ERROR:", error);
    } finally {
      setIsDeleting(false);
      setItemToDelete(null);
    }
  };

  const columns: TableColumn<Project>[] = [
    {
      key: "title",
      header: "Title",
      render: (item: Project) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 border">
            <AvatarImage src={item.thumbnail || ""} alt={item.title} />
            <AvatarFallback>{item.title}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{item.title}</span>
        </div>
      ),
    },
    {
      key: "position",
      header: "Role",
    },
    {
      key: "startDate",
      header: "Duration",
      render: (item: Project) => {
        const formatDate = (date: Date | string | null | undefined) => {
          if (!date) return "";
          try {
            return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
          } catch {
            return typeof date === 'string' ? date : "";
          }
        };
        const start = formatDate(item.startDate);
        const end = item.status === ProjectStatus.ARCHIVED ? formatDate(item.endDate) : "Present";
        return `${start} - ${end || "Present"}`;
      },
    },
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const result = await getProjects();
        setProjects(result || []);
      } catch (error: any) {
        toast.error(error.message || "Failed to load projects");
        console.error("FETCH_PROJECTS_ERROR:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="space-y-6">
      <AdminTable
        title="Projects"
        data={projects}
        columns={columns}
        addPath="/admin/projects/new"
        onEdit={(item) => handleEdit(item.id)}
        onDelete={(item) => handleDelete(item.id)}
        isLoading={isLoading}
      />

      <ConfirmModal
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Project"
        description="This action cannot be undone. This will permanently delete this project entry."
        isLoading={isDeleting}
      />
    </div>
  );
}
