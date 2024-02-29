import { Note } from '../features/sticky-notes/note';
import { Storage } from './storage';


export class NoteStorage extends Storage<Note[]> {
	constructor(KEY = 'notes-saved-data') {
		super(KEY);
	}

	getSavedNotes(): Note[] {
		return this.get() ?? [];
	}

	saveNote(note: Note) {
		const notes = this.getSavedNotes();
		try {
			const existing = notes.find(existingNote => existingNote.id === note.id);
			const existingIndex = existing ? notes.indexOf(existing) : null;
			const alteration = existingIndex !== null ? notes.slice(0, existingIndex).concat(note).concat(notes.slice(existingIndex + 1)) : notes.concat(note);
			this.set(alteration);
			return alteration;
		} catch (error) {
			console.error(error);
			return notes;
		}
	}

	deleteNote(noteId: string) {
		const notes = this.getSavedNotes();
		try {
			const alteration = notes.filter(note => note.id !== noteId);
			this.set(alteration);
			return alteration;
		} catch (error) {
			console.error(error);
			return notes;
		}
	}
}
