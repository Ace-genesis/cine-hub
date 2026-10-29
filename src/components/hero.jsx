import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Play } from "lucide-react";
import HeroLoading from "./loadingStates/heroLoading.jsx";

function Hero({ image, title, year, runtime, details, overview }) {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  return (
    <>
      {isLoading && <HeroLoading />}
      <section
        className={`relative rounded-md hero flex flex-col justify-end p-lg-fluid mb-6 mt-2 ${isLoading ? "hidden" : ""}`}
      >
        <picture className="absolute inset-0 z-0 h-full w-full overflow-hidden rounded-md">
          <img
            src={image}
            alt={title}
            onLoad={() => setIsLoading(false)}
            onError={() => console.log("Image failed to load")}
            className="h-full w-full aspect-poster rounded-md"
          />
        </picture>

        <p className="text-brand relative flex-grow">#1 Trending</p>
        <article className="relative z-10 sm:max-w-50 max-w-screen py-8 flex flex-col gap-4">
          <h2 className="text-fluid-lg leading-tight tracking tight">
            {title}
          </h2>

          <section className="flex text-fluid-sm gap-2">
            <p>{year}</p>
            <p>{runtime}</p>
            <ul className="flex gap-2">{details}</ul>
          </section>
          <section className="text-fluid-sm line-clamp-2">{overview}</section>
          <footer className="flex gap-4 mt-2">
            <button
              className="primary-btn"
              onClick={() => navigate(`/details/${item.showType}/${item.id}`)}
            >
              <Play />
              Play Now
            </button>
            <button className="secondary-btn">
              <span className="btn-span">+</span> My List
            </button>
          </footer>
        </article>
      </section>
    </>
  );
}

export default Hero;
