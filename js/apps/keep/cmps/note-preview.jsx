import { TxtNote } from "./dynamic-preview/note-txt-preview.jsx"
import { ImgNote } from "./dynamic-preview/note-img.jsx"
import { TodoNote } from "./dynamic-preview/note-todo.jsx"
import { NoteService } from "../../../services/keep/note.service.js"
const { Link } = ReactRouterDOM

export class NotePreview extends React.Component {
    state = {
        note: null,
        noteType: null,
        noteStyle: {}
    }

    componentDidMount() {
        this.setState({ note: this.props.note, noteType: this.props.note.type })
    }

    onRemoveNote = (noteId) => {
        NoteService.removeNote(noteId)
    }

    // onBack = () => {
    //     // this.props.history.push('/keep')
    //     console.log(this.props);
    //   }

    render() {
        const { note, noteType, noteStyle } = this.state
        if (!note) return <div>Loading...</div>
        const DynamicCmp = (props) => {
            switch (props.type) {
                case 'note-txt':
                    return <TxtNote {...props} />
                case 'note-img':
                    return <ImgNote {...props} />
                case 'note-todos':
                    return <TodoNote {...props} />
            }
        }

        return (
            // <article className="note-preview" style={noteStyle}>
            <DynamicCmp type={noteType} note={note} onRemoveNote={this.onRemoveNote} />

            // </article>
        )

        // return (
        //     <article className="note-preview">
        //         <h4>{this.props.note.id}</h4>
        //     </article>
        // )
    }
}