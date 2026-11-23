import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {
  registerUser,
  loginUser,
} from "../services/userService.js";

import type { SafeUser } from "../types/users.js";

// Remove the password before sending user data to the client
const removePassword = (user: {
  id: string;
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
}): SafeUser => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
};

// Register a new user
export const register = (req: Request, res: Response): void => {
  try {
    const { username, email, password } = req.body;

    // Hash the user's password
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = registerUser({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: removePassword(newUser),
    });
  } catch (error) {
    console.error("Registration error:", error);

    if (
      error instanceof Error &&
      error.message === "Username or email already exists"
    ) {
      res.status(409).json({
        message: error.message,
      });
      return;
    }

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Login an existing user
export const login = (req: Request, res: Response): void => {
  try {
    const { email, password } = req.body;

    const user = loginUser({
      email,
      password: "",
    });

    if (!user) {
      res.status(401).json({
        message: "Invalid credentials",
      });
      return;
    }

    // Compare the supplied password with the stored hash
    const passwordIsValid = bcrypt.compareSync(
      password,
      user.password
    );

    if (!passwordIsValid) {
      res.status(401).json({
        message: "Invalid credentials",
      });
      return;
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      res.status(500).json({
        message: "JWT_SECRET is missing in .env",
      });
      return;
    }

    // Generate a JWT containing the user's role
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        role: user.role,
      },
      secret,
      {
        expiresIn: "1h",
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: removePassword(user),
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
}; 