import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { SocialIcon, GooglePlayIcon } from "../socialIcons";

function Footer() {
  const Icons = [
    { id: "https://web.facebook.com/Okpalo/", platform: "facebook" },
    {
      platform: "x",
    },
    { id: "https://www.instagram.com/acecodex.dev/", platform: "instagram" },
    {
      platform: "youtube",
    },
  ];
  return (
    <footer className="mt-4 px-4 sm:py-4 border-t border-t-border overflow-hidden text-primary">
      <article className="flex gap-4">
        <section className="py-5 ">
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <Link to={"/"}>
              <h2 className="text-2xl sm:text-xl font-bold">
                Cine<span className="text-brand">Hub</span>
              </h2>
            </Link>
            <div className="flex gap-2 items-center">
              {Icons.map((item) => (
                <a href={item.id} target="_blank" rel="noopener noreferrer">
                  <SocialIcon
                    platform={item.platform}
                    background="var(--color-elevated)"
                    borderColor="var(--color-border)"
                    borderWidth={1}
                    radius={999}
                    size={10}
                    containerSize={20}
                  />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="flex flex-col sm:flex-row flex-1">
          <div className="flex  flex-col sm:flex-row text-sm sm:text-[9px] sm:gap-5">
            <div className="border border-border sm:border-0 flex flex-col gap-2 py-1 px-2 sm:p-0">
              <h3 className="font-bold">Browse</h3>
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

            <div className="border border-border sm:border-0 flex flex-col gap-2 py-1 px-2 sm:p-0">
              <h3 className="font-bold">Help</h3>
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

            <div className="border border-border sm:border-0 flex flex-col gap-2 py-1 px-2 sm:p-0">
              <h3 className="font-bold">About</h3>
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

          <div className="grow sm:items-end justify-start flex flex-col">
            <div className="flex flex-col gap-2">
              <div className="border border-border sm:border-0">
                <h3 className="font-bold text-sm sm:text-base py-1 px-2 sm:p-0">
                  Download Our App
                </h3>
                <small className="hidden sm:flex text-secondary">
                  Watch anywhere, anytime
                </small>
              </div>
              <div className="gap-2 hidden sm:flex">
                <button className="flex px-3  border border-border rounded-md bg-canvasitems-center text-primary">
                  <GooglePlayIcon size={50} />
                  <div className="flex flex-col">
                    <small className="text-[10px] text-secondary">
                      get it on
                    </small>
                    <p className="font-semibold text-sm">Google Play</p>
                  </div>
                </button>
                <button className="flex border border-border px-3 rounded-md bg-canvas items-center text-primary">
                  <SocialIcon platform="appstore" size={25} />
                  <div>
                    <small className="text-[8px] text-secondary">
                      Download on the
                    </small>
                    <p className="font-semibold text-sm">App Store</p>
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
