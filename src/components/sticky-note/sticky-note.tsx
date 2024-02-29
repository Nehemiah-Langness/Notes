import { useCallback, useEffect, useRef, useState } from 'react';
import './stick-note.scss';
import { Note } from '../../features/sticky-notes/note';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useStickyNotes } from '../../features/sticky-notes/use-sticky-notes';

export function StickyNote({ note }: { note: Note }) {
	const [state, setState] = useState(note);
	const [inEditMode, setInEditMode] = useState(false);
	const { saveNote } = useStickyNotes();
	const isDirty = useRef(false);
	const noteRef = useRef<HTMLDivElement>(null);
	const saveStateRef = useRef(state);

	const [rotating, setRotating] = useState(false);

	const onChange = useCallback(<T extends keyof typeof state>(property: T, value: (typeof state)[T]) => {
		isDirty.current = true;
		setState((prev) => {
			return {
				...prev,
				[property]: value,
			};
		});
	}, []);

	const save = useCallback(() => {
		if (isDirty.current) {
			saveNote(saveStateRef.current);
		}
		setInEditMode(false);
	}, [saveNote]);

	const onKeyUp = (event: React.KeyboardEvent) => {
		if (event.key.toLowerCase() === 'enter' && !event.shiftKey) {
			save();
			event.stopPropagation();
			event.preventDefault();
			return false;
		}
	};

	useEffect(() => {
		saveStateRef.current = state;
	}, [state]);

	useEffect(() => {
		setState(note);
		isDirty.current = false;
	}, [note]);

	useEffect(() => {
		const handler = () => {
			setRotating(false);
			save();
		};
		document.addEventListener('mouseup', handler);
		return () => document.removeEventListener('mouseup', handler);
	}, [save]);

	useEffect(() => {
		if (rotating) {
			const handler = (e: MouseEvent) => {
				const { x = 0, y = 0, width = 0, height = 0 } = noteRef.current?.getBoundingClientRect() ?? {};

				const p1 = { x: e.clientX, y: e.clientY };
				const p2 = { x: x + width / 2, y: y + height / 2 };
				const direction = 90 + (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI;

				onChange('tilt', direction.toFixed() + 'deg');
			};
			document.addEventListener('mousemove', handler);
			return () => document.removeEventListener('mousemove', handler);
		}
	}, [onChange, rotating]);

	return (
		<div
			ref={noteRef}
			className={'sticky-note' + (inEditMode ? ' editing' : '') + (rotating ? ' rotating' : '')}
			style={{ '--tilt': state.tilt, '--hue': state.hue } as React.CSSProperties}
			onMouseLeave={save}
		>
			<div className='note-expanse'></div>
			<div className='note-title'>
				<Input
					editing={inEditMode}
					form={state}
					onChange={onChange}
					onKeyUp={onKeyUp}
					property={'title'}
					onClick={() => setInEditMode(true)}
				/>
			</div>
			<div className='note-content'>
				<Input
					editing={inEditMode}
					form={state}
					onChange={onChange}
					onKeyUp={onKeyUp}
					property={'text'}
					onClick={() => setInEditMode(true)}
				/>
			</div>
			{!note.external && <div className='note-button note-delete-button'>
				<DeleteButton id={state.id} />
			</div>}
			<div className='note-button note-rotate-button'>
				<RotateButton onClick={() => setRotating(true)} />
			</div>
			<div className='note-button note-hue-range'>
				<input
					type='range'
					className='form-range'
					min='0'
					max='224'
					step='32'
					value={state.hue}
					onChange={(e) => onChange('hue', e.target.value)}
				/>
			</div>
		</div>
	);
}

function DeleteButton({ id }: { id: string }) {
	const { deleteNote } = useStickyNotes();

	const onClick = () => {
		deleteNote(id);
	};

	return (
		<button type='button' className='btn btn-sm btn-danger rounded-circle' onClick={onClick}>
			<FontAwesomeIcon icon={faTrash} />
		</button>
	);
}

function RotateButton({ onClick }: { onClick: () => void }) {
	return (
		<button type='button' className='btn btn-sm btn-outline-light border-0 rounded-circle text-dark' onMouseDown={onClick}>
			<FontAwesomeIcon icon={faRotate} />
		</button>
	);
}

function Input<T, TProperty extends keyof T>({
	onChange,
	editing,
	property,
	onKeyUp,
	form,
	onClick,
}: {
	form: T;
	property: TProperty;
	editing: boolean;
	onChange: (property: TProperty, value: string) => void;
	onKeyUp: (event: React.KeyboardEvent) => void;
	onClick: () => void;
}) {
	const value = form[property] as string;

	return (
		<textarea
			className='form-control'
			readOnly={!editing}
			value={value}
			onChange={({ target }) => onChange(property, target.value)}
			onKeyDown={onKeyUp}
			onClick={(e) => {
				onClick();
				e.currentTarget.focus();
			}}
			onFocus={(e) => e.target.select()}
		/>
	);
}
