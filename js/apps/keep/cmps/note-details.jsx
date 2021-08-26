import { NoteService } from "../services/note.service.js"

export class NoteDetails extends React.Component {
    state = {
        note: null
    }

    componentDidMount() {
        this.loadNote()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.noteId !== this.props.match.params.noteId) {
            this.loadNote()
        }
    }

    onBack = () => {
        this.props.history.push('/note')
      }

    loadNote = () => {
        const id = this.props.match.params.noteId
        NoteService.getNoteById(id)
            .then(note => {
                if (!note) this.props.history.push('/')
                this.setState({ note })
            })
    }

    render() {
        return (
            <h1>Hello</h1>
        )
    }
}