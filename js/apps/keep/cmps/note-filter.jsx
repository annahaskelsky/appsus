
export class NoteFilter extends React.Component {
    state = {
        filterBy: {
            type: '',
            txt: ''
        }
    }

    handleChange = (value, isTxt) => {
        if (isTxt) {
            this.setState({ filterBy: { ...this.state.filterBy, txt: value } }, () => {
                this.props.loadNotes(this.state.filterBy)
            })
        } else {
            this.setState({ filterBy: { ...this.state.filterBy, type: value } }, () => {
                this.props.loadNotes(this.state.filterBy)
            })
        }
    }

    render() {
        return (
            <section className="note-filter">
                <div className="input-container">
                    <div className="input-wrapper">
                        <input type="text" name="txt-filter" placeholder="Search for a note" onChange={(ev) => this.handleChange(ev.target.value, true)} />
                        <div className="filter-by-type">
                            <button className="icon-button" onClick={() => this.handleChange('img')}><i className="far fa-image" ></i></button>
                            <button className="icon-button" onClick={() => this.handleChange('todos')}><i className="fas fa-list-ul"></i></button>
                            <button className="icon-button" onClick={() => this.handleChange('txt')}><i className="fas fa-file-alt"></i></button>
                            <button className="icon-button" onClick={() => this.handleChange('video')}><i className="fas fa-video"></i></button>
                            <button className="icon-button" onClick={() => this.handleChange('')}><i className="fas fa-globe-americas"></i></button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}