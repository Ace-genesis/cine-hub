import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { SocialIcon, GooglePlayIcon } from "../socialIcons";

function Footer() {
  return (
    <footer className="mt-4 p-6 border overflow-hidden">
      <article className="flex gap-8">
        <section className="py-8 ">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link className="site-name footer">
              <h2 className="text-fluid-base">
                Cine<span className="text-brand">Hub</span>
              </h2>
            </Link>
            <div className="flex gap-2">
              <Link>
                <SocialIcon
                  platform="facebook"
                  background="var(--elevated-color)"
                  borderColor="var(--border-color)"
                  borderWidth={1}
                  radius={999}
                  size={18}
                  containerSize={35}
                />
              </Link>

              <Link>
                <SocialIcon
                  platform="x"
                  background="var(--elevated-color)"
                  borderColor="var(--border-color)"
                  borderWidth={1}
                  radius={999}
                  size={18}
                  containerSize={35}
                />
              </Link>

              <Link>
                <SocialIcon
                  platform="instagram"
                  background="var(--elevated-color)"
                  borderColor="var(--border-color)"
                  borderWidth={1}
                  radius={999}
                  size={18}
                  containerSize={35}
                />
              </Link>

              <Link>
                <SocialIcon
                  platform="youtube"
                  background="var(--elevated-color)"
                  borderColor="var(--border-color)"
                  borderWidth={1}
                  radius={999}
                  size={18}
                  containerSize={35}
                />
              </Link>
            </div>
          </div>
        </section>

        <section className="flex flex-col sm:flex-row flex-grow text-fluid-sm">
          <div className="flex sm:gap-16 flex-col sm:flex-row">
            <div className="border sm:border-0">
              <h3>Browse</h3>
              <ul className="hidden sm:flex flex-col gap-2">
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

            <div className="border sm:border-0">
              <h3>Help</h3>
              <ul className="hidden sm:flex flex-col gap-2">
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

            <div className="border sm:border-0">
              <h3>About</h3>
              <ul className="hidden sm:flex flex-col gap-2">
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

          <div className="download-section flex-grow items-end justify-start flex flex-col">
            <div className="flex flex-col gap-4">
              <div className="border sm:border-0">
                <h3>Download Our App</h3>
                <small className="hidden sm:flex">
                  Watch anywhere, anytime
                </small>
              </div>
              <div className="gap-2 hidden sm:flex">
                <button className="flex border rounded-md bg-canvas px-4 py-2 items-center text-primary">
                  <GooglePlayIcon size={60} radius={8} />
                  <div>
                    <small className="text-sm">get it on</small>
                    <p className="font-semibold text-lg">Google Play</p>
                  </div>
                </button>
                <button className="flex border rounded-md bg-canvas px-4 py-2 items-center text-primary">
                  <SocialIcon platform="appstore" size={30} />
                  <div>
                    <small className="text-sm">Download on the</small>
                    <p className="font-semibold text-lg">App Store</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>
      </article>
      <p className="border-top mt-4 p-6 text-fluid-sm ">
        © {new Date().getFullYear()} Ace Genesis. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
