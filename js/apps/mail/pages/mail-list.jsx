import { mailService } from '../services/mail.service.js';
import { MailPreview } from '../cmps/mail-preview.jsx';

export class MailList extends React.Component {
    state = {
        currUser: null,
        mails: null,
        critetia: {
            status: null,
            txt: null,
            isRead: null,
            isStared: null,
            lables: null
        }
    }

    componentDidMount() {
        this.loadUser()
    }

    loadUser = () => {
        mailService.getUser()
            .then(user => this.setState({ currUser: user }, () => { this.loadMails() }))
    }

    loadMails = () => {
        const { currUser, critetia } = this.state;
        console.log(currUser)
        mailService.mailsToShow(currUser, critetia)
            .then(mails => this.setState({ mails }));
    }

    render() {
        const { mails, currUser } = this.state;
        if (!mails) return <React.Fragment>Loading...</React.Fragment>
        return <section className="mail-list">
            {mails.map(mail => <MailPreview key={mail.id} mail={mail} />)}
        </section>
    }
}