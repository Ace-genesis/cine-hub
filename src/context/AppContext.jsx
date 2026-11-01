import { createContext, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useEffect } from "react";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [myList, setMyList] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [adultAnimation, setAdultAnimation] = useState([]);
  const [anime, setAnime] = useState([]);
  const [nollywood, setNollywood] = useState([]);

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

  const apiUrls = {
    popularMovies: "movie/popular",
    trendingMovies: "trending/all/day",
    popularTv: "tv/popular",
    discoverMovies: "discover/movie",
    discoverTv: "discover/tv",
  };

  function scroll(direction, container) {
    container.current.scrollBy({
      left:
        direction === "right"
          ? container.current.clientWidth
          : -container.current.clientWidth,
      behavior: "smooth",
    });
  }

  function handleScroll(container, setCanScrollLeft, setCanScrollRight) {
    setCanScrollLeft(container.current.scrollLeft > 0);
    setCanScrollRight(
      container.current.scrollLeft <
        container.current.scrollWidth - container.current.clientWidth - 2,
    );
  }
  return (
    <AppContext.Provider
      value={{
        myList,
        setMyList,
        isSignedIn,
        setIsSignedIn,
        handleSignOut,
        popularMovies,
        setPopularMovies,
        trendingMovies,
        setTrendingMovies,
        popularTv,
        setPopularTv,
        adultAnimation,
        setAdultAnimation,
        anime,
        setAnime,
        nollywood,
        setNollywood,
        apiUrls,
        scroll,
        handleScroll,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
