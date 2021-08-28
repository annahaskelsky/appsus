const { Link } = ReactRouterDOM


export class BookFilter extends React.Component {
    state = {
        filterBy: {
            name: '',
            minPrice: '',
            maxPrice: ''
        }
    };

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = (ev.target.type === 'number') ? +ev.target.value : ev.target.value;
        this.setState((prevState) => ({ ...prevState, filterBy: { ...prevState.filterBy, [field]: value } }), () => {this.props.onSetFilter(this.state.filterBy)});
    }

    onFilter = (ev) => {
        ev.preventDefault();
        this.props.onSetFilter(this.state.filterBy);
    };

    render() {
        const { name, minPrice, maxPrice } = this.state.filterBy;
        return <form className="filter-by" onSubmit={this.onFilter}>
            <label htmlFor="book-name">Book name:</label>
            <input id="book-name" name="name" type="text" value={name} placeholder="Book name" onChange={this.handleChange}/>
            <label htmlFor="min-price">Minimum price:</label>
            <input id="min-price" name="minPrice" type="number" value={minPrice} placeholder="Minimum price" onChange={this.handleChange}/>
            <label htmlFor="max-price">Maximum price:</label>
            <input id="max-price" name="maxPrice" type="number" value={maxPrice} placeholder="Maximum price" onChange={this.handleChange}/>
            <button className="main-button">Filter</button>
            <Link to="/book/BookAdd"><div className="main-button">Add book</div></Link>
        </form>
    }
}