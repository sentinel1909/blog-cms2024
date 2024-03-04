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
          <a href="/posts">Posts</a>
        </li>
        <li>
          <a href="/admin">Admin</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
