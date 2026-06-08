import { DATA } from "@/data/resume";

export type Project = (typeof DATA.projects)[number];

export function getProjectSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getProjectBySlug(slug: string) {
  return DATA.projects.find((project) => getProjectSlug(project.title) === slug);
}
