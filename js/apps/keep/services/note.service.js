import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

let gNotes
let gPinnedNotes

const getPinnedNotes = () => {
    let pinnedNotes = storageService.loadFromStorage('uniquePinnedNotesDB')
    if (!pinnedNotes || !pinnedNotes.length) {
        pinnedNotes = []
        const pinnedNotesIds = gNotes.filter(note => note.isPinned).map(note => note.id)
        pinnedNotesIds.forEach(id => {
            const idx = gNotes.findIndex(note => note.id === id)
            const currNote = gNotes[idx]
            pinnedNotes.push(currNote)
            gNotes.splice(idx, 1)
        })
    }
    gPinnedNotes = pinnedNotes
    savePinnedNotesToStorage()
    return Promise.resolve(gPinnedNotes)
}

const query = filterBy => {
    if (!filterBy) return Promise.resolve(gNotes)
    if (filterBy.type) {
        const notesToShow = gNotes.filter(note => {
            if (filterBy.type === 'todos') return note.info.todos.length
            return note.info[filterBy.type]
        })

        return Promise.resolve(notesToShow)
    } else if (filterBy.txt) {
        const searchStr = filterBy.txt
        const notesToShow = gNotes.filter(note => {
            if (note.info.txt) return note.info.txt.toLowerCase().includes(searchStr)
            if (note.info.title) return note.info.title.toLowerCase().includes(searchStr)
            if (note.info.todos) return note.info.todos.some(todo => todo.includes(searchStr))
        })
        return Promise.resolve(notesToShow)
    }
    return Promise.resolve(gNotes)
}

const markUnmark = (note, todoId) => {
    if (!note) return
    let currNote
    let todo
    let idx = gNotes.findIndex(n => note.id === n.id)
    if (idx >= 0) {
        currNote = gNotes[idx]
        todo = currNote.info.todos.find(todo => todo.id === todoId)
    } else {
        idx = gPinnedNotes.findIndex(n => note.id === n.id)
        currNote = gPinnedNotes[idx]
        todo = currNote.info.todos.find(todo => todo.id === todoId)
    }
    if (todo.doneAt) {
        todo.doneAt = null
    } else {
        todo.doneAt = Date.now()
    }
    saveNotesToStorage()
    savePinnedNotesToStorage()
    return Promise.resolve(currNote)
}

const addNote = (noteInfo, mail) => {
    if (mail && !noteInfo) {
        noteInfo = {
            img: null,
            video: null,
            title: mail.subject,
            txt: mail.body,
            color: "#ffffff"
        }
    }
    const newNote = {
        id: utilService.makeId(),
        isPinned: false,
        info: {
            img: noteInfo.img,
            video: noteInfo.video,
            title: noteInfo.title,
            txt: noteInfo.txt,
            todos: [...(noteInfo.todos || [])]
        },
        backgroundColor: noteInfo.color
    }
    gNotes.unshift(newNote)
    saveNotesToStorage()
    return Promise.resolve()
}

const editNoteContent = (noteInfo, id) => {
    let note = gNotes.find(n => n.id === id)
    if (!note) note = gPinnedNotes.find(n => n.id === id)
    note.info = noteInfo
    saveNotesToStorage()
    savePinnedNotesToStorage()
    return Promise.resolve()
}

const removeNote = noteId => {
    let idx = gNotes.findIndex(note => note.id === noteId)
    if (idx >= 0) {
        gNotes.splice(idx, 1)
        saveNotesToStorage()
        return Promise.resolve(gNotes)
    } else {
        idx = gPinnedNotes.findIndex(note => note.id === noteId)
        gPinnedNotes.splice(idx, 1)
        savePinnedNotesToStorage()
        return Promise.resolve(gPinnedNotes)
    }
}

const changeColor = (noteId, color) => {
    const note = gNotes.find(note => note.id === noteId) || gPinnedNotes.find(note => note.id === noteId)
    note.backgroundColor = color
    saveNotesToStorage()
    savePinnedNotesToStorage()
    return Promise.resolve()
}

const duplicateNote = noteId => {
    let note
    let idx = gNotes.findIndex(note => note.id === noteId)
    if (idx < 0) {
        idx = gPinnedNotes.findIndex(note => note.id === noteId)
        note = gPinnedNotes[idx]
        const endOfArr = gPinnedNotes.splice(idx)
        gPinnedNotes.push({ ...note, id: utilService.makeId() })
        gPinnedNotes = [...gPinnedNotes, ...endOfArr]
        savePinnedNotesToStorage()
    } else {
        note = gNotes[idx]
        const endOfArr = gNotes.splice(idx)
        gNotes.push({ ...note, id: utilService.makeId() })
        gNotes = [...gNotes, ...endOfArr]
        saveNotesToStorage()
    }
    return Promise.resolve()
}

const pinUnpinNote = (note) => {
    if (note.isPinned) {
        const idx = gPinnedNotes.findIndex(n => n.id === note.id)
        const currNote = gPinnedNotes[idx]
        currNote.isPinned = false
        gPinnedNotes.splice(idx, 1)
        gNotes.unshift(currNote)
    } else {
        const idx = gNotes.findIndex(n => n.id === note.id)
        const currNote = gNotes[idx]
        currNote.isPinned = true
        gNotes.splice(idx, 1)
        gPinnedNotes.unshift(currNote)
    }
    saveNotesToStorage()
    savePinnedNotesToStorage()
    return Promise.resolve()
}

