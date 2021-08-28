import { bookService } from '../services/book.service.js';

export class BookReview extends React.Component {

    state = {
        book: null,
        review: {
            userName: '',
            rating: '',
            readAt: '',
            txt: ''
        }
    }

    componentDidMount() {
        this.loadBook()
    }

    loadBook = () => {
        const id = this.props.match.params.bookId
        bookService.getBookById(id)
            .then(book => {
                this.setState({ book })
            })
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.type === 'select-one' ? +ev.target.value : ev.target.value;
        this.setState({ review: { ...this.state.review, [field]: value } });
    };

    onSubmitReview = (ev) => {
        ev.preventDefault();
        const { book, review } = this.state;
        bookService.addReview(book, review);
        this.props.history.push(`/book/${book.id}`);
    }

    render() {

        return <section className="book-review-page">
            <h1>Book Review</h1>
            <form onSubmit={this.onSubmitReview}>
                <label htmlFor="user-name">Name: </label>
                <input type="text" id="user-name" name="userName" placeholder="Name" onChange={this.handleChange} />
                <label htmlFor="rating">Rate: </label>
                <select id="rating" name="rating" onChange={this.handleChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <label htmlFor="read-at">Read at: </label>
                <input type="date" id="read-at" name="readAt" onChange={this.handleChange} />
                <label htmlFor="review-txt">Your review: </label>
                <textarea id="review-txt" name="txt" onChange={this.handleChange}></textarea>
                <button>Submit</button>
            </form>
        </section>
    }
}
