"use server";

import { api } from "@/lib/api-client";
import { Media } from "@/types/media";

export async function uploadMedia(formData: FormData) {
  const response = await api.post<Media>("/media", formData);
  return response;
}