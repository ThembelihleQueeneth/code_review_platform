export type SubmissionStatus =
  | "pending"
  | "in_review"
  | "approved"
  | "changes_requested";

export interface ISubmission {
  id: number;
  project_id: number;
  submitted_by: number;
  title: string;
  code: string;
  status: SubmissionStatus;
  created_at: Date;
}

export type NewSubmission = Omit<ISubmission, 'id' | 'created_at'>
export type updateSubmission =  Pick<ISubmission, 'status'>
