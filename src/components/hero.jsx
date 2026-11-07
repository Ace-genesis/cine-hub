import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Play, Plus } from "lucide-react";
import HeroLoading from "./loadingStates/heroLoading.jsx";

function Hero({ image, title, year, runtime, details, overview }) {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  return (
    <>
      {isLoading && <HeroLoading />}
      <section
        className={`relative rounded-md text-primary flex flex-col  min-h-[50dvh] sm:min-h-[70dvh]  mb-6 mt-2 ${isLoading ? "hidden" : ""}`}
      >
        <picture className="absolute inset-0 z-0 h-full w-full overflow-hidden rounded-md">
          <img
            src={image}
            alt={title}
            onLoad={() => setIsLoading(false)}
            onError={() => console.log("Image failed to load")}
            className="h-full w-full aspect-poster rounded-md object-cover"
          />
        </picture>
        <div
          className="absolute inset-0 z-[1] rounded-md"
          style={{
            background: `
      linear-gradient(
        to right,
        rgba(0,0,0,0.95) 0%,
        rgba(0,0,0,0.75) 20%,
        rgba(0,0,0,0.45) 45%,
        rgba(0,0,0,0.15) 70%,
        transparent 100%
      )
    `,
          }}
        />
        {/* Bottom gradient */}
        <div
          className="absolute inset-0 z-[2] rounded-md pointer-events-none"
          style={{
            background: `
      linear-gradient(
        to top,
        #020b11 0%,
        rgba(2,11,17,0.75) 12%,
        rgba(2,11,17,0.35) 30%,
        transparent 55%
      )
    `,
          }}
        />

        <p className="text-brand relative flex-1 px-4 z-[2]">#1 Trending</p>
        <article className="relative z-10 w-full md:w-80 p-4 flex flex-col gap-4">
          <h2 className="text-4xl md:text-6xl  ">{title}</h2>

          <section className="flex text-xs gap-2">
            <small className="text-secondary">{year}</small>
            <small>{runtime}</small>
            <small className="flex gap-2">{details}</small>
          </section>
          <section className="text-fluid-sm line-clamp-2">{overview}</section>
          <footer className="flex gap-4 ">
            <button
              className="btn-primary"
              onClick={() => navigate(`/details/${item.showType}/${item.id}`)}
            >
              <Play />
              Play Now
            </button>
            <button className="btn-secondary">
              <Plus /> My List
            </button>
          </footer>
        </article>
      </section>
    </>
  );
}

export default Hero;
