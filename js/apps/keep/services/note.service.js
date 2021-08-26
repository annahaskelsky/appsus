import { utilService } from '../../../services/util.service.js'

let notes = [
    {
        id: "n101",
        type: "note-txt",
        isPinned: true,
        info: { txt: "Fullstack Me Baby!" },
        backgroundColor: "transparent"
    },
    {
        id: "n102",
        type: "note-img",
        info: {
            url: "https://picsum.photos/100",
            title: "Bobi and Me"
        },
        backgroundColor: "#00d"
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
        backgroundColor: "aqua"
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
    // if(filterBy) {
    //     const notesToShow = notes.filter
    // }

    return Promise.resolve(notes)
}

const removeNote = noteId => {
    const idx = notes.findIndex(note => note.id === noteId)
    notes.splice(idx, 1)
    return Promise.resolve(notes)
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

export const NoteService = {
    query,
    removeNote,
    changeColor,
    duplicateNote,
    getPinnedNotes,
    pinUnpinNote
}