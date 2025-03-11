import pool from "../database";

export type Recipe = {
  id?: number;
  user_id: number;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  image_url?: string;
};

export class RecipeModel {
  // Create a New Recipe
  async create(recipe: Recipe): Promise<Recipe | null> {
    try {
      const result = await pool.query(
        "INSERT INTO recipes (user_id, title, description, ingredients, instructions, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [recipe.user_id, recipe.title, recipe.description, recipe.ingredients, recipe.instructions, recipe.image_url]
      );
      return result.rows[0];
    } catch (err) {
      console.error("❌ Error creating recipe:", err);
      return null;
    }
  }

  // Get All Recipes
  async getAll(): Promise<Recipe[]> {
    try {
      const result = await pool.query("SELECT * FROM recipes ORDER BY created_at DESC");
      return result.rows;
    } catch (err) {
      console.error("❌ Error fetching recipes:", err);
      return [];
    }
  }

  // Get Recipe by ID
  async getById(id: number): Promise<Recipe | null> {
    try {
      const result = await pool.query("SELECT * FROM recipes WHERE id = $1", [id]);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (err) {
      console.error("❌ Error fetching recipe:", err);
      return null;
    }
  }

  // Update a Recipe
  async update(id: number, recipe: Recipe): Promise<Recipe | null> {
    try {
      const result = await pool.query(
        "UPDATE recipes SET title = $1, description = $2, ingredients = $3, instructions = $4, image_url = $5 WHERE id = $6 RETURNING *",
        [recipe.title, recipe.description, recipe.ingredients, recipe.instructions, recipe.image_url, id]
      );
      return result.rows[0];
    } catch (err) {
      console.error("❌ Error updating recipe:", err);
      return null;
    }
  }

  // Delete a Recipe
  async delete(id: number): Promise<boolean> {
    try {
      const result = await pool.query("DELETE FROM recipes WHERE id = $1", [id]);
      return result.rowCount !== null && result.rowCount > 0;
    } catch (err) {
      console.error("❌ Error deleting recipe:", err);
      return false;
    }
  }
}