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
    return <MovieCard key={item.id} item={item} />;
  });

  return (
    <section className="bg-surface p-sm-fluid flex flex-col gap-4 ">
      <h2 className="text-fluid-base border-left px-4">{title}</h2>
      <div className="flex relative ">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left", movieContainer)}
            className="absolute left-10 top-50 flex items-center justify-center bg-transparent border-0 hidden sm:flex"
          >
            <CircleArrowLeft
              size={50}
              color="var(--primary-text-color)"
              fill="var(--canvas-color)"
              strokeWidth={1}
              className="opacity-50 "
            />
          </button>
        )}

        <div
          className="flex gap-4 container"
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
            className="absolute right-10 top-50 flex items-center justify-center bg-transparent border-0 hidden sm:flex"
          >
            <CircleArrowRight
              size={50}
              color="var(--primary-text-color)"
              fill="var(--canvas-color)"
              strokeWidth={1}
              className="opacity-50 "
            />
          </button>
        )}
      </div>
    </section>
  );
}

export default MovieList;
