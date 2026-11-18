import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

const notesFile = path.join(__dirname, '../data/notes.json');

// Read notes from the JSON file
const readNotes = () => {
    const data = fs.readFileSync(notesFile, 'utf-8');
    return JSON.parse(data);
};

// Save notes to the JSON file
const saveNotes = (notes) => {
    fs.writeFileSync(notesFile, JSON.stringify(notes, null, 2));
};

// Get all notes
app.get('/notes', (req, res) => {
    try {   
        const notes = readNotes();
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Could not retrieve notes' });
    }
});

// Get a single note
app.get('/notes/:id', (req, res) => {
    try {
        const notes = readNotes();

        const note = notes.find(
            n => n.id === Number(req.params.id)
        );

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Could not retrieve note' });
    }
});

// Create a new note
app.post('/notes', (req, res) => {
    try {
        const { title, content } = req.body ?? {};

        if (
            typeof title !== 'string' ||
            typeof content !== 'string' ||
            !title.trim() ||
            !content.trim()
        ) {
            return res.status(400).json({
                message: 'Title and content are required'
            });
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
});

// Update a note
app.put('/notes/:id', (req, res) => {
    try {
        const { title, content } = req.body ?? {};

        if (
            typeof title !== 'string' ||
            typeof content !== 'string' ||
            !title.trim() ||
            !content.trim()
        ) {
            return res.status(400).json({
                message: 'Title and content are required'
            });
        }

        const notes = readNotes();

        const note = notes.find(
            n => n.id === Number(req.params.id)
        );

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        note.title = title.trim();
        note.content = content.trim();

        saveNotes(notes);

        res.json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Could not update note' });
    }
});

// Delete a note
app.delete('/notes/:id', (req, res) => {
    try {
        const notes = readNotes();

        const noteIndex = notes.findIndex(
            n => n.id === Number(req.params.id)
        );

        if (noteIndex === -1) {
            return res.status(404).json({ message: 'Note not found' });
        }

        notes.splice(noteIndex, 1);
        saveNotes(notes);

        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Could not delete note' });
    }
});

// Handle invalid JSON and other errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400) {
        return res.status(400).json({ message: 'Invalid JSON format' });
    }

    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});