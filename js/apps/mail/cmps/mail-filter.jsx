import { eventBusService } from '../../../services/eventbus.service.js'

export class MailFilter extends React.Component {

    state = {
        filterBy: {
            txt: '',
            readStatus: ''
        },
        sortBy: ''
    }

    onHandleFilterChange = (ev) => {
        const field = ev.target.name;
        const value = (ev.target.type === 'number') ? +ev.target.value : ev.target.value;
        this.setState((prevState) => ({ ...prevState, filterBy: { ...prevState.filterBy, [field]: value } }),
            () => { this.onSetFilter() });
    }

    onSetFilter = () => {
        eventBusService.emit('filter-by', this.state.filterBy);
    }

    render() {
        const { txt, readStatus } = this.state.filterBy;
        return <section>
            <div className="input-icon">
                <i className="fas fa-search"></i>
                <input type="search" placeholder="Search" name="txt" value={txt} onChange={this.onHandleFilterChange} />
            </div>
            <label htmlFor="filter-by">Filter by:</label>
            <select id="filter-by" name="readStatus" value={readStatus} onChange={this.onHandleFilterChange}>
                <option value="all">All</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
            </select>

            <label htmlFor="sort-by">Sort by:</label>
            <select id="sort-by">
                <option value="date">Date</option>
                <option value="subject">Subject</option>
            </select>
        </section>
    }
}