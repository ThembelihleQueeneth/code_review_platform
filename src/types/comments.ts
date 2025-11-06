export interface IComment {
  id: number;
  submission_id: number;
  commented_by: number;
  line_number?: number;
  content: string;
  created_at: Date;
}

export type NewComment = Omit<IComment, 'id' | 'created_at'>;
