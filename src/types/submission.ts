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
