import { NoteService } from "../services/note.service.js"

export class NoteDetails extends React.Component {
    state = {
        img: null,
        video: null,
        title: null,
        txt: null,
        todos: [],
    }

    componentDidMount() {
        this.loadNote()
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.isMount) return
        if (prevProps.match.params.noteId !== this.props.match.params.noteId) {
            this.isMount = false
            this.loadNote()
        }
    }

    onBack = () => {
        this.props.history.push('/keep')
    }

    loadNote = () => {
        const id = this.props.match.params.noteId
        NoteService.getNoteById(id)
            .then(note => {
                this.setState({ ...note.info })
            })
    }

    handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value })
    }

    handleSubmit = () => {
        const { img, video, title, txt, todos } = this.state
        const id = this.props.match.params.noteId
        const note = { img, video, title, txt, todos }
        NoteService.editNote(note, id).then(this.onBack())
    }

    render() {
        const { img, video, title, txt, todos } = this.state
        return (
            <div>
                {img && <img src={img} />}
                {video && <iframe src={video} width="100%" height="200" />}
                <input name="title" onChange={this.handleChange} value={title || ''} />
                <textarea name="txt" onChange={this.handleChange} value={txt || ''} />
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}