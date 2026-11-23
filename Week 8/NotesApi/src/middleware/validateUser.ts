import type { Request, Response, NextFunction } from "express";
import {
  registerSchema,
  loginSchema,
} from "../schemas/userSchema.js";

// Validate user registration
export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      message: "Validation failed",
      errors: result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  req.body = result.data;
  next();
};

// Validate user login
export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      message: "Validation failed",
      errors: result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  req.body = result.data;
  next();
};