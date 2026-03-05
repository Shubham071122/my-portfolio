"use server";

import { api } from "@/lib/api-client";
import { Project } from "@/types/project";

export async function createProject(data: any) {
    const response = await api.post<any[]>("/projects", data);
    return response;
}

export async function updateProject(id: string, data: any) {
    const response = await api.patch<any[]>(`/projects/${id}`, data);
    return response;
}

export async function getProjects() {
    const response = await api.get<Project[]>("/projects");
    return response;
}

export async function getProjectById(id: string) {
    const response = await api.get<Project>(`/projects/${id}`);
    return response;
}

export async function deleteProject(id: string) {
    const response = await api.delete<Project>(`/projects/${id}`);
    return response;
}