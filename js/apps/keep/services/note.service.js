import { utilService } from '../../../services/util.service.js'
import { AddNote } from '../cmps/add-note.jsx'

let notes = [
    {
        id: "n101",
        type: "note-txt",
        isPinned: true,
        info: { txt: "Fullstack Me Baby!" },
        backgroundColor: "#ffffff"
    },
    {
        id: "n102",
        type: "note-img",
        info: {
            url: "https://picsum.photos/100",
            title: "Bobi and Me"
        },
        backgroundColor: "#ccff90"
    },
    {
        id: "n103",
        type: "note-todos",
        info: {
            label: "Get my stuff together",
            todos: [
                { id: utilService.makeId(), txt: "Driving liscence", doneAt: null },
                { id: utilService.makeId(), txt: "Coding power", doneAt: 187111111 }
            ]
        },
        backgroundColor: "#fdcfe8"
    },
    {
        id: "n104",
        type: "note-video",
        info: {
            url: "https://www.youtube.com/embed/tgbNymZ7vqY",
            title: "JS is AWESOME!"
        },
        backgroundColor: "#f28b82"
    }
]

const pinnedNotes = []



const getPinnedNotes = () => {
    const pinnedNotesIds = notes.filter(note => note.isPinned).map(note => note.id)
    console.log(pinnedNotesIds);

    pinnedNotesIds.forEach(id => {
        const idx = notes.findIndex(note => note.id === id)
        const currNote = notes[idx]
        pinnedNotes.push(currNote)
        notes.splice(idx, 1)
    })
    console.log(pinnedNotes);
    return Promise.resolve(pinnedNotes)

    // const pinnedNotes = notes.filter(note => note.isPinned)
    // return Promise.resolve(pinnedNotes)
}

const query = filterBy => {
    if (!filterBy) return Promise.resolve(notes)
    if (filterBy.type) {
        const notesToShow = notes.filter(note => note.type === filterBy.type)
        return Promise.resolve(notesToShow)
    } else if (filterBy.txt) {
        const searchStr = filterBy.txt
        const notesToShow = notes.filter(note => {
            if (note.info.txt) return note.info.txt.toLowerCase().includes(searchStr)
            if (note.info.title) return note.info.title.toLowerCase().includes(searchStr)
            if (note.info.label) return note.info.label.toLowerCase().includes(searchStr)
            if (note.info.todos) return note.info.todos.some(todo => todo.includes(searchStr))
        })
        return Promise.resolve(notesToShow)
    }
}

const markUnmark = (note, todoId) => {
    console.log(note);
    console.log(todoId);
    if (!note) return
    const idx = notes.findIndex(n => note.id === n.id)
    if (idx >= 0) {
        const note = notes[idx]
        const todo = note.info.todos.find(todo => todo.id === todoId)
        console.log(todo);
        if (todo.doneAt) {
            todo.doneAt = null
        } else {
            todo.doneAt = Date.now()
        }
    }
}

const addNote = (note) => {
    const newNote = {
        id: utilService.makeId(),
        type: 'note-txt',
        isPinned: false,
        info: { title: note.title, txt: note.content },
        backgroundColor: "#ffffff"
    }
    notes.unshift(newNote)
    return Promise.resolve(notes)
}



const removeNote = noteId => {
    let idx = notes.findIndex(note => note.id === noteId)
    if (idx >= 0) {
        notes.splice(idx, 1)
        return Promise.resolve(notes)
    } else {
        idx = pinnedNotes.findIndex(note => note.id === noteId)
        pinnedNotes.splice(idx, 1)
        return Promise.resolve(pinnedNotes)
    }
}

const changeColor = (noteId, color) => {
    const note = notes.find(note => note.id === noteId)
    note.backgroundColor = color
    return Promise.resolve(notes)
}

const duplicateNote = noteId => {
    const idx = notes.findIndex(note => note.id === noteId)
    const note = notes[idx]
    notes.unshift({ ...note, id: utilService.makeId() })
    return Promise.resolve(notes)
}

const pinUnpinNote = (note) => {
    if (note.isPinned) {
        const idx = pinnedNotes.findIndex(n => n.id === note.id)
        const currNote = pinnedNotes[idx]
        currNote.isPinned = false
        pinnedNotes.splice(idx, 1)
        notes.unshift(currNote)
    } else {
        const idx = notes.findIndex(n => n.id === note.id)
        const currNote = notes[idx]
        currNote.isPinned = true
        notes.splice(idx, 1)
        pinnedNotes.unshift(currNote)
    }
    return Promise.resolve()
}

const getNoteById = (noteId) => {
    let note = notes.find(note => note.id === noteId)
    if (note) return Promise.resolve(note)
    else {
        note = pinnedNotes.find(note => note.id === noteId)
        return Promise.resolve(note)
    }
}

export const NoteService = {
    query,
    removeNote,
    changeColor,
    duplicateNote,
    getPinnedNotes,
    pinUnpinNote,
    markUnmark,
    addNote,
    getNoteById
}