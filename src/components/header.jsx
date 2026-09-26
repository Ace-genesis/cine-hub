import { Link } from "react-router-dom";
import "../css/header.css";
import "../css/responsive.css";

function Hamburger() {
  return (
    <button className="hamburger">
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
}

function Header() {
  return (
    <header className="primary-header">
      <Link className="site-name">
        <h1>
          Cine<span className="name-span">Hub</span>
        </h1>
      </Link>

      <nav className="primary-nav">
        <Link to={"#"} className="nav-item">
          Home
        </Link>
        <Link to={"#"} className="nav-item">
          Movies
        </Link>
        <Link to={"#"} className="nav-item">
          TV Shows
        </Link>
        <Link to={"#"} className="nav-item">
          Trending
        </Link>
        <Link to={"#"} className="nav-item">
          Genres
        </Link>
        <Link to={"#"} className="nav-item">
          My List
        </Link>
      </nav>
      <div className="collapsed-div">
        <div className="input-container">
          <input
            type="text"
            placeholder="Search for movies, TV Shows, actors..."
            className="header-input"
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>

        <div className="header-icons">
          <button className="icon-style">
            <i className="fa-regular fa-bell"></i>
          </button>
          <button className="icon-style">
            <i className="fa-solid fa-circle-user"></i>
          </button>
          <Hamburger />
        </div>
      </div>
    </header>
  );
}

export default Header;
