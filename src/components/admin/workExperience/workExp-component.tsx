'use client'

import { AdminTable, TableColumn } from "@/components/admin/admin-table";
import { DATA } from "@/data/resume";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { WorkExperience } from "@/types/workExp";
import { getWorkExperiences, deleteWorkExperience } from "../../../../actions/work-experience";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ConfirmModal } from "@/components/admin/confirm-modal";

export default function WorkExperienceComponent() {
  const router = useRouter();
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    router.push(`/admin/work-experience/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    setItemToDelete(id);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    setIsDeleting(true);
    try {
      await deleteWorkExperience(itemToDelete);
      setWorkExperiences(prev => prev.filter(w => w.id !== itemToDelete));
      toast.success("Work experience deleted successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete work experience");
      console.error("DELETE_WORK_EXP_ERROR:", error);
    } finally {
      setIsDeleting(false);
      setItemToDelete(null);
    }
  };

  const columns: TableColumn<WorkExperience>[] = [
    {
      key: "company",
      header: "Company",
      render: (item: WorkExperience) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 border">
            <AvatarImage src={item.thumbnailUrl || ""} alt={item.company} />
            <AvatarFallback>{item.company[0]}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{item.company}</span>
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
      render: (item: WorkExperience) => {
        const formatDate = (dateStr: string | null | undefined) => {
          if (!dateStr) return "";
          try {
            return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
          } catch {
            return dateStr;
          }
        };
        const start = formatDate(item.startDate);
        const end = item.isCurrent ? "Present" : formatDate(item.endDate);
        return `${start} - ${end || "Present"}`;
      },
    },
    {
      key: "location",
      header: "Location",
    },
    {
      key: "skillIds",
      header: "Skills",
      render: (item: WorkExperience) => (
        <div className="flex flex-wrap gap-1">
          {item.skillIds && item.skillIds.length > 0 ? (
            <Badge variant="secondary" className="text-[10px] px-1 h-4">
              {item.skillIds.length} skills
            </Badge>
          ) : (
            <span className="text-muted-foreground italic text-xs">No skills</span>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchWorkExperience = async () => {
      setIsLoading(true);
      try {
        const result = await getWorkExperiences();
        setWorkExperiences(result || []);
      } catch (error: any) {
        toast.error(error.message || "Failed to load work experience");
        console.error("FETCH_SKILLS_ERROR:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWorkExperience();
  }, []);

  return (
    <div className="space-y-6">
      <AdminTable
        title="Experience"
        data={workExperiences}
        columns={columns}
        addPath="/admin/work-experience/new"
        onEdit={(item) => handleEdit(item.id)}
        onDelete={(item) => handleDelete(item.id)}
        isLoading={isLoading}
      />

      <ConfirmModal
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Work Experience"
        description="This action cannot be undone. This will permanently delete this work experience entry."
        isLoading={isDeleting}
      />
    </div>
  );
}
