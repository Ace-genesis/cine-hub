import { createContext, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [myList, setMyList] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showDetails, setShowDetails] = useState(null);

  const getMovies = async (apiLink, params = {}) => {
    try {
      const url = buildUrl(apiLink, params);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    console.log("it reached here");
    try {
      const { error } = await supabase.auth.signOut();

      console.log("Sign-out error:", error);

      if (error) {
        console.log("Sign-out error:", error);
        throw new Error(error.message);
      }

      setIsSignedIn(false);
      console.log(isSignedIn);
    } catch (error) {
      return error.message || "Failed to sign Out";
    }
  };

  const buildUrl = (apiLink, params) => {
    const url = new URL(`https://api.themoviedb.org/3/${apiLink}`);

    url.searchParams.set("api_key", import.meta.env.VITE_TMDB_API_KEY);

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, value);
      }
    });

    return url.toString();
  };

  return (
    <AppContext.Provider
      value={{
        myList,
        setMyList,
        getMovies,
        isSignedIn,
        setIsSignedIn,
        handleSignOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
