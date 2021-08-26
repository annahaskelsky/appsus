
export const NoteDynamicPreview = ({ note, onMarkUnmarkTodo }) => {

    if (!note || note && !note.info) return null
    return (
        <div className="note-container">
            {note.info.img && <img src={note.info.img} />}
            {note.info.video && <iframe src={note.info.video} width="100%" height="200" />}
            <div className="note-content">
                {note.info.title && <h3>{note.info.title}</h3>}
                <h4>{note.info.txt}</h4>
                <ul>
                    {note.info.todos.map(todo => <li key={todo.id} className={`${todo.doneAt ? "done" : ""}`} onClick={() => onMarkUnmarkTodo(todo.id)}>{todo.txt}</li>)}
                </ul>
            </div>
        </div>
    )
}
