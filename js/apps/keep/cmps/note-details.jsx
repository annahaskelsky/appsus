import { NoteService } from "../services/note.service.js"

export class NoteDetails extends React.Component {
    state = {
        img: null,
        video: null,
        title: null,
        txt: null,
        todos: [],
        isAddTodo: true,
        todosNumber: 1,
        newTodoValue: ''
    }

    imageRef = React.createRef()
    videoRef = React.createRef()
    newTodoRef = React.createRef()

    componentDidMount() {
        this.loadNote()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.note !== this.props.note) {
            this.loadNote()
            return
        }
        const todosProps = prevProps.note.info.todos
        if (todosProps.length !== prevState.todos.length) {
            this.setState({ todos: [...todosProps] })
        }
    }

    loadNote = () => {
        this.setState({ ...this.props.note.info })
    }

    handleChange = ({ target: { name, value } }) => {
        if (name === 'video') {
            const videoId = NoteService.getId(value)
            if (!videoId) return
            const embedVideo = '//www.youtube.com/embed/' + videoId
            this.imageRef.current.value = ''
            this.setState({ video: embedVideo, videoStr: value, img: null })
            return
        }
        this.setState({ [name]: value })
    }

    handleChangeFile = () => {
        const reader = new FileReader();
        reader.readAsDataURL(this.imageRef.current.files[0])
        reader.onloadend = () => {
            this.videoRef.current.value = ''
            this.setState({ img: reader.result, video: null })
        }
    }

    handleTodoChange = ({ target: { value } }) => {
        this.setState({ newTodo: value })
    }

    onAddTodo = () => {
        const { newTodo } = this.state
        if (!newTodo) return
        NoteService.addTodo(this.props.note.id, newTodo)
        this.newTodoRef.current.value = ''
        this.setState({ newTodo: '' })
    }

    handleSubmit = () => {
        const { img, video, title, txt, todos } = this.state
        const noteInfo = { img, video, title, txt, todos }
        this.props.handleSubmit(noteInfo)
    }

    handleRemoveTodo = (todoId) => {
        const { todos } = this.state
        const newTodos = todos.filter(t => t.id !== todoId)
        NoteService.removeTodo(this.props.note.id, todoId).then(() => {
            this.setState({ todos: newTodos })
        })
    }

    render() {
        const { img, video, title, txt, todos, isAddTodo } = this.state
        return (
            <div className="note-details-container">
                <div className="note-details-img-container">
                    {img && <img src={img} />}
                </div>
                <div className="note-details-img-icon">
                    <span>Upload Image</span> <button className="icon-button" onClick={() => this.imageRef.current.click()}><i class="fas fa-upload"></i></button>
                </div>
                <input type="file" className="note-details-img-input" id="edit-image" ref={this.imageRef} onChange={this.handleChangeFile} />

                <input type="text" id="video" ref={this.videoRef} name="video" placeholder="Youtube Url" onChange={this.handleChange} />
                {video && <iframe src={video} width="100%" height="200" />}

                <input type="text" name="title" onChange={this.handleChange} value={title || ''} />
                <textarea name="txt" onChange={this.handleChange} value={txt || ''} />
                {isAddTodo &&
                    todos.map(todo => (
                        <div key={todo.id} className="note-details-todo-container">
                            <div>{todo.txt}</div>
                            <button className="icon-button" onClick={() => this.handleRemoveTodo(todo.id)}><i class="far fa-times-circle"></i></button>
                        </div>
                    ))
                }
                <div className="note-details-todo-container">
                    <input ref={this.newTodoRef} type="text" name="todo" placeholder="Add Todo" onChange={this.handleTodoChange} />
                    <button className="icon-button" onClick={this.onAddTodo}><i class="fas fa-plus-circle"></i></button>
                </div>

                <button className="note-details-submit" onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}