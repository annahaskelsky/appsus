
export class NoteFilter extends React.Component {
    state = {
        filterBy: {
            type: '',
            txt: ''
        }
    }

    handleChange = (ev) => {
        console.log(ev.type);
        if(ev.type === 'click') {
            console.log(ev);
            this.setState({ filterBy: { ...this.state.filterBy, type: ev.target.value } }, () => {
                // this.props.onSetFilter(this.state.filterBy)
            })
        } else {
            const value = ev.target.value
            this.setState({ filterBy: { ...this.state.filterBy, txt: value } }, () => {
                // this.props.onSetFilter(this.state.filterBy)
            })
        }
        console.log(this.state);
    }

    render() {
        const { txt, type } = this.state.filterBy
        return (
            <section className="note-filter">
                <input type="text" name="txt-filter" placeholder="Search for a note" value={txt} onChange={this.handleChange} />
                <div className="filter-by-type">
                    <div onClick={() => this.handleChange('image')} name="image"><i className="far fa-image" ></i></div>
                    <div onClick={this.handleChange} value="todo"><i className="fas fa-list-ul"></i></div>
                    <div onClick={this.handleChange} value="text"><i className="fas fa-file-alt"></i></div>
                </div>
            </section>
        )
    }
}