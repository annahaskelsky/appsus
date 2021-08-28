const { NavLink, withRouter } = ReactRouterDOM


const _AppHeader = (props) => {
    return (
        <section className="app-header flex space-between align-center main-layout">
            <div className="logo-container flex align-center" onClick={() => props.history.push('/')}>
                <img src="./assets/img/logo.png" />
                <h1 >Appsus</h1>
            </div>
            <nav className="flex header-nav">
                <NavLink className="effect-underline" to="/about" onClick={()=> props.toggleMenu()}>About</NavLink>
                <NavLink className="effect-underline" to="/mail" onClick={()=> props.toggleMenu()}>Email</NavLink>
                <NavLink className="effect-underline" to="/keep" onClick={()=> props.toggleMenu()}>Notes</NavLink>
                <NavLink className="effect-underline" to="/book" onClick={()=> props.toggleMenu()}>Books</NavLink>
            </nav>
        </section>
    )
}

export const AppHeader = withRouter(_AppHeader)
