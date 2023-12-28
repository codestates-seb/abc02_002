/** @jsxImportSource @emotion/react */
import { Common } from "../../styles/common";
import ReactStars from "react-rating-stars-component";
const StarRating = (props) => {
  const ratingHandler = props.ratingHandler;
  return (
    <ReactStars
      count={5}
      onChange={ratingHandler}
      size={50}
      value={props.value}
      isHalf={true}
      emptyIcon={<i className="far fa-star"></i>}
      halfIcon={<i className="fa fa-star-half-alt"></i>}
      fullIcon={<i className="fa fa-star"></i>}
      activeColor={`${Common.colors.theme}`}
      color={`${Common.colors.grayHover}`}
    />
  );
};

export default StarRating;
