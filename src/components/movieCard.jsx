import { useState } from "react";
import { Link } from "react-router-dom";

function MovieCard({ item }) {
  const [isCardLoading, setIsCardLoading] = useState(true);

  return (
    <Link className="movie-card" to={"/details"}>
      <div className="card-image-container" id={item.id}>
        {isCardLoading && <div className="card-skeleton" />}
        <img
          src={item.url}
          alt={item.title}
          className="card-image "
          onLoad={() => setIsCardLoading(false)}
        />
      </div>
    </Link>
  );
}

export default MovieCard;
