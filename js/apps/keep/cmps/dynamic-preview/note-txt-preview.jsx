export const TxtNote = ({ note, onRemoveNote }) => {
    return (
        <article className="note-preview" style={note.style}>
            <h4>{note.id}</h4>
            <h4>{note.info.txt}</h4>
            <span onClick={() => {onRemoveNote(note.id)}}>X</span>
        </article>
    )
}