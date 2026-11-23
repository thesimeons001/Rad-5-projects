import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import type { UserRole } from "../types/users.js";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    username: string;
    role: UserRole;
  };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      message: "Authentication token required",
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({
      message: "Authentication token required",
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

  try {
    const decoded = jwt.verify(token, secret);

    if (
      typeof decoded !== "object" ||
      decoded === null ||
      typeof decoded.userId !== "string" ||
      typeof decoded.username !== "string" ||
      (decoded.role !== "user" && decoded.role !== "admin")
    ) {
      res.status(401).json({
        message: "Invalid or expired token",
      });
      return;
    }

    req.user = {
      userId: decoded.userId,
      username: decoded.username,
      role: decoded.role,
    };

    next();
  } catch {
    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};