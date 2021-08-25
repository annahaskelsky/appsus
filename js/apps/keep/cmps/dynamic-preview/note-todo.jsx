export const TodoNote = ({ note }) => {
    console.log(note);
    return (
        <article className="note-preview" style={{backgroundColor: note.backgroundColor}}>
            <h4>{note.id}</h4>
            <ul>
                {note.info.todos.map(todo => <li key={todo.id}>{todo.txt}</li>)}
            </ul>
        </article>
    )
}