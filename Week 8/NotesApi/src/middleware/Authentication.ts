import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { TokenPayload } from "../types/users.js";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    username: string;
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

  if (typeof secret !== "string" || secret.length === 0) {
    res.status(500).json({
      message: "JWT_SECRET is missing in .env",
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret) as unknown as TokenPayload;

    const userId = decoded.userId;
    const username = decoded.username;

    if (!userId || !username) {
      res.status(401).json({
        message: "Invalid or expired token",
      });
      return;
    }

    req.user = {
      userId,
      username,
    };

    next();
  } catch {
    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};