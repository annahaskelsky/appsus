const { Link, NavLink } = ReactRouterDOM
import { eventBusService } from '../../../services/eventbus.service.js'

export class MailAside extends React.Component {

    state = {
        unReadMails: 0
    }
    removeEventBut;

    componentDidMount() {
        this.removeEventBut = eventBusService.on('unread-mails-count', (unReadMails) => {
            this.setState({ unReadMails })
        })
    }

    componentWillUnmount() {
        this.removeEventBut();
    }

    render() {
        const { unReadMails } = this.state
        return (
            <section className="mail-aside-container">
                <Link to="/mail/new" className="compose-btn"><i className="fas fa-plus"></i> <span>Compose</span></Link>
                <ul className="clean-list  flex">
                    <li>
                        <NavLink to="/mail/inbox" className="flex align-center">
                            <i className="fas fa-envelope"></i><span>Inbox</span>
                            <span>({unReadMails})</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/mail/starred" className="flex align-center">
                            <i className="fas fa-star"></i><span>Starred</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/mail/sent" className="flex align-center">
                            <i className="fas fa-paper-plane"></i><span>Sent</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/mail/draft" className="flex align-center">
                            <i className="fas fa-file"></i><span>Draft</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/mail/trash" className="flex align-center">
                            <i className="fa fa-trash" aria-hidden="true"></i><span>Trash</span>
                        </NavLink>
                    </li>
                </ul>
            </section>
        )

    }
}