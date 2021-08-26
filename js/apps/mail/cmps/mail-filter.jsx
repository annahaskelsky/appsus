export class MailFilter extends React.Component {

    state = {
        filterBy: {
            txt: ''
        }
    }

    render() {
        return <section>
            <input type="search" placeholder="Search" name="txt" />
        </section>
    }
}