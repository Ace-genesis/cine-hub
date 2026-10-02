import Homepage from "./pages/homepage";
import Movies from "./pages/moviesPage";
import Details from "./pages/details";
import Header from "./components/header";
import Footer from "./components/footer";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/details" element={<Details />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
