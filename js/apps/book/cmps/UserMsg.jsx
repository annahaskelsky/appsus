import { eventBusService } from "../services/eventbus.service.js"

export class UserMsg extends React.Component {

  state = {
    msg: null
  }
  removeEventBus;
  timeoutId;

  componentDidMount() {
    this.removeEventBus = eventBusService.on('user-msg', (msg) => {
      this.setState({ msg }, () => {
        if (this.timeoutId) clearTimeout(this.timeoutId)
        this.timeoutId = setTimeout(this.onCloseMsg, 3000)
      })
    })
  }

  componentWillUnmount() {
    this.removeEventBus()
  }

  onCloseMsg = () => {
    this.setState({ msg: null })
    clearTimeout(this.timeoutId)
  }

  render() {
    const { msg } = this.state
    if (!msg) return <React.Fragment></React.Fragment>
    return (
      <section className={`user-msg ${msg.type || ''}`}>
        <button onClick={this.onCloseMsg}>X</button>
        <h1>{msg.txt}</h1>
        {msg.linkHtml && <React.Fragment>{msg.linkHtml}</React.Fragment>}
      </section>
    )
  }
}
