const { Link } = ReactRouterDOM;

export function Home() {
  return (
    <section className='home'>
      <section className='main-hero-container app-hero-section'>
        <h1>Welcome to Appsus</h1>
        <i className="fas fa-angle-down"></i>
      </section>
      <section className='main-description description-section'>
        <p>
        Our app gives you the best experience in exchanging emails, keeping notes and getting some light reading.
        </p>
      </section>
      <section className='app-hero-section notes-hero'>
        <h1>
          <Link to='/keep'>Miss Keep</Link>
        </h1>
      </section>
      <section className='description-section'>
        <p className="main-layout">
          Notes app that makes it easy to capture a thought or list for
          yourself, and share it with friends and family. Quickly capture what’s
          on your mind and get a reminder later at the right place or time. Grab
          a photo of a poster, receipt or document and easily organize or find
          it later in search.
        </p>
      </section>
      <section className='app-hero-section email-hero'>
        <h1>
          <Link to='/mail'>Mr Email</Link>
        </h1>
      </section>
      <section className='description-section'>
        <p className="main-layout">
          Easy to use email app that saves you time and keeps your messages
          safe. Stay in touch with your friends an coworkers, in an intuitive,
          efficient, and useful way.
        </p>
      </section>
      <section className='app-hero-section book-hero'>
        <h1>
          <Link to='/book'>Miss Book</Link>
        </h1>
      </section>
      <section className='description-section'>
        <p className="main-layout">
          Here you will find contemporary bestsellers, new book editions, book
          promotions and much more. We have popular genres like literature and
          fiction, children's books, suspense and mystery, cooking, comics and
          graphic novels, novels, science fiction and fantasy. In addition, you
          will find great recommendations for books that may interest you based
          on your search.
        </p>
      </section>
    </section>
  );
}
