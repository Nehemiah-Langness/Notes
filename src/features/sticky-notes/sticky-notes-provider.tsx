import { PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { randomHue } from '../../services/random-hue';
import { randomTilt } from '../../services/random-tilt';
import { randomContent } from '../../services/random-content';
import { StickyNotesContext } from './sticky-notes-context';
import { Note } from './note';
import { randomID } from '../../services/random-id';
import { Storage } from '../../services/storage';

const store = new Storage();

export function StickyNotesProvider({ children }: PropsWithChildren<object>) {
	const [notes, setNotes] = useState<Note[]>(store.getSavedNotes());

	const newNote = useCallback(({ hue, tilt }: { hue?: string; tilt?: string }) => {
        const note = {
            hue: hue ?? randomHue(),
            tilt: tilt ?? randomTilt(),
            id: randomID(),
            ...randomContent(),
        };

		setNotes(store.saveNote(note));
	}, []);

    const saveNote = useCallback((note: Note) => {
		setNotes(store.saveNote(note));
	}, []);

	const deleteNote = useCallback((id: string) => {
		setNotes(store.deleteNote(id));
	}, []);

	const context = useMemo(() => {
		return {
			newNote,
			deleteNote,
            saveNote,
			notes,
		};
	}, [deleteNote, newNote, notes, saveNote]);

	return <StickyNotesContext.Provider value={context}>{children}</StickyNotesContext.Provider>;
}
