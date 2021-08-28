export class LongTxt extends React.Component {

    state = {
        isLongTxtShown: false
    }

    getTextToShow = (text) => {
        const { isLongTxtShown } = this.state
        if (isLongTxtShown) return text;
        return text.substring(0, 100);
    }

    onToggleText = () => {
        this.setState({ isLongTxtShown: !this.state.isLongTxtShown })
    }

    render() {
        const { text } = this.props
        const { isLongTxtShown } = this.state

        return <p className="book-desc">{this.getTextToShow(text)}
            {text.length > 100 && <span onClick={() => this.onToggleText()}>
                Read {isLongTxtShown ? 'less...' : 'more...'}</span>}</p>
    }
}