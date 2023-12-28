import Layout from "../components/Layout/Layout";
import MovieList from "../components/Movie/MovieList";
import { useEffect, useState } from "react";
import axios from "../axios";
const Home = () => {
  const [movies, setMovies] = useState(null);
  useEffect(() => {
    async function getMovies() {
      try {
        const res = await axios.get(`/movies`);
        const movies = res.data;
        console.log(movies);
        setMovies(movies);
      } catch (error) {
        console.error("Error fetching movie datas: ", error);
      }
    }
    getMovies();
  }, []);
  return (
    <Layout>
      <MovieList movies={movies} />
    </Layout>
  );
};
export default Home;
