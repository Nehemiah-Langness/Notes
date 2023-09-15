import { Note } from '../features/sticky-notes/note';

export class Storage {
	private KEY = 'notes-saved-data';

	getSavedNotes(): Note[] {
		try {
			const storage = localStorage.getItem(this.KEY) ?? '[]';
			return JSON.parse(storage) ?? [];
		} catch (error) {
			console.error(error);
			return [];
		}
	}

	saveNote(note: Note) {
		const notes = this.getSavedNotes();
		try {
            const existing = notes.find(existingNote => existingNote.id === note.id);
            const existingIndex = existing ? notes.indexOf(existing) : null;
			const alteration = existingIndex !== null ? notes.slice(0, existingIndex).concat(note).concat(notes.slice(existingIndex + 1)) : notes.concat(note);
			localStorage.setItem(this.KEY, JSON.stringify(alteration));
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
			localStorage.setItem(this.KEY, JSON.stringify(alteration));
			return alteration;
		} catch (error) {
			console.error(error);
			return notes;
		}
    }
}
