export const getMovies = async (apiLink, params = {}) => {
  try {
    const url = buildUrl(apiLink, params);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

const buildUrl = (apiLink, params) => {
  const url = new URL(`https://api.themoviedb.org/3/${apiLink}`);

  url.searchParams.set("api_key", import.meta.env.VITE_TMDB_API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
};

export function processDetails(state) {
  return state.genres.map((item) => ({ id: item.id, genre: item.name }));
}

export function processData(state, defaultType) {
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

export const maxApiPages = 500;
