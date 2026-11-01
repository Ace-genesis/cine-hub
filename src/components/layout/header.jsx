import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { supabase } from "../../lib/supabaseClient";
import { Search, Bell, CircleUserRound, Menu } from "lucide-react";

function Header() {
  return (
    <header className="flex p-md-fluid items-center justify-between bg-canvas sticky top-0 z-50">
      <Link to={"/"} className="site-name md:hidden">
        <h1 className="text-fluid-base">
          Cine<span className="text-brand">Hub</span>
        </h1>
      </Link>

      <div className="max-w-700 w-full px-6">
        <div className="border rounded-md bg-elevated items-center p-2 gap-2 max-w-700 w-full hidden md:flex">
          <input
            type="text"
            placeholder="Search for movies, TV Shows, actors..."
            className="bg-transparent border-0 text-primary w-full"
          />
          <button className="bg-transparent border-0 text-secondary opacity-50 flex items-center justify-center px-2">
            <Search size={20} />
          </button>
        </div>
      </div>

      <div className="flex gap-8 px-4 items-center justify-center">
        <button className="bg-transparent border-0 text-primary">
          <Bell size={35} />
        </button>
        <div>
          <button
            className="bg-transparent border-0 text-primary"
            onClick={() => setDropdownMode((current) => !current)}
          >
            <CircleUserRound size={40} />
          </button>
        </div>
      </div>
      {/*<button className="bg-transparent border-0 text-primary sm:hidden">
        <Menu />
      </button>*/}
    </header>
  );
}

export default Header;
