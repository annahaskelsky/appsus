const { Route, Switch } = ReactRouterDOM

import { MailAside } from './cmps/mail-aside.jsx';
import { MailFilter } from './cmps/mail-filter.jsx';
import { MailDetails } from './pages/mail-details.jsx';
import { MailList } from './pages/mail-list.jsx';
import { MailAdd } from './pages/mail-add.jsx';

export function MailApp() {
    return (
        <section className="mail-app flex main-layout">
            <aside>
                <MailAside />
            </aside>
            <main>
                <MailFilter />
                <Switch>
                    <Route path="/mail/edit/:mailId" component={MailAdd}/>
                    <Route path="/mail/new" component={MailAdd}/>
                    <Route path="/mail/:mailFilter/:mailId" component={MailDetails}/>
                    <Route path="/mail/:mailFilter" component={MailList} />
                    <Route path="/mail" component={MailList} />
                </Switch>
            </main>
        </section>

    )
}