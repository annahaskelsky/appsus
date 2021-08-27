const { Link } = ReactRouterDOM


export function Home() {
    return (
        <section className="home">
            <div className="hero-container">
                <h1 className="main-layout">Hello Appsus</h1>
            </div>
            <main>
                <nav className="main-nav flex">
                    <Link to="/mail"><div className="main-layout flex">
                        <img src="./assets/img/email.png" />
                        <article>Easy to use email app that saves you time and keeps your messages safe.
                            Stay in touch with your friends an coworkers, in an intuitive, efficient, and useful way.
                        </article>
                    </div></Link>
                    <Link to="/keep">
                        <div className="main-layout flex">
                            <img src="./assets/img/note.png" />
                            <article>Notes app that makes it easy to capture a thought or list for yourself,
                                and share it with friends and family.
                                Quickly capture what’s on your mind and get a reminder later at the right place or time.
                                Grab a photo of a poster, receipt or document and easily organize or find it later in search.
                            </article>
                        </div></Link>
                    <Link to="/book"><div className="main-layout flex">
                        <img src="./assets/img/books.png" />
                        <article>Here you will find contemporary bestsellers, new book editions, book promotions and much more.
                            We have popular genres like literature and fiction, children's books, suspense and mystery, cooking,
                            comics and graphic novels, novels, science fiction and fantasy. 
                            In addition, you will find great recommendations for books that may interest you based on your search.>
                        </article>
                    </div></Link>
                </nav>
            </main>
        </section>

    )
}