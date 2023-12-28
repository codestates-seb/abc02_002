/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Review from "./Review";
import { useState, useEffect } from "react";
import { Common } from "../../styles/common";
const ReviewContainer = (props) => {
  // 10개 기준으로 나타내기..? 5개?
  // 리뷰의 갯수가 7개면 5+
  // 갯수가 14개면 10+
  // 리뷰는 한꺼번에 가져오지 말고 조금씩 가져와서 보여주는 식...
  const reviews = props.reviews;
  useEffect(() => {
    console.log(reviews);
  }, [reviews]);
  return (
    <div css={containerStyles}>
      <div css={titleStyles}>
        <h1>코멘트</h1>
        <h2> {reviews.length}+</h2>
      </div>
      <div css={listStyles}>
        {reviews.map((review) => (
          <Review review={review} key={review.id} />
        ))}
      </div>
    </div>
  );
};
export default ReviewContainer;
const containerStyles = css`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: auto;
  margin: 20px auto;
  justify-content: space-between;
  /* align-items: center; */
  text-align: center;
  h1 {
    margin-left: 25px;
  }
`;
const titleStyles = css`
  display: flex;
  flex-direction: row;
  text-align: center;

  h2 {
    margin: auto 0.5rem;
    color: ${Common.colors.theme};
  }
`;
const listStyles = css`
  // flex 정렬 이슈 있음
  /* display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 15px auto; */

  // grid 사용 방식
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 10px;
  margin: 15px;
  justify-items: center;

  @media screen and (max-width: 1070px) {
    /* flex-direction: column; */
  }
`;
