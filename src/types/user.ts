export type RegisterRole = "reviewer" | "submitter";

export interface IUser {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: RegisterRole;
  display_picture?: string;
  created_at: Date;
}

export type NewRegister = Omit<IUser, 'id' | 'created_at'>;
export type UpdateRegister = Pick<IUser, 'role'>;
