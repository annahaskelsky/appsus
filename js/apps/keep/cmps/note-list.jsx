import { NotePreview } from "./note-preview.jsx";

export const NoteList = ({ notes, onRemoveNote }) => {
    return (
        <div className="note-list">
            {notes.map(note => <NotePreview key={note.id} note={note} onRemoveNote={onRemoveNote} />)}
        </div>
    )
}