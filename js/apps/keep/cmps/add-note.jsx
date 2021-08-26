export class AddNote extends React.Component {
    state = {
        isFocused: false,
        newNote: {
            title: '',
            content: ''
        }
    }

    handleFocus = () => {
        this.setState({ isFocused: true })
    }

    handleBlur = () => {
        console.log('blur');
        this.setState({ isFocused: false })
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => ({ newNote: { ...prevState.newNote, [field]: value } }))
    }

    render() {
        const { isFocused } = this.state
        const { title, content } = this.state.newNote
        return (
            <section className="add-note">
                <input placeholder="Take a note..." name="title" value={title} autoComplete="off" onFocus={this.handleFocus} onChange={this.handleChange} />
                {isFocused &&
                    <div className="add-note-bottom">
                        <textarea cols="30" rows="10" placeholder="body" name="content"
                            value={content} onChange={this.handleChange}
                            onFocus={() => console.log('focus')} onBlur={this.handleBlur} />
                        <button onClick={() => this.props.onAddNote(this.state.newNote)}>Add</button>
                    </div>}
            </section>
        )
    }
}