const getNoteById = (noteId) => {
    let note = gNotes.find(note => note.id === noteId)
    if (note) return Promise.resolve(note)
    else {
        note = gPinnedNotes.find(note => note.id === noteId)
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
    let note = gNotes.find(note => note.id === noteId)
    if (!note) note = gPinnedNotes.find(note => note.id === noteId)
    note.info.todos.push({ id: utilService.makeId(), txt: todo, doneAt: null })
    saveNotesToStorage()
    savePinnedNotesToStorage()
    return Promise.resolve()
}

const addNewNoteTodo = todo => Promise.resolve({ id: utilService.makeId(), txt: todo, doneAt: null })

const removeTodo = (noteId, todoId) => {
    let note = gNotes.find(note => note.id === noteId)
    if (!note) note = gPinnedNotes.find(note => note.id === noteId)
    const idx = note.info.todos.findIndex(t => t.id !== todoId)
    note.info.todos.splice(idx, 1)
    saveNotesToStorage()
    savePinnedNotesToStorage()
    return Promise.resolve()
}

const createNotes = () => {
    let notes = storageService.loadFromStorage('uniqueNotesDB')
    if (!notes || !notes.length) {
        notes = [
            {
                id: "n101",
                isPinned: true,
                info: {
                    img: "https://images.pexels.com/photos/1170659/pexels-photo-1170659.jpeg?cs=srgb&dl=pexels-gagan-kaur-1170659.jpg&fm=jpg",
                    video: null,
                    title: "Good Morning Coding Academy!",
                    txt: null,
                    todos: []
                },
                backgroundColor: "#e6c9a8"
            },
            {
                id: "n102",
                info: {
                    img: "https://media4.giphy.com/media/K3Sbp8fOgKye4/giphy.gif?cid=ecf05e476f0pbit43dyoqexjna7tliouf4sm5zxzkfygniqj&rid=giphy.gif&ct=g",
                    video: null,
                    title: "YESSS!",
                    txt: "It's finally over!",
                    todos: []
                },
                backgroundColor: "#ccff90"
            },
            {
                id: "n103",
                info: {
                    img: "https://images.pexels.com/photos/776656/pexels-photo-776656.jpeg?cs=srgb&dl=pexels-ylanite-koppens-776656.jpg&fm=jpg",
                    video: null,
                    title: "To Do:",
                    txt: null,
                    todos: [{ id: utilService.makeId(), txt: "Get some plants", doneAt: Date.now() },
                    { id: utilService.makeId(), txt: "Keep them alive", doneAt: null }]
                },
                backgroundColor: "#fff475"
            },
            {
                id: "n104",
                info: {
                    img: "https://images.pexels.com/photos/847483/pexels-photo-847483.jpeg?cs=srgb&dl=pexels-victor-freitas-847483.jpg&fm=jpg",
                    video: null,
                    title: "Remember that feeling?",
                    txt: "Yeah me neither...",
                    todos: [{ id: utilService.makeId(), txt: "Do homework", doneAt: null },
                    { id: utilService.makeId(), txt: "Stay focused on the goal", doneAt: null }]
                },
                backgroundColor: "#d7aefb"
            },
            {
                id: "n105",
                info: {
                    img: null,
                    video: null,
                    title: "Let's Backend!",
                    txt: null,
                    todos: []
                },
                backgroundColor: "#a7ffeb"
            },
            {
                id: "n106",
                info: {
                    img: "https://media.giphy.com/media/QGBWk7DnckEN2/giphy.gif?cid=ecf05e47i817cu36thxz6vksiqyvrdwvzqjel0sebata7klk&rid=giphy.gif&ct=g",
                    video: null,
                    title: "Me after 4 days of Appsus",
                    txt: null,
                    todos: []
                },
                backgroundColor: "#fbbc04"
            },
            {
                id: "n107",
                info: {
                    img: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                    video: null,
                    title: "PUPPIES!",
                    txt: "In case you needed a pick me up",
                    todos: []
                },
                backgroundColor: "#f28b82"
            },
            {
                id: "n108",
                info: {
                    img: null,
                    video: null,
                    title: "Don't Forget",
                    txt: null,
                    todos: [
                        { id: utilService.makeId(), txt: "Wake up for class", doneAt: Date.now() },
                        { id: utilService.makeId(), txt: "Look alive", doneAt: null }
                    ]
                },
                backgroundColor: "#fdcfe8"
            },
            {
                id: "n109",
                info: {
                    img: null,
                    video: "https://www.youtube.com/embed/astISOttCQ0",
                    title: "Some nostalgic tunes",
                    txt: null,
                    todos: []
                },
                backgroundColor: "#f28b82"
            },
            {
                id: "n110",
                info: {
                    img: "https://images.pexels.com/photos/2740954/pexels-photo-2740954.jpeg?cs=srgb&dl=pexels-prateek-katyal-2740954.jpg&fm=jpg",
                    video: null,
                    title: "I sure hope so",
                    txt: null,
                    todos: []
                },
                backgroundColor: "#aecbfa"
            },
            {
                id: "n111",
                info: {
                    img: "https://images.pexels.com/photos/4577175/pexels-photo-4577175.jpeg?cs=srgb&dl=pexels-rachel-claire-4577175.jpg&fm=jpg",
                    video: null,
                    title: "For the ambiance",
                    txt: null,
                    todos: []
                },
                backgroundColor: "#e8eaed"
            }
        ]
    }
    gNotes = notes.filter(note => !note.isPinned)
    saveNotesToStorage()
    let pinnedNotes = storageService.loadFromStorage('uniquePinnedNotesDB')
    if (!pinnedNotes || !pinnedNotes.length) {
        gPinnedNotes = notes.filter(note => note.isPinned)
        savePinnedNotesToStorage()
    }
}

const saveNotesToStorage = () => {
    storageService.saveToStorage('uniqueNotesDB', gNotes)
}

const savePinnedNotesToStorage = () => {
    storageService.saveToStorage('uniquePinnedNotesDB', gPinnedNotes)
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
    addTodo,
    addNewNoteTodo,
    removeTodo,
    createNotes
}