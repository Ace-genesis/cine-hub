import "../css/hero.css";
import { useState, useEffect } from "react";
import { getMovies } from "./fetchMovies";

function Hero({ image, title, year, runtime, details, overview }) {
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
