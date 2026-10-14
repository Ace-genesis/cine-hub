import "../css/main.css";
import { useState, useRef } from "react";
import MovieCard from "./movieCard.jsx";

function MovieList({ category, title }) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const movieContainer = useRef(null);

  function scroll(direction) {
    movieContainer.current.scrollBy({
      left:
        direction === "right"
          ? movieContainer.current.clientWidth
          : -movieContainer.current.clientWidth,
      behavior: "smooth",
    });
  }

  function handleScroll() {
    setCanScrollLeft(movieContainer.current.scrollLeft > 0);
    setCanScrollRight(
      movieContainer.current.scrollLeft <
        movieContainer.current.scrollWidth - movieContainer.current.clientWidth,
    );
  }

  const movieList = category.map((item) => {
    return <MovieCard key={item.id} item={item} />;
  });

  return (
    <section className="movies-section">
      <h2 className="section-title">{title}</h2>
      <div className="category-container">
        {canScrollLeft && (
          <button onClick={() => scroll("left")} className="scroll left">
            <i className="fa-solid fa-angle-left"></i>
          </button>
        )}

        <div
          className="popular-movies"
          ref={movieContainer}
          onScroll={handleScroll}
        >
          {movieList}
        </div>

        {canScrollRight && (
          <button onClick={() => scroll("right")} className="scroll right">
            <i className="fa-solid fa-angle-right"></i>
          </button>
        )}
      </div>
    </section>
  );
}

export default MovieList;
