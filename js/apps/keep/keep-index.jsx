const { Route, Switch } = ReactRouterDOM
import { NoteService } from "./services/note.service.js"
import { NoteFilter } from "./cmps/note-filter.jsx"
import { AddNote } from "./cmps/add-note.jsx"
import { NoteList } from "./cmps/note-list.jsx"
import { NoteDetails } from "./cmps/note-details.jsx"

export class NotesApp extends React.Component {
    state = {
        notes: null,
        pinnedNotes: null
    }

    componentDidMount() {
        NoteService.createNotes()
        this.loadNotes()
    }

    loadNotes = (filterBy) => {
        NoteService.getPinnedNotes().then(pinnedNotes => {
            this.setState({ pinnedNotes })
        })
        NoteService.query(filterBy).then(notes => {
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

    onAddNote = (note, cb) => {
        NoteService.addNote(note).then(() => {
            this.loadNotes()
            cb && cb()
        })
    }

    render() {
        const { notes, pinnedNotes } = this.state
        if (!notes) return <div>Loading...</div>
        return (
            <section className="note-app main-layout">
                <NoteFilter loadNotes={this.loadNotes} />
                <AddNote onAddNote={this.onAddNote} />
                <NoteList
                    notes={notes}
                    pinnedNotes={pinnedNotes}
                    onRemoveNote={this.onRemoveNote}
                    onDuplicateNote={this.onDuplicateNote}
                    onPinUnpinNote={this.onPinUnpinNote}
                />
                <Switch>
                    <Route path="/keep/:noteId" component={NoteDetails} />
                </Switch>
            </section>
        )
    }
}