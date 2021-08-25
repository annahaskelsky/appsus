const { NavLink, withRouter } = ReactRouterDOM


const _AppHeader = (props) => {
    return (
        <section className="app-header flex space-between align-center main-layout">
            <div className="logo-container flex align-center" onClick={() => props.history.push('/')}>
                <img src="./assets/img/logo.png" />
                <h1 >Appsus</h1>
            </div>
            <nav className="flex">
                <NavLink to="/about">About</NavLink>
                <NavLink to="/book">Books</NavLink>
                <NavLink to="/mail">Email</NavLink>
                <NavLink to="/keep">Notes</NavLink>
            </nav>
        </section>
    )
}

export const AppHeader = withRouter(_AppHeader)
