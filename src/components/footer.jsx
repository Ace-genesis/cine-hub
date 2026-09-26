import { Link } from "react-router-dom";
import "../css/header.css";

function Footer() {
  return (
    <footer>
      <Link className="site-name">
        <h1>
          Cine<span className="name-span">Hub</span>
        </h1>
      </Link>
    </footer>
  );
}

export default Footer;
