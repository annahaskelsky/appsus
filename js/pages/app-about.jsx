export function About() {
  return (
    <section className="about main-layout">
      <h1>About The Product</h1>
      <p>Our app gives you the best experience in exchanging emails, keeping notes and getting some light reading.</p>

      <h1>About Us</h1>
      <section className="team flex">
        <div className="team-member">
          <img src="./assets/img/shir.jpg" />
          <h2>Shir Lavi</h2>
          <p>28 from Tel Aviv, holds a bachelor's degree in marketing and communication, currently a fullstack developer.<br />
            Programming languages: Javascript, HTML, CSS.<br/>
            Other tools: Photoshop, After Effects, Premiere.
          </p>
          <div className="flex socials">
            <a href="https://www.facebook.com/shir.lavi.5682" target="_blank"><i className="fab fa-facebook-square"></i></a>
            <a href="https://github.com/ShirLaV" target="_blank"><i className="fab fa-github-square"></i></a>
            <a href="https://www.linkedin.com/in/shir-lavi-621957218/" target="_blank"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
        <div className="team-member">
          <img src="./assets/img/anna.jpg" />
          <h2>Anna Haskelsky</h2>
          <p>I'm Anna, 23 years old from Yoqneam, Israel. I am currently a fullstack student at Coding Academy,
          coding my way into the world of programming one short circuit at a time with the help of HTML, CSS & JS. 
          </p>
          <div className="flex socials">
            <a href="https://www.facebook.com/anna.haskelsky/" target="_blank"><i className="fab fa-facebook-square"></i></a>
            <a href="https://github.com/annahaskelsky" target="_blank"><i className="fab fa-github-square"></i></a>
            <a href="https://www.linkedin.com/in/anna-haskelsky-70a928216/" target="_blank"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
      </section>
    </section>
  )
}
