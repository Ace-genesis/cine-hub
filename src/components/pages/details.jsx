import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { getMovies, processDetails, processData } from "../../services/api.js";
import Hero from "../hero";
import CardLoading from "../loadingStates/cardLoading";
import { Play, Plus } from "lucide-react";

function Details() {
  const { showType, id } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCardLoading, setIsCardLoading] = useState(true);

  console.log("Show Type:", showType);
  console.log("ID:", id);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await getMovies(`${showType}/${id}`);

        setGenres(details.genres.map((item) => <li>{item.name}</li>));
        setShowDetails(details);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchDetails();
  }, [showType, id]);

  console.log("Show Details:", showDetails);
  console.log("Show Details Genres:", showDetails?.genres);

  function processDetails(state) {
    return state.genres.map((item) => {
      return (
        <li className="detail-list" key={item.id}>
          {item.name}
        </li>
      );
    });
  }

  /*function formatRuntime(runtime) {
    if (typeof runtime !== "number" || !Number.isFinite(runtime)) {
      return "Runtime unavailable";
    }
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    return `${hours}h ${minutes}m`;
  }*/

  return (
    <main
      className={`relative justify-end border rounded-md hero flex flex-col border p-md-fluid mb-6 mt-2 ${isLoading ? "hidden" : ""}`}
    >
      <picture className="absolute inset-0 z-0 h-full w-full overflow-hidden rounded-md">
        <img
          src={`https://image.tmdb.org/t/p/w1280/${showDetails?.backdrop_path}`}
          alt={showDetails?.title || showDetails?.name}
          onLoad={() => setIsLoading(false)}
          onError={() => console.log("Image failed to load")}
          className="h-full w-full aspect-poster rounded-md"
        />
      </picture>
      {/*<Hero
        image={`https://image.tmdb.org/t/p/w500/${showDetails?.poster_path}`}
        title={showDetails?.title || showDetails?.name}
        year={
          showDetails?.release_date?.split("-")[0] ||
          showDetails?.first_air_date?.split("-")[0]
        }
        details={genres}
        overview={showDetails?.overview}
      />*/}
      <article className="flex items-end rounded-md gap-4 h-50">
        <picture className="border rounded-md max-w-180 w-full h-full">
          <img
            className="rounded-md w-full h-full"
            src={`https://image.tmdb.org/t/p/w500/${showDetails?.poster_path}`}
            alt={showDetails?.title || showDetails?.name}
          />
        </picture>
        <section className="flex flex-col gap-2 h-full">
          <h2>{showDetails?.title || showDetails?.name}</h2>
          <div className="flex gap-2">
            <small className="text-fluid-sm">
              {showDetails?.release_date?.split("-")[0] ||
                showDetails?.first_air_date?.split("-")[0]}
            </small>

            <small className="flex gap-2 text-fluid-sm">{genres}</small>
          </div>
          <div className="flex gap-4">
            <button className="primary-btn">
              <Play />
              Play Now
            </button>
            <button className="secondary-btn">
              <Plus />
              My List
            </button>
          </div>
          <p className="text-fluid-sm ">{showDetails?.overview}</p>
        </section>
      </article>
    </main>
  );
}

export default Details;
