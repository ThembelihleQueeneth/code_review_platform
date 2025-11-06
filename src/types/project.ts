import { RegisterRole as Role } from "./user";

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
  role: Role;
}

export type NewProject = Omit<IProject, 'id' | 'created_at'>;
export type UpdateProject = Pick<IProjectMember, 'role'>;
