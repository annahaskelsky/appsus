const { Link } = ReactRouterDOM
import { eventBusService } from '../../../services/eventbus.service.js'

export class MailAside extends React.Component {

    state = {
        unReadMails: 0
    }
    removeEventBut;

    componentDidMount() {
        this.removeEventBut=eventBusService.on('unread-mails-count', (unReadMails) => {
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
                <Link to="/mail/new"><i className="fas fa-plus"></i> Compose</Link>
                <ul className="clean-list  flex">
                    <li><Link to="/mail/inbox" className="flex align-center"><i className="fas fa-envelope"></i> Inbox <span>{unReadMails}</span></Link></li>
                    {/* <li><Link to="/mail/starred" className="flex align-center"><i className="fas fa-star"></i> Starred</Link></li> */}
                    <li><Link to="/mail/sent" className="flex align-center"><i className="fas fa-paper-plane"></i> Sent</Link></li>
                    <li><Link to="/mail/draft" className="flex align-center"><i className="fas fa-file"></i> Draft</Link></li>
                    <li><Link to="/mail/trash" className="flex align-center"><i className="fa fa-trash" aria-hidden="true"></i> Trash</Link></li>
                </ul>
            </section>
        )

    }
}