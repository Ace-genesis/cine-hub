import { useState, useRef, useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import MovieCard from "./movieCard.jsx";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

function MovieList({ category, title }) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const movieContainer = useRef(null);
  const { scroll, handleScroll } = useContext(AppContext);

  const movieList = category.map((item) => {
    return (
      <MovieCard key={item.id} item={item} style="carousel-card">
        <div className={`flex flex-col ${item.character && "py-2"}`}>
          <p className="text-[0.8rem]">{item.name}</p>
          <p className="text-secondary text-xs">{item.character}</p>
        </div>
      </MovieCard>
    );
  });

  return (
    <section className="bg-surface text-primary flex flex-col gap-2">
      <h2 className="text-base font-bold sm:text-2xl border-l-2 border-l-brand px-4">
        {title}
      </h2>
      <div className="flex relative ">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left", movieContainer)}
            className="absolute -left-1 top-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center bg-transparent border-0 z-10"
          >
            <CircleArrowLeft
              size={50}
              color="var(--color-primary)"
              fill="var(--color-canvas)"
              strokeWidth={1}
              className="opacity-60 "
            />
          </button>
        )}

        <div
          className="flex gap-4 overflow-x-auto  scrollbar-none snap-x  "
          ref={movieContainer}
          onScroll={() =>
            handleScroll(movieContainer, setCanScrollLeft, setCanScrollRight)
          }
        >
          {movieList}
        </div>

        {canScrollRight && (
          <button
            onClick={() => scroll("right", movieContainer)}
            className="absolute right-0 top-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center bg-transparent  "
          >
            <CircleArrowRight
              size={50}
              color="var(--color-primary)"
              fill="var(--color-canvas)"
              strokeWidth={1}
              className="opacity-60 "
            />
          </button>
        )}
      </div>
    </section>
  );
}

export default MovieList;
