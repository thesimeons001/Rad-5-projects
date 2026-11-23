import { Router } from "express";

import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";

import { authenticate } from "../middleware/Authentication.js";
import { authorizeAdmin } from "../middleware/authorizeAdmin.js";
import { validateNote } from "../middleware/validateNote.js";

const router = Router();

// Get all notes
router.get("/", authenticate, getAllNotes);

// Get a single note
router.get("/:id", authenticate, getNoteById);

// Create a note
router.post("/", authenticate, validateNote, createNote);

// Update a note
router.put("/:id", authenticate, validateNote, updateNote);

// Only admins can delete notes
router.delete("/:id", authenticate, authorizeAdmin, deleteNote);

export default router;