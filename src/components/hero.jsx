import "../css/hero.css";
import { useState, useEffect } from "react";
import { getMovies } from "./fetchMovies";

function Hero({ image, title, year, runtime, details, overview }) {
  /*const [movieDetails, setMovieDetails] = useState([]);
  const [runTime, setRunTime] = useState();

  const apiUrl = `https://api.themoviedb.org/3/movie/${popularMovies[0]?.id}?append_to_response=release_dates`;

  useEffect(() => {
    if (!popularMovies.length) {
      return;
    }
    async function fetchRawData() {
      const detail = await getMovies(apiUrl, 1);

      setRunTime(formatRuntime(detail.runtime));
      setMovieDetails(processData(detail));
    }

    fetchRawData();
  }, [popularMovies]);

  if (!popularMovies.length) {
    return (
      <section className="hero skeleton loading">
        <article className="hero-content ">
          <p className="trending loading"></p>
          <h2 className="hero-title loading"></h2>
          <section className="movie-info loading">
            <p className="release-year loading"></p>
            <ul className="movie-genre loading"></ul>
          </section>
          <section className="movie-overview loading"></section>
          <footer className="cta ">
            <button className="primary-btn loading"></button>
            <button className="secondary-btn loading"></button>
          </footer>
        </article>
      </section>
    );
  }

  function processData(state) {
    return state.genres.map((item) => {
      return (
        <li className="detail-list" key={item.id}>
          {item.name}
        </li>
      );
    });
  }

  function formatRuntime(runtime) {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    return `${hours}h ${minutes}m`;
  }*/

  return (
    <section className="hero" style={{ backgroundImage: `url(${image})` }}>
      <article className="hero-content">
        <p className="trending">#1 Trending</p>

        <h2 className="hero-title">{title}</h2>

        <section className="movie-info">
          <p>{year}</p>
          <p>{runtime}</p>
          <ul className="movie-genre">{details}</ul>
        </section>
        <section className="movie-overview">{overview}</section>
        <footer className="cta">
          <button className="primary-btn">Play Now</button>
          <button className="secondary-btn">
            <span className="btn-span">+</span> My List
          </button>
        </footer>
      </article>
    </section>
  );
}

export default Hero;
