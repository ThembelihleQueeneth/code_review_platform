//Create project (/api/projects)
//List projects ( /api/projects)
//Assign users to projects (/api/projects/:id/members)
//Remove users from projects (/api/projects/:id/members/:userId)

import { query } from "../config/database";
import {IProject, IProjectMember, NewProject } from "../types/project";

//Create Project Functionality
export const createProject = async (appData: NewProject) : Promise<IProject> => {
    const{name, description, created_by} =  appData;

    const {rows} = await query("INSERT INTO projects (name,description, created_by) VALUES ($1, $2, $3) RETURNING *"
        ,[name, description, created_by]
    );
    return rows[0];
}

//List Projects
export const getAllProjects = async() : Promise<IProject[] | null> => {
    const {rows} = await query(
        "SELECT *FROM projects  ORDER BY created_at DESC "
    );
    return rows;
};

// Assign user to project
export const assignUserToProject = async (
  projectId: number,
  userId: number,
  role: string // "reviewer" | "submitter"
): Promise<IProjectMember> => {
  const { rows } = await query(
    "INSERT INTO project_members (project_id, user_id, role) VALUES ($1, $2, $3) RETURNING *",
    [projectId, userId, role]
  );
  return rows[0];
};


// Remove user from project
export const removeUserFromProject = async (
  projectId: number,
  userId: number
): Promise<IProjectMember | null> => {
  const { rows } = await query(
    "DELETE FROM project_members WHERE project_id = $1 AND user_id = $2 RETURNING *",
    [projectId, userId]
  );

  return rows[0] || null;
};


