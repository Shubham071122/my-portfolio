"use server";

import { api } from "@/lib/api-client";

interface ContactData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactMessage(data: ContactData) {
    const response = await api.post("/auth/contact", data);
    return response;
}
