import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="mt-4 p-6">
      <article className="sm:flex bg-surface border rounded-md items-center p-4">
        <div className="subscribe-content flex-grow ">
          <h3 className="text-fluid-sm">Never Miss a Movie</h3>
          <p className="hidden sm:flex text-fluid-sm">
            Get the latest updates on new release, trending titles and more.
          </p>
        </div>
        <form className="subscribe-form flex gap-2">
          <div className="border rounded-md bg-elevated items-center p-2 gap-2 max-w-500 w-full flex">
            <Mail />
            <input
              type="text"
              className="bg-transparent border-0 text-primary w-full"
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
