export function SearchResults({ books, onAddBook }) {

    return (
        <section className="results">
            <h3>Top results</h3>
            <ul className="search-list">
                {books.map(book => <li key={book.id}>
                    <p>{book.volumeInfo.title}</p>
                    <button onClick={() => onAddBook(book)}>+</button>
                </li>)}
            </ul>
        </section>
    )

}