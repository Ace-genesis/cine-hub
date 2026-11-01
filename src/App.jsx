import Homepage from "./components/pages/homepage";
import Movies from "./components/pages/moviesPage";
import Details from "./components/pages/details";
import Header from "./components/layout/header";
import Sidebar from "./components/layout/sidebar";
import Footer from "./components/layout/footer";
import SignIn from "./components/pages/authentication/signin";
import SignUp from "./components/pages/authentication/signup";
import MyList from "./components/pages/myList";
import { AppProvider, AppContext } from "./context/AppContext";
import { supabase } from "./lib/supabaseClient";
import { useContext, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HeroLoading from "./components/loadingStates/heroLoading";

function AppContent() {
  const { isSignedIn, setIsSignedIn } = useContext(AppContext);

  const location = useLocation();

  const isAuth =
    location.pathname === "/signin" || location.pathname === "/signup";

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        setIsSignedIn(false);
        return;
      }

      setIsSignedIn(true);
    };

    checkUser();
  }, []);

  return (
    <>
      <div className="flex gap-4">
        {!isAuth && <Sidebar />}

        <div className="max-w-screen overflow-y-hidden rounded-md container">
          <>{!isAuth && <Header />}</>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/details/:showType/:id" element={<Details />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/my-list" element={<MyList />} />
            <Route path="/hero-loading" element={<HeroLoading />} />
          </Routes>
        </div>
      </div>

      {!isAuth && <Footer />}
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
