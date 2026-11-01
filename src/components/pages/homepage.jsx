import Hero from "../hero";
import { useEffect, useState, useContext } from "react";
import MovieList from "../movielist";
import { AppContext } from "../../context/AppContext";
import { Mail } from "lucide-react";
import { getMovies, processData, processDetails } from "../../services/api.js";

function Homepage() {
  const {
    popularMovies,
    setPopularMovies,
    trendingMovies,
    setTrendingMovies,
    popularTv,
    setPopularTv,
    adultAnimation,
    setAdultAnimation,
    anime,
    setAnime,
    nollywood,
    setNollywood,
    apiUrls,
  } = useContext(AppContext);

  const [movieDetails, setMovieDetails] = useState([]);

  useEffect(() => {
    async function getAdultAnimatedShows() {
      const adultShows = [];
      let page = 1;

      while (adultShows.length < 20) {
        const data = await getMovies(apiUrls.discoverTv, {
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
      const popular = await getMovies(apiUrls.popularMovies, {
        page: 1,
      });
      const trending = await getMovies(apiUrls.trendingMovies, {
        page: 1,
      });
      const tv = await getMovies(apiUrls.popularTv, {
        page: 1,
      });
      const nolly = await getMovies(apiUrls.discoverMovies, {
        page: 1,
        with_origin_country: "NG",
        sort_by: "popularity.desc",
      });
      const japan = await getMovies(apiUrls.discoverTv, {
        page: 1,
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

      setMovieDetails(
        processDetails(details).map((item) => {
          return (
            <li className="detail-list" key={item.id}>
              {item.genre}
            </li>
          );
        }),
      );
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

  console.log("trendingMovies:", trendingMovies);

  return (
    <>
      <main className="p-sm-fluid overflow-y-hidden border rounded-md ">
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
      <article className="sm:flex bg-surface border rounded-md items-center p-6 mt-6 mb-6">
        <div className="subscribe-content flex-grow ">
          <h3 className="text-fluid-sm">Never Miss a Movie</h3>
          <p className="hidden sm:flex text-fluid-sm">
            Get the latest updates on new release, trending titles and more.
          </p>
        </div>
        <form className="subscribe-form flex gap-2">
          <div className="border rounded-md bg-elevated items-center p-2 gap-2 max-w-500 w-full flex">
            <Mail />
            <input
              type="text"
              className="bg-transparent border-0 text-primary w-full"
              placeholder="Enter your email address"
            />
          </div>
          <button className="primary-btn">Subscribe</button>
        </form>
      </article>
    </>
  );
}

export default Homepage;
