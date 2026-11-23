import { Router } from "express";
import {
  register,
  login,
} from "../controllers/userController.js";

import {
  authenticate,
  type AuthRequest,
} from "../middleware/Authentication.js";

import {
  validateRegister,
  validateLogin,
} from "../middleware/validateUser.js";

const router = Router();

// Get user profile
router.get("/profile", authenticate, (req: AuthRequest, res) => {
  res.json({
    message: "Access granted",
    user: req.user,
  });
});

// Register a new user
router.post("/register", validateRegister, register);

// Login an existing user
router.post("/login", validateLogin, login);

export default router;