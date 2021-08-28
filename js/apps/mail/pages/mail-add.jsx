const { Link } = ReactRouterDOM

import { mailService } from '../services/mail.service.js';

export class MailAdd extends React.Component {
    state = {
        newMail: {
            to: '',
            subject: '',
            body: '',
            id: null
        },
        isCreated: false
    }

    draftInterval;

    componentDidMount() {
        this.draftInterval = setInterval(this.onSaveToDraft, 5000);
        const urlParam = this.props.match.params.mailId;
        mailService.getMailById(urlParam)
            .then(mail => {
                if (mail) this.setDraftInfo(mail)
            })
    }

    componentWillUnmount() {
        clearInterval(this.draftInterval);

    }

    setDraftInfo = (mail) => {
        this.setState({ newMail: { to: mail.to, subject: mail.subject, body: mail.body, id: mail.id }, isCreated: true })
    }

    onHandlechange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState((prevState) => ({ ...prevState, newMail: { ...prevState.newMail, [field]: value } }));
    }

    onSendMail = (ev) => {
        ev.preventDefault();
        mailService.sendMail(this.state.newMail.id);
        this.props.history.push('/mail');
    }

    onSaveToDraft = () => {
        if (!this.state.isCreated) {
            mailService.createDraft(this.state.newMail)
                .then(mailId => this.setState((prevState) => ({ ...prevState, newMail: { ...prevState.newMail, id: mailId }, isCreated: true })))
        }
        else mailService.saveToDraft(this.state.newMail, this.state.newMail.id);
    }

    render() {
        const { to, subject, body } = this.state.newMail
        return <section className="new-mail flex">
            <div className="new-mail-header flex">

                <Link to="/mail"><i className="fas fa-arrow-left icon-button" title="Go to inbox"></i></Link>
                <h1>New mail</h1>
            </div>
            <form className="flex" onSubmit={this.onSendMail}>
                <input type="email" name="to" placeholder="To" value={to} required onChange={this.onHandlechange} />
                <input type="text" name="subject" placeholder="Subject" value={subject} onChange={this.onHandlechange} />
                <textarea placeholder="Text goes here" name="body" value={body} onChange={this.onHandlechange}></textarea>
                <button className="main-button">Send</button>
            </form>
        </section>
    }
}