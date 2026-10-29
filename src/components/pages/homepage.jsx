import Hero from "../hero";
import { useEffect, useState, useContext } from "react";
import MovieList from "../movielist";
import { AppContext } from "../../context/AppContext";

function Homepage() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);
  const [adultAnimation, setAdultAnimation] = useState([]);
  const [anime, setAnime] = useState([]);
  const [nollywood, setNollywood] = useState([]);
  const { getMovies } = useContext(AppContext);

  const apiUrls = [
    "movie/popular",
    "trending/all/day",
    "tv/popular",
    "discover/movie",
    "discover/tv",
  ];

  const [
    popularMoviesUrl,
    trendingMoviesUrl,
    popularTvUrl,
    nollyMovies,
    animeUrl,
  ] = apiUrls;

  /*
  fetching adult animation
   */
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

      const uniqueShows = [
        ...new Map(adultShows.map((show) => [show.id, show])).values(),
      ];

      setAdultAnimation(processData(uniqueShows.slice(0, 20), "tv"));
    }

    getAdultAnimatedShows();
  }, []);

  /*
  fetching movie categories
   */
  useEffect(() => {
    async function fetchRawData() {
      const popular = await getMovies(popularMoviesUrl, {
        page: 1,
      });
      const trending = await getMovies(trendingMoviesUrl, {
        page: 1,
      });
      const tv = await getMovies(popularTvUrl, {
        page: 1,
      });
      const nolly = await getMovies(nollyMovies, {
        page: 1,
        with_origin_country: "NG",
        sort_by: "popularity.desc",
      });
      const japan = await getMovies(animeUrl, {
        with_origin_country: "JP",
        with_origin_language: "ja",
        with_genres: 16,
        sort_by: "popularity.desc",
      });

      setPopularMovies(processData(popular.results, "movie"));
      setTrendingMovies(processData(trending.results, "movie"));
      setPopularTv(processData(tv.results, "tv"));
      setNollywood(processData(nolly.results, "movie"));
      setAnime(processData(japan.results, "tv"));
    }

    fetchRawData();
  }, []);

  /*Fetch show details */
  useEffect(() => {
    if (!popularMovies.length) {
      return;
    }
    async function fetchRawData() {
      const details = await getMovies(
        trendingMovies[0].showType === "tv"
          ? `tv/${trendingMovies[0]?.id}`
          : `movie/${trendingMovies[0]?.id}`,
      );

      setMovieDetails(processDetails(details));
    }

    fetchRawData();
  }, [popularMovies]);

  if (!popularMovies.length) {
    return (
      <>
        <main className="homepage">
          {Array.from({ length: 6 }, (_, index) => (
            <section className="movie-list-skeleton" key={index}>
              <div className="skeleton-heading"></div>

              <div className="skeleton-cards">
                {Array.from({ length: 6 }, (_, cardIndex) => (
                  <div className="skeleton-poster" key={cardIndex} />
                ))}
              </div>
            </section>
          ))}
        </main>
      </>
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

  function processData(state, defaultType) {
    return state?.map((item) => {
      return {
        id: item.id,
        title: item.title || item.name,
        overview: item.overview,
        url: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
        backdropUrl: `https://image.tmdb.org/t/p/w1280/${item.backdrop_path}`,
        releaseDate: item.release_date || item.first_air_date,
        showType: item.media_type || defaultType,
      };
    });
  }

  return (
    <>
      <main className="p-sm-fluid overflow-y-hidden">
        <Hero
          image={trendingMovies[0].backdropUrl}
          title={trendingMovies[0].title}
          year={trendingMovies[0].releaseDate.split("-")[0]}
          details={movieDetails}
          overview={trendingMovies[0].overview}
        />
        <MovieList category={trendingMovies} title={"Trending"} />
        <MovieList
          category={popularMovies}
          title={"Popular Movies"}
          showType={"movie"}
        />
        <MovieList category={popularTv} title={"Popular Series"} />
        <MovieList category={anime} title={"Anime"} />
        <MovieList category={adultAnimation} title={"Adult Animation"} />
        <MovieList category={nollywood} title={"Nollywood Movies"} />
      </main>
    </>
  );
}

export default Homepage;
