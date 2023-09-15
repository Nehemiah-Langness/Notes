import React from 'react';
import { Note } from './note';

interface StickyNotesContext {
	newNote: (props: { hue?: string; tilt?: string }) => void;
	saveNote: (note: Note) => void;
    deleteNote: (id: string) => void;
	notes: Note[];
}

export const StickyNotesContext = React.createContext<StickyNotesContext>({
	newNote: () => {},
    deleteNote: () => {},
    saveNote: () => {},
	notes: [],
});
