import { Skill } from "./skill";

export enum ProjectStatus {
  LIVE = "LIVE",
  WIP = "WIP",
  ARCHIVED = "ARCHIVED",
}

export interface CreateProjectDto {
   title: string;
  description: string;
  thumbnail?: string;
  liveUrl?: string;
  gitUrl?: string;
  beGithubUrl?: string;
  feGithubUrl?: string;
  startDate?: Date;
  endDate?: Date;
  status?: ProjectStatus;
  skillIds?: string[];
  skills?: Skill[];
}

export interface Project extends CreateProjectDto {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}
