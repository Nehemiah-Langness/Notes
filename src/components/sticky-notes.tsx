import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useStickyNotes } from '../features/sticky-notes/use-sticky-notes';
import { AddNote } from './add-note';
import { StickyNote } from './sticky-note';
import { faArrowsSpin } from '@fortawesome/free-solid-svg-icons';
import { CSSProperties } from 'react';

export function StickyNotes() {
	const { notes } = useStickyNotes();

	return (
		<div className='p-5 d-flex flex-wrap justify-content-center sticky-note-shadow'>
			{notes ? <>
				{notes.map(note => <StickyNote key={note.id} note={note} />)}
				<AddNote /></> : <div className={'parent'} style={{ '--animation-speed': '.3s' } as CSSProperties}>
			<div
				className={'sticky-note rotating'}
				style={{ '--hue': '64' } as CSSProperties}

			>
				<div className='d-flex justify-content-center align-items-center h-100' style={{ fontSize: '100pt' }}>
					<FontAwesomeIcon className='text-secondary' icon={faArrowsSpin} spin />
				</div>
			</div>
		</div>}

		</div>
	);
}
