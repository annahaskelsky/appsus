export const ImgNote = ({ note }) => {
    return (
        <div className="note-container">
            <img src={note.info.url} />
            <div className="note-content">
                <h5>{note.info.title}</h5>
            </div>
        </div>
    )
}