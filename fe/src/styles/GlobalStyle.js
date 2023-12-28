/** @jsxImportSource @emotion/react */
import { css, Global } from "@emotion/react";
import { Common } from "./common";

const baseStyle = css`
  @font-face {
    font-family: "Inika";
    font-style: normal;
    font-weight: normal;
    src: url("/fonts/Inika-Regular.ttf");
  }

  @font-face {
    font-family: "Inika Bold";
    font-style: normal;
    font-weight: normal;
    src: url("/fonts/Inika-Bold.ttf");
  }
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    font-family: sans-serif;
    color: ${Common.colors.white};
    background-color: ${Common.colors.black};

    font-size: ${Common.fontSize.medium};
    font-weight: 400;

    text-decoration: none;
  }
  //button은 border 유무에 따라, 배경색 (어두운, 밝은)에 따라 4가지 이상의 스타일로 나누기
  button {
    font: inherit;
    cursor: pointer;
    color: ${Common.colors.black};
    border-color: ${Common.colors.black};
    background-color: ${Common.colors.white};
    padding: 0.5rem 1.5rem;
    border-radius: 3px;
  }

  button:hover,
  button:active {
    color: ${Common.colors.blackHover};
    border-color: ${Common.colors.blackHover};
  }
  a {
    text-decoration: none;
    color: black;
  }
  /* a:hover,
  a:active,
  a:visited {
    text-decoration: none;
    color: black;
  } */
`;

const GlobalStyle = () => <Global styles={baseStyle} />;

export default GlobalStyle;
