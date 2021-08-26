const { Link } = ReactRouterDOM

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
                return mail;
            })
            // .then(mail=>{
            //     mailService.markMailAsRead(id);
            // })
    }

    deleteMail=()=>{
        //TODO: update service and go back to list
        console.log('delete mail')
    }

    getTimeFormat=(date)=>{
        return new Date(date).toLocaleString();
    }

    render() {
        const {mail} = this.state;
        if(!mail) return <div>Loading...</div>
        return <section className="mail-details flex">
            <nav>
                <Link to="/mail"><i class="fas fa-arrow-left" title="Go to inbox"></i></Link>
                <button onClick={this.deleteMail}><i class="fa fa-trash" aria-hidden="true" title="Remove to trash"></i></button>
            </nav>
            <h2>{mail.subject}</h2>
            <h4>{mail.from}</h4>
            <p>{this.getTimeFormat(mail.sentAt)}</p>
            <p>{mail.body}</p>
        </section>
    }
}