
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
                this.props.onSetFilter(this.state.filterBy)
            })
        } else {
            this.setState({ filterBy: { ...this.state.filterBy, type: value } }, () => {
                this.props.onSetFilter(this.state.filterBy)
            })
        }

        // console.log(ev.type);
        // if(ev.type === 'click') {
        //     console.log(ev);
        //     this.setState({ filterBy: { ...this.state.filterBy, type: ev.target.value } }, () => {
        //         // this.props.onSetFilter(this.state.filterBy)
        //     })
        // } else {
        //     const value = ev.target.value
        //     this.setState({ filterBy: { ...this.state.filterBy, txt: value } }, () => {
        //         // this.props.onSetFilter(this.state.filterBy)
        //     })
        // }

    }

    render() {
        return (
            <section className="note-filter">
                <input type="text" name="txt-filter" placeholder="Search for a note" onChange={(ev) => this.handleChange(ev.target.value, true)} />
                <div className="filter-by-type">
                    <div onClick={() => this.handleChange('note-img', false)}><i className="far fa-image" ></i></div>
                    <div onClick={() => this.handleChange('note-todos', false)}><i className="fas fa-list-ul"></i></div>
                    <div onClick={() => this.handleChange('note-txt', false)}><i className="fas fa-file-alt"></i></div>
                </div>
            </section>
        )
    }
}