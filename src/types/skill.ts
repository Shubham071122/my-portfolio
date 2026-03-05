export enum SkillCategory {
  LANGUAGE = "LANGUAGE",
  FRONTEND = "FRONTEND",
  BACKEND = "BACKEND",
  FULLSTACK = "FULLSTACK",
  MOBILE = "MOBILE",
  DATABASE = "DATABASE",
  DEVOPS = "DEVOPS",
  CLOUD = "CLOUD",
  TESTING = "TESTING",
  DESIGN = "DESIGN",
  AI_ML = "AI_ML",
  CMS = "CMS",
  SECURITY = "SECURITY",
  TOOL = "TOOL",
  OTHER = "OTHER",
}

export interface CreateSkillDto {
  name: string;
  category: SkillCategory;
  isFeatured?: boolean;
}

export interface Skill extends CreateSkillDto {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}
