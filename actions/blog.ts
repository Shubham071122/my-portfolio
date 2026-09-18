"use server";

import { api } from "@/lib/api-client";
import { Blog, CreateBlogDto, UpdateBlogDto } from "@/types/blog";
import { revalidateTag, unstable_cache } from "next/cache";

// Admin Blog Actions
export async function getAdminBlogs(): Promise<Blog[]> {
  return api.get<Blog[]>("/blogs/admin/list");
}

export async function getBlogById(id: string): Promise<Blog> {
  return api.get<Blog>(`/blogs/admin/${id}`);
}

export async function createBlog(data: CreateBlogDto): Promise<Blog> {
  const result = await api.post<Blog>("/blogs", data);
  revalidateTag("blogs");
  revalidateTag("admin-blogs");
  return result;
}

export async function updateBlog(
  id: string,
  data: UpdateBlogDto,
): Promise<Blog> {
  const result = await api.patch<Blog>(`/blogs/${id}`, data);
  revalidateTag("blogs");
  revalidateTag("admin-blogs");
  revalidateTag(`admin-blog-${id}`);
  revalidateTag(`blog-${result.slug}`);
  return result;
}

export async function archiveBlog(id: string): Promise<Blog> {
  const result = await api.patch<Blog>(`/blogs/archive/${id}`);
  revalidateTag("blogs");
  revalidateTag("admin-blogs");
  revalidateTag(`admin-blog-${id}`);
  revalidateTag(`blog-${result.slug}`);
  return result;
}

export async function deleteBlog(id: string): Promise<void> {
  await api.delete(`/blogs/${id}`);
  revalidateTag("blogs");
  revalidateTag("admin-blogs");
}

// Public Blog Actions
export async function getPublishedBlogs(): Promise<Blog[]> {
  try {
    const fetcher = unstable_cache(
      async () => api.get<Blog[]>("/blogs"),
      ["public-blogs-list"],
      { tags: ["blogs"] }
    );
    return await fetcher();
  } catch (error) {
    console.error("Failed to fetch published blogs:", error);
    return [];
  }
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const fetcher = unstable_cache(
      async (s: string) => api.get<Blog>(`/blogs/${s}`),
      ["public-blog-detail"],
      { tags: [`blog-${slug}`] }
    );
    return await fetcher(slug);
  } catch (error) {
    console.error(`Failed to fetch blog by slug (${slug}):`, error);
    return null;
  }
}

export async function searchBlogs(query: string): Promise<Blog[]> {
  try {
    return await api.get<Blog[]>(`/blogs/search?q=${encodeURIComponent(query)}`);
  } catch (error) {
    console.error("Failed to search blogs:", error);
    return [];
  }
}
