export const TxtNote = ({ note, onRemoveNote }) => {
    return (
        <div className="note-container">
            <div className="note-content">
                <h4>{note.info.txt}</h4>
                <span onClick={() => { onRemoveNote(note.id) }}>X</span>
            </div>
        </div>
    )
}