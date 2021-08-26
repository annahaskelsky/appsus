import { NoteService } from "../services/note.service.js"

export class NoteDetails extends React.Component {
    state = {
        img: null,
        video: null,
        title: null,
        txt: null,
        todos: [],
        isAddTodo: false,
        newTodo: ''
    }

    imageRef = React.createRef()
    videoRef = React.createRef()

    componentDidMount() {
        this.loadNote()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.noteId !== this.props.match.params.noteId) {
            this.loadNote()
        }
    }


    onBack = () => {
        this.props.history.push('/keep')
    }

    loadNote = () => {
        const id = this.props.match.params.noteId
        this.setState({newTodo: '', isAddTodo: false})
        NoteService.getNoteById(id)
            .then(note => {
                this.setState({ ...note.info })
            })
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

    handleSubmit = () => {
        const { img, video, title, txt, todos } = this.state
        const id = this.props.match.params.noteId
        const note = { img, video, title, txt, todos }
        NoteService.editNoteContent(note, id).then(this.onBack())
    }

    handleChangeFile = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onloadend = () => {
            this.videoRef.current.value = ''
            this.setState({ img: reader.result, video: null })
        }
    }

    handleTodoChange = ({ target: { name, value } }) => {
        this.setState({ newTodo: value })
    }

    onAddTodo = () => {
        const noteId = this.props.match.params.noteId
        NoteService.addTodo(noteId, this.state.newTodo).then(this.onBack())
    }

    render() {
        const { img, video, title, txt, todos, isAddTodo, newTodo } = this.state
        return (
            <div style={{ display: 'flex', flexDirection: 'column', width: '15%', margin: '0 auto' }}>
                <input type="file" ref={this.imageRef} onChange={this.handleChangeFile} />
                {img && <img src={img} />}
                <label htmlFor="video">Video:</label>
                <input type="text" ref={this.videoRef} id="video" name="video" onChange={this.handleChange} />
                {video && <iframe src={video} width="100%" height="200" />}
                <input name="title" onChange={this.handleChange} value={title || ''} />
                <textarea name="txt" onChange={this.handleChange} value={txt || ''} />
                {isAddTodo && <div><input type="text" name="todo" value={newTodo} onChange={this.handleTodoChange} />
                    <button onClick={this.onAddTodo}>+</button>
                </div>}
                <button onClick={() => this.setState({ isAddTodo: true })}>Add todo</button>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}