import { DATA } from "@/data/resume";
import { getPublishedBlogs } from "../../actions/blog";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = DATA.url;

  let dynamicBlogUrls: MetadataRoute.Sitemap = [];
  try {
    const dynamicBlogs = await getPublishedBlogs();
    dynamicBlogUrls = dynamicBlogs.map((post) => ({
      url: `${baseUrl}/blogs/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt).toISOString() : new Date().toISOString(),
    }));
  } catch (error) {
    console.error("Failed to fetch dynamic blogs for sitemap:", error);
  }

  const routes = ["", "/blogs", "/about", "/projects", "/contact"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString(),
    }),
  );

  return [...routes, ...dynamicBlogUrls];
}
