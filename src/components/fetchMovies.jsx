export async function getMovies(apiLink, params = {}) {
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
}

export function buildUrl(apiLink, params) {
  const url = new URL(`https://api.themoviedb.org/3/${apiLink}`);

  url.searchParams.set("api_key", import.meta.env.VITE_TMDB_API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
}
