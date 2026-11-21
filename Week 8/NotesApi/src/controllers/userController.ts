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
}): SafeUser => {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };
};

// Register a new user
export const register = (req: Request, res: Response): void => {
  try {
    const { username, email, password } = req.body ?? {};

    if (
      typeof username !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !username.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      res.status(400).json({
        message: "username, email and password are required",
      });
      return;
    }

    // Hash the user's password
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = registerUser({
      username: username.trim(),
      email: email.trim(),
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: removePassword(newUser),
    });

  } catch (error) {
    console.error("Registration error:", error);

    if (error instanceof Error) {
      if (error.message === "Username or email already exists") {
        res.status(409).json({
          message: error.message,
        });
        return;
      }
    }

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Login an existing user
export const login = (req: Request, res: Response): void => {
  try {
    const { email, password } = req.body ?? {};

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      res.status(400).json({
        message: "email and password are required",
      });
      return;
    }

    const user = loginUser({
      email: email.trim(),
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

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
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