import type { Request, Response } from 'express';
import { readNotes, saveNotes } from '../services/noteService.js';

// Get all notes
export const getAllNotes = (req: Request, res: Response): void => {
    try {
        const notes = readNotes();
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Could not retrieve notes' });
    }
};

// Get a single note
export const getNoteById = (req: Request, res: Response): void => {
    try {
        const notes = readNotes();

        const note = notes.find(
            n => n.id === Number(req.params.id)
        );

        if (!note) {
            res.status(404).json({ message: 'Note not found' });
            return;
        }

        res.json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Could not retrieve note' });
    }
};

// Create a new note
export const createNote = (req: Request, res: Response): void => {
    try {
        const { title, content } = req.body ?? {};

        if (
            typeof title !== 'string' ||
            typeof content !== 'string' ||
            !title.trim() ||
            !content.trim()
        ) {
            res.status(400).json({
                message: 'Title and content are required'
            });
            return;
        }

        const notes = readNotes();

        const newNote = {
            id: Date.now(),
            title: title.trim(),
            content: content.trim()
        };

        notes.push(newNote);
        saveNotes(notes);

        res.status(201).json(newNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Could not create note' });
    }
};

// Update a note
export const updateNote = (req: Request, res: Response): void => {
    try {
        const { title, content } = req.body ?? {};

        if (
            typeof title !== 'string' ||
            typeof content !== 'string' ||
            !title.trim() ||
            !content.trim()
        ) {
            res.status(400).json({
                message: 'Title and content are required'
            });
            return;
        }

        const notes = readNotes();

        const note = notes.find(
            n => n.id === Number(req.params.id)
        );

        if (!note) {
            res.status(404).json({ message: 'Note not found' });
            return;
        }

        note.title = title.trim();
        note.content = content.trim();

        saveNotes(notes);

        res.json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Could not update note' });
    }
};

// Delete a note
export const deleteNote = (req: Request, res: Response): void => {
    try {
        const notes = readNotes();

        const noteIndex = notes.findIndex(
            n => n.id === Number(req.params.id)
        );

        if (noteIndex === -1) {
            res.status(404).json({ message: 'Note not found' });
            return;
        }

        notes.splice(noteIndex, 1);
        saveNotes(notes);

        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Could not delete note' });
    }
};