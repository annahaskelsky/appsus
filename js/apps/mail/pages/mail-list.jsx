import { mailService } from '../services/mail.service.js';
import { MailPreview } from '../cmps/mail-preview.jsx';
import { eventBusService } from '../../../services/eventbus.service.js'

export class MailList extends React.Component {
    state = {
        currUser: null,
        mails: null,
        criteria: {
            status: 'inbox',
            txt: null,
            isRead: null,
            isStared: null,
            lables: null
        }
    }

    removeEventBut;

    componentDidMount() {
        this.loadUser();
        this.removeEventBut = eventBusService.on('filter-by', (filterBy) => {
            this.loadMails(filterBy);
        })
    }

    componentWillUnmount() {
        this.removeEventBut();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.mailFilter !== this.props.match.params.mailFilter) {
            const currStatus = this.getUrlParam();
            this.setCriteria(currStatus);
        }
        mailService.query()
            .then(mails => this.setUnreadCount(mails))
    }

    loadUser = () => {
        mailService.getUser()
            .then(user => this.setState({ currUser: user }, () => {
                const currStatus = this.getUrlParam();
                this.setCriteria(currStatus);
                this.loadMails();
                mailService.query().then(mails => this.setUnreadCount(mails))

            }))
    }

    loadMails = (filterBy = null) => {
        const { currUser, criteria } = this.state;
        mailService.mailsToShow(currUser, criteria, filterBy)
            .then(mails => this.setState({ mails }));
    }

    setCriteria = (currStatus) => {
        const { criteria } = this.state;
        const statuses = ['inbox', 'sent', 'draft', 'trash', 'starred'];

        if (statuses.includes(currStatus)) {
            this.setState(prevState => ({ criteria: { ...prevState.criteria, status: currStatus } }), () => { this.loadMails() });
        }
    }

    getUrlParam = () => {
        return this.props.match.params.mailFilter;
    }

    setUnreadCount = (mails) => {
        const { currUser } = this.state;
        if (!currUser) return 0;
        let count = 0;
        mails.map(mail => {
            if (mail.to === currUser.email && !mail.isRead) count++;
        })
        eventBusService.emit('unread-mails-count', count)
    }

    onToggleStar = (mailId) => {
        // console.log('toggling star')
        mailService.toogleStar(mailId);
        this.loadMails();
    }

    render() {
        const { mails } = this.state;
        if (!mails) return <React.Fragment>Loading...</React.Fragment>
        return <section className="mail-list">
            {mails && mails.map(mail => <MailPreview key={mail.id} mail={mail} getUrlParam={this.getUrlParam} onToggleStar={this.onToggleStar} />)}
        </section>
    }
}