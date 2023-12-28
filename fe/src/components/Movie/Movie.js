/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Common } from "../../styles/common";
const Movie = (props) => {
  const [movie, setMovie] = useState(props.movie);
  return (
    <div css={cardStyles}>
      <Link to={`/movies/${movie.id}`}>
        <img src={movie.image} alt="영화 포스터" css={imgStyles} />
        <div css={titleStyles}>{movie.title}</div>
        <div css={yearAndCountryStyles}>
          {movie.year} • {movie.country}
        </div>
        <div css={ratingStyles}>평균 ★ {movie.rating}</div>
      </Link>
    </div>
  );
};
export default Movie;
const cardStyles = css`
  width: 245px;
  margin: 0 auto;
  border-radius: 8px;
`;
const imgStyles = {
  display: "block",
  margin: "0 auto",
  width: "100%",
  height: "75%",
};
const titleStyles = css`
  padding: 0.5rem 0rem 0rem 0rem;
  font-size: large;
  font-weight: 600;
  color: white;
`;
const yearAndCountryStyles = css`
  color: ${Common.colors.darkwhite};
`;
const ratingStyles = css`
  color: ${Common.colors.brightTheme};
`;
