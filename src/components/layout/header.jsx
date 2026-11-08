import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { supabase } from "../../lib/supabaseClient";
import { Search, Bell, CircleUserRound, Menu, Dot, Play } from "lucide-react";
import { getMovies, processData } from "../../services/api";

function Header() {
  const { searchOutput, setSearchOutput } = useContext(AppContext);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSearchResults() {
      const result = await getMovies("search/multi", { query: searchInput });
      setSearchOutput(processData(result.results));
    }

    fetchSearchResults();
  }, [searchInput]);

  function SearchItem({ item }) {
    return (
      <Link
        to={`/details/${item.showType}/${item.id}`}
        onClick={() => setSearchInput("")}
        className="flex gap-2 items-center justify-start item rounded-md p-2 hover:bg-surface"
      >
        <picture className="w-20  rounded-md ">
          <img src={item.url} alt={item.title} className="rounded-md w-full" />
        </picture>

        <div>
          <h2 className="text-base">{item.title}</h2>

          <small className="text-sm text-secondary flex gap-1 px-1 items-center">
            <p>{item.releaseDate?.split("-")[0]}</p>
            <Dot size={10} />
            <p className="relative">{item.showType}</p>
          </small>
        </div>
      </Link>
    );
  }

  function SearchModal() {
    return (
      <section
        className="bg-elevated w-full h-[80dvh] absolute top-12 p-2 rounded-md overflow-y-auto flex flex-col gap-2

        scrollbar-thin scrollbar-thumb-[#344454]
        scrollbar-track-transparent
      
      max-sm:scrollbar-none"
      >
        {searchOutput.map((item) => {
          return <SearchItem key={item.id} item={item} />;
        })}
      </section>
    );
  }

  return (
    <>
      <header className="flex p-md-fluid items-center justify-between bg-canvas sticky top-0 z-50 text-primary py-4 px-3 ">
        <Link to={"/"} className="md:hidden flex gap-2">
          <Play fill="var(--color-brand)" color="var(--color-brand)" />
          <h1 className="text-xl font-bold">
            Cine<span className="text-brand">Hub</span>
          </h1>
        </Link>

        <div className="max-w-700 relative -right-12 md:right-auto md:w-full sm:px-6 ">
          <div
            className="
           border-border w-9 h-9 
           rounded-full bg-transparent  
           items-center  gap-2 relative 
           
           focus-within:absolute
            focus-within:-left-52
            focus-within:-top-5
            focus-within:w-[90dvw]
            focus-within:h-12
            focus-within:rounded-full
            focus-within:bg-elevated

             sm:focus-within:relative
            sm:focus-within:left-auto
            sm:focus-within:top-auto
            sm:focus-within:w-auto
            sm:focus-within:h-auto
            sm:focus-within:rounded-md
            sm:focus-within:bg-elevated
           
           md:bg-elevated  
           md:w-auto md:border
            md:h-auto md:flex 
            sm:rounded-md z-50"
          >
            <input
              type="text"
              placeholder="Search for movies, TV Shows, actors..."
              className="bg-transparent border-0 focus:outline-none text-primary w-full p-2 opacity-30 sm:opacity-100"
              id="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <label
              htmlFor="search"
              className="w-6 h-6 md:w-5 md:h-5 bg-transparent absolute top-1/2 -translate-y-1/2  right-2 text-secondary flex items-center justify-center md:top-auto md:translate-y-0"
            >
              <Search />
            </label>

            {searchInput && <SearchModal />}
          </div>
        </div>

        <div className="flex gap-4 px-4 items-center justify-center">
          <button className="bg-transparent border-0 text-primary">
            <Bell size={25} strokeWidth={1} />
          </button>
          <div>
            <button
              className="bg-transparent border-0 text-primary"
              onClick={() => setDropdownMode((current) => !current)}
            >
              <CircleUserRound size={30} strokeWidth={1} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
