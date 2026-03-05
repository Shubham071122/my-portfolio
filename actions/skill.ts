"use server";

import { api } from "@/lib/api-client";
import { CreateSkillDto, Skill } from "@/types/skill";

export async function createSkill(data: CreateSkillDto) {
  const response = await api.post<Skill>("/skills", data);
  return response;
}

export async function getSkills() {
  const response = await api.get<Skill[]>("/skills");
  return response;
}

export async function getSkill(id: string) {
  const response = await api.get<Skill>(`/skills/${id}`);
  return response;
}

export async function updateSkill(id: string, data: CreateSkillDto) {
  const response = await api.patch<Skill>(`/skills/${id}`, data);
  return response;
}

export async function deleteSkill(id: string) {
  const response = await api.delete<void>(`/skills/${id}`);
  return response;
}
