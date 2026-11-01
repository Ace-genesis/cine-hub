import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import { supabase } from "../../lib/supabaseClient.js";
import { Bookmark } from "lucide-react";
import MovieCard from "../movieCard.jsx";
import MovieList from "../movielist.jsx";
import { Link } from "react-router-dom";
import { processData, getMovies } from "../../services/api.js";

function MyList() {
  const { myList, setMyList, isSignedIn, trendingMovies } =
    useContext(AppContext);
  const [error, setError] = useState("");

  console.log("trendingMovies MyList:", trendingMovies);

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

  const movieList = myList.map((item) => {
    return <MovieCard key={item.id} item={item} />;
  });

  return isSignedIn ? (
    <div className="popular-movies my-list">{movieList}</div>
  ) : (
    <main className="border rounded-md p-4">
      <h2>My List</h2>
      <section className="flex flex-col items-center justify-center gap-4 p-8 border rounded-md bg-surface">
        <div className="flex flex-col items-center gap-4">
          <Bookmark
            size={90}
            strokeWidth={1}
            className="border rounded-full bg-elevated p-4"
          />
          <div className="flex flex-col items-center gap-2">
            <h3>Your List is Empty</h3>
            <p>Add some movies to your list to see them here.</p>
          </div>
          <Link to={"/"} className="primary-btn">
            Browse Shows
          </Link>
        </div>
      </section>
      <MovieList category={trendingMovies} title={"Recommended for you"} />
    </main>
  );
}

export default MyList;
