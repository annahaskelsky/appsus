export const TxtNote = ({ note}) => {
    return (
        <div className="note-container">
            <div className="note-content">
           {note.info.title && <h3>{note.info.title}</h3>}
                <h4>{note.info.txt}</h4>
            </div>
        </div>
    )
}