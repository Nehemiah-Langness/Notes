import { useContext } from 'react';
import { StickyNotesContext } from './sticky-notes-context';

export function useStickyNotes() {
    return useContext(StickyNotesContext);
}
