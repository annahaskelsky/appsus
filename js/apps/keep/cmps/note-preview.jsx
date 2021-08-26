import { NoteService } from "../services/note.service.js"
import { ActionBar } from "./action-bar.jsx"
import { NoteDynamicPreview } from "./note-dynamic-preview.jsx"
const { Link } = ReactRouterDOM

export class NotePreview extends React.Component {
    state = {
        note: null,
        noteStyle: {}
    }

    componentDidMount() {
        const note = this.props.note
        this.setState({ note })
    }

    handleColorChange = (color) => {
        const note = this.state.note
        NoteService.changeColor(note.id, color)
        this.setState({ note })
    }

    onMarkUnmarkTodo = (todoId) => {
        const { note } = this.state
        NoteService.markUnmark(note, todoId)
        this.setState({ note })
    }

    // onBack = () => {
    //     // this.props.history.push('/keep')
    //     console.log(this.props);
    //   }

    render() {
        const { note } = this.state
        if (!note) return <div>Loading...</div>

        return (
            <article className="note-preview" style={{ backgroundColor: note.backgroundColor }}>
                <Link to={`/keep/${note.id}`}>
                    <NoteDynamicPreview
                        note={note}
                        onMarkUnmarkTodo={this.onMarkUnmarkTodo}
                    />
                </Link>
                <ActionBar note={note}
                    handleColorChange={this.handleColorChange}
                    onRemoveNote={this.props.onRemoveNote}
                    onDuplicateNote={this.props.onDuplicateNote}
                    onPinUnpinNote={this.props.onPinUnpinNote} />
            </article>
        )
    }
}