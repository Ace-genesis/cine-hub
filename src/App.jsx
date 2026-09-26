import Header from "./components/header";
import Homepage from "./pages/homepage";
import Footer from "./components/footer";

function App() {
  /*async function fetchMovie() {
    try {
      const url = new URL("https://api.themoviedb.org/3/movie/popular");
      url.searchParams.set("api_key", "d8390fd460735ed62c17d261e95e4987");

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  fetchMovie();*/
  return (
    <>
      <Header />
      <Homepage />
      <Footer />
    </>
  );
}

export default App;
