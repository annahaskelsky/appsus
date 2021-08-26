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

    onAddNote = (note) => {
        NoteService.addNote(note).then(this.loadNotes)
    }
    renderNotes = () => {
        this.setState({ notes: this.loadNotes()})
    }

    render() {
        const { notes, pinnedNotes } = this.state
        if (!notes) return <div>Loading...</div>
        return (
            <section className="note-app">
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
                    <Route path="/keep/:noteId" component={(props) => <NoteDetails {...props} renderNotes={this.renderNotes} />} />
                </Switch>
            </section>
        )
    }
}