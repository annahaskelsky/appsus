const { Route, Switch } = ReactRouterDOM

import { MailAside } from './cmps/mail-aside.jsx';
import { MailFilter } from './cmps/mail-filter.jsx';
import { MailDetails } from './pages/mail-details.jsx';
import { MailList } from './pages/mail-list.jsx';
import { MailAdd } from './pages/mail-add.jsx';
import { Screen } from '../../cmps/screen.jsx'

export class MailApp extends React.Component {

    state = {
        isSideMenuOpen: false
    }

    toggleMenu = () => {
        this.setState({ isSideMenuOpen: !this.state.isSideMenuOpen })
    }

    render() {
        const { isSideMenuOpen } = this.state;

        return (
            <section className="mail-app flex main-layout">
                <aside className={isSideMenuOpen ? 'aside-menu-open' : ''}>

                    <Screen toggleMenu={this.toggleMenu} />
                    <MailAside toggleMenu={this.toggleMenu}/>
                </aside>
                <main>
                    <Switch>
                        <Route path="/mail/edit/:mailId" component={MailAdd} />
                        <Route path="/mail/new" component={MailAdd} />
                        <Route path="/mail/:mailFilter/:mailId" component={MailDetails} />
                        <Route path="/mail/:mailFilter" component= {(props)=> <MailList {...props} toggleMenu={this.toggleMenu}/>} />
                        <Route path="/mail" component= {(props)=> <MailList {...props} toggleMenu={this.toggleMenu}/>} />
                    </Switch>
                </main>
            </section>
        )
    }
}