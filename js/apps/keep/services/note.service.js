// import { utilService } from "../util.service.js"
import {utilService} from '../../../services/util.service.js'

export const NoteService = {
    query,
    removeNote
}

const notes = [
    {
        id: "n101",
        type: "note-txt",
        isPinned: true,
        info: { txt: "Fullstack Me Baby!" }
    },
    {
        id: "n102",
        type: "note-img",
        info: {
            url: "https://picsum.photos/100",
            title: "Bobi and Me"
        },
        style: { backgroundColor: "#00d" }
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
        }
    }
]

function query(filterBy) {
    // if(filterBy) {
    //     const notesToShow = notes.filter
    // }

    return Promise.resolve(notes)
}

function removeNote(noteId) {
    const idx = notes.findIndex(note => note.id === noteId)
    notes.splice(idx, 1)
    // return Promise.resolve(notes)
    console.log('deleted', noteId);
}