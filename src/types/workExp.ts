import { Skill } from "./skill";

export interface CreateWorkExperienceDto {
  company: string;
  position: string;
  startDate: string;
  endDate?: string | null;
  description: string;
  location?: string;
  isCurrent?: boolean;
  linkedinUrl?: string;
  websiteUrl?: string;
  thumbnailUrl?: string;
  skillIds?: string[];
  skills?: Skill[];
}

export interface WorkExperience extends CreateWorkExperienceDto {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}
