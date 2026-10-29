import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import CardLoading from "./loadingStates/cardLoading";

function MovieCard({ item }) {
  const [isCardLoading, setIsCardLoading] = useState(true);
  const { myList, setMyList, isSignedIn, getMovies } = useContext(AppContext);

  const location = useLocation();
  const navigate = useNavigate();

  const addToMyList = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isSignedIn) {
      navigate("/signin");
      return;
    }

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("movies_list")
        .insert({
          user_id: user.id,
          show_id: item.id,
          media_type: item.showType,
        })
        .select()
        .single();

      if (error) {
        console.error("Supabase error: ", error);
        return;
      }
      console.log("Saved movie:", data);
      setMyList((current) => [...current, data]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isCardLoading && <CardLoading />}
      <Link
        className={`card ${isCardLoading ? "hidden" : ""}`}
        onClick={() => navigate(`/details/${item.showType}/${item.id}`)}
      >
        <div className="aspect-poster w-full" id={item.id}>
          <img
            src={item.url}
            alt={item.title}
            className="card-image aspect-poster rounded-md"
            onLoad={() => setIsCardLoading(false)}
            onError={() => setIsCardLoading(false)}
          />
        </div>
      </Link>
    </>
  );
}

export default MovieCard;
