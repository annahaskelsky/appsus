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

export const NoteService = {
    query,
    removeNote,
    changeColor
}