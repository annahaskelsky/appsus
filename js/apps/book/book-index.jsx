const { Route, Switch } = ReactRouterDOM

import {BookHome} from './pages/BookHome.jsx'
import { BooksDetails } from './pages/BooksDetails.jsx'
import { BookReview } from './pages/BookReview.jsx'
import {BookAdd} from './pages/BookAdd.jsx'

export function BookApp() {

    return (
        <section className="book-app flex main-layout">
                <Switch>
                    <Route path="/book/BookAdd" component={BookAdd}/>
                    <Route path="/book/BookReview/:bookId" component={BookReview} />
                    <Route path="/book/:bookId" component={BooksDetails} />    
                    <Route path="/book" component={BookHome} />
            </Switch>
        </section>
    )
}
