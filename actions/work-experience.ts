"use server";

import { api } from "@/lib/api-client";

export async function createWorkExperience(data: any) {
    const response = await api.post<any[]>("/work-experience", data);
    return response;
}

export async function updateWorkExperience(id: string, data: any) {
    const response = await api.patch<any>(`/work-experience/${id}`, data);
    return response;
}

export async function getWorkExperiences() {
    const response = await api.get<any[]>("/work-experience");
    return response;
}

export async function getWorkExperienceById(id: string) {
    const response = await api.get<any>(`/work-experience/${id}`);
    return response;
}

export async function deleteWorkExperience(id: string) {
    const response = await api.delete<any>(`/work-experience/${id}`);
    return response;
}
