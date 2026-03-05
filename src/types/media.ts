export interface Media {
  id: string;
  name: string;
  url: string;
  type: "IMAGE" | "VIDEO" | "DOCUMENT" | string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}