import { Note } from '../features/sticky-notes/note';


export interface ExternalSource {
	source: string;
	alterations: (Partial<Note> & Pick<Note, 'id'>)[];
}
