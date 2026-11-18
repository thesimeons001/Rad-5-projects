import fs from 'node:fs';
import { notesFile } from '../config/filePath.js';
import type { Note } from '../types/notes.js';

// Read notes from the JSON file
export const readNotes = (): Note[] => {
    const data = fs.readFileSync(notesFile, 'utf-8');
    return JSON.parse(data) as Note[];
};

// Save notes to the JSON file
export const saveNotes = (notes: Note[]): void => {
    fs.writeFileSync(notesFile, JSON.stringify(notes, null, 2));
};