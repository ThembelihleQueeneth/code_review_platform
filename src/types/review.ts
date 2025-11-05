export type ReviewDecision = "approved" | "changes_requested";

export interface IReview {
  id: number;
  submission_id: number;
  reviewed_by: number;
  decision: ReviewDecision;
  remarks?: string;
  created_at: Date;
}
