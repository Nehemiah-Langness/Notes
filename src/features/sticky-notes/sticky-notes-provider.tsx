import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { randomHue } from '../../services/random-hue';
import { randomTilt } from '../../services/random-tilt';
import { StickyNotesContext } from './sticky-notes-context';
import { Note } from './note';
import { randomID } from '../../services/random-id';
import { NoteStorage } from '../../services/note-storage';
import { ExternalSourceStorage } from '../../services/external-source-storage';

const store = new NoteStorage();
const externalStorageStore = new ExternalSourceStorage();

export function StickyNotesProvider({ children }: PropsWithChildren<object>) {
	const [notes, setNotes] = useState<Note[]>(store.getSavedNotes());

	const [externalSource, setExternalSource] = useState(externalStorageStore.getSource())
	const [externalNotes, setExternalNotes] = useState<Note[]>()

	const saveExternalSource = useCallback((value: string) => {
		setExternalSource(externalStorageStore.setSource(value));
	}, [])

	const newNote = useCallback(({ hue, tilt }: { hue?: string; tilt?: string }) => {
		const note: Note = {
			hue: hue ?? randomHue(),
			tilt: tilt ?? randomTilt(),
			id: randomID(),
			title: '',
			text: '',
		};

		setNotes(store.saveNote(note));
	}, []);

	const saveNote = useCallback((note: Note) => {
		if (note.external) {
			externalStorageStore.saveNote(note).then(setExternalNotes);
		} else {
			setNotes(store.saveNote(note));
		}
	}, []);

	const deleteNote = useCallback((id: string) => {
		setNotes(store.deleteNote(id));
	}, []);

	const allNotes = useMemo(() => !externalNotes ? undefined : notes.concat(externalNotes), [externalNotes, notes])

	useEffect(() =>{
		if (externalSource) {
			setExternalNotes(undefined);
			externalStorageStore.loadNotes().then(setExternalNotes)
		} else {
			setExternalNotes([])
		}
	},[externalSource])

	const context = useMemo(() => {
		return {
			newNote,
			deleteNote,
			saveNote,
			notes: allNotes,
			externalSource,
			saveExternalSource
		};
	}, [deleteNote, newNote, allNotes, saveNote, externalSource, saveExternalSource]);

	return <StickyNotesContext.Provider value={context}>{children}</StickyNotesContext.Provider>;
}
