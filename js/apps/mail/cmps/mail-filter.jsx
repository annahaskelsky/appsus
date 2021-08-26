import { eventBusService } from '../../../services/eventbus.service.js'

export class MailFilter extends React.Component {

    state = {
        filterBy: {
            txt: '',
            readStatus: ''
        }
    }

    onHandleChange = (ev) => {
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
            <input type="search" placeholder="Search" name="txt" value={txt} onChange={this.onHandleChange} />
            <select name="readStatus" value={readStatus} onChange={this.onHandleChange}>
                <option value="all">All</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
            </select>
        </section>
    }
}