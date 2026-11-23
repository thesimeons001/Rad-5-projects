import { z } from "zod";

export const noteSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required"),

  content: z
    .string()
    .trim()
    .min(1, "Content is required"),
});