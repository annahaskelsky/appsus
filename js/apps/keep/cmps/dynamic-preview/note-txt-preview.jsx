export const TxtNote = ({ note}) => {
    return (
        <div className="note-container">
            <div className="note-content">
                <h4>{note.info.txt}</h4>
            </div>
        </div>
    )
}