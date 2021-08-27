import { Palette } from "./palette.jsx"

const { Link } = ReactRouterDOM

export const ActionBar = ({ handleColorChange, onRemoveNote, note, onDuplicateNote, onPinUnpinNote }) => {

    return (
        <div className="action-bar-container">
            <Palette handleColorChange={handleColorChange}/>
            <div><div onClick={() => onDuplicateNote(note.id)}><i className="far fa-copy"></i></div></div>
            <div><div onClick={() => onRemoveNote(note.id)}><i className="far fa-trash-alt"></i></div></div>
            <Link to={`/keep/${note.id}`}><div><div><i className="fas fa-pencil-alt"></i></div></div></Link>
            <div><div onClick={() => onPinUnpinNote(note)}><i className="fas fa-thumbtack"></i></div></div>
        </div>
    )
}