import Hero from "../hero";
import { useEffect, useState, useContext } from "react";
import MovieList from "../movielist";
import { AppContext } from "../../context/AppContext";
import { Mail, Dot } from "lucide-react";
import { getMovies, processData, processDetails } from "../../services/api.js";
import CardLoading from "../loadingStates/cardLoading.jsx";
import HeroLoading from "../loadingStates/heroLoading.jsx";

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
  const [error, setError] = useState(null);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [isAdultAnimationLoading, setIsAdultAnimationLoading] = useState(true);
  const [isHeroDetailsLoading, setIsHeroDetailsLoading] = useState(true);

  const isHomepageLoading = isCategoriesLoading || isAdultAnimationLoading;

  useEffect(() => {
    async function getAdultAnimatedShows() {
      setIsAdultAnimationLoading(true);

      const adultShows = [];
      let page = 1;
      let totalPages = 1;

      try {
        while (adultShows.length < 20 && page <= totalPages) {
          const data = await getMovies(apiUrls.discoverTv, {
            page,
            with_genres: 16,
            sort_by: "popularity.desc",
            with_original_language: "en",
          });

          if (!data?.results?.length) break;

          totalPages = data.total_pages ?? page;

          const ratingRequest = data.results.map((show) =>
            getMovies(`tv/${show.id}/content_ratings`),
          );

          const results = await Promise.all(ratingRequest);

          results.forEach((ratingData, i) => {
            if (!ratingData?.results) return;

            const show = data.results[i];

            const usRating = ratingData.results.find(
              (rating) => rating.iso_3166_1 === "US",
            );

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
      } catch (error) {
        setError(error.message);
      } finally {
        setIsAdultAnimationLoading(false);
      }
    }

    getAdultAnimatedShows();
  }, []);

  /*
    fetching movie categories
     */
  useEffect(() => {
    async function fetchRawData() {
      try {
        setIsCategoriesLoading(true);
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

        if (!popular || !trending || !tv || !nolly || !japan) throw new Error();

        setPopularMovies(processData(popular.results, "movie"));
        setTrendingMovies(processData(trending.results, "movie"));
        setPopularTv(processData(tv.results, "tv"));
        setNollywood(processData(nolly.results, "movie"));
        setAnime(processData(japan.results, "tv"));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsCategoriesLoading(false);
      }
    }

    fetchRawData();
  }, []);

  /*Fetch show details */
  useEffect(() => {
    if (!trendingMovies.length) {
      return;
    }
    async function fetchRawData() {
      try {
        setIsHeroDetailsLoading(true);
        const details = await getMovies(
          trendingMovies[0].showType === "tv"
            ? `tv/${trendingMovies[0]?.id}`
            : `movie/${trendingMovies[0]?.id}`,
        );

        if (!details) throw new Error();

        setMovieDetails(
          processDetails(details).map((item) => {
            return (
              <li className="flex items-center text-secondary" key={item.id}>
                <Dot size={15} />
                {item.genre}
              </li>
            );
          }),
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setIsHeroDetailsLoading(false);
      }
    }

    fetchRawData();
  }, [popularMovies]);

  if (isHomepageLoading) {
    return (
      <>
        <HeroLoading />
        <main className="bg-surface text-primary flex flex-col gap-6 ">
          {Array.from({ length: 6 }, (_, index) => (
            <section key={index} className="px-4 ">
              {/* Skeleton heading */}
              <div className="h-6 w-40 bg-elevated rounded-md loading mb-4" />

              {/* Skeleton posters */}
              <div className="flex gap-4 overflow-x-hidden ">
                {Array.from({ length: 4 }, (_, cardIndex) => (
                  <CardLoading
                    key={cardIndex}
                    style="w-[clamp(100px,17vw,400px)]"
                  />
                ))}
              </div>
            </section>
          ))}
        </main>
      </>
    );
  }

  return (
    <>
      <main className="rounded-md flex flex-col gap-4 ">
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
      <article className="sm:flex bg-surface border border-border rounded-md flex flex-col justify-start items-start gap-2  py-3 px-4 mt-6 mb-6 text-primary sm:items-center sm:flex-row">
        <div className="subscribe-content flex-1 flex flex-col gap-2">
          <h3 className="text-base font-bold">Never Miss a Movie</h3>
          <small className="hidden sm:flex text-[10px]">
            Get the latest updates on new release, trending titles and more.
          </small>
        </div>
        <form className="subscribe-form flex gap-2">
          <div className="border border-border rounded-md bg-elevated items-center p-2 gap-2 max-w-500 w-full flex">
            <Mail className="text-secondary" />
            <input
              type="text"
              className="bg-transparent border-0 text-primary w-full"
              placeholder="Enter your email address"
            />
          </div>
          <button className="btn-primary">Subscribe</button>
        </form>
      </article>
    </>
  );
}

export default Homepage;
