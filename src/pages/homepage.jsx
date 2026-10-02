import { getMovies } from "../components/fetchMovies";
import Hero from "../components/hero";
import { useEffect, useState } from "react";
import MovieList from "../components/movielist";

function Homepage() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);
  const [adultAnimation, setAdultAnimation] = useState([]);
  const [anime, setAnime] = useState([]);
  const [nollywood, setNollywood] = useState([]);
  const [runTime, setRunTime] = useState();

  const apiUrls = [
    "movie/popular",
    "trending/all/day",
    "tv/popular",
    `movie/${popularMovies[0]?.id}?append_to_response=release_dates`,
    "discover/movie",
    "discover/tv",
  ];

  const [
    popularMoviesUrl,
    trendingMoviesUrl,
    popularTvUrl,
    heroMovieDetails,
    nollyMovies,
    animeUrl,
  ] = apiUrls;

  useEffect(() => {
    async function getAdultAnimatedShows() {
      const adultShows = [];
      let page = 1;

      while (adultShows.length < 20) {
        const data = await getMovies("discover/tv", {
          page,
          with_genres: 16,
          sort_by: "popularity.desc",
          with_original_language: "en",
        });

        const ratingRequest = data.results.map((show) => {
          return getMovies(`tv/${show.id}/content_ratings`);
        });

        const results = await Promise.all(ratingRequest);

        results.forEach((ratingData, i) => {
          const show = data.results[i];

          const usRating = ratingData.results.find((rating) => {
            return rating.iso_3166_1 === "US";
          });

          if (usRating?.rating === "TV-14" || usRating?.rating === "TV-MA") {
            adultShows.push(show);
          }
        });

        page++;
      }
      setAdultAnimation(processData(adultShows.slice(0, 20)));
    }

    getAdultAnimatedShows();
  }, []);

  useEffect(() => {
    async function fetchRawData() {
      const popular = await getMovies(popularMoviesUrl, { page: 1 });
      const trending = await getMovies(trendingMoviesUrl, { page: 1 });
      const tv = await getMovies(popularTvUrl, { page: 1 });
      const nolly = await getMovies(nollyMovies, {
        page: 1,
        with_origin_country: "NG",
      });
      const japan = await getMovies(animeUrl, {
        with_origin_country: "JP",
        with_origin_language: "ja",
        with_genres: 16,
      });

      console.log(japan);

      setPopularMovies(processData(popular.results));
      setTrendingMovies(processData(trending.results));
      setPopularTv(processData(tv.results));
      setNollywood(processData(nolly.results));
      setAnime(processData(japan.results));
    }

    fetchRawData();
  }, []);

  useEffect(() => {
    if (!popularMovies.length) {
      return;
    }
    async function fetchRawData() {
      const details = await getMovies(heroMovieDetails);

      setRunTime(formatRuntime(details.runtime));
      setMovieDetails(processDetails(details));
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

  function processDetails(state) {
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
  }

  function processData(state) {
    return state?.map((item) => {
      return {
        id: item.id,
        title: item.title,
        overview: item.overview,
        url: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
        releaseDate: item.release_date,
      };
    });
  }

  return (
    <>
      <main>
        <Hero
          image={popularMovies[0].url}
          title={popularMovies[0].title}
          year={popularMovies[0].releaseDate.split("-")[0]}
          details={movieDetails}
          overview={popularMovies[0].overview}
          runtime={runTime}
        />
        <MovieList category={trendingMovies} title={"Trending"} />
        <MovieList category={popularMovies} title={"Popular Movies"} />
        <MovieList category={popularTv} title={"Popular Series"} />
        <MovieList category={anime} title={"Anime"} />
        <MovieList category={adultAnimation} title={"Adult Animation"} />
        <MovieList category={nollywood} title={"Nollywood Movies"} />
      </main>
    </>
  );
}

export default Homepage;
