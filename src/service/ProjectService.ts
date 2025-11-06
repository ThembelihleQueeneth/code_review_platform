//Create project (/api/projects)
//List projects ( /api/projects)
//Assign users to projects (/api/projects/:id/members)
//Remove users from projects (/api/projects/:id/members/:userId)

import { query } from "../config/database";
import {IProject, NewProject } from "../types/project";

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

//Assign users to project 


//Remove users from project

