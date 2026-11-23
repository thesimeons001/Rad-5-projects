import type { Response } from "express";
import type { AuthRequest } from "../middleware/Authentication.js";
import { readNotes, saveNotes } from "../services/noteService.js";

// Get only the logged-in user's notes
export const getAllNotes = (
  req: AuthRequest,
  res: Response
): void => {
  try {
    const notes = readNotes();

    const userNotes = notes.filter(
      note => note.userId === req.user!.userId
    );

    res.json(userNotes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not retrieve notes" });
  }
};

// Get a single note belonging to the logged-in user
export const getNoteById = (
  req: AuthRequest,
  res: Response
): void => {
  try {
    const notes = readNotes();

    const note = notes.find(
      n =>
        n.id === Number(req.params.id) &&
        n.userId === req.user!.userId
    );

    if (!note) {
      res.status(404).json({ message: "Note not found" });
      return;
    }

    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not retrieve note" });
  }
};

// Create a new note
export const createNote = (
  req: AuthRequest,
  res: Response
): void => {
  try {
    const { title, content } = req.body;

    const notes = readNotes();

    const newNote = {
      id: Date.now(),
      title,
      content,
      userId: req.user!.userId,
    };

    notes.push(newNote);
    saveNotes(notes);

    res.status(201).json(newNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not create note" });
  }
};

// Update only a note belonging to the logged-in user
export const updateNote = (
  req: AuthRequest,
  res: Response
): void => {
  try {
    const { title, content } = req.body;

    const notes = readNotes();

    const note = notes.find(
      n =>
        n.id === Number(req.params.id) &&
        n.userId === req.user!.userId
    );

    if (!note) {
      res.status(404).json({ message: "Note not found" });
      return;
    }

    note.title = title;
    note.content = content;

    saveNotes(notes);

    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not update note" });
  }
};

// Delete a note (admin authorization is handled by the route)
export const deleteNote = (
  req: AuthRequest,
  res: Response
): void => {
  try {
    const notes = readNotes();

    const noteIndex = notes.findIndex(
      n => n.id === Number(req.params.id)
    );

    if (noteIndex === -1) {
      res.status(404).json({ message: "Note not found" });
      return;
    }

    notes.splice(noteIndex, 1);
    saveNotes(notes);

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not delete note" });
  }
};