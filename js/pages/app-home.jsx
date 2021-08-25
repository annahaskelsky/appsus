const { Link } = ReactRouterDOM


export function Home() {
    return (
        <section className="home">
            <h1 className="main-layout">Hello Appsus</h1>
            <main>
                <nav className="main-nav flex">
                    <Link to="/email"><div className="main-layout flex">
                        <img src="../../assets/img/email.png" />
                        <article>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                            Sed aspernatur error perspiciatis, velit aliquid voluptate laudantium,
                            consequuntur voluptatem doloremque odio debitis aperiam voluptates?
                            Aliquam reprehenderit eius possimus voluptatibus necessitatibus reiciendis
                            ipsa facilis, ullam, eaque iste, enim doloremque? Ea, placeat illo,
                            ipsam quidem autem, vel omnis eaque id tempore architecto ullam!</article>
                    </div></Link>
                    <Link to="/keep">
                    <div className="main-layout flex">
                        <article>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                            Sed aspernatur error perspiciatis, velit aliquid voluptate laudantium,
                            consequuntur voluptatem doloremque odio debitis aperiam voluptates?
                            Aliquam reprehenderit eius possimus voluptatibus necessitatibus reiciendis
                            ipsa facilis, ullam, eaque iste, enim doloremque? Ea, placeat illo,
                            ipsam quidem autem, vel omnis eaque id tempore architecto ullam!</article>
                        <img src="../../assets/img/notes.jpeg" />
                    </div></Link>
                    <Link to="/book"><div className="main-layout flex">
                        <img src="../../assets/img/books.png" />
                        <article>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                            Sed aspernatur error perspiciatis, velit aliquid voluptate laudantium,
                            consequuntur voluptatem doloremque odio debitis aperiam voluptates?
                            Aliquam reprehenderit eius possimus voluptatibus necessitatibus reiciendis
                            ipsa facilis, ullam, eaque iste, enim doloremque? Ea, placeat illo,
                            ipsam quidem autem, vel omnis eaque id tempore architecto ullam!</article>
                    </div></Link>
                </nav>
            </main>
        </section>

    )
}