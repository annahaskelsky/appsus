import { NotePreview } from "./note-preview.jsx";

export const NoteList = ({ notes, pinnedNotes, onRemoveNote, onDuplicateNote, onPinUnpinNote }) => {
    return (
        <section>
            <div className="pinned-notes">
                {pinnedNotes.map(note => <NotePreview key={note.id} note={note} onRemoveNote={onRemoveNote} onDuplicateNote={onDuplicateNote} onPinUnpinNote={onPinUnpinNote} />)}
            </div>
            <div className="note-list">
                {notes.map(note => <NotePreview key={note.id} note={note} onRemoveNote={onRemoveNote} onDuplicateNote={onDuplicateNote} onPinUnpinNote={onPinUnpinNote} />)}
            </div>
        </section>
    )
}