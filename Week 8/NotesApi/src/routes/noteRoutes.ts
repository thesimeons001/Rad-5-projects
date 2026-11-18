import { Router } from 'express';

import {
    getAllNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
} from '../controllers/noteController.js';

const router = Router();

// GET all notes
router.get('/', getAllNotes);

// GET a single note
router.get('/:id', getNoteById);

// CREATE a note
router.post('/', createNote);

// UPDATE a note
router.put('/:id', updateNote);

// DELETE a note
router.delete('/:id', deleteNote);

export default router;