export type RegiterRole = "reviewer" | "submitter";

export interface IUser {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: RegiterRole;
  display_picture?: string;
  created_at: Date;
}

export type NewRegister = Omit<IUser, 'id'| 'applied_at'>
export type updateRegister = Pick<IUser, 'role'>
