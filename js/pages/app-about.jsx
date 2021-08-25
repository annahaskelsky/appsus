export function About() {
  return (
    <section className="about main-layout">
      <h1>About The Product</h1>
      <p>Our app gives you the best experience in exchanging emails, keeping notes and getting some light reading.</p>

      <h1>About Us</h1>
      <section className="team flex">
        <div>
          <img src="../../assets/img/shir.jpg" />
          <h2>Shir Lavi</h2>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt molestiae qui aut, eveniet necessitatibus, animi hic repellendus quia doloremque sint, dolorem alias voluptatum incidunt illo aperiam consequuntur sit adipisci repudiandae! Delectus totam sed voluptate ullam tempore hic quod similique error minus, non iusto, autem possimus dolorem quasi. Officia, sequi a.
          </p>
          <div className="flex socials">
            <i className="fab fa-facebook-square"></i>
            <i className="fab fa-github-square"></i>
            <i className="fab fa-linkedin"></i>
          </div>
        </div>
        <div>
          <img src="../../assets/img/anna.jpg" />
          <h2>Anna Haskelsky</h2>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt molestiae qui aut, eveniet necessitatibus, animi hic repellendus quia doloremque sint, dolorem alias voluptatum incidunt illo aperiam consequuntur sit adipisci repudiandae! Delectus totam sed voluptate ullam tempore hic quod similique error minus, non iusto, autem possimus dolorem quasi. Officia, sequi a.
          </p>
          <div className="flex socials">
            <i className="fab fa-facebook-square"></i>
            <i className="fab fa-github-square"></i>
            <i className="fab fa-linkedin"></i>
          </div>
        </div>
      </section>
    </section>
  )
}
