"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { X, Plus, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { getSkills } from "../../../../actions/skill";
import { Skill } from "@/types/skill";

interface SkillMultiSelectProps {
    selectedSkillIds: string[];
    onChange: (ids: string[]) => void;
    label?: string;
    placeholder?: string;
}

export function SkillMultiSelect({
    selectedSkillIds,
    onChange,
    label = "Skills & Technologies",
    placeholder = "Search and select skills..."
}: SkillMultiSelectProps) {
    console.log("SELECTED_SKILL_IDS:", selectedSkillIds);
    const [availableSkills, setAvailableSkills] = useState<Skill[]>([]);
    const [skillSearch, setSkillSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const data = await getSkills();
                setAvailableSkills(data || []);
            } catch (err) {
                console.error("FETCH_SKILLS_ERROR:", err);
            }
        };
        fetchSkills();
    }, []);

    const toggleSkill = (skillId: string) => {
        const newIds = selectedSkillIds.includes(skillId)
            ? selectedSkillIds.filter(id => id !== skillId)
            : [...selectedSkillIds, skillId];
        onChange(newIds);
        setSkillSearch("");
    };

    const removeSkill = (skillId: string) => {
        onChange(selectedSkillIds.filter((id) => id !== skillId));
    };

    const filteredSkills = availableSkills.filter(s =>
        !selectedSkillIds.includes(s.id) &&
        s.name.toLowerCase().includes(skillSearch.toLowerCase())
    );

    return (
        <div className="space-y-3 relative">
            {label && <Label>{label}</Label>}
            <div className="relative">
                <div
                    className={cn(
                        "flex flex-wrap gap-2 p-2 min-h-[44px] rounded-lg border bg-white/[0.03] border-white/[0.1] focus-within:border-primary/50 transition-all cursor-text",
                        isOpen && "rounded-b-none border-b-0"
                    )}
                    onClick={() => setIsOpen(true)}
                >
                    {selectedSkillIds.map((id) => {
                        const skill = availableSkills.find(s => s.id === id);
                        return (
                            <Badge key={id} variant="secondary" className="pl-2 pr-1 py-1 gap-1 bg-white/[0.05] border-white/[0.1] hover:bg-white/[0.1]">
                                {skill?.name || "Loading..."}
                                <button type="button" onClick={(e) => { e.stopPropagation(); removeSkill(id); }} className="hover:text-destructive">
                                    <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        );
                    })}
                    <input
                        value={skillSearch}
                        onChange={(e) => {
                            setSkillSearch(e.target.value);
                            setIsOpen(true);
                        }}
                        onFocus={() => setIsOpen(true)}
                        placeholder={selectedSkillIds.length === 0 ? placeholder : ""}
                        className="flex-1 bg-transparent outline-none text-sm min-w-[120px] py-1 placeholder:text-muted-foreground/50"
                    />
                </div>

                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-10"
                            onClick={() => setIsOpen(false)}
                        />
                        <div className="absolute z-20 w-full bg-[#0c0c0c] border border-white/[0.1] rounded-b-lg shadow-2xl max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-200">
                            {filteredSkills.map((skill) => (
                                <button
                                    key={skill.id}
                                    type="button"
                                    onClick={() => toggleSkill(skill.id)}
                                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-white/[0.05] transition-colors flex items-center justify-between group"
                                >
                                    <div className="flex items-center gap-2">
                                        {skill.name}
                                    </div>
                                    <Plus className="h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                                </button>
                            ))}
                            {filteredSkills.length === 0 && (
                                <div className="px-4 py-4 text-xs text-muted-foreground italic text-center">
                                    {skillSearch ? "No matching skills found" : "All skills selected"}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
