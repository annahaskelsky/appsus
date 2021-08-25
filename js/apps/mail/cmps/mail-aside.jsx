const { Link } = ReactRouterDOM


export function MailAside(){
    return(
        <section className="mail-aside-container">
            <ul className="clean-list  flex">
                <li><Link to="/mail/inbox" className="flex align-center"><p>✉</p> Inbox</Link></li>
                <li><Link to="/mail/starred" className="flex align-center"><p>⭐</p> Starred</Link></li>
                <li><Link to="/mail/sent" className="flex align-center"><p>📤</p> Sent</Link></li>
                <li><Link to="/mail/draft" className="flex align-center"><p>📑</p> Draft</Link></li>
                <li><Link to="/mail/trash" className="flex align-center"><p>🗑</p> Trash</Link></li>
            </ul>
        </section>
    )

}