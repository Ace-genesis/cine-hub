import { useState } from "react";
import HeroLoading from "./loadingStates/heroLoading.jsx";

function Hero({ image, title, children }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <HeroLoading />}
      <section
        className={`relative rounded-md text-primary flex flex-col  min-h-[50dvh] sm:min-h-[60dvh]  mb-6 mt-2 ${isLoading ? "hidden" : ""}`}
      >
        <picture className="absolute inset-0 z-0 h-full w-full overflow-hidden rounded-md">
          <img
            src={image}
            alt={title}
            onLoad={() => setIsLoading(false)}
            onError={() => console.log("Image failed to load")}
            className="h-full w-full rounded-md object-cover object-top"
          />
        </picture>
        <div
          className="absolute inset-0 z-1 rounded-md"
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
          className="absolute inset-0 z-2 rounded-md pointer-events-none"
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

        {children}
      </section>
    </>
  );
}

export default Hero;
