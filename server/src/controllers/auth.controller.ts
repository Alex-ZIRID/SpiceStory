import { Request, Response, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserModel } from "../models/user.model";
import { AuthRequest } from "../middleware/auth.middleware";

dotenv.config();
const userModel = new UserModel();

// REGISTER
export const register: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findByEmail(email);
    if (existingUser) {
      res.status(400).json({ error: "Email is already in use" });
      return;
    }

    // Create new user
    const newUser = await userModel.create({ name, email, password });

    if (!newUser) {
      res.status(500).json({ error: "User registration failed" });
      return;
    }

    // Include 'name' in JWT payload
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, name: newUser.name },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "User registered successfully", user: newUser, token });
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// LOGIN 
export const login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await userModel.findByEmail(email);
    if (!user) {
      res.status(400).json({ error: "Invalid email or password" });
      return;
    }

    // Verify Password
    const isPasswordValid = await userModel.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ error: "Invalid email or password" });
      return;
    }

    // Include 'name' in JWT payload
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET USER PROFILE
export const getProfile: RequestHandler = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(403).json({ error: "Unauthorized" });
      return;
    }

    const user = await userModel.findById(req.user.id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    console.error("❌ Profile fetch error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};