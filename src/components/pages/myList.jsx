import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import { supabase } from "../../lib/supabaseClient.js";
import MovieCard from "../movieCard.jsx";

function MyList() {
  const { myList, setMyList, getMovies, isSignedIn } = useContext(AppContext);
  const [error, setError] = useState("");

  useEffect(() => {
    const retrieveMyList = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          throw new Error(userError?.message || "Please sign in first.");
        }

        const { data, error } = await supabase
          .from("movies_list")
          .select("*")
          .eq("user_id", user.id);

        if (error) {
          throw new Error(error.message);
        }

        const myMovies = await Promise.all(
          data.map(async (item) => {
            const movie = await getMovies(`${item.media_type}/${item.show_id}`);

            return { ...movie, media_type: item.media_type };
          }),
        );

        setMyList(processData(myMovies));
      } catch (error) {
        setError(error);
      }
    };

    retrieveMyList();
  }, []);

  function processData(state) {
    return state?.map((item) => {
      return {
        id: item.id,
        title: item.title || item.name,
        overview: item.overview,
        url: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
        releaseDate: item.release_date || item.first_air_date,
        showType: item.media_type,
      };
    });
  }

  const movieList = myList.map((item) => {
    return <MovieCard key={item.id} item={item} />;
  });

  return isSignedIn ? (
    movieList.length > 0 ? (
      <div className="popular-movies my-list">{movieList}</div>
    ) : (
      <div className="empty-library">
        <h2>My List</h2>
        <p>No movies in your list.</p>
      </div>
    )
  ) : (
    <div className="empty-library">
      <h2>My List</h2>
      <p>Please sign in to view your list.</p>
    </div>
  );
}

export default MyList;
