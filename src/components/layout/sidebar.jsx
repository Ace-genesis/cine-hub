import { Link, useLocation } from "react-router-dom";
import {
  House,
  TvMinimalPlay,
  TrendingUp,
  Clapperboard,
  Film,
  LogOut,
  LogIn,
  Bolt,
  Star,
  Play,
} from "lucide-react";
import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { supabase } from "../../lib/supabaseClient";

function Sidebar() {
  const { isSignedIn, setIsSignedIn, handleSignOut } = useContext(AppContext);
  const [error, setError] = useState("");
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col sticky top-0 shrink-0 h-screen w-180 ">
      <section className="flex-grow">
        <Link to={"/"} className="flex items-center p-4 gap-1">
          <Play fill="var(--brand-color)" color="var(--brand-color)" />
          <h1 className="text-fluid-base  flex items-center ">
            Cine<span className="text-brand">Hub</span>
          </h1>
        </Link>
        <nav className="flex flex-col gap-4">
          <Link
            to={"/"}
            className={`flex  items-center gap-4 p-2 ${location.pathname === "/" ? "border  border-left rounded-md bg-elevated" : ""}`}
          >
            <House />
            Home
          </Link>
          <Link
            to={"/movies"}
            className={`flex  items-center gap-4 p-2 ${location.pathname === "/movies" && "border  border-left rounded-md bg-elevated"}`}
          >
            <Film />
            Movies
          </Link>
          <Link to={"#"} className="flex  items-center gap-4 p-2">
            <TvMinimalPlay />
            TV Shows
          </Link>
          <Link to={"#"} className="flex  items-center gap-4 p-2">
            <TrendingUp /> Trending
          </Link>
          <Link to={"#"} className="flex  items-center gap-4 p-2">
            <Clapperboard />
            Genres
          </Link>
          <Link
            to={"/my-list"}
            className={`flex  items-center gap-4 p-2 ${location.pathname === "/my-list" && "border  border-left rounded-md bg-elevated"}`}
          >
            <Star />
            List
          </Link>
        </nav>
      </section>

      <div className="border-top border-bottom py-4 px-2">
        <h3>Settings</h3>
        <div className="flex flex-col gap-4">
          <Link to={"/my-list"} className="flex  items-center gap-4 p-2">
            <Bolt /> Account Settings
          </Link>

          {isSignedIn ? (
            <button
              className="flex  items-center gap-4 p-2 bg-transparent border-0 text-primary"
              onClick={() => handleSignOut()}
            >
              <LogOut />
              Sign Out
            </button>
          ) : (
            <>
              <Link to={"/signin"} className="flex  items-center gap-4 p-2 ">
                <LogIn />
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
