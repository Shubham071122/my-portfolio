'use client'

import { AdminTable } from "@/components/admin/admin-table";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Skill, SkillCategory } from "@/types/skill";
import { Check, X, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";
import { getSkills, deleteSkill } from "../../../../actions/skill";
import { ConfirmModal } from "@/components/admin/confirm-modal";

import { toast } from "sonner";

export default function SkillsComponent() {
    const router = useRouter();
    const [skills, setSkills] = useState<Skill[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);

    const columns = [
        {
            key: "name",
            header: "Skill Name",
            render: (item: Skill) => (
                <div className="flex items-center gap-2">
                    <span className="font-medium">{item.name}</span>
                    {item.isFeatured && <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />}
                </div>
            ),
        },
        {
            key: "category",
            header: "Category",
            render: (item: Skill) => (
                <Badge variant="outline" className="capitalize">
                    {item.category.toLowerCase().replace("_", " ")}
                </Badge>
            ),
        },
        {
            key: "isFeatured",
            header: "Featured",
            render: (item: Skill) => (
                item.isFeatured ? (
                    <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20 gap-1 capitalize">
                        <Check className="h-3 w-3" />
                        Featured
                    </Badge>
                ) : null
            ),
        },
    ];

    const handleEdit = (id: string) => {
        router.push(`/admin/skills/edit/${id}`);
    };

    const handleDelete = (id: string) => {
        setItemToDelete(id);
    };

    const confirmDelete = async () => {
        if (!itemToDelete) return;

        setIsDeleting(true);
        try {
            await deleteSkill(itemToDelete);
            setSkills(prev => prev.filter(s => s.id !== itemToDelete));
            toast.success("Skill deleted successfully");
        } catch (error: any) {
            toast.error(error.message || "Failed to delete skill");
            console.error("DELETE_SKILL_ERROR:", error);
        } finally {
            setIsDeleting(false);
            setItemToDelete(null);
        }
    };

    useEffect(() => {
        const fetchSkills = async () => {
            setIsLoading(true);
            try {
                const result = await getSkills();
                setSkills(result || []);
            } catch (error: any) {
                toast.error(error.message || "Failed to load skills");
                console.error("FETCH_SKILLS_ERROR:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSkills();
    }, []);

    return (
        <div className="space-y-6">
            <AdminTable
                title="Skills"
                data={skills || []}
                columns={columns}
                addPath="/admin/skills/new"
                onEdit={(item) => handleEdit(item.id)}
                onDelete={(item) => handleDelete(item.id)}
                isLoading={isLoading}
            />
            
            <ConfirmModal
                isOpen={!!itemToDelete}
                onClose={() => setItemToDelete(null)}
                onConfirm={confirmDelete}
                title="Delete Skill"
                description="This action cannot be undone. This will permanently delete the skill."
                isLoading={isDeleting}
            />
        </div>
    );
}
