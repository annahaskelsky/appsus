import { TxtNote } from "./dynamic-preview/note-txt-preview.jsx"
import { ImgNote } from "./dynamic-preview/note-img.jsx"
import { TodoNote } from "./dynamic-preview/note-todo.jsx"
import { NoteService } from "../services/note.service.js"
import { ActionBar } from "./action-bar.jsx"
const { Link } = ReactRouterDOM

export class NotePreview extends React.Component {
    state = {
        note: null,
        noteType: null,
        noteStyle: {}
    }
// e => NoteService.changeColor(note.id, e.target.value)
    componentDidMount() {
        const note = this.props.note
        this.setState({ note, noteType: note.type, noteStyle: note.backgroundColor })
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
            <div>
                <DynamicCmp
                    type={noteType}
                    note={note}
                    onRemoveNote={this.props.onRemoveNote}
                    noteStyle={noteStyle}
                />
                <ActionBar note={note} />
            </div>
            // </article>
        )

        // return (
        //     <article className="note-preview">
        //         <h4>{this.props.note.id}</h4>
        //     </article>
        // )
    }
}