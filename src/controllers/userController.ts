import { Request, Response } from "express";
import * as userService from '../service/UserService';

//get all users
export const getAllUsers = async(req: Request, res: Response) => {
    try {
        const users = await userService.findAllUsers();
        res.status(200).json(users);
        
    } catch (error) {
        console.error("Get users error: ", error);
        res.status(500).json({message: "Error fetching users"});
        
    }
};

//Get user by ID

export const getUserById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const user = await userService.findUserById(id);

        if(!user) return res.status(404).json({message: "User not found"});
        res.status(200).json(user);
        
    } catch (error) {
        console.error("Get user error:", error);
        res.status(500).json({message:"Error fetching user"});
        
    }


}

// Update user role
export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updatedUser = await userService.updateUserRole(id, req.body);
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User role updated", user: updatedUser });
  } catch (error) {
    console.error("Update role error:", error);
    res.status(500).json({ message: "Error updating role" });
  }
};
// Delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const deletedUser = await userService.deleteUser(id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted", user: deletedUser });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
};