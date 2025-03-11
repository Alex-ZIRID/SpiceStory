import { Request, Response } from "express";
import { RecipeModel } from "../models/recipe.model";
import { AuthRequest } from "../middleware/auth.middleware";

const recipeModel = new RecipeModel();

// Create a New Recipe
export const createRecipe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, ingredients, instructions, image_url } = req.body;

    if (!req.user) {
      res.status(403).json({ error: "Unauthorized" });
      return;
    }

    const newRecipe = await recipeModel.create({
      user_id: req.user.id,
      title,
      description,
      ingredients,
      instructions,
      image_url,
    });

    if (!newRecipe) {
      res.status(500).json({ error: "Failed to create recipe" });
      return;
    }

    res.status(201).json(newRecipe);
  } catch (err) {
    console.error("❌ Recipe creation error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get All Recipes
export const getRecipes = async (req: Request, res: Response): Promise<void> => {
  try {
    const recipes = await recipeModel.getAll();
    res.status(200).json(recipes);
  } catch (err) {
    console.error("❌ Fetching recipes error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Recipe by ID
export const getRecipeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const recipe = await recipeModel.getById(parseInt(id));

    if (!recipe) {
      res.status(404).json({ error: "Recipe not found" });
      return;
    }

    res.status(200).json(recipe);
  } catch (err) {
    console.error("❌ Fetching recipe error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a Recipe
export const updateRecipe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, ingredients, instructions, image_url } = req.body;

    if (!req.user) {
      res.status(403).json({ error: "Unauthorized" });
      return;
    }

    const updatedRecipe = await recipeModel.update(parseInt(id), {
      user_id: req.user.id,
      title,
      description,
      ingredients,
      instructions,
      image_url,
    });

    if (!updatedRecipe) {
      res.status(404).json({ error: "Recipe not found" });
      return;
    }

    res.status(200).json(updatedRecipe);
  } catch (err) {
    console.error("❌ Updating recipe error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a Recipe
export const deleteRecipe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!req.user) {
      res.status(403).json({ error: "Unauthorized" });
      return;
    }

    const recipe = await recipeModel.getById(parseInt(id));

    if (!recipe) {
      res.status(404).json({ error: "Recipe not found" });
      return;
    }

    if (recipe.user_id !== req.user.id) {
      res.status(403).json({ error: "You can only delete your own recipes." });
      return;
    }

    const deleted = await recipeModel.delete(parseInt(id));

    if (!deleted) {
      res.status(500).json({ error: "Failed to delete recipe" });
      return;
    }

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (err) {
    console.error("❌ Deleting recipe error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};