import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Hero from "../hero";

function Details() {
  const { showType, id } = useParams();
  const { getMovies } = useContext(AppContext);
  const [showDetails, setShowDetails] = useState(null);

  console.log("Show Type:", showType);
  console.log("ID:", id);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await getMovies(`${showType}/${id}`);

        setShowDetails(details);
        console.log(details);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchDetails();
  }, []);

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

  function formatRuntime(runtime) {
    if (typeof runtime !== "number" || !Number.isFinite(runtime)) {
      return "Runtime unavailable";
    }
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    return `${hours}h ${minutes}m`;
  }

  console.log("Movie runtime:", showDetails?.runtime);
  console.log("Episode runtime:", showDetails?.episode_run_time);
  console.log(
    "Selected runtime:",
    showDetails?.runtime || showDetails?.episode_run_time?.[0],
  );

  return (
    <>
      <Hero
        image={`https://image.tmdb.org/t/p/w1280/${showDetails?.backdrop_path}`}
        title={showDetails?.title || showDetails?.name}
        year={
          showDetails?.release_date?.split("-")[0] ||
          showDetails?.first_air_date?.split("-")[0]
        }
        runtime={formatRuntime(
          showDetails?.runtime || showDetails?.episode_run_time?.[0],
        )}
        overview={showDetails?.overview}
      />
    </>
  );
}

export default Details;
