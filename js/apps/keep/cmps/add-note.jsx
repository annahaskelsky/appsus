import { Input } from "../../../cmps/input.jsx";
import { AddNoteInput } from "./add-note-input.jsx";

export class AddNote extends React.Component {
    state = {
        title: null,
        content: null,
        color: '#ffffff',
        img: null,
        video: null,
        todos: []
    }

    handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value })
    }

    handleColorChange = (color) => {
        this.setState({ color })
    }

    handleChangeFile = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onloadend = () => {
            this.setState({ img: reader.result })
        }
    }

    onAddNote = () => {
        this.props.onAddNote(this.state)
    }

    render() {
        const { color } = this.state
        return (
            <section className="add-note">
                <AddNoteInput
                    placeholder="Take a note..."
                    handleChange={this.handleChange}
                    color={color}
                    handleColorChange={this.handleColorChange}
                    handleChangeFile={this.handleChangeFile}
                    onAddNote={this.onAddNote}
                />
            </section>
        )
    }
}
