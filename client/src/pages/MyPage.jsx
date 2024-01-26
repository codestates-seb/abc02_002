//MyPage.jsx
//마이페이지 화면입니다. (작업자:안민주)

// MyPage.jsx
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../features/userSlice";

import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import S_LOGO from "../images/S_LOGO.png";
import classes from "../styles/pages/MyPage.module.css";
import { useAxiosInterceptors } from "../axios";
// import useAxiosInstance from "../axios";
import MyComment from "../components/MyPage/MyComment";
import MyPosts from "../components/MyPage/MyPosts";
import MyEventCard from "../components/MyPage/MyEventCard";
import MyBookmark from "../components/MyPage/MyBookmark";
import LeaveModal from "./LeaveModal";

const MyPage = () => {
  const [userData, setUserData] = useState({});
  const isAuthenticated = useSelector((state) => state.user.user !== null);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { memberId } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const instance = useAxiosInterceptors();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await instance.get(`/v1/members/${memberId}`, {
          timeout: 10000,
        });
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("사용자 데이터를 가져오는 중 오류 발생", error);
      }
    };

    fetchUserData();
  }, [memberId]);

  //탈퇴관련코드!!
  // useEffect(() => {
  //     if (leaveSuccess) {
  //       navigate('/');
  //     }
  //   }, [leaveSuccess, navigate]);

  //깃 푸시할때 아래부분 주석 꼭 해제하기!
  // 로그인아닐때 로그인 페이지로 이동 (로그인 상태유지 부분)
  if (!user) {
      navigate('/login');
  }

  return (
      <div className={classes.Mypageroom}>
        <Header />
        <div className={classes.MypageContainer}>
          <div className={classes.MyInfo}>
            <div className={classes.Myprofile}>
              <h1 className={classes.ProfileHeader}>내 프로필</h1>
              <div className={classes.ProfileImageContainer}>
                <img
                  alt="ProfileImage"
                  src={S_LOGO}
                  width="50px"
                  height="50px"
                />
              </div>
              <button 
              onClick={() => navigate(`/edit-profile/${memberId}`)} 
              className={classes.Btn_EditProfile}
              >회원정보수정</button>
            </div>
            <div className={classes.MyData}>
              <div className={classes.NicknameContainer}>
                <p className={classes.Nickname}>닉네임</p>
                <div className={classes.UserNickname}>
                  {userData.data && userData.data.nickname}
                </div>
              </div>
              <div className={classes.EmailContainer}>
                <p className={classes.Email}>이메일</p>
                <div className={classes.UserEmail}>
                  {userData.data && userData.data.email}
                </div>
              </div>
            </div>
          </div>
          <div className={classes.MyEvent}>
            <h1 className={classes.MyEventHeader}>나의 모임</h1>
            <MyEventCard memberId={userData.id} />
          </div>
          <div className={classes.MyBookmark}>
            <h1 className={classes.MyBookmarkHeader}>나의 북마크</h1>
            <MyBookmark className={classes.MyBookmarkcontainer}memberId={userData.id} />
          </div>
          <div className={classes.MyContents}>
            <div className={classes.MyPostContainer}>
              <h1 className={classes.MyPostHeader}>나의 글</h1>
              <MyPosts
                className={classes.MyPostContents}
                memberId={userData.id}
              />
            </div>
            <div className={classes.MyCommentContainer}>
              <h1 className={classes.MyCommentHeader}>나의 댓글</h1>
              <MyComment
                className={classes.MyCommentContents}
                memberId={userData.id}
              />
            </div>
          </div>
          {/* <LeaveModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} setLeaveSuccess={setLeaveSuccess}/> */}
          <div className={classes.ModalContainer}>
            <LeaveModal
              modalIsOpen={modalIsOpen}
              setModalIsOpen={setModalIsOpen}
            />
          </div>
        </div>
        <Footer className={classes.MypageFooter}/>
      </div>
  );
};

export default MyPage;
