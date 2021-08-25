export const ImgNote = ({ note }) => {
    console.log(note);
    console.log(note.info.url);
    const style = note.style
    return (
        <article className="note-preview" style={style}>
            <h4>{note.id}</h4>
            <img src={note.info.url} />
            <h5>{note.info.title}</h5>
        </article>
    )
}