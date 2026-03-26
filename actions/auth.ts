"use server";

import { api } from "@/lib/api-client";
import { AuthResponse, User } from "@/types/auth";
import { cookies } from "next/headers";

const COOKIE_NAME = "auth_token";

export async function login(data: any) {
  try {
    const result = await api.post<AuthResponse>("/auth/login", data);

    if (result && result.token) {
      cookies().set(COOKIE_NAME, result.token, {
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }

    return result.user;
  } catch (error: any) {
    throw new Error(error.message || "Login failed");
  }
}

export async function logout() {
  cookies().delete(COOKIE_NAME);
}
