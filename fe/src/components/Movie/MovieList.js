/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import Movie from "./Movie";
const MovieList = (props) => {
  // const [movies, setMovies] = useState(props.movies);
  const movies = props.movies;
  console.log(props.movies);
  return (
    <div css={movieConStyles}>
      {movies && movies.map((movie) => <Movie movie={movie} key={movie.id} />)}
    </div>
  );
};
export default MovieList;
const movieConStyles = css`
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  margin: 2rem auto;
  justify-content: space-between;
`;
