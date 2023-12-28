/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Common } from "../../styles/common";
import { BsHandThumbsUp } from "react-icons/bs";
import { ReactComponent as Tomato } from "../../images/tomato-svgrepo-com.svg";
import { useEffect, useState } from "react";
import axios from "../../axios";
const Review = ({ review }) => {
  // 추후에 사용자 id에 따라 랜덤하게 토마토 색 부여하기
  // 현재는 리뷰마다 랜덤하게 부여 (렌더링 할 때 마다 바뀜...)
  const generateRandomColor = () => {
    const colors = ["#FF6347", "#4682B4", "#32CD32", "#8A2BE2", "#FFA500"]; // 랜덤 색상 배열
    return colors[Math.floor(Math.random() * colors.length)]; // 배열에서 랜덤하게 색상 선택
  };

  // 기존 코드와 함께 사용자 ID에 따라 랜덤 색상 할당
  const randomColor = generateRandomColor();
  const [userInfo, setUserInfo] = useState(null);
  // redux를 이용해 사용자 정보를 가져오는 방법 생각해보기
  useEffect(() => {
    async function getUserInfo() {
      try {
        const res = await axios.get(`/users/${review.userId}`);
        const user = res.data;
        setUserInfo(user);
        console.log(userInfo);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    }
    getUserInfo();
  }, [review]);
  return (
    <>
      {userInfo && (
        <div css={reviewStyles}>
          <div css={infoStyles}>
            <div css={leftCon}>
              <Tomato fill={randomColor} /> {userInfo.username}
            </div>{" "}
            <div>★ {review.rating}</div>
          </div>
          <div css={commentStyles}>{review.comment}</div>
          <div css={icons}>
            <BsHandThumbsUp />
            <div>3</div>
          </div>
          <div css={thumbsUp}>좋아요</div>
        </div>
      )}
    </>
  );
};
export default Review;
const reviewStyles = css`
  margin: 6px auto;
  border-radius: 6px;
  padding: 1rem;
  // 일정 사이즈 창을 줄이면 한줄에 코멘트 2개만 보여지도록 반응형 필요
  /* width: 24%; */ // flex 썼을 때
  width: 100%; // grid 썼을 때
  height: 280px;
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 1rem;
  background-color: ${Common.colors.darkwhite};
  color: black;
  @media screen and (max-width: 1070px) {
    width: 100%;
    height: 280px;
  }
`;
const infoStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-basis: 20%;
  border-bottom: 1px solid ${Common.colors.grayHover};
`;
const leftCon = css`
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;
const commentStyles = css`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: row;
  flex-basis: 50%;
  text-align: left;
  border-bottom: 1px solid ${Common.colors.grayHover};
`;
const icons = css`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: flex-start;
  flex-basis: 15%;
  border-bottom: 1px solid ${Common.colors.grayHover};
`;
const thumbsUp = css`
  display: flex;
  flex-direction: row;
  flex-basis: 10%;
  color: ${Common.colors.theme};
  font-size: medium;
  font-weight: 600;
`;
