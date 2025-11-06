//Create submission (/api/submissions)
//List submissions by project ( /api/projects/:id/submissions)
//View single submission (/api/submissions/:id)
//Update submission status (/api/submissions/:id/status)
//Delete submission (/api/submissions/:id)
import { query } from "../config/database";
import { ISubmission, NewSubmission, UpdateSubmission } from "../types/submission"

//Create submission
export const createSubmission = async (
  appData: NewSubmission
): Promise<ISubmission> => {
  const { project_id, submitted_by, title, code, status } = appData;

  const { rows } = await query(
    "INSERT INTO submissions (project_id, submitted_by, title, code, status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [project_id, submitted_by, title, code, status]
  );

  return rows[0];
};

// List submissions by project ID
export const findSubmissionsByProject = async (
  projectId: number
): Promise<ISubmission[]> => {
  const { rows } = await query(
    "SELECT * FROM submissions WHERE project_id = $1 ORDER BY created_at DESC",
    [projectId]
  );
  return rows;
};

// Find single submission by ID
export const findSubmissionById = async (
  id: number
): Promise<ISubmission | null> => {
  const { rows } = await query("SELECT * FROM submissions WHERE id = $1", [id]);
  return rows[0] || null;
};

// Update submission status
export const updateSubmissionStatus = async (
  id: number,
  appData: UpdateSubmission
): Promise<ISubmission | null> => {
  const { status } = appData;

  const { rows } = await query(
    "UPDATE submissions SET status = $1 WHERE id = $2 RETURNING *",
    [status, id]
  );

  return rows[0] || null;
};

// Delete submission by ID
export const deleteSubmission = async (
  id: number
): Promise<ISubmission | null> => {
  const { rows } = await query(
    "DELETE FROM submissions WHERE id = $1 RETURNING *",
    [id]
  );

  return rows[0] || null;
};