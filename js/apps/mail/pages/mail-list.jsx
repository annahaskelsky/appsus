import { mailService } from '../services/mail.service.js';
import { MailPreview } from '../cmps/mail-preview.jsx';

export class MailList extends React.Component {
    state = {
        currUser: null,
        mails: null
    }

    componentDidMount() {
        this.loadUser()
    }

    loadUser = () => {
        mailService.getUser()
            .then(user => this.setState({ currUser: user }, ()=> {this.loadMails(this.state.currUser)}))
    }

    loadMails = (user) => {
        mailService.mailsToShow(user)
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