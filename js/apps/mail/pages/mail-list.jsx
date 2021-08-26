import { mailService } from '../services/mail.service.js';
import { MailPreview } from '../cmps/mail-preview.jsx';

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

    componentDidMount() {
    
        this.loadUser();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.mailFilter !== this.props.match.params.mailFilter) {
            const currStatus = this.getUrlParam();
            this.setCriteria(currStatus);
        }
    }

    setCriteria = (currStatus) => {
        const { criteria } = this.state;
        const statuses = ['inbox', 'sent', 'draft', 'trash'];

        if (statuses.includes(currStatus)) {
            this.setState(prevState => ({ criteria: { ...prevState.criteria, status: currStatus } }), () => { this.loadMails() });
        }
    }

    getUrlParam = () => {
        return this.props.match.params.mailFilter;
    }


    loadUser = () => {
        mailService.getUser()
            .then(user => this.setState({ currUser: user }, () => {
                const currStatus = this.getUrlParam();
                this.setCriteria(currStatus);        
                this.loadMails() }))
    }

    loadMails = () => {
        const { currUser, criteria } = this.state;
        mailService.mailsToShow(currUser, criteria)
            .then(mails => this.setState({ mails }));
    }

    render() {
        const { mails } = this.state;
        if (!mails) return <React.Fragment>Loading...</React.Fragment>
        return <section className="mail-list">
            {mails.map(mail => <MailPreview key={mail.id} mail={mail} getUrlParam={this.getUrlParam} />)}
        </section>
    }
}