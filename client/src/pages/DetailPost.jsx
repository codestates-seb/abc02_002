import { useState, useEffect } from "react";
import classes from "../styles/pages/DetailPost.module.css";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { IoIosArrowBack } from "react-icons/io";
import SearchMap from "../components/Map/SearchMap";
import MakeMap from "../components/Map/MakeMap";
import { FaUsers } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import axios from "../axios";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "../components/Meeting/Comments";
import Comments from "../components/Meeting/Comments";
import { FaBookmark } from "react-icons/fa";
import {
  WiCloud,
  WiCloudy,
  WiDayCloudy,
  WiDaySunny,
  WiFog,
  WiRain,
  WiShowers,
  WiSnow,
  WiThunderstorm,
} from "weather-icons-react";
import TranslateWeather from "../components/Meeting/TranslateWeather";
const WeatherIcon = ({ weatherType }) => {
  switch (weatherType) {
    case "clear sky":
      return <WiDaySunny size={50} color="skyblue" />;
    case "few clouds":
      return <WiDayCloudy size={50} color="skyblue" />;
    case "scattered clouds":
      return <WiCloud size={50} color="skyblue" />;
    case "broken clouds":
      return <WiCloudy size={50} color="skyblue" />;
    case "shower rain":
      return <WiShowers size={50} color="skyblue" />;
    case "rain":
      return <WiRain size={50} color="skyblue" />;
    case "thunderstorm":
      return <WiThunderstorm size={50} color="skyblue" />;
    case "snow":
      return <WiSnow size={50} color="skyblue" />;
    case "mist":
      return <WiFog size={50} color="skyblue" />;
    default:
      return null; // 다른 날씨 유형에 대한 아이콘이 없는 경우
  }
};
const DetailPost = () => {
  // 도로명 주소
  const [address, setAddress] = useState({});
  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [meetingInfo, setMeetingInfo] = useState(null);
  const [enteredComment, setEnteredComment] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [isMyPost, setIsMyPost] = useState(false);
  const [hasMyComment, setHasMyComment] = useState(false);
  const [myComment, setMyComment] = useState({});
  const [isRecruiting, setIsRecruiting] = useState(false);
  const [isParticipating, setIsParticipating] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  // const meetingId = 983.5226956209999;
  // const meetingId = 906.6961085461239;
  // const meetingId = 906.8489342328219;
  const { meetingId } = useParams();
  console.log(meetingId);
  console.log(meetingInfo, userInfo);
  // const loggedInUser = localStorage.getItem("email");
  // 현재 로그인된 사용자의 정보를 가져오는 코드로 나중에 변경
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  // loggedInUser의 해당 글에 대한 코멘트가 존재할 경우 댓글창 대신 해당 댓글을 보여준다.
  const navigate = useNavigate();
  // console.log(userInfo);
  // useEffect(() => {
  //   if (loggedInUser && userInfo) {
  //     axios
  //       .get(`/v1/parties/${meetingId}/comments?userId=${loggedInUser.id}`)
  //       .then((response) => {
  //         if (Array.isArray(response.data) && response.data.length === 0) {
  //           // console.log("응답 데이터가 빈 배열입니다.");
  //         } else {
  //           // console.log("응답 데이터가 빈 배열이 아닙니다.");
  //           setHasMyComment(true);
  //           // console.log(response.data[0]);
  //           setMyComment(response.data[0]);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching comments:", error);
  //       });
  //   }
  // }, [userInfo]);
  // useEffect(() => {
  //   if (loggedInUser && userInfo) {
  //     // 이글의 모든 댓글을 조회하고 그 중에
  //     axios
  //       .get(`/v1/parties/${meetingId}/comments?userId=${loggedInUser.id}`)
  //       .then((response) => {
  //         if (Array.isArray(response.data) && response.data.length === 0) {
  //           // console.log("응답 데이터가 빈 배열입니다.");
  //         } else {
  //           // console.log("응답 데이터가 빈 배열이 아닙니다.");
  //           setHasMyComment(true);
  //           // console.log(response.data[0]);
  //           setMyComment(response.data[0]);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching comments:", error);
  //       });
  //   }
  // }, [userInfo]);
  // useEffect(() => {
  //   if (meetingInfo && meetingInfo.memberId) {

  //     axios
  //       .get(`/v1/members/${meetingInfo.memberId}`)
  //       .then((response) => {
  //         console.log(response.data);
  //         setUserInfo(response.data.data);
  //         // setUserInfo({
  //         //   memberId: 1,
  //         //   email: "user1@example.com",
  //         //   nickname: "당근이",
  //         // });
  //       })
  //       .catch((error) => {
  //         console.error("Error getting user data: ", error);
  //       });
  //     // console.log(userInfo);
  //   }
  // }, [meetingInfo]);
  // useEffect(() => {}, [isRecruiting]);
  const commentSubmitHandler = (e) => {
    e.preventDefault();
    // console.log(loggedInUser.nickname);
    let commentDTO = {
      // id: Math.random() * 1000,
      partyId: meetingId,
      memberId: loggedInUser.id,
      // useremail: loggedInUser.email,
      // nickname: loggedInUser.nickname,
      // edited: new Date(),
      // created: new Date(),
      comment: enteredComment,
    };
    console.log(commentDTO);
    axios
      .post(`/v1/comments`, commentDTO)
      .then((response) => {
        // console.log(response.data);
        getComments();
        setHasMyComment(true);
        setEnteredComment("");
        console.log(response.data);
        // 응답의 헤더에서 Location 값을 추출
        const locationHeaderValue = response.headers.location;

        // '/v1/comments/{commentId}'에서 commentId 부분을 추출
        const commentIdMatch = locationHeaderValue.match(
          /\/v1\/comments\/(\d+)/
        );

        if (commentIdMatch && commentIdMatch[1]) {
          // commentId를 사용하여 원하는 작업 수행
          const commentId = commentIdMatch[1];
          console.log("Extracted Comment ID:", commentId);
          axios.get(`/v1/comments/${commentId}`).then((response) => {
            console.log(response.data);
            setMyComment(response.data.data);
          });
        } else {
          console.error("Comment ID not found in Location header.");
        }
      })
      .catch((error) => {
        console.error("Error posting comment data: ", error);
      });
    // console.log(comments);
  };
  console.log(hasMyComment);
  const getComments = async () => {
    try {
      // const res = await axios.get(`/v1/parties/${meetingId}/comments`);
      const res = await axios.get(
        `/v1/comments?partyId=${meetingId}&page=1&size=3`
      );
      const comments = res.data.data;
      if (userInfo) {
        const myComment = comments.find(
          (comment) => comment.nickname === loggedInUser.nickname
        );
        console.log(comments);
        console.log(loggedInUser);
        console.log(myComment);
        if (myComment) {
          // 조건에 맞는 comment가 있으면 setMyComment에 저장
          setHasMyComment(true);
          setMyComment(myComment);
          console.log("My Comment:", myComment);
        } else {
          console.log("No comment found for the user.");
        }
        console.log("comments are updated successfully");
        setComments(comments);
      }
    } catch (error) {
      console.error("Error fetching comment datas: ", error);
    }
  };
  const commentEditHandler = () => {
    const userConfirmed = window.confirm("댓글을 수정하시겠습니까?");
    console.log(myComment);
    let updatedDTO = {
      comment: myComment.comment,
      createdAt: myComment.createdAt,
      modifiedAt: new Date(),
    };
    console.log(updatedDTO);
    if (userConfirmed) {
      axios
        .patch(`/v1/comments/${myComment.commentId}`, updatedDTO)

        .then((response) => {
          // console.log(response.data);
          alert("댓글이 수정되었습니다!");
          getComments();
        })
        .catch((error) => {
          console.error("Error updating comment data: ", error);
          alert("오류가 발생했습니다!");
        });
    }
  };
  const commentDeleteHandler = () => {
    const userConfirmed = window.confirm("댓글을 삭제하시겠습니까?");
    // json-server에서는 조건이 있는 삭제가 안되나봄..?
    // 백엔드와 연결했을때 테스트 가능할듯...
    if (userConfirmed) {
      axios
        .delete(`/v1/comments/${myComment.commentId}`)

        .then((response) => {
          // console.log(response.data);
          alert("댓글이 삭제되었습니다!");
          setHasMyComment(false);
          getComments();
        })
        .catch((error) => {
          console.error("Error deleting comment data: ", error);
          alert("오류가 발생했습니다!");
        });
    }
  };
  useEffect(() => {
    getComments();
  }, [userInfo]);
  const commentChangeHandler = (e) => {
    if (hasMyComment) {
      setMyComment((prev) => ({
        ...prev,
        comment: e.target.value,
        // edited: new Date(),
      }));
    } else {
      setEnteredComment(e.target.value);
    }
  };
  // localStorage에서 사용자 email 가져와서 글의 사용자 email 과 비교하고 같을 경우 수정/삭제 버튼 띄우기
  // localStorage를 쓸지 함수를 쓸지 추후에 방식 변경 가능성 존재
  useEffect(() => {
    console.log(userInfo);
    if (userInfo) {
      if (userInfo.memberId == loggedInUser.id) {
        setIsMyPost(true);
        console.log(isMyPost);
      }
    }
  }, [userInfo]);
  useEffect(() => {
    if (meetingInfo) {
      if (meetingInfo.partyStatus === "PARTY_OPENED") {
        setIsRecruiting(true);
      } else {
        setIsRecruiting(false);
      }
    }
  }, [meetingInfo]);
  const deleteMeetingHandler = () => {
    const userConfirmed = window.confirm("해당 글을 삭제하시겠습니까?");
    console.log(meetingInfo);
    console.log(meetingId);
    if (userConfirmed) {
      axios
        .delete(`/v1/parties/${meetingId}`)
        .then((response) => {
          alert("해당 글이 삭제되었습니다!");
          window.location.href = "/";
        })
        .catch((error) => {
          console.error("Error deleting meeting data: ", error);
          alert("오류가 발생하였습니다!");
        });
    }
  };
  // useEffect(() => {
  //   axios
  //     // .get(`/comments`, {
  //     //   params: {
  //     //     meetingId: 1,
  //     //   },
  //     // })
  //     .get(`/meetings/${meetingId}/comments`)
  //     .then((response) => {
  //       setIsLoading(true);
  //       console.log(response);
  //       setComments(response.data);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error getting comment datas: ", error);
  //       setIsLoading(false);
  //     });
  //   console.log(comments);
  // }, [isLoading]);
  useEffect(() => {
    axios
      .get(`/v1/parties/${meetingId}`)
      .then((response) => {
        // setIsLoading(true);
        console.log(response.data.data);
        setMeetingInfo(response.data.data);
        // 아래는 나중에 주석처리
        setUserInfo({
          memberId: 1,
          email: "user1@example.com",
          nickname: "당근이",
        });
        // if (response.data.party_status === "모집중") {
        //   setIsRecruiting(true);
        // }
        // if (response.data.party_status === "모집완료") {
        //   setIsRecruiting(false);
        // }

        // setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error getting meeting data: ", error);
        // setIsLoading(false);
      });
    console.log(meetingInfo);
  }, [isParticipating]);
  useEffect(() => {
    axios
      .get(`/v1/parties/${meetingId}`)
      .then((response) => {
        // setIsLoading(true);
        // console.log(response);
        // setMeetingInfo(response.data);
        if (response.data.partyStatus === "PARTY_OPENED") {
          setIsRecruiting(true);
        }
        if (response.data.partyStatus === "PARTY_CLOSED") {
          setIsRecruiting(false);
        }

        // setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error getting meeting data: ", error);
        // setIsLoading(false);
      });
    console.log(meetingInfo);
  }, [isParticipating]);
  console.log(myComment);
  const joinHandler = () => {
    if (!isParticipating) {
      const userConfirmed = window.confirm("해당 모임에 참여하시겠습니까?");

      // dto에 들어갈것 : meetingId, 현재 로그인한 사용자의 id, 랜덤 participation id
      if (userConfirmed) {
        console.log("참여되었습니다.");

        let partDTO = {
          // member_party_id: Math.random() * 1000,
          member_id: loggedInUser.id,
          party_id: meetingId,
        };
        // 해당 meeting의 current capacity가 max capacity - 1 이하일 경우 참여가 가능하다
        // max capacity 랑 current capacity랑 같을 때 모임글 상태를 모집완료로 변경!
        axios
          // .post(`/participations`, partDTO)
          .post(`/v1/parties/${meetingId}`, {
            memberId: loggedInUser.id,
            email: loggedInUser.email,
            nickname: loggedInUser.nickname,
          })
          .then((response) => {
            console.log(response);
            // 참여중 여부는 db에 안들어가니까 새로고침할때마다 기존 상태가 유지 안됨 > useEffect로 participation 정보
            // 가져와서 그거 기준으로 setIsParticipating 해야 함!
            // setIsParticipating(true);
            setMeetingInfo((prev) => ({
              ...prev,
              party_status:
                prev.current_capacity + 1 == prev.max_capacity
                  ? "모집완료"
                  : "모집중",
              current_capacity: prev.current_capacity + 1,
            }));
            setIsParticipating(true);
          })
          .catch((error) => {
            console.error("Error posting participation data: ", error);
          });
      }
    }
    if (isParticipating) {
      const userConfirmed = window.confirm(
        "해당 모임에 참여 취소 하시겠습니까?"
      );

      // dto에 들어갈것 : meetingId, 현재 로그인한 사용자의 id, 랜덤 participation id
      if (userConfirmed) {
        console.log("참여 취소되었습니다.");

        // axios
        //   .get(
        //     `/v1/participations?member_id=${loggedInUser.id}&party_id=${meetingId}`
        //   )
        //   .then((response) => {
        //     // console.log(response);
        //     if (response.data.length > 0) {
        //       const particiId = response.data[0].id;
        //       // console.log(particiId);

        //       axios
        //         .delete(`/participations/${particiId}`)
        //         .then((deleteResponse) => {
        //           // console.log(deleteResponse);
        //           // alert("해당 모임에 참여 취소 되었습니다!");
        //           setMeetingInfo((prev) => ({
        //             ...prev,
        //             party_status:
        //               prev.current_capacity - 1 <= prev.max_capacity
        //                 ? "모집중"
        //                 : "모집완료",
        //             current_capacity: prev.current_capacity - 1,
        //           }));
        //           setIsParticipating(false);
        //         })
        //         .catch((deleteError) => {
        //           console.error(
        //             "Error deleting participation data: ",
        //             deleteError
        //           );
        //         });
        //     } else {
        //       console.log("해당하는 participation이 없습니다.");
        //     }
        //   })
        //   .catch((error) => {
        //     console.error("Error fetching participation data: ", error);
        //   });
        axios
          // .post(`/participations`, partDTO)
          .post(`/v1/parties/${meetingId}`, {
            memberId: loggedInUser.id,
            email: loggedInUser.email,
            nickname: loggedInUser.nickname,
          })
          .then((response) => {
            console.log(response);
            // 참여중 여부는 db에 안들어가니까 새로고침할때마다 기존 상태가 유지 안됨 > useEffect로 participation 정보
            // 가져와서 그거 기준으로 setIsParticipating 해야 함!
            // setIsParticipating(true);
            setMeetingInfo((prev) => ({
              ...prev,
              party_status:
                prev.current_capacity - 1 <= prev.max_capacity
                  ? "모집중"
                  : "모집완료",
              current_capacity: prev.current_capacity - 1,
            }));
            setIsParticipating(false);
          })
          .catch((error) => {
            console.error("Error deleting participation data: ", error);
          });
      }
    }
  };

  useEffect(() => {
    console.log(meetingId);
    axios
      .get(`/v1/parties?partyMemberId=${loggedInUser.id}&page=1&size=3`)
      .then((response) => {
        console.log(response.data.data);
        const hasParticipatingParty = response.data.data.some(
          (item) => item.partyId == meetingId
        );
        console.log(hasParticipatingParty);
        setIsParticipating(hasParticipatingParty);
        console.log(isParticipating);
        // 뭔가 있을 경우 참여중
        // if (response.data.length > 0) {
        //   setIsParticipating(true);
        // }
        // 아니면 비참여중
      })
      .catch((error) => {
        console.error("Error updating meeting data: ", error);
        alert("오류가 발생했습니다!");
      });
  }, [meetingInfo]);
  // useEffect(() => {
  //   console.log("meeting info updated-------------------");
  //   console.log("updated meeting info = ", meetingInfo);
  //   if (meetingInfo) {
  //     // let updatedDTO = meetingInfo;
  //     // if(meetingInfo.party_status === "모집완료")
  //     axios
  //       .put(`/v1/parties/${meetingId}`, meetingInfo)
  //       .then((response) => {
  //         console.log(response.data);
  //         // setMeetingInfo(response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error updating meeting data: ", error);
  //         alert("오류가 발생했습니다!");
  //       });
  //   }
  // }, [meetingInfo]);
  const bookmarkHandler = () => {
    setBookmarked((prev) => !prev);
    axios
      .post(`/v1/bookmarks/parties/${meetingId}?memberId=${loggedInUser.id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error bookmarking meeting data: ", error);
        alert("오류가 발생했습니다!");
      });
  };
  useEffect(() => {
    axios
      .get(
        `/v1/bookmarks/parties/${meetingId}/like-status?memberId=${loggedInUser.id}`
      )
      .then((response) => {
        console.log(response);
        setBookmarked(response.data);
      })
      .catch((error) => {
        console.error("Error getting bookmark data: ", error);
        alert("오류가 발생했습니다!");
      });
  }, []);
  console.log(bookmarked);
  return (
    <div className={classes.wrapper}>
      <Header />
      {/* {!meetingInfo && !userInfo && (
        <div className={classes.container}>
          <p>Loading...</p>
        </div>
      )} */}
      {meetingInfo && userInfo && (
        <div className={classes.container}>
          <div className={classes.infoAndBtn}>
            <div className={classes.info}>
              <div className={classes.title}>
                <IoIosArrowBack
                  style={{ fontSize: "2rem" }}
                  onClick={() => {
                    navigate(-1);
                  }}
                />
                {/* <div className={classes.bookmark}>
                  <h1>{meetingInfo.title}</h1>
                  <FaBookmark style={{ color: "red", fontSize: "2rem" }} />
                </div> */}
                <h1>{meetingInfo.title}</h1>
              </div>
              <div className={classes.writerAndDate}>
                <div className={classes.writer}>
                  <h4>{userInfo.nickname}</h4>
                </div>
                <div className={classes.date}>
                  <h4>{meetingInfo.createdAt.split("T")[0]}</h4>
                </div>
                {meetingInfo.partyStatus === "PARTY_OPENED" && (
                  <div className={classes.isRecruiting}>
                    <h4>모집중</h4>
                  </div>
                )}
                {meetingInfo.partyStatus === "PARTY_CLOSED" && (
                  <div className={classes.isNotRecruiting}>
                    <h4>모집완료</h4>
                  </div>
                )}
              </div>
            </div>

            <div className={classes.btnCon}>
              <FaBookmark
                style={{
                  color: bookmarked ? "green" : "black",
                  fontSize: "2rem",
                }}
                className={classes.bookmark}
                onClick={bookmarkHandler}
              />
              {isRecruiting && !isMyPost && !isParticipating && (
                <button className={classes.joinBtn} onClick={joinHandler}>
                  <FaUsers style={{ fontSize: "1.5rem" }} />
                  참여
                </button>
              )}
              {!isMyPost && isParticipating && (
                <button
                  className={classes.joinBtn}
                  onClick={joinHandler}
                  disabled={!isRecruiting}
                >
                  <FaUsers style={{ fontSize: "1.5rem" }} />
                  참여중
                </button>
              )}

              {/* <div className={classes.bookmark}> */}

              {/* </div> */}
            </div>
          </div>
          <div className={classes.detailInfo}>
            <div className={classes.detail}>
              <h2>상세 정보</h2>
              <div className={classes.info1}>
                <div className={classes.info1_1}>
                  {/* <h4>
                    모임 이름
                    <div className={classes.emp}>{meetingInfo.meetingname}</div>
                  </h4> */}
                  <h4>
                    모집 인원
                    <div className={classes.emp}>{meetingInfo.maxCapacity}</div>
                  </h4>
                  <h4>
                    모임 장소
                    <div className={classes.emp}>{meetingInfo.address}</div>
                  </h4>
                  <h4>
                    현재 인원
                    <div className={classes.emp}>
                      {meetingInfo.currentCapacity}
                    </div>
                  </h4>
                </div>
                <div className={classes.info1_2}>
                  <h4>
                    모임 일시
                    <div className={classes.emp}>
                      {/* {meetingInfo.meetingDate.split("T")[0]} */}
                      {new Date(meetingInfo.meetingDate).toLocaleString(
                        "ko-KR",
                        {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        }
                      )}
                    </div>
                  </h4>
                  <h4>
                    모임 마감일
                    <div className={classes.emp}>
                      {new Date(meetingInfo.dueDate).toLocaleString("ko-KR", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </div>
                  </h4>
                  <h4>
                    연락 방법
                    {(isMyPost || isParticipating) && (
                      <div className={classes.emp}>{meetingInfo.contact}</div>
                    )}
                    {!isParticipating && !isMyPost && (
                      <div className={classes.alert}>참여 후 확인 가능</div>
                    )}
                  </h4>
                  <h4>
                    예상 날씨
                    {/* <div className={classes.weather}>{meetingInfo.weather}</div> */}
                    <div className={classes.weather}>
                      {/* <WeatherIcon
                        className={classes.wIcon}
                        weatherType={meetingInfo.weather}
                        // weatherType="snow"
                      /> */}
                      {meetingInfo.weather}
                      {/* <TranslateWeather weatherType={meetingInfo.weather} /> */}
                    </div>
                  </h4>
                </div>
              </div>
              <h2>모임 소개</h2>
              <div className={classes.info2}>{meetingInfo.content}</div>
            </div>
            <div className={classes.map}>
              <MakeMap
                setAddress={setAddress}
                lat={meetingInfo.latitude}
                lng={meetingInfo.longitude}
              />
              {isMyPost && (
                <div className={classes.btnCon_1}>
                  <button
                    className={classes.joinBtn}
                    onClick={() => {
                      window.location.href = `/meetings/${meetingId}/edit`;
                    }}
                  >
                    <FaEdit style={{ fontSize: "1.5rem" }} />
                    수정
                  </button>
                  <button
                    className={classes.deleteBtn}
                    onClick={deleteMeetingHandler}
                  >
                    {" "}
                    <FaTrash style={{ fontSize: "1.5rem" }} />
                    삭제
                  </button>
                </div>
              )}
            </div>
          </div>

          {isRecruiting && (
            <div className={classes.comment}>
              {comments && !isLoading && <h2>댓글 {comments.length}</h2>}
              {hasMyComment && <h3>내가 쓴 댓글</h3>}
              <textarea
                placeholder="댓글 내용을 입력하세요..."
                value={hasMyComment ? myComment.comment : enteredComment}
                onChange={commentChangeHandler}
                required
              />
              {!hasMyComment && (
                <div className={classes.btnCon_2}>
                  <button
                    className={classes.joinBtn_1}
                    // type="submit"
                    onClick={commentSubmitHandler}
                  >
                    댓글 등록
                    {/* <FaPlus style={{ fontSize: "1.5rem" }} /> */}
                  </button>
                </div>
              )}
              {hasMyComment && (
                <div className={classes.btnCon_2}>
                  <button
                    className={classes.joinBtn}
                    onClick={commentEditHandler}
                  >
                    댓글 수정
                  </button>
                  <button
                    className={classes.deleteBtn}
                    onClick={commentDeleteHandler}
                  >
                    댓글 삭제
                  </button>
                </div>
              )}
            </div>
          )}
          {!isRecruiting && (
            <div className={classes.comment}>
              {comments && !isLoading && <h2>댓글 {comments.length}</h2>}
            </div>
          )}
          {/* <div className={classes.comments}>
            {!isLoading &&
              comments &&
              comments.map((comment) => {
                return (
                  <div key={comment.id} className={classes.comm}>
                    <div className={classes.info}>
                      <img
                        alt="ProfileImage"
                        src={footerLogo}
                        width="50px"
                        height="50px"
                      />
                      <div className={classes.user}>
                        <div>{comment.nickname}</div>{" "}
                        <div>
                          {new Date(comment.modifiedAt).toLocaleString("ko-KR")}
                        </div>
                      </div>
                    </div>

                    <div className={classes.commcontent}>
                      {comment.comment}{" "}
                      <div className={classes.likes}>
                        <FaThumbsUp
                          style={{ fontSize: "1.5rem", color: "green" }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div> */}
          <Comments
            isLoading={isLoading}
            comments={comments}
            loggedInUser={loggedInUser}
            partyId={meetingId}
            userInfo={userInfo}
          />
        </div>
      )}
      <Footer />
    </div>
  );
};
export default DetailPost;
