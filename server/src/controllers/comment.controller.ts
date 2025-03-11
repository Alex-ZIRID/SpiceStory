import { Request, Response } from "express";
import { CommentModel } from "../models/comment.model";
import { AuthRequest } from "../middleware/auth.middleware";

const commentModel = new CommentModel();

// ✅ Create a Comment
export const createComment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { recipe_id, content } = req.body;

    if (!req.user) {
      res.status(403).json({ error: "Unauthorized - No user found in token" });
      return;
    }

    const newComment = await commentModel.create({
      user_id: req.user.id,
      recipe_id,
      content,
    });

    if (!newComment) {
      res.status(500).json({ error: "Failed to create comment" });
      return;
    }

    res.status(201).json(newComment);
  } catch (err) {
    console.error("❌ Comment creation error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Get All Comments for a Recipe
export const getCommentsByRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const { recipe_id } = req.params;
    const comments = await commentModel.getByRecipeId(parseInt(recipe_id));

    res.status(200).json(comments);
  } catch (err) {
    console.error("❌ Fetching comments error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Delete a Comment
export const deleteComment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!req.user) {
      res.status(403).json({ error: "Unauthorized - No user found in token" });
      return;
    }

    const deleted = await commentModel.delete(parseInt(id), req.user.id);

    if (!deleted) {
      res.status(404).json({ error: "Comment not found or you don't have permission to delete it" });
      return;
    }

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error("❌ Deleting comment error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};