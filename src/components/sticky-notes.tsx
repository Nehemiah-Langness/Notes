import { useStickyNotes } from '../features/sticky-notes/use-sticky-notes';
import { AddNote } from './add-note';
import { StickyNote } from './sticky-note';

export function StickyNotes() {
	const { notes } = useStickyNotes();

	return (
		<div className='p-5 d-flex flex-wrap justify-content-center sticky-note-shadow'>
            {notes.map(note => <StickyNote key={note.id} note={note} />)}
			<AddNote />
		</div>
	);
}
