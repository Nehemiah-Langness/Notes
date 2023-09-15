import { StickyNotes } from './components/sticky-notes';
import { StickyNotesProvider } from './features/sticky-notes/sticky-notes-provider';

function App() {
	return (
		<>
			<StickyNotesProvider>
				<StickyNotes />
			</StickyNotesProvider>
		</>
	);
}

export default App;
