const { Route, Switch } = ReactRouterDOM

import { MailAside } from './cmps/mail-aside.jsx';
// import { MailDetails } from './pages/mail-details.jsx';
import { MailList } from './pages/mail-list.jsx';

export function MailApp() {
    return (
        <section className="mail-app flex main-layout">
            <aside>
                <MailAside />
            </aside>
            <main>
                <Switch>
                    <Route path="/mail/:mailId" component={MailDetails}/>
                    <Route path="/mail" component={MailList} />
                    {/* <Route path="/mail/sent" component={MailList} /> */}
                </Switch>
            </main>
        </section>

    )
}