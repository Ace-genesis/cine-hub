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
import CardLoading from "../loadingStates/cardLoading.jsx";

function TvShows() {
  const [allTvShows, setAllTvShows] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [tvGenres, setTvGenres] = useState([]);
  const { apiUrls } = useContext(AppContext);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const tvContainer = useRef(null);
  const { scroll, handleScroll } = useContext(AppContext);

  const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);
  const genre = searchParams.get("genre") || undefined;

  const [pageInput, setPageInput] = useState("");
  const [isShowLoading, setIsShowLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsShowLoading(true);

    async function fetchRawData() {
      try {
        const allTvList = await getMovies(apiUrls.discoverTv, {
          page: currentPage,
          sort_by: "popularity.desc",
          with_genres: genre || undefined,
        });

        setAllTvShows(processData(allTvList.results, "tv"));
        setTotalPages(Math.min(allTvList.total_pages, maxApiPages));
      } catch (error) {
        setError(error.message);
        console.log(error.message);
      } finally {
        setIsShowLoading(false);
      }
    }
    fetchRawData();
  }, [currentPage, genre]);

  useEffect(() => {
    async function fetchGenres() {
      const fetchedGenres = await getMovies("genre/tv/list");
      setTvGenres(processDetails(fetchedGenres));
    }

    fetchGenres();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage, genre]);

  function updateSearchParam(page, genre) {
    const params = { page: String(page) };

    if (genre) {
      params.genre = genre;
    }

    setSearchParams(params);
  }

  if (isShowLoading) {
    return (
      <>
        <section className="bg-transparent  flex flex-col  relative py-2 ">
          {canScrollLeft && (
            <button
              onClick={() => scroll("left", tvContainer)}
              className="absolute -left-1 top-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center bg-transparent border-0 "
            >
              <CircleArrowLeft
                size={25}
                color="var(--color-primary)"
                fill="var(--color-canvas)"
                strokeWidth={1}
                className="opacity-60 "
              />
            </button>
          )}
          <ul
            className="flex overflow-x-auto gap-4  list-none scrollbar-none snap-x text-primary"
            ref={tvContainer}
            onScroll={() =>
              handleScroll(tvContainer, setCanScrollLeft, setCanScrollRight)
            }
          >
            <li
              className="cursor-pointer flex items-center justify-center px-4 text-xs"
              onClick={() => {
                setPageInput("");
                updateSearchParam(1);
              }}
            >
              All
            </li>
            {tvGenres.map((item) => {
              return (
                <li
                  className="cursor-pointer flex items-center justify-center px-2 text-xs snap"
                  key={item.id}
                  onClick={() => {
                    setPageInput("");
                    updateSearchParam(1, item.id);
                  }}
                >
                  {item.genre}
                </li>
              );
            })}
          </ul>
          {canScrollRight && (
            <button
              onClick={() => scroll("right", tvContainer)}
              className="absolute right-0 top-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center bg-transparent  "
            >
              <CircleArrowRight
                size={25}
                color="var(--color-primary)"
                fill="var(--color-canvas)"
                strokeWidth={1}
                className="opacity-60 "
              />
            </button>
          )}
        </section>
        <div className="flex flex-col justify-center items-center gap-4 p-4 text-primary">
          <div className="flex justify-center items-center gap-4 p-4">
            <button
              className={`${currentPage === 1 ? "hidden" : "btn-primary"}`}
              onClick={() => {
                if (currentPage > 1) {
                  updateSearchParam(currentPage - 1, genre);
                }
              }}
            >
              Prev
            </button>
            <p>
              {currentPage} of {totalPages}
            </p>
            <button
              className={`${currentPage === totalPages ? "hidden" : "btn-primary"}`}
              onClick={() => {
                if (currentPage < totalPages) {
                  updateSearchParam(currentPage + 1, genre);
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
              updateSearchParam(pageInput, genre);
              setPageInput("");
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
            <button className="btn-primary">Jump to</button>
          </form>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
          {Array.from({ length: 20 }, (_, index) => (
            <CardLoading key={index} style="grid-card" />
          ))}
        </div>
      </>
    );
  }

  return (
    <main className="border rounded-md">
      <section className="bg-transparent  flex flex-col  relative py-2 ">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left", tvContainer)}
            className="absolute -left-1 top-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center bg-transparent border-0 "
          >
            <CircleArrowLeft
              size={25}
              color="var(--color-primary)"
              fill="var(--color-canvas)"
              strokeWidth={1}
              className="opacity-60 "
            />
          </button>
        )}
        <ul
          className="flex overflow-x-auto gap-4  list-none  overflow-x-auto  scrollbar-none snap-x text-primary"
          ref={tvContainer}
          onScroll={() =>
            handleScroll(tvContainer, setCanScrollLeft, setCanScrollRight)
          }
        >
          <li
            className="cursor-pointer flex items-center justify-center px-4 text-xs"
            onClick={() => {
              setPageInput("");
              updateSearchParam(1);
            }}
          >
            All
          </li>
          {tvGenres.map((item) => {
            return (
              <li
                className="cursor-pointer flex items-center justify-center px-2 text-xs snap"
                key={item.id}
                onClick={() => {
                  setPageInput("");
                  updateSearchParam(1, item.id);
                }}
              >
                {item.genre}
              </li>
            );
          })}
        </ul>
        {canScrollRight && (
          <button
            onClick={() => scroll("right", tvContainer)}
            className="absolute right-0 top-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center bg-transparent  "
          >
            <CircleArrowRight
              size={25}
              color="var(--color-primary)"
              fill="var(--color-canvas)"
              strokeWidth={1}
              className="opacity-60 "
            />
          </button>
        )}
      </section>

      <div className="flex flex-col justify-center items-center gap-4 p-4 text-primary">
        <div className="flex justify-center items-center gap-4 p-4">
          <button
            className={`${currentPage === 1 ? "hidden" : "btn-primary"}`}
            onClick={() => {
              if (currentPage > 1) {
                updateSearchParam(currentPage - 1, genre);
              }
            }}
          >
            Prev
          </button>
          <p>
            {currentPage} of {totalPages}
          </p>
          <button
            className={`${currentPage === totalPages ? "hidden" : "btn-primary"}`}
            onClick={() => {
              if (currentPage < totalPages) {
                updateSearchParam(currentPage + 1, genre);
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
            updateSearchParam(pageInput, genre);
            setPageInput("");
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
          <button className="btn-primary">Jump to</button>
        </form>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
        {allTvShows.map((item) => (
          <MovieCard key={item.id} item={item} style="grid-card" />
        ))}
      </div>

      <div className="flex flex-col justify-center items-center gap-4 p-4 text-primary">
        <div className="flex justify-center items-center gap-4 p-4">
          <button
            className={`${currentPage === 1 ? "hidden" : "btn-primary"}`}
            onClick={() => {
              if (currentPage > 1) {
                updateSearchParam(currentPage - 1, genre);
              }
            }}
          >
            Prev
          </button>
          <p>
            {currentPage} of {totalPages}
          </p>
          <button
            className={`${currentPage === totalPages ? "hidden" : "btn-primary"}`}
            onClick={() => {
              if (currentPage < totalPages) {
                updateSearchParam(currentPage + 1, genre);
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
            updateSearchParam(pageInput, genre);
            setPageInput("");
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
          <button className="btn-primary">Jump to</button>
        </form>
      </div>
    </main>
  );
}

export default TvShows;
