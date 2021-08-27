import { utilService } from '../../../services/util.service.js'
import { AddNote } from '../cmps/add-note.jsx'

let notes = [
    {
        id: "n101",
        isPinned: true,
        info: {
            img: null,
            video: null,
            title: null,
            txt: "Fullstack Me Baby!",
            todos: []
        },
        backgroundColor: "#ffffff"
    },
    {
        id: "n102",
        info: {
            img: "https://picsum.photos/100",
            video: null,
            title: "Bobi and Me",
            txt: null,
            todos: []
        },
        backgroundColor: "#ccff90"
    },
    {
        id: "n103",
        info: {
            img: null,
            video: null,
            title: "Get my stuff together",
            txt: null,
            todos: [
                { id: utilService.makeId(), txt: "Driving liscence", doneAt: null },
                { id: utilService.makeId(), txt: "Coding power", doneAt: 187111111 }
            ]
        },
        backgroundColor: "#fdcfe8"
    },
    {
        id: "n104",
        info: {
            img: null,
            video: "https://www.youtube.com/embed/tgbNymZ7vqY",
            title: "JS is AWESOME!",
            txt: null,
            todos: []
        },
        backgroundColor: "#f28b82"
    }
]

const pinnedNotes = []

const getPinnedNotes = () => {
    const pinnedNotesIds = notes.filter(note => note.isPinned).map(note => note.id)

    pinnedNotesIds.forEach(id => {
        const idx = notes.findIndex(note => note.id === id)
        const currNote = notes[idx]
        pinnedNotes.push(currNote)
        notes.splice(idx, 1)
    })
    return Promise.resolve(pinnedNotes)

    // const pinnedNotes = notes.filter(note => note.isPinned)
    // return Promise.resolve(pinnedNotes)
}

const query = filterBy => {
    if (!filterBy) return Promise.resolve(notes)
    if (filterBy.type) {
        const notesToShow = notes.filter(note => {
            if (filterBy.type === 'todos') return note.info.todos.length
            return note.info[filterBy.type]
        })

        return Promise.resolve(notesToShow)
    } else if (filterBy.txt) {
        const searchStr = filterBy.txt
        const notesToShow = notes.filter(note => {
            if (note.info.txt) return note.info.txt.toLowerCase().includes(searchStr)
            if (note.info.title) return note.info.title.toLowerCase().includes(searchStr)
            if (note.info.todos) return note.info.todos.some(todo => todo.includes(searchStr))
        })
        return Promise.resolve(notesToShow)
    }
}

const markUnmark = (note, todoId) => {
    if (!note) return
    const idx = notes.findIndex(n => note.id === n.id)
    if (idx >= 0) {
        const note = notes[idx]
        const todo = note.info.todos.find(todo => todo.id === todoId)
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
        isPinned: false,
        info: {
            img: note.img,
            video: note.video,
            title: note.title,
            txt: note.content,
            todos: note.todos
        },
        backgroundColor: note.color
    }
    notes.unshift(newNote)
    return Promise.resolve()
}

const editNoteContent = (noteInfo, id) => {
    let note = notes.find(n => n.id === id)
    if (!note) note = pinnedNotes.find(n => n.id === id)
    note.info = noteInfo
    return Promise.resolve()
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
    const note = notes.find(note => note.id === noteId) || pinnedNotes.find(note => note.id === noteId)
    note.backgroundColor = color
    return Promise.resolve()
}

const duplicateNote = noteId => {
    let note
    let idx = notes.findIndex(note => note.id === noteId)
    if (idx < 0) {
        idx = pinnedNotes.findIndex(note => note.id === noteId)
        note = pinnedNotes[idx]
        pinnedNotes.unshift({ ...note, id: utilService.makeId() })
    } else {
        note = notes[idx]
        notes.unshift({ ...note, id: utilService.makeId() })
    }
    return Promise.resolve()
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

const getId = url => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
        ? match[2]
        : null;
}

const addTodo = (noteId, todo) => {
    console.log(todo);
    let note = notes.find(note => note.id === noteId)
    if (!note) note = pinnedNotes.find(note => note.id === noteId)
    console.log(note);
    note.info.todos.push({ id: utilService.makeId(), txt: todo, doneAt: null })
    return Promise.resolve()
}

export const NoteService = {
    query,
    editNoteContent,
    removeNote,
    changeColor,
    duplicateNote,
    getPinnedNotes,
    pinUnpinNote,
    markUnmark,
    addNote,
    getNoteById,
    getId,
    addTodo
}