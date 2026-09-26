import "../css/hero.css";
import "../css/responsive.css";
import { useState, useEffect } from "react";

function Hero({ processedMovies }) {
  const [movieDetails, setMovieDetails] = useState([]);

  useEffect(() => {
    getMovieDetails();
  }, [processedMovies]);

  if (!processedMovies.length) {
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

  async function getMovieDetails() {
    try {
      const url = new URL(
        `https://api.themoviedb.org/3/movie/${processedMovies[0].id}`,
      );

      url.searchParams.set("api_key", import.meta.env.VITE_TMDB_API_KEY);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      setMovieDetails(
        data.genres.map((item) => {
          return (
            <li className="detail-list" key={item.id}>
              {item.name}
            </li>
          );
        }),
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${processedMovies[0].url})` }}
    >
      <article className="hero-content">
        <p className="trending">#1 Trending</p>
        <h2 className="hero-title">{processedMovies[0].title}</h2>
        <section className="movie-info">
          {processedMovies[0].releaseDate.split("-")[0]}
          <ul className="movie-genre">{movieDetails}</ul>
        </section>
        <section className="movie-overview">
          {processedMovies[0].overview}
        </section>
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
