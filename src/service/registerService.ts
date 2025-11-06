import { query } from "../config/database";
import { IUser, NewRegister, UpdateRegister } from "../types/user";

// Add new user
export const createUser = async (appData: NewRegister): Promise<IUser> => {
  const { name, email, password_hash, role, display_picture } = appData;

  const { rows } = await query(
    "INSERT INTO users (name, email, password_hash, role, display_picture) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, email, password_hash, role, display_picture]
  );

  return rows[0];
};

// Find all users
export const findAllUsers = async (): Promise<IUser[]> => {
  const { rows } = await query("SELECT * FROM users ORDER BY created_at DESC");
  return rows;
};

// Find user by ID
export const findUserById = async (id: number): Promise<IUser | null> => {
  const { rows } = await query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0] || null;
};

// Update user role
export const updateUserRole = async (
  id: number,
  appData: UpdateRegister
): Promise<IUser | null> => {
  const { role } = appData;
  const { rows } = await query(
    "UPDATE users SET role = $1 WHERE id = $2 RETURNING *",
    [role, id]
  );
  return rows[0] || null;
};

// Delete user
export const deleteUser = async (id: number): Promise<IUser | null> => {
  const { rows } = await query("DELETE FROM users WHERE id = $1 RETURNING *", [
    id,
  ]);
  return rows[0] || null;
};
