import "../css/main.css";

function MovieList({ category, title }) {
  if (!category.length) {
    return (
      <article className="movie-card loading">
        <div className="card-image-container">
          <img src="null" alt="" className="card-image loading" />
        </div>
      </article>
    );
  }

  const movieList = category.map((item) => {
    return (
      <article className="movie-card" key={item.id}>
        <div className="card-image-container">
          <img src={item.url} alt={item.title} className="card-image " />
        </div>
      </article>
    );
  });

  return (
    <section className="popular-movies-section">
      <h2 className="section-title">{title}</h2>
      <div className="popular-movies">{movieList}</div>
    </section>
  );
}

export default MovieList;
