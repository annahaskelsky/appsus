import { NoteService } from "./services/note.service.js"
import { NoteFilter } from "./cmps/note-filter.jsx"
import { NoteList } from "./cmps/note-list.jsx"

export class NotesApp extends React.Component {
    state = {
        notes: null,
        pinnedNotes: null,
        filterBy: ''
    }

    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        NoteService.getPinnedNotes().then(pinnedNotes => {
            this.setState({ pinnedNotes })
        })
        NoteService.query().then(notes => {
            this.setState({ notes })
        })
    }

    onRemoveNote = (noteId) => {
        NoteService.removeNote(noteId).then(this.loadNotes)
    }

    onDuplicateNote = (noteId) => {
        NoteService.duplicateNote(noteId).then(this.loadNotes)
    }

    onPinUnpinNote = (note) => {
        NoteService.pinUnpinNote(note).then(this.loadNotes)
    }

    render() {
        const { notes, pinnedNotes } = this.state
        if (!notes) return <div>Loading...</div>
        return (
            <section className="note-app">
                <NoteFilter onSetFilter={this.onSetFilter} /> 
                <NoteList notes={notes} 
                pinnedNotes={pinnedNotes} 
                onRemoveNote={this.onRemoveNote} 
                onDuplicateNote={this.onDuplicateNote}
                onPinUnpinNote={this.onPinUnpinNote} />
            </section>
        )
    }
}