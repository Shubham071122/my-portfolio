"use server";

import { api } from "@/lib/api-client";
import { Blog, CreateBlogDto, UpdateBlogDto } from "@/types/blog";
import { revalidatePath } from "next/cache";

export async function getAdminBlogs(): Promise<Blog[]> {
  return api.get<Blog[]>("/blogs/admin/list");
}

export async function getBlogById(id: string): Promise<Blog> {
  return api.get<Blog>(`/blogs/admin/${id}`);
}

export async function createBlog(data: CreateBlogDto): Promise<Blog> {
  const result = await api.post<Blog>("/blogs", data);
  revalidatePath("/admin/blogs");
  revalidatePath("/blogs");
  return result;
}

export async function updateBlog(
  id: string,
  data: UpdateBlogDto,
): Promise<Blog> {
  const result = await api.patch<Blog>(`/blogs/${id}`, data);
  revalidatePath("/admin/blogs");
  revalidatePath(`/blogs/${result.slug}`);
  revalidatePath("/blogs");
  return result;
}

export async function archiveBlog(id: string): Promise<Blog> {
  const result = await api.patch<Blog>(`/blogs/archive/${id}`);
  revalidatePath("/admin/blogs");
  revalidatePath("/blogs");
  return result;
}

export async function deleteBlog(id: string): Promise<void> {
  await api.delete(`/blogs/${id}`);
  revalidatePath("/admin/blogs");
  revalidatePath("/blogs");
}

// Public Blog Actions
export async function getPublishedBlogs(): Promise<Blog[]> {
  return api.get<Blog[]>("/blogs");
}

export async function getBlogBySlug(slug: string): Promise<Blog> {
  return api.get<Blog>(`/blogs/${slug}`);
}

export async function searchBlogs(query: string): Promise<Blog[]> {
  return api.get<Blog[]>(`/blogs/search?q=${encodeURIComponent(query)}`);
}
