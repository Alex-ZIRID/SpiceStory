import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./database";
import authRoutes from "./routes/auth.routes";
import recipeRoutes from "./routes/recipe.routes";
import commentRoutes from "./routes/comment.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/comments", commentRoutes);

// Root API Check
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW();");
    res.json({ message: "SpiceStory API is running", time: result.rows[0].now });
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Handle Undefined Routes (404)
app.use((req, res) => {
  console.warn(`⚠️ 404 - Not Found: ${req.originalUrl}`);
  res.status(404).json({ error: "Not Found", path: req.originalUrl });
});

// Start Server
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);

  // Check Database Connection on Startup
  try {
    await pool.query("SELECT 1");
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection error:", error);
  }
});