import { Router, Response } from "express";
import { register, login, getProfile } from "../controllers/auth.controller";
import { authenticateJWT, AuthRequest } from "../middleware/auth.middleware"; 

const router: Router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticateJWT, getProfile);
router.get("/protected", authenticateJWT, (req: AuthRequest, res: Response) => {
  res.json({ message: "Protected route accessed successfully!", user: req.user });
});

export default router;