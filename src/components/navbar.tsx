// src/components/navbar.tsx

// the common navigation bar component

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/articles">Articles</a>
        </li>
        <li>
          <a href="/new-article">New Article</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
