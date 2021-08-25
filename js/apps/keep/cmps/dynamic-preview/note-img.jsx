export const ImgNote = ({ note }) => {
    return (
        <article className="note-preview" style={{backgroundColor: note.backgroundColor}}>
            <h4>{note.id}</h4>
            <img src={note.info.url} />
            <h5>{note.info.title}</h5>
        </article>
    )
}