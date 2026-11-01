import {
  getMovies,
  processData,
  maxApiPages,
  processDetails,
} from "../../services/api.js";
import { useEffect, useState, useContext, useRef } from "react";
import { AppContext } from "../../context/AppContext";
import MovieList from "../movielist";
import MovieCard from "../movieCard";
import { useSearchParams } from "react-router-dom";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

function Movies() {
  const [allMovies, setAllMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [movieGenres, setMovieGenres] = useState([]);
  const { apiUrls } = useContext(AppContext);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const movieContainer = useRef(null);
  const { scroll, handleScroll } = useContext(AppContext);

  const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);
  const genre = searchParams.get("genre");

  const [pageInput, setPageInput] = useState("");

  useEffect(() => {
    async function fetchRawData() {
      const allMoviesList = await getMovies(apiUrls.discoverMovies, {
        page: currentPage,
        sort_by: "popularity.desc",
        with_genres: genre || undefined,
      });

      setAllMovies(processData(allMoviesList.results, "movie"));
      setTotalPages(Math.min(allMoviesList.total_pages, maxApiPages));
    }
    fetchRawData();
  }, [currentPage, genre]);

  useEffect(() => {
    async function fetchGenres() {
      const fetchedGenres = await getMovies("genre/movie/list");
      setMovieGenres(processDetails(fetchedGenres));
    }

    fetchGenres();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage, genre]);

  console.log("allMovies:", allMovies);

  return (
    <main className="border rounded-md">
      <section className="bg-transparent  flex flex-col  relative py-2">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left", movieContainer)}
            className="absolute left-0 top-50 flex items-center justify-center bg-transparent border-0 hidden sm:flex"
          >
            <CircleArrowLeft
              size={30}
              color="var(--primary-text-color)"
              fill="var(--canvas-color)"
              strokeWidth={1}
              className="opacity-50 "
            />
          </button>
        )}
        <ul
          className="flex overflow-x-auto gap-4  list-none  container"
          ref={movieContainer}
          onScroll={() =>
            handleScroll(movieContainer, setCanScrollLeft, setCanScrollRight)
          }
        >
          <li className="cursor-pointer flex items-center justify-center px-4 text-xs">
            All
          </li>
          {movieGenres.map((item) => {
            return (
              <li
                className="cursor-pointer flex items-center justify-center px-2 text-xs snap"
                key={item.id}
                onClick={() => {
                  setSearchParams({
                    genre: String(item.id),
                    page: "1",
                  });
                }}
              >
                {item.genre}
              </li>
            );
          })}
        </ul>
        {canScrollRight && (
          <button
            onClick={() => scroll("right", movieContainer)}
            className="absolute right-0 top-50 flex items-center justify-center bg-transparent border-0 hidden sm:flex"
          >
            <CircleArrowRight
              size={30}
              color="var(--primary-text-color)"
              fill="var(--canvas-color)"
              strokeWidth={1}
              className="opacity-50 "
            />
          </button>
        )}
      </section>

      <div className="flex flex-col justify-center items-center gap-4 p-4">
        <div className="flex justify-center items-center gap-4 p-4">
          <button
            className={`${currentPage === 1 ? "hidden" : "primary-btn"}`}
            onClick={() => {
              if (currentPage > 1) {
                setSearchParams({
                  page: String(currentPage - 1),
                  genre: genre || undefined,
                });
              }
            }}
          >
            Prev
          </button>
          <p>
            {currentPage} of {totalPages}
          </p>
          <button
            className={`${currentPage === totalPages ? "hidden" : "primary-btn"}`}
            onClick={() => {
              if (currentPage < totalPages) {
                setSearchParams({
                  page: String(currentPage + 1),
                  genre: genre || undefined,
                });
              }
            }}
          >
            Next
          </button>
        </div>

        <form
          className="flex justify-center items-center gap-4 p-4 "
          onSubmit={(e) => {
            e.preventDefault();
            console.log("pageNumber:", pageInput);
            setSearchParams({
              page: String(pageInput),
              genre: genre || undefined,
            });
          }}
        >
          <input
            type="number"
            min="1"
            max={totalPages}
            className="bg-elevated rounded-md border-0 p-2 text-primary w-20"
            value={pageInput}
            onChange={(e) => {
              setPageInput(e.target.value);
            }}
          />
          <button className="primary-btn">Jump to</button>
        </form>
      </div>

      <div className="grid grid-cols-4 gap-4 p-4">
        {allMovies.map((item) => (
          <MovieCard key={item.id} item={item} />
        ))}
      </div>

      <div className="flex flex-col justify-center items-center gap-4 p-4">
        <div className="flex justify-center items-center gap-4 p-4">
          <button
            className={`${currentPage === 1 ? "hidden" : "primary-btn"}`}
            onClick={() => {
              if (currentPage > 1) {
                setSearchParams({
                  page: String(currentPage - 1),
                  genre: genre || undefined,
                });
              }
            }}
          >
            Prev
          </button>
          <p>
            {currentPage} of {totalPages}
          </p>
          <button
            className={`${currentPage === totalPages ? "hidden" : "primary-btn"}`}
            onClick={() => {
              if (currentPage < totalPages) {
                setSearchParams({
                  page: String(currentPage + 1),
                  genre: genre || undefined,
                });
              }
            }}
          >
            Next
          </button>
        </div>

        <form
          className="flex justify-center items-center gap-4 p-4 "
          onSubmit={(e) => {
            e.preventDefault();
            console.log("pageNumber:", pageInput);
            setSearchParams({
              page: String(pageInput),
              genre: genre || undefined,
            });
          }}
        >
          <input
            type="number"
            min="1"
            max={totalPages}
            className="bg-elevated rounded-md border-0 p-2 text-primary w-20"
            value={pageInput}
            onChange={(e) => {
              setPageInput(e.target.value);
            }}
          />
          <button className="primary-btn">Jump to</button>
        </form>
      </div>
    </main>
  );
}

export default Movies;
