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

    removeEventButFilter;
    removeEventButSort;

    componentDidMount() {
        this.loadUser();
        this.removeEventButFilter = eventBusService.on('filter-by', (filterBy) => {
            this.loadMails(filterBy);
        })
        this.removeEventButSort = eventBusService.on('sort-by', (sortBy) => {
            this.loadMails(null, sortBy);
        })
    }

    componentWillUnmount() {
        this.removeEventButFilter();
        this.removeEventButSort();
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

    loadMails = (filterBy = null, sortBy = null) => {
        const { currUser, criteria } = this.state;
        mailService.mailsToShow(currUser, criteria, filterBy, sortBy)
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
        mailService.toogleStar(mailId);
        this.loadMails();
    }

    onDeleteMail = (mailId) => {
        mailService.deleteMail(mailId);
        this.props.history.push('/mail');
        this.loadMails();
    }

    onToggleReadStatus = (mailId) => {
        console.log('toggling read')
        mailService.toggleReadStatus(mailId);
        this.loadMails();
    }

    render() {
        const { mails, isCheckedAll } = this.state;
        if (!mails) return <React.Fragment>Loading...</React.Fragment>
        return <section className="mail-list">
            {mails && mails.map(mail =>
                <MailPreview key={mail.id} mail={mail}
                    onToggleReadStatus={this.onToggleReadStatus}
                    onDeleteMail={this.onDeleteMail}
                    getUrlParam={this.getUrlParam}
                    onToggleStar={this.onToggleStar} />)}
        </section>
    }
}