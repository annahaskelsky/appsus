const { Link } = ReactRouterDOM

import { NoteService } from '../../keep/services/note.service.js'
import { mailService } from '../services/mail.service.js'

export class MailDetails extends React.Component {

    state = {
        mail: null
    }

    componentDidMount() {
        this.loadMail()
    }

    loadMail = () => {
        const id = this.props.match.params.mailId;
        mailService.getMailById(id)
            .then(mail => {
                if (!mail) this.props.history.push('/')
                this.setState({ mail })
                return id;
            })
            .then(id=>{
                mailService.toggleReadStatus(id, 'read');
            })
    }

    onDeleteMail=(mailId)=>{
        mailService.deleteMail(mailId);
        this.props.history.push('/mail');
    }

    getTimeFormat=(date)=>{
        return new Date(date).toLocaleString();
    }

    onSendToNote = () => {
        NoteService.createNotes()
        NoteService.addNote(null, this.state.mail)
        this.props.history.push('/keep')
    }

    render() {
        const {mail} = this.state;
        if(!mail) return <div>Loading...</div>
        return <section className="mail-details flex">
            <nav>
                <Link to="/mail"><i className="fas fa-arrow-left icon-button" title="Go to inbox"></i></Link>
                <button onClick={()=>this.onDeleteMail(mail.id)} className="icon-button"><i className="fa fa-trash" aria-hidden="true" title="Remove to trash"></i></button>
                <button onClick={this.onSendToNote} className="icon-button"><i className="fas fa-paper-plane"></i></button>
            </nav>
            <h2>{mail.subject}</h2>
            <h4>{mail.from}</h4>
            <p>{this.getTimeFormat(mail.sentAt)}</p>
            <p>{mail.body}</p>
        </section>
    }
}