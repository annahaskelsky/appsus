import { eventBusService } from '../../../services/eventbus.service.js'

export class MailFilter extends React.Component {

    state = {
        filterBy: {
            txt: '',
            readStatus: ''
        },
        sortBy: 'date'
    }

    onHandleFilterChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState((prevState) => ({ ...prevState, filterBy: { ...prevState.filterBy, [field]: value } }),
            () => { this.onSetFilter() });
    }

    onHandleSortChange = (ev) => {
        const value = ev.target.value;
        this.setState((prevState) => ({ ...prevState, sortBy: value }),
            () => { this.onSetSort() });
    }

    onSetFilter = () => {
        eventBusService.emit('filter-by', this.state.filterBy);

    }

    onSetSort = () => {
        eventBusService.emit('sort-by', this.state.sortBy);
    }


    render() {
        const { txt, readStatus } = this.state.filterBy;
        const { sortBy } = this.state

        return <section className="mail-filter flex align-center justify-center">
            <div className="input-search input-container flex">
                <label htmlFor="search"><i className="fas fa-search"></i></label>
                <input type="search" id="search" placeholder="Search" name="txt" value={txt} onChange={this.onHandleFilterChange} />
                <button className="aside-toggle-btn" onClick={() => this.props.toggleMenu()}></button>
            </div>
            <div className="flex justify-center align-center ">
                <label htmlFor="filter-by">Filter by:</label>
                <select id="filter-by" name="readStatus" value={readStatus} onChange={this.onHandleFilterChange}>
                    <option value="all">All</option>
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>
                </select>

                <label htmlFor="sort-by">Sort by:</label>
                <select id="sort-by" name={sortBy} value={sortBy} onChange={this.onHandleSortChange}>
                    <option value="date">Date</option>
                    <option value="subject">Subject</option>
                </select>
            </div>
        </section>
    }
}