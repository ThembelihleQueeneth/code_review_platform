export interface IUser {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: "reviewer" | "submitter";
  display_picture?: string;
  created_at: Date;
}
