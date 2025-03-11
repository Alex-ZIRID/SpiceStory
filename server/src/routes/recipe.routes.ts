import { Router } from "express";
import { authenticateJWT } from "../middleware/auth.middleware";
import { createRecipe, getRecipes, getRecipeById, updateRecipe, deleteRecipe } from "../controllers/recipe.controller";

const router: Router = Router();

router.post("/", authenticateJWT, createRecipe);
router.get("/", getRecipes);
router.get("/:id", getRecipeById);
router.put("/:id", authenticateJWT, updateRecipe);
router.delete("/:id", authenticateJWT, deleteRecipe);

export default router;