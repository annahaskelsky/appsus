const { Link } = ReactRouterDOM

import { LongTxt } from '../cmps/LongTxt.jsx'
import { Reviews } from '../cmps/Reviews.jsx'
import { bookService } from '../services/book.service.js';

export class BooksDetails extends React.Component {
    state = {
        book: null,
        reviews: null,
        readingType: '',
        ageDiffStr: '',
    }

    componentDidMount() {
        this.loadBook()
        this.setReadingType();
        this.setAgeNote();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
            this.loadBook()
        }
    }

    loadBook = () => {
        const id = this.props.match.params.bookId;
        bookService.getBookById(id)
            .then(book => {
                if (!book) this.props.history.push('/')
                this.setState({ book, reviews: book.reviews })
                return book;
            })
    }

    setReadingType = () => {
        const { book } = this.state;
        if (!book) return;
        const pageCount = book.pageCount;
        let readingType = '';
        if (pageCount > 500) readingType = 'Long reading';
        else if (pageCount > 200) readingType = 'Decent reading';
        else if (pageCount < 100) readingType = 'Light reading';
        this.setState({ readingType });
    }

    setAgeNote = () => {
        const { book } = this.state;
        if (!book) return;
        const publishedDate = +book.publishedDate;
        const ageDiff = +new Date().getFullYear() - publishedDate;
        const ageDiffStr = (ageDiff > 10) ? 'Veteran Book' : ((ageDiff < 1) ? 'New!' : '')
        this.setState({ ageDiffStr });
    }

    onRemoveReview = (reviewId) => {
        bookService.removeReview(this.state.book.id, reviewId)
            .then(this.loadBook);
    }

    render() {
        const { readingType, ageDiffStr, book, reviews } = this.state;
        if (!book) return <div>Loading...</div>
        const price = book.listPrice.amount;

        return <section className="book-details-container main-layout">
                <article className="book-details-header">
                    <Link to={`/book/${bookService.getNextBookId(book.id, -1)}`}> ᐸ Previous Book</Link>
                    <Link to={`/book/${bookService.getNextBookId(book.id, 1)}`}>Next Book ᐳ</Link>
                </article>
            <div className="book-details">
                <div>
                    <Link to="/book"><button className="main-button">Go back</button></Link>
                    <h2 className="book-title">{book.title} </h2>
                    {book.listPrice.isOnSale && <h3>On Sale!</h3>}
                    {price && <h3 className={(price > 150) ? 'red' : ((price < 20) ? 'green' : '')}>
                        Price: {price} {bookService.getCurrencyIcon(book.listPrice.currencyCode)}</h3>}
                    {!price && <h3>Not for sale</h3>}
                    <h4>{book.subtitle}</h4>
                    <h4>Authors: {book.authors.join(', ')}</h4>
                    <LongTxt text={book.description} />
                    <h5>Page count: {book.pageCount} pages{readingType && <span> - {readingType}</span>}</h5>
                    <h5>Published year: {book.publishedDate}{ageDiffStr && <span> - {ageDiffStr}</span>}</h5>
                    <h5>Categories: {book.categories.join(', ')}</h5>
                    <h5>Language: {book.language}</h5>

                    <Link to={`/book/BookReview/${book.id}`}><button className="main-button">Add review</button></Link>
                </div>
                <img src={book.thumbnail} />
            </div>
            <Reviews book={book} reviews={reviews} onRemoveReview={this.onRemoveReview} />
        </section>
    }
}
