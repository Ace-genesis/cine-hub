import { getMovies } from "../components/fetchMovies";
import Hero from "../components/hero";
import { useEffect, useState } from "react";
import MovieList from "../components/movielist";

function Homepage() {
  const [processedMovies, setProcessedMoies] = useState([]);

  useEffect(() => {
    getMovies(setProcessedMoies);
  }, []);
  return (
    <main>
      <Hero processedMovies={processedMovies} />
      <MovieList category={processedMovies} title={"Trending"} />
      <MovieList category={processedMovies} title={"Popular Movies"} />
      <MovieList category={processedMovies} title={"Popular TV Shows"} />
    </main>
  );
}

export default Homepage;
