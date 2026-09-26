export async function getMovies(setProcessedMoies) {
  try {
    const url = new URL("https://api.themoviedb.org/3/trending/movie/day");
    url.searchParams.set("api_key", import.meta.env.VITE_TMDB_API_KEY);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    setProcessedMoies(
      data.results.map((item) => {
        return {
          id: item.id,
          title: item.title,
          overview: item.overview,
          url: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
          releaseDate: item.release_date,
        };
      }),
    );
    return data.results;
  } catch (error) {
    console.log(error);
  }
}
