import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StickyNotes } from './components/sticky-notes';
import { StickyNotesProvider } from './features/sticky-notes/sticky-notes-provider';
import { faWifi } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useStickyNotes } from './features/sticky-notes/use-sticky-notes';

function App() {
	return (
		<>
			<StickyNotesProvider>
				<ApiConnection />
				<StickyNotes />
			</StickyNotesProvider>
		</>
	);
}

function ApiConnection() {
	const [dataEntry, setDataEntry] = useState(false);
	const { externalSource, saveExternalSource } = useStickyNotes();

	const [text, setText] = useState(externalSource);

	return (
		<div className='input-group'>
			<button className='btn btn-light' onClick={() => setDataEntry(p => !p)}><FontAwesomeIcon icon={faWifi} /></button>
			{dataEntry && <input type="text" placeholder='https://my-api.com/tasks' value={text} onChange={e => setText(e.target.value)} onBlur={(e) => {
				saveExternalSource(e.target.value);
				setDataEntry(false);
			}} className='form-control' />}
		</div>
	)
}

export default App;
