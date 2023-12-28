/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import StarRating from "../Review/StarRating";
import Card from "../UI/Card";
import RatingChart from "../Review/RatingChart";
import { useEffect, useState } from "react";
import { TiPencil } from "react-icons/ti";
import { RiBookmarkLine } from "react-icons/ri";
import { Common } from "../../styles/common";
import axios from "../../axios";
// 들어와야 할 데이터
// 제목, 개봉년도, 장르, 국가, 러닝타임, 포스터, 포스터외이미지, 줄거리
// 별점 분포

// 로그인한 상태면
// 1. 내가 쓴 리뷰가 있을 경우 : 내가 쓴 리뷰가 뜸
// 2. 내가 쓴 리뷰가 없는 경우 : 코멘트 창이 뜸
// 로그인 안 한 상태면
// 코멘트 버튼을 누를 시 로그인하라는 창이 뜬다.
const initialState = {
  rating: 0,
  comment: "",
};
const MovieDetailContainer = (props) => {
  const getReviews = props.getReviews;
  const movie = props.movie;
  const [review, setReview] = useState(initialState);
  const reviewHandler = (event) => {
    setReview({
      ...review,
      comment: event.target.value,
    });
    console.log(review);
  };
  const ratingHandler = (newRating) => {
    console.log(newRating);
    setReview({
      ...review,
      rating: newRating,
    });
  };
  //   {
  //   "id": 100,
  //   "userId": 3,
  //   "movieId": 5,
  //   "content": "감정을 자극하는 영화였어요.",
  //   "rating": 4
  // },
  const reviewSumbmitHandler = (event) => {
    event.preventDefault();
    //userId 동적으로 바꾸기

    axios
      .post(`/movies/${movie.id}/reviews`, {
        id: Math.random() * 1000,
        userId: 1,
        movieId: movie.id,
        comment: review.comment,
        rating: review.rating,
      })
      .then((response) => {
        console.log(response);
        // setReview(initialState);
        getReviews();
        // rating handler 분석...
        // ratingHandler(0);
      })
      .catch((error) => {
        console.error("Error posting review data: ", error);
        // setReview(initialState);
        // ratingHandler(0);
      });
    console.log(review);
  };
  useEffect(() => {
    // window.scrollTo(0, 0);
  }, []);
  return (
    <div css={containerStyles}>
      <div css={content}>
        <div css={posterAndGraph}>
          <div css={poster}>
            <img src={movie.image} alt="포스터" />
          </div>

          <div css={graph}>
            <h5>별점 그래프</h5>
            <h3>평균 ★ {movie.rating}</h3>
            <RatingChart ratings={[1, 2, 2, 3, 3, 3, 2, 3, 3, 4]} />
          </div>
        </div>

        <div css={reviewStyles}>
          <form>
            <div css={ratingStyles}>
              <StarRating ratingHandler={ratingHandler} value={review.rating} />
              {/* <div css={iconAndText}>
              <h1>3.7</h1>
              <h5>나의 별점</h5>
            </div> */}
              <div css={iconAndText}>
                <h1>{movie.rating}</h1>
                <h5>평균 별점</h5>
              </div>
              <div css={rightCon}>
                <div css={iconAndText}>
                  <RiBookmarkLine size={35} />
                  <h5>보고싶어요</h5>
                </div>
                <div css={iconAndText}>
                  <TiPencil size={35} />
                  <h5>코멘트</h5>
                </div>
              </div>
            </div>
            <div css={commentStyles}>
              <Card>
                <textarea
                  placeholder="user1 님의 감상을 글로 남겨보세요"
                  value={review.comment}
                  onChange={reviewHandler}
                />
                <button type="submit" onClick={reviewSumbmitHandler}>
                  코멘트 남기기
                </button>
              </Card>
            </div>
            <div css={story}>{movie.plot}</div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default MovieDetailContainer;
const containerStyles = css`
  background-color: ${Common.colors.darkwhite};
`;
const content = css`
  /* border: 1px solid red; */
  width: 80%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 20px;
  margin: 0 auto;
  justify-content: space-between;

  @media screen and (max-width: 1070px) {
    flex-direction: column;
  }
`;
const posterAndGraph = css`
  /* border: 1px solid green; */
  flex: 1;
  flex-basis: 30%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
const poster = css`
  /* border: 1px solid pink; */
  width: 100%;
  height: auto;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain; /* 이미지의 비율을 유지하면서 컨테이너에 꽉 차도록 설정 */
  }
`;
const graph = css`
  /* border: 1px solid violet; */
  padding: 10px;
  /* width: 100%; */

  h5 {
    margin: 0 auto;
    color: ${Common.colors.blackHover};
  }
  h3 {
    margin: 0.5rem auto;
    color: black;
  }
`;
const reviewStyles = css`
  /* border: 1px solid orange; */
  flex: 4; /* "코멘트"의 초기 크기 설정 */
  flex-basis: 80%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 1rem;
`;
const ratingStyles = css`
  /* border: 1px solid red; */
  flex-basis: 15%;
  padding-top: 10px;
  border-bottom: 1px solid ${Common.colors.grayHover};
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
`;
const rightCon = css`
  /* border: 1px solid orange; */
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: black;
`;
const iconAndText = css`
  /* border: 1px solid green; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* margin-right: 10rem; */
  gap: 0.5rem;
  h1,
  h5 {
    margin: 0 auto;
    color: ${Common.colors.blackHover};
  }
`;
const commentStyles = css`
  /* border: 1px solid blue; */
  flex-basis: 18%;

  border-bottom: 1px solid ${Common.colors.grayHover};
  button {
    border-color: ${Common.colors.grayHover};
    font-size: large;
    font-weight: 600;
  }
  padding: 1rem 0;
`;
const story = css`
  /* border: 1px solid gray; */
  flex-basis: 25%;
  color: black;
  font-size: medium;
  font-weight: 600;
  line-height: 1.5;
  padding: 1rem 0;
`;
