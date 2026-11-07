import { useParams, Link, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { getMovies, processDetails, processData } from "../../services/api.js";
import Hero from "../hero";
import CardLoading from "../loadingStates/cardLoading";
import { Play, Plus, Dot } from "lucide-react";
import HeroLoading from "../loadingStates/heroLoading.jsx";
import MovieCard from "../movieCard.jsx";
import MovieList from "../movielist.jsx";

function Details() {
  const { showType, id } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCardLoading, setIsCardLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showCast, setShowCast] = useState([]);
  const [showTrailer, setShowTrailer] = useState(null);

  const activeTab = searchParams.get("tab") || "Overview";

  const tabs = ["Overview", "Trailer", "Cast", "Similar"];

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const fetchDetails = async () => {
      try {
        const details = await getMovies(`${showType}/${id}`, {
          append_to_response: "credits,videos",
        });

        console.log("details: ", details);
        if (!details) throw new Error();
        setGenres(processDetails(details));
        const trailer = details.videos.results.find((item) => {
          return (
            item.site === "YouTube" &&
            item.type === "Trailer" &&
            item.name === "Official Trailer"
          );
        });

        if (trailer) {
          setShowTrailer(`https://www.youtube.com/embed/${trailer.key}`);
        }
        console.log("ShowTrailer: ", trailer);
        setShowCast(details.credits.cast);
        setShowDetails(details);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [showType, id]);

  if (isLoading) {
    return <HeroLoading />;
  }

  return (
    <main
      className={`relative justify-end border border-border rounded-md hero flex flex-col p-md-fluid text-primary mb-6 mt-2 gap-4 ${isLoading ? "hidden" : ""}`}
    >
      <Hero
        image={`https://image.tmdb.org/t/p/w1280/${
          showDetails?.backdrop_path || showDetails?.poster_path
        }`}
        title={showDetails?.title || showDetails?.name}
      >
        <article className="flex flex-col md:flex-row relative z-10 items-end justify-end flex-1 gap-4 px-4">
          <picture className="hidden md:flex rounded-md ">
            <img
              className="rounded-md "
              src={`https://image.tmdb.org/t/p/w500/${showDetails?.poster_path}`}
              alt={showDetails?.title || showDetails?.name}
            />
          </picture>
          <section className="flex flex-col gap-2">
            <h2 className="text-2xl md:text-3xl ">
              {showDetails?.title || showDetails?.name}
            </h2>
            <div className="flex items-center gap-2">
              <small className="text-[12px]">
                {showDetails?.release_date?.split("-")[0] ||
                  showDetails?.first_air_date?.split("-")[0]}
              </small>

              <ul className="flex gap-2 text-[12px]">
                {genres.map((item) => (
                  <li className="flex items-center" key={item.id}>
                    <Dot />
                    {item.genre}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-4">
              <button className="btn-primary text-sm gap-1">
                <Play className="w-4 h-4" />
                Play Now
              </button>
              <button className="btn-secondary text-sm gap-1">
                <Plus className="w-4 h-4" />
                My List
              </button>
            </div>
            <p className="text-xs sm:text-sm md:text-base">
              {showDetails?.overview}
            </p>
          </section>
        </article>
      </Hero>
      <section className="bg-surface flex border-b border-border">
        {tabs.map((item) => (
          <Link
            onClick={() => setSearchParams({ tab: item })}
            className={`flex-1 py-3 flex text-sm items-center justify-center ${activeTab === item ? "border-b-brand border-b-3" : "border-b-0"}`}
          >
            {item}
          </Link>
        ))}
      </section>
      {activeTab === "Overview" && showDetails?.overview}
      {activeTab === "Trailer" && (
        <iframe
          src={showTrailer}
          title={`${showType} Trailer`}
          allowFullScreen
          className="w-full aspect-video rounded-lg"
        />
      )}
      {activeTab === "Cast" && (
        <MovieList category={showCast} children={<p>{showCast.name}</p>} />
      )}
    </main>
  );
}

export default Details;
