export const VideoNote = ({ note }) => {
    return (
        <div className="note-container">
            <iframe src={note.info.url} width="100%" height="200"/>
            <div className="note-content">
                <h5>{note.info.title}</h5>
            </div>
        </div>
    )
}