export const TodoNote = ({ note }) => {
    return (
        <div className="note-container">
            <div className="note-content">
                <ul>
                    {note.info.todos.map(todo => <li key={todo.id}>{todo.txt}</li>)}
                </ul>
            </div>
        </div>
    )
}