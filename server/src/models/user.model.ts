import pool from "../database";
import bcrypt from "bcryptjs";

export type User = {
  id?: number;
  name: string;
  email: string;
  password: string;
};

export class UserModel {
  // Hash Password
  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  // Create a New User
  async create(user: User): Promise<User | null> {
    try {
      const hashedPassword = await this.hashPassword(user.password);
      const result = await pool.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
        [user.name, user.email, hashedPassword]
      );
      return result.rows[0];
    } catch (err) {
      console.error("❌ Error creating user:", err);
      return null;
    }
  }

  // Find User by Email
  async findByEmail(email: string): Promise<User | null> {
    try {
      const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (err) {
      console.error("❌ Error finding user:", err);
      return null;
    }
  }

  // Find User by ID  ✅ ADD THIS METHOD
  async findById(id: number): Promise<User | null> {
    try {
      const result = await pool.query(
        "SELECT id, name, email FROM users WHERE id = $1",
        [id]
      );
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (err) {
      console.error("❌ Error finding user by ID:", err);
      return null;
    }
  }

  // Verify Password
  async verifyPassword(enteredPassword: string, storedPassword: string): Promise<boolean> {
    return bcrypt.compare(enteredPassword, storedPassword);
  }
}