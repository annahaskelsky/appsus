const { Link } = ReactRouterDOM

import { bookService } from '../services/book.service.js';

export class BookPreview extends React.Component {
    state = {
        currencyIcon: ''
    }

    componentDidMount() {
        const book = this.props.book;
    }

    render() {
        const { book} = this.props;
        return <Link to={`/book/${book.id}`} >
            <div className="book-preview">
                <img src={book.thumbnail} />
                <h3>{book.title}</h3>
                <h4>{book.listPrice.amount} {bookService.getCurrencyIcon(book.listPrice.currencyCode)}</h4>
            </div>
        </Link>

    }
}