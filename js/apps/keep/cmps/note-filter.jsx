
export class NoteFilter extends React.Component {
    state = {
        filterBy: {
            type: '',
            txt: ''
        }
    }

    handleChange = (ev) => {
        const value = ev.target.value
        this.setState({ filterBy: { ...this.state.filterBy, txt: value } }, () => {
          this.props.onSetFilter(this.state.filterBy)  
        })
    }

    render() {
        const {txt, type} = this.state.filterBy
        return (
            <input type="text" name="txt-filter" placeholder="Search for a note" value={txt} onChange={this.handleChange} />
        )
    }
}