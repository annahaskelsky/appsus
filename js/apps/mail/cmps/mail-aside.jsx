const { Link } = ReactRouterDOM


export function MailAside(){
    return(
        <section className="mail-aside-container">
            <Link to="/mail/new"><i class="fas fa-plus"></i> Compose</Link>
            <ul className="clean-list  flex">
                <li><Link to="/mail/inbox" className="flex align-center"><i class="fas fa-envelope"></i> Inbox</Link></li>
                {/* <li><Link to="/mail/starred" className="flex align-center"><i class="fas fa-star"></i> Starred</Link></li> */}
                <li><Link to="/mail/sent" className="flex align-center"><i class="fas fa-paper-plane"></i> Sent</Link></li>
                <li><Link to="/mail/draft" className="flex align-center"><i class="fas fa-file"></i> Draft</Link></li>
                <li><Link to="/mail/trash" className="flex align-center"><i class="fa fa-trash" aria-hidden="true"></i> Trash</Link></li>
            </ul>
        </section>
    )

}