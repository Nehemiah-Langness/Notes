import React from 'react';
import { Note } from './note';

interface StickyNotesContext {
	newNote: (props: { hue?: string; tilt?: string }) => void;
	saveNote: (note: Note) => void;
    deleteNote: (id: string) => void;
	notes: Note[] | undefined;
	externalSource: string;
	saveExternalSource: (source: string) => void
}

export const StickyNotesContext = React.createContext<StickyNotesContext>({
	newNote: () => {},
    deleteNote: () => {},
    saveNote: () => {},
	notes: [],
	externalSource: '',
	saveExternalSource: () => {}
});
