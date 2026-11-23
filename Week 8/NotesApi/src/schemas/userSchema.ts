import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Username is required"),

  email: z
    .string()
    .trim()
    .pipe(z.email("Enter a valid email address")),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .pipe(z.email("Enter a valid email address")),

  password: z
    .string()
    .min(1, "Password is required"),
});