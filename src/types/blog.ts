export enum BlogStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail?: string;
  content: string;
  hashtags: string[];
  status: BlogStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlogDto {
  title: string;
  slug: string;
  description: string;
  thumbnail?: string;
  content: string;
  hashtags?: string[];
  status?: BlogStatus;
}

export interface UpdateBlogDto extends Partial<CreateBlogDto> {}
