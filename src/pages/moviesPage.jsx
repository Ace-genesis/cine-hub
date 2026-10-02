import { getMovies } from "../components/fetchMovies";
import { useEffect, useState } from "react";
import MovieList from "../components/movielist";

function Movies() {
  const [nowPlaying, setNowPlaying] = useState([]);

  useEffect(() => {
    async function fetchRawData() {
      const playing = await getMovies("movie/now_playing", { page: 1 });

      console.log(playing.results);

      setNowPlaying(processData(playing));
    }
    fetchRawData();
  }, []);

  function processData(data) {
    return data.results.map((item) => {
      return {
        id: item.id,
        title: item.title,
        url: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
      };
    });
  }

  return (
    <>
      <MovieList category={nowPlaying} title={"Now Playing"} />
    </>
  );
}

export default Movies;
