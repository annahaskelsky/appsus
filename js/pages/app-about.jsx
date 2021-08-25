function Team() {
    return (
      <ul>
        <li>Shraga Ben Puk</li>
        <li>Ronen Harazi</li>
      </ul>
    )
  }
  
  function App() {
    return (
      <ul>
        <li>Create Amazing Cars </li>
        <li>Sleep and Eat a lot</li>
      </ul>
    )
  }
  
  export function About() {
    return (
      <section className="about">
        <strong>We're all about cars...</strong>
        {/* <p>{utilService.makeLorem()}</p> */}
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam repellat corporis accusantium, magni quasi sequi tempore laudantium quia vel temporibus aut aperiam. Temporibus possimus voluptate aliquam repellat laborum excepturi ducimus!</p>
  
        <nav>
          <NavLink to="/about/team" >Team</NavLink>
          <NavLink to="/about/vision">Vision</NavLink>
        </nav>
  
        <section >
          <Route path="/about/team" component={Team} />
          <Route path="/about/vision" component={Vision} />
        </section>
  
      </section>
    )
  }
  