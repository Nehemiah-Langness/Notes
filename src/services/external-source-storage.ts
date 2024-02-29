import { Note } from '../features/sticky-notes/note';
import { Storage } from './storage';
import { ExternalSource } from './external-source';


export class ExternalSourceStorage extends Storage<ExternalSource> {
	constructor(KEY = 'external-note-saved-data') {
		super(KEY);
	}

	getSource(): string {
		return this.get()?.source ?? '';
	}

	setSource(value: string) {
		const externalSource = this.get() ?? { source: '', alterations: [] };
		this.set({
			...externalSource,
			source: value
		});
		return value;
	}

	async loadNotes(): Promise<Note[]> {
		const externalSource = this.get();
		if (!externalSource?.source) {
			return [];
		}

		return fetch(externalSource.source).then(result => result.json()).then(result => {
			if (result.redirect) {
				window.location.href = result.redirect + window.location.href;
			}
			if (result.notes) {
				const notes = result.notes as Note[];

				this.set({
					...externalSource,
					alterations: externalSource.alterations.filter(a => notes.find(n => n.id === a.id))
				});

				return notes.map(n => ({
					...n,
					...externalSource.alterations.find(a => a.id === n.id),
					external: true
				}));
			}
			return [];
		}).catch(e => {
			console.log(e);
			return [];
		});
	}

	async saveNote(note: Note) {
		const { alterations, source } = this.get() ?? { source: '', alterations: [] };

		try {
			const existing = alterations.find(existingNote => existingNote.id === note.id);
			const existingIndex = existing ? alterations.indexOf(existing) : null;
			const alteration = existingIndex !== null ? alterations.slice(0, existingIndex).concat({
				id: note.id,
				hue: note.hue,
				tilt: note.tilt
			}).concat(alterations.slice(existingIndex + 1)) : alterations.concat({
				id: note.id,
				hue: note.hue,
				tilt: note.tilt
			});

			this.set({
				alterations: alteration,
				source: source
			});
		} catch (error) {
			console.error(error);
		}
		
		return this.loadNotes();
	}
}
