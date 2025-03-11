import pool from "../database";

export type Comment = {
  id?: number;
  user_id: number;
  recipe_id: number;
  content: string;
};

export class CommentModel {
  // Create a Comment
  async create(comment: Comment): Promise<Comment | null> {
    try {
      const result = await pool.query(
        "INSERT INTO comments (user_id, recipe_id, content) VALUES ($1, $2, $3) RETURNING *",
        [comment.user_id, comment.recipe_id, comment.content]
      );
      return result.rows[0];
    } catch (err) {
      console.error("❌ Error creating comment:", err);
      return null;
    }
  }

  // Get All Comments for a Recipe
  async getByRecipeId(recipe_id: number): Promise<Comment[]> {
    try {
      const result = await pool.query(
        "SELECT comments.id, comments.content, comments.user_id, users.name AS username FROM comments JOIN users ON comments.user_id = users.id WHERE recipe_id = $1 ORDER BY comments.id DESC",
        [recipe_id]
      );
      return result.rows;
    } catch (err) {
      console.error("❌ Error fetching comments:", err);
      return [];
    }
  }

  // Delete a Comment
  async delete(id: number, user_id: number): Promise<boolean> {
    try {
      const result = await pool.query(
        "DELETE FROM comments WHERE id = $1 AND user_id = $2",
        [id, user_id]
      );
      return result.rowCount !== null && result.rowCount > 0;
    } catch (err) {
      console.error("❌ Error deleting comment:", err);
      return false;
    }
  }
}