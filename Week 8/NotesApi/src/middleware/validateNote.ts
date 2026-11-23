import type { Request, Response, NextFunction } from "express";
import { noteSchema } from "../schemas/noteSchema.js";

export const validateNote = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const result = noteSchema.safeParse(req.body);

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