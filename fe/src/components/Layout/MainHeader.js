/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { Common } from "../../styles/common";
import React, { forwardRef } from "react";
import img from "../../images/tomato.png";
const MainHeader = forwardRef((props, ref) => {
  // main header랑 image header 여백 다름 수정 필요
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const logoutHandler = () => {
    dispatch(authActions.logout());
  };
  return (
    <header css={headerStyles}>
      <Link to="/">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <h1>isRotten</h1>
          <img
            src={img}
            alt="아이콘"
            width={"45px"}
            height={"45px"}
            style={{
              position: "relative",
              top: "0.8rem",
              marginLeft: "0.2rem",
            }}
          />
        </div>
      </Link>
      {!isAuth && (
        <nav>
          <ul>
            <li>
              <Link to="/login">
                <button css={loginoutButtonStyles}>로그인</button>
              </Link>
              <Link to="/register">
                <button css={registerButtonStyles}>회원가입</button>
              </Link>
            </li>
          </ul>
        </nav>
      )}
      {isAuth && (
        <nav>
          <ul>
            <li css={iconContainer}>
              <button css={loginoutButtonStyles} onClick={logoutHandler}>
                로그아웃
              </button>
              <FaUserCircle css={iconStyles} />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
});

export default MainHeader;
const headerStyles = css`
  top: 0;
  background-color: black;
  position: fixed;
  width: 100%;
  height: 5rem;
  padding: 0 12%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  z-index: 1000;

  border-bottom: 1px solid ${Common.colors.grayHover};

  h1 {
    color: ${Common.colors.theme};
    font-family: "Inika Bold";
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;
const loginoutButtonStyles = css`
  color: ${Common.colors.white};
  background-color: black;
  border: none;
  border-bottom: 1px solid ${Common.colors.theme};
  margin-right: 1rem;
  :hover {
    color: ${Common.colors.grayHover};
  }
`;
const registerButtonStyles = css`
  background: none;
  color: white;
  border-color: ${Common.colors.theme};

  :hover {
    background: none;
    color: ${Common.colors.blackHover};
    border-color: ${Common.colors.blackHover};
  }
`;
const iconContainer = css`
  display: flex;
  align-items: center;
`;
const iconStyles = css`
  font-size: 1.5em;
  margin-left: 5px;
`;
