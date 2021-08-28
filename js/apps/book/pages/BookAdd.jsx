const { Link } = ReactRouterDOM;

import { bookService } from '../services/book.service.js';
import { utilService } from '../services/util.service.js';
import { SearchResults } from '../cmps/SearchResults.jsx';
import { eventBusService } from '../../../services/eventbus.service.js'
import { UserMsg } from '../cmps/UserMsg.jsx';

export class BookAdd extends React.Component {
    state = {
        searchName: '',
        books: null
    }

    inputRef = React.createRef()

    componentDidMount() {
        this.inputRef.current.focus()
    }

    componentWillMount() {
        this.setState({ books: null })
    }

    loadBooksList = (books) => {
        this.setState({ books })
    }

    handleChange = (ev) => {
        const { name, value } = ev.target
        this.setState(prevState => ({ ...prevState, [name]: value }), () => this.debouncedDoSearch(value));
    }

    doSearch = (searchName) => {
        bookService.getTopResults(searchName)
            .then(books => { this.loadBooksList(books) })
    }

    debouncedDoSearch = utilService.debounce(this.doSearch, 500)

    onAddBook = (book) => {
        bookService.addGoogleBook(book);
        eventBusService.emit('user-msg', {
            txt: `The book "${book.volumeInfo.title}" was successfully added`,
            type: 'success',
            linkHtml: <Link to={`/book/${book.id}`}>Check it out!</Link>
        })
    }

    render() {
        const { books, searchName } = this.state;
        // console.log('books', books)
        return (
            <section className="search-page">
                <h2>Search the name of the book you want to add</h2>
                <input type="search" placeholder="Search" value={searchName} name="searchName" ref={this.inputRef}
                    onChange={this.handleChange} />
                {books && <SearchResults books={books} onAddBook={this.onAddBook} />}
            </section>
        )
    }
}