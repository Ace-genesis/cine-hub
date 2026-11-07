import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import CardLoading from "./loadingStates/cardLoading";

function MovieCard({ item, style }) {
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
    <div className={`card relative ${style}`}>
      {isCardLoading && (
        <div className="absolute inset-0">
          <CardLoading />
        </div>
      )}
      <Link
        className={` block ${isCardLoading ? "invisible" : ""}`}
        onClick={() => navigate(`/details/${item.showType}/${item.id}`)}
      >
        <div className="aspect-2/3 w-full" id={item.id}>
          <img
            src={item.url}
            alt={item.title}
            className="aspect-2/3 rounded-md"
            onLoad={() => setIsCardLoading(false)}
            onError={() => setIsCardLoading(false)}
          />
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
