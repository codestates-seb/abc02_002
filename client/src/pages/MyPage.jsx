//MyPage.jsx
//마이페이지 화면입니다. (작업자:안민주)


// MyPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import footerLogo from '../images/footerLogo.png';
import classes from '../styles/pages/MyPage.module.css';
import axios from 'axios';

const MyPage = () => {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.post('/v1/members', {
                });
                setUserData(response.data);
            } catch (error) {
                console.error('사용자 데이터를 가져오는 중 오류 발생', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className={classes.Mypageroom}>
            <Header />
            <div className={classes.MypageContainer}>
                <div className={classes.MyInfo}>
                    <div className={classes.Myprofile}>
                        <h1 className={classes.ProfileHeader}>내 프로필</h1>
                        <div className={classes.ProfileImageContainer}>
                            <img alt="ProfileImage" src={footerLogo} width="50px" height="50px" />
                        </div>
                        <Link to="/edit-profile" className={classes.Btn_EditProfile}>
                            회원정보수정
                        </Link>
                    </div>
                    <div className={classes.MyData}>
                        <div className={classes.NicknameContainer}>
                            <p className={classes.Nickname}>닉네임</p>
                            <div className={classes.UserNickname}>
                                {userData.nickname}
                            </div>
                        </div>
                        <div className={classes.EmailContainer}>
                            <p className={classes.Email}>이메일</p>
                            <div className={classes.UserEmail}>
                                {userData.email}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.MyEvent}>
                    <h1 className={classes.MyEventHeader}>내가 참여한 모임</h1>
                    {/* 내가 참여한 모임 나타내기 */}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MyPage;


//MyPage.jsx
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Header from '../components/Layout/Header';
// import Footer from '../components/Layout/Footer';
// import footerLogo from '../images/footerLogo.png';
// import classes from  '../styles/pages/MyPage.module.css';
// import axios from 'axios';

// const MyPage = () => {

//     return (
//         <div className={classes.Mypageroom}>
//                 <Header />
//                 <div className={classes.MypageContainer}>
//                     <div className={classes.MyInfo}>
//                         <div className={classes.Myprofile}>
//                             <h1 className={classes.ProfileHeader}>내 프로필</h1>
//                             <div className={classes.ProfileImageContainer}>
//                             <img alt="ProfileImage" src={footerLogo} width="50px" height="50px"/>
//                             </div>
//                             <Link to="/edit-profile" className={classes.Btn_EditProfile}>회원정보수정</Link>
//                         </div>
//                         <div className={classes.MyData}>
//                             <div className={classes.NicknameContainer}>
//                                 <p className={classes.Nickname}>닉네임</p>
//                                 <div className={classes.UserNickname}>유저의 닉네임이 출력됩니다.</div>
//                                 </div>
//                             <div className={classes.EmailContainer}>
//                                 <p className={classes.Email}>이메일</p>
//                                 <div className={classes.UserEmail}>유저의 이메일이 출력됩니다.</div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className={classes.MyEvent}>
//                         <h1 className={classes.MyEventHeader}>내가 참여한 모임</h1>
//                         {/* 내가 참여한 모임 나타내기 */}
//                     </div>
//                 </div>
//                 <Footer />
//         </div>
//     )
// }
// export default MyPage;
