import { Request, Response } from "express";
import * as ProjectService from "../service/ProjectService";

// Create project
export const createProject = async (req: Request, res: Response) => {
  try {
    const project = await ProjectService.createProject(req.body);
    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Error creating project" });
  }
};

// Get all projects
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await ProjectService.getAllProjects();
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Error fetching projects" });
  }
};

// Assign user to project
export const assignUserToProject = async (req: Request, res: Response) => {
  try {
    const projectId = Number(req.params.id);
    const { user_id, role } = req.body;

    const member = await ProjectService.assignUserToProject(projectId, user_id, role);
    res.status(201).json({ message: "User assigned to project", member });
  } catch (error) {
    console.error("Error assigning user:", error);
    res.status(500).json({ message: "Error assigning user to project" });
  }
};

// Remove user from project
export const removeUserFromProject = async (req: Request, res: Response) => {
  try {
    const projectId = Number(req.params.id);
    const userId = Number(req.params.userId);

    const removed = await ProjectService.removeUserFromProject(projectId, userId);
    if (!removed) return res.status(404).json({ message: "User not found in project" });

    res.status(200).json({ message: "User removed from project", removed });
  } catch (error) {
    console.error("Error removing user:", error);
    res.status(500).json({ message: "Error removing user from project" });
  }
};
