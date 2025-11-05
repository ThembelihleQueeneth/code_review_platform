export interface IProject {
  id: number;
  name: string;
  description?: string;
  created_by: number; // user_id
  created_at: Date;
}

export interface IProjectMember {
  id: number;
  project_id: number;
  user_id: number;
  role: "reviewer" | "submitter";
}
