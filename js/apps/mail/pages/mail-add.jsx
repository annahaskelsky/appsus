export class MailAdd extends React.Component {
    state = {

    }

    render() {
        return <section className="new-mail flex">
            <h1>New mail</h1>
            <form className="flex">
                <input type="email" name="email" placeholder="To"/>
                <input type="text" name="subject" placeholder="Subject"/>
                <textarea placeholder="Text goes here"></textarea>
                <button>Send</button>
            </form>
        </section>
    }
}