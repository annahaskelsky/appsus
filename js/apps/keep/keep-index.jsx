import { NoteService } from "./services/note.service.js"
// import { NoteFilter } from "./cmps/note-filter.jsx"
import { NoteList } from "./cmps/note-list.jsx"

export class NotesApp extends React.Component {
    state = {
        notes: null,
        filterBy: ''
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        NoteService.query().then(notes => {
            this.setState({ notes })
        })
    }

    onRemoveNote = (noteId) => {
        NoteService.removeNote(noteId).then(this.loadNotes)
    }

    render() {
        const { notes } = this.state
        if (!notes) return <div>Loading...</div>
        return (
            <section className="note-app">
                {/* <NoteFilter onSetFilter={this.onSetFilter} />  */}
                <NoteList notes={notes} onRemoveNote={this.onRemoveNote} />

            </section>
        )
    }
}