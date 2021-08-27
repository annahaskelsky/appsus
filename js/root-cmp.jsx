
const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import { AppHeader } from './cmps/app-header.jsx';
import { BookApp } from 'apps/book/pages/book-index.jsx';
import { MailApp } from 'apps/mail/mail-index.jsx';
import { NotesApp } from 'apps/keep/keep-index.jsx'
import { AppFooter } from './cmps/app-footer.jsx';
import { About } from './pages/app-about.jsx';
import { Home } from './pages/app-home.jsx';

export class App extends React.Component {
    state = {
        isMenuOpen: false
    }

    toggleMenu = () => {
        this.setState({ isMenuOpen: !this.state.isMenuOpen })
    }

    render() {
        const {isMenuOpen} = this.state
        return (
            <Router>
                <header className={`${isMenuOpen ? 'menu-open' : ''}`}>
                    <button className="btn-menu-toggle" onClick={this.toggleMenu}>☰</button>
                    <AppHeader />
                </header>
                <main className="app">
                    <Switch>
                        <Route path="/keep" component={NotesApp} />
                        <Route path="/book" component={BookApp} />
                        <Route path="/mail" component={MailApp} />
                        <Route path="/about" component={About} />
                        <Route path="/" component={Home} />
                    </Switch>
                </main>
                <footer>
                    <AppFooter />
                </footer>
            </Router>
        )

    }
}
