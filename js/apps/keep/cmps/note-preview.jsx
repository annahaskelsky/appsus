import { TxtNote } from "./dynamic-preview/note-txt-preview.jsx"
import { ImgNote } from "./dynamic-preview/note-img.jsx"
import { TodoNote } from "./dynamic-preview/note-todo.jsx"
import { VideoNote } from "./dynamic-preview/note-video.jsx"
import { NoteService } from "../services/note.service.js"
import { ActionBar } from "./action-bar.jsx"
const { Link } = ReactRouterDOM

export class NotePreview extends React.Component {
    state = {
        note: null,
        noteType: null,
        noteStyle: {}
    }

    componentDidMount() {
        const note = this.props.note
        this.setState({ note, noteType: note.type })
    }

    handleColorChange = (color) => {
        const note = this.state.note
        NoteService.changeColor(note.id, color)
        this.setState({ note })
    }

    onMarkUnmarkTodo = (note, todoId) => {
        NoteService.markUnmark(note, todoId)
        this.setState({ note })
    }

    // onBack = () => {
    //     // this.props.history.push('/keep')
    //     console.log(this.props);
    //   }

    render() {
        const { note, noteType } = this.state
        if (!note) return <div>Loading...</div>
        const DynamicCmp = (props) => {
            switch (props.type) {
                case 'note-txt':
                    return <TxtNote {...props} />
                case 'note-img':
                    return <ImgNote {...props} />
                case 'note-todos':
                    return <TodoNote {...props} />
                case 'note-video':
                    return <VideoNote {...props} />
            }
        }

        return (
            <article className="note-preview" style={{ backgroundColor: note.backgroundColor }}>
                <Link to={`/keep/${note.id}`}>
                    <DynamicCmp
                        type={noteType}
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