import type { Response, NextFunction } from "express";
import type { AuthRequest } from "./Authentication.js";

export const authorizeAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (req.user?.role !== "admin") {
    res.status(403).json({
      message: "Access denied. Admins only.",
    });
    return;
  }

  next();
};