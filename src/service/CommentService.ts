//Add comment to submission (/api/submissions/:id/comments)
//List comments for submission (/api/submissions/:id/comments)
//Update comment (/api/comments/:id)
//Delete comment (/api/comments/:id)
import { query } from "../config/database";
import { IComment, NewComment } from "../types/comments";

//Add Comment to Submission
export const createComment = async (appData: NewComment) : Promise<IComment> => {
     const {submission_id, commented_by, line_number, content} = appData;

     const {rows} = await query("INSERT INTO comments (submission_id, commented_by, line_number, content  ) VALUES ($1, $2, $3, $4) RETURNING *",
        [submission_id, commented_by, line_number, content]

    );
    return rows[0]; 
}

//List comments for submission
export const getAllComments = async() : Promise<IComment[]> => {
    const {rows} = await query(
        "SELECT * FROM comments"
    );
    return rows;
};

//Update comment
export const updateComment = async (id: number, appData: IComment): Promise<IComment | null> =>{
    const {content} = appData;
    const {rows } = await query("UPDATE comments SET content = $1 WHERE id = $2 RETURNING *",
        [content, id]
    );
    return rows[0] || null
}

//Delete comment
export const deleteApplications = async (id:number): Promise<IComment | null> => {
    const {rows} = await query("DELETE FROM comments WHERE id = $1 RETURNING *",
        [id]
    );
    return rows[0] || null;
};
