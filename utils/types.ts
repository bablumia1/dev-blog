export interface PostDetail {
  id: string;
  title: string;
  slug: string;
  meta: string;
  tags: string[];
  thumbnail?: string;
  createdAt: string;
}

export interface IncomingPost {
  title: string;
  slug: string;
  content: string;
  meta: string;
  tags: string[];
}
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string | undefined;
  role: "user" | "admin";
}

export interface UpdateRole {
  role: "user" | "admin";
}
