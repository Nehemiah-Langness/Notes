import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { CSSProperties, useState } from 'react';
import { randomHue } from '../services/random-hue';
import { useStickyNotes } from '../features/sticky-notes/use-sticky-notes';

export function AddNote() {
	const { newNote } = useStickyNotes();
	const [state, setState] = useState({
		hue: randomHue(),
	});

	const [fadeIn, setFadeIn] = useState(false);

	const onClick = () => {
		setFadeIn(true);
		setTimeout(() => {
			setFadeIn(false);
		}, .3 * 1000);
		newNote({
			hue: state.hue,
		});
		setState((prev) => {
			return {
				...prev,
				hue: randomHue(),
			};
		});
	};

	return (
		<div className={'parent ' + (fadeIn ? 'fade-in' : '')} style={{ '--animation-speed': '.3s' } as CSSProperties}>
			<div
				className={'sticky-note new ' + (fadeIn ? 'fade-in' : '')}
				style={{ '--hue': state.hue } as CSSProperties}
				onClick={onClick}
			>
				<div className='d-flex justify-content-center align-items-center h-100' style={{ fontSize: '100pt' }}>
					<FontAwesomeIcon icon={faCirclePlus} />
				</div>
			</div>
		</div>
	);
}
