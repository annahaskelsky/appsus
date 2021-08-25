export function MailApp() {
    return (
        <section>
            <Aside />
            <Switch>
                <Route component={MailDetails} path="/mail/:mailId" />
                <Route component={MailList} path="/mail/starred" />
                <Route component={MailList} path="/mail" />
            </Switch>
            <h1>mail app</h1>
        </section>
    )
}