export const TodoNote = ({ note, onMarkUnmarkTodo }) => {
    return (
        <div className="note-container">
            <div className="note-content">
                <ul>
                    {note.info.todos.map(todo => <li key={todo.id} className={`${todo.doneAt ? "done" : ""}`} onClick={() => onMarkUnmarkTodo(note, todo.id)}>{todo.txt}</li>)}
                </ul>
            </div>
        </div>
    )
}