import { Router } from "express";
import { authenticateJWT } from "../middleware/auth.middleware";
import { createComment, getCommentsByRecipe, deleteComment } from "../controllers/comment.controller";

const router: Router = Router();

router.post("/", authenticateJWT, createComment);
router.get("/:recipe_id", getCommentsByRecipe);
router.delete("/:id", authenticateJWT, deleteComment);

export default router;