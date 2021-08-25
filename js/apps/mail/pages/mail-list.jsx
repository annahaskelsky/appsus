import { mailService } from '../services/mail.service.js';
import { MailPreview } from '../cmps/mail-preview.jsx';

export class MailList extends React.Component {
    state = {
        currUser: null,
        mails: null,
        criteria: {
            status: null,
            txt: null,
            isRead: null,
            isStared: null,
            lables: null
        }
    }

    componentDidMount() {
        this.loadUser();
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.props.match.params.mailFilter)
        console.log(prevProps.match.params.mailFilter)
        if (prevProps.match.params.mailFilter !== this.props.match.params.mailFilter) {
            this.setCriteria();
        }
        // console.log(this.props.match)
        // console.log(prevProps.match)
    }

    setCriteria = () => {
        // console.log(this.props.match)
        const { criteria } = this.state;
        const statuses = ['sent', 'draft', 'trash']
        // const url = window.location.href;
        // const urlParams = url.split('/');
        // const status = urlParams[urlParams.length - 1]
        const status = this.props.match.params.mailFilter
        console.log(status)
        if (status === 'starred') {
            console.log('hey')
            this.setState(prevState => ({criteria: {...prevState.criteria, isStared: true }}))
            this.loadMails();
        } else if (statuses.includes(status)) {
            this.setState(prevState => ({criteria: {...prevState.criteria, status }}))
            this.loadMails();
        }
    }


    loadUser = () => {
        console.log('loading user')

        mailService.getUser()
            .then(user => this.setState({ currUser: user }, () => { this.loadMails() }))
    }

    loadMails = () => {
        const { currUser, criteria } = this.state;
        // console.log(currUser)
        mailService.mailsToShow(currUser, criteria)
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