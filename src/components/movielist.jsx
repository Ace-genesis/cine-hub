import "../css/main.css";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

function MovieList({ category, title }) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const movieContainer = useRef(null);

  if (!category.length) {
    return (
      <article className="movie-card loading">
        <div className="card-image-container">
          <img src="null" alt="" className="card-image loading" />
        </div>
      </article>
    );
  }

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

  function findId(e) {
    console.log(e.currentTarget.id);
  }

  const movieList = category.map((item) => {
    return (
      <Link className="movie-card" key={item.id} to={"/details"}>
        <div className="card-image-container" id={item.id} onClick={findId}>
          <img src={item.url} alt={item.title} className="card-image " />
        </div>
      </Link>
    );
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
