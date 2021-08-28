const { Link } = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'


export class BookHome extends React.Component {

    state = {
        books: null,
        filterBy: null,
    }

    componentDidMount() {
        this.loadBooks();
    }

    loadBooks = () => {
        bookService.query(this.state.filterBy)
            .then(books => {
                this.setState({ books })
            })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadBooks);
    }

    render() {
        const { books } = this.state;
        if (!books) return <div>Loading...</div>
        return (
            <section className="book-app">
                <BookFilter filterBy={this.state.filterBy} onSetFilter={this.onSetFilter} />
                <Link to="/book/BookAdd">Add book</Link>
                <BookList books={books} />
            </section>
        )
    }
}