import { NavLink, Link, useLocation } from "react-router-dom";
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

  const navItems = [
    { id: "/", label: "Home", icon: House },
    { id: "/movies", label: "Movies", icon: Film },
    { id: "/tv-shows", label: "TV Shows", icon: TvMinimalPlay },
    { id: "/trending", label: "Trending", icon: TrendingUp },
    { id: "/my-list", label: "My List", icon: Star },
  ];

  return (
    <aside
      className="flex flex-col fixed bottom-5 right-1/2 translate-x-1/2 p-2 rounded-xl  bg-white/10
  backdrop-blur-md border border-white/20 md:rounded-sm md:translate-x-0 md:sticky md:top-0 shrink-0 md:h-screen md:bg-surface text-primary z-50"
    >
      <section className="flex-1">
        <Link to={"/"} className="hidden sm:flex items-center p-4 gap-1">
          <Play fill="var(--color-brand)" color="var(--color-brand)" />
          <h1 className="font-bold">
            Cine<span className="text-brand">Hub</span>
          </h1>
        </Link>
        <nav className="flex md:flex-col gap-4 text-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                to={item.id}
                key={item.id}
                className={({ isActive }) =>
                  `flex  items-center gap-4 p-2 hover:bg-elevated rounded-md ${isActive ? "border border-border bg-elevated border-x-0 border-t-0  border-b-4 rounded-md border-b-brand md:border-l-brand md:border-b md:border-l-4  md:border-b-border" : ""}`
                }
              >
                <Icon className="w-6 h-6 md:w-4 md:h-4" />
                <p className="hidden md:flex">{item.label}</p>
              </NavLink>
            );
          })}
        </nav>
      </section>

      <div className="border-t border-t-border mb-5 py-2 px-2 text-xs hidden sm:flex flex-col gap-2">
        <h2 className=" font-bold">Settings</h2>
        <div className="flex flex-col gap-4">
          <Link to={"/my-list"} className="flex  items-center gap-4 p-2 ">
            <Bolt size={15} /> Account Settings
          </Link>

          {isSignedIn ? (
            <button
              className="flex  items-center gap-4 p-2 bg-transparent border-0 text-primary"
              onClick={() => handleSignOut()}
            >
              <LogOut size={15} />
              Sign Out
            </button>
          ) : (
            <>
              <Link to={"/signin"} className="flex  items-center gap-4 p-2 ">
                <LogIn size={15} />
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
