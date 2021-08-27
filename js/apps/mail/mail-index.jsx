const { Route, Switch } = ReactRouterDOM

import { MailAside } from './cmps/mail-aside.jsx';
import { MailFilter } from './cmps/mail-filter.jsx';
import { MailDetails } from './pages/mail-details.jsx';
import { MailList } from './pages/mail-list.jsx';
import { MailAdd } from './pages/mail-add.jsx';

export class MailApp extends React.Component {

    state = {
        isSideMenuOpen: false
    }

    toggleSideMemu = () => {
        console.log('toggling')
        this.setState({ isSideMenuOpen: !this.state.isSideMenuOpen })
    }

    render() {
        const { isSideMenuOpen } = this.state;

        return (
            <section className="mail-app flex main-layout">
                {/* <aside className="aside-menu-open"> */}
                <aside className={isSideMenuOpen? 'aside-menu-open' : ''}>
                    <MailAside />
                </aside>
                <main>
                    <MailFilter toggleSideMemu={this.toggleSideMemu} />
                    <Switch>
                        <Route path="/mail/edit/:mailId" component={MailAdd} />
                        <Route path="/mail/new" component={MailAdd} />
                        <Route path="/mail/:mailFilter/:mailId" component={MailDetails} />
                        <Route path="/mail/:mailFilter" component={MailList} />
                        <Route path="/mail" component={MailList} />
                    </Switch>
                </main>
            </section>
        )
    }
}