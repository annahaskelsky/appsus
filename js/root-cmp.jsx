
const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
// import { ReviewAdd } from './cmps/ReviewAdd.jsx';
// import { BookDetails } from './pages/BookDetails.jsx';
import { BookApp } from 'apps/book/pages/book-index.jsx';
import { MailApp } from 'apps/mail/pages/mail-index.jsx';
import { NotesApp } from 'apps/keep/pages/note-index.jsx';
import { AppHeader } from './cmps/app-header.jsx';
import { AppFooter } from './cmps/app-footer.jsx';
import { About } from './pages/app-about.jsx';
import { Home } from './pages/app-home.jsx';

export function App() {
    return (
        <Router>
            <header>
                <AppHeader />
            </header>
            <main className="app">
                <Switch>
                    <Route path="/keep" component={NotesApp} />
                    <Route path="/book" component={BookApp} />
                    <Route path="/email" component={MailApp} />
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
