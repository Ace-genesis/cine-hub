import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <article className="subscribe-section">
        <div className="subscribe-content">
          <h3 className="subscribe-heading">Never Miss a Movie</h3>
          <p className="subscribe-text">
            Get the latest updates on new release, trending titles and more.
          </p>
        </div>
        <form className="subscribe-form">
          <div className="input-div">
            <i className="fa-regular fa-envelope"></i>
            <input
              type="text"
              className="subscribe-input"
              placeholder="Enter your email address"
            />
          </div>
          <button className="primary-btn">Subscribe</button>
        </form>
      </article>
      <article className="footer-section">
        <section className="footer-header">
          <Link className="site-name footer">
            <h2>
              Cine<span className="name-span">Hub</span>
            </h2>
          </Link>
          <div className="social-links">
            <i className="fa-brands fa-facebook-f"></i>
            <i className="fa-brands fa-x-twitter"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-youtube"></i>
          </div>
        </section>

        <section className="footer-main">
          <div className="links-container">
            <div className="Browse-section">
              <h3>Browse</h3>
              <ul className="dropdown">
                <li className="footer-nav">
                  <Link>Movies</Link>
                </li>
                <li>
                  <Link>TV Shows</Link>
                </li>
                <li>
                  <Link>Trending</Link>
                </li>
                <li>
                  <Link>Upcoming</Link>
                </li>
                <li>
                  <Link>Genres</Link>
                </li>
              </ul>
            </div>

            <div className="Help-section">
              <h3>Help</h3>
              <ul className="dropdown">
                <li className="footer-nav">
                  <Link>FAQs</Link>
                </li>
                <li>
                  <Link>Account Support</Link>
                </li>
                <li>
                  <Link>Device Support</Link>
                </li>
                <li>
                  <Link>Privacy Policy</Link>
                </li>
                <li>
                  <Link>Terms of Service</Link>
                </li>
              </ul>
            </div>

            <div className="About-section">
              <h3>About</h3>
              <ul className="dropdown">
                <li className="footer-nav">
                  <Link>About Us</Link>
                </li>
                <li>
                  <Link>Careers</Link>
                </li>
                <li>
                  <Link>Press</Link>
                </li>
                <li>
                  <Link>Contact</Link>
                </li>
                <li>
                  <Link>Blog</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="download-section">
            <div>
              <h3>Download Our App</h3>
              <p>Watch anywhere, anytime</p>
            </div>
            <div className="download-cta">
              <div className="store">
                <i className="fa-brands fa-google-play"></i>
                <div>
                  <p className="small-txt">get it on</p>
                  <p className="big-txt">Google Play</p>
                </div>
              </div>
              <div className="store">
                <i className="fa-brands fa-apple"></i>
                <div>
                  <p className="small-txt">Download on the</p>
                  <p className="big-txt">App Store</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
    </footer>
  );
}

export default Footer;
