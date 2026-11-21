import { Router } from "express";
import {
  register,
  login,
} from "../controllers/userController.js";
import { authenticate, type AuthRequest } from "../middleware/Authentication.js";
const router = Router();

router.get("/profile", authenticate, (req: AuthRequest, res) => {
  res.json({
    message: "Access granted",
    user: req.user,
  });
});

// Register a new user
router.post("/register", register);

// Login an existing user
router.post("/login", login);

export default router;