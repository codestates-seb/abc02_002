/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { Common } from "../styles/common";
const Login = () => {
  const naviagate = useNavigate();

  const dispatch = useDispatch();
  const loginHandler = (event) => {
    event.preventDefault();

    dispatch(authActions.login());
    naviagate("/");
  };
  return (
    <Layout>
      <main css={authStyles}>
        <section>
          <form onSubmit={loginHandler}>
            <div className="control">
              <label htmlFor="email">이메일</label>
              <input type="email" id="email" />
            </div>
            <div className="control">
              <label htmlFor="password">비밀번호</label>
              <input type="password" id="password" />
            </div>
            <button>로그인</button>
          </form>
        </section>
      </main>
    </Layout>
  );
};

export default Login;
const authStyles = css`
  margin: 5rem auto;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
  width: 25rem;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  color: white;
  border: 1px solid white;

  .control {
    margin-bottom: 0.5rem;
  }

  .control label {
    display: block;
    color: white;
    margin-bottom: 0.5rem;
  }

  .control input {
    display: block;
    width: 20rem;
    margin: auto;
    border-radius: 4px;
    padding: 0.25rem;
    border: 1px solid ${Common.colors.grayHover};
  }
`;
