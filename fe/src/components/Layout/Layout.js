/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRef, useEffect, useState } from "react";
import ImageHeader from "./ImageHeader";
import MainHeader from "./MainHeader";
import Footer from "./Footer";
// 이미지 헤더와 메인 헤더의 공통 코드 빼내기
// 헤더 버튼 색깔 수정 필요
// 스크롤 관련 학습 필요
const Layout = (props) => {
  const image = props.image;
  const movie = props.movie;
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mainHeaderHeight, setMainHeaderHeight] = useState(0);

  const mainHeaderRef = useRef(null);

  useEffect(() => {
    // 메인 헤더의 높이를 측정
    if (mainHeaderRef.current) {
      setMainHeaderHeight(mainHeaderRef.current.clientHeight);
    }
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mainHeaderHeight]);

  return (
    <div css={conStyles}>
      {image && scrollPosition > mainHeaderHeight + 100 && (
        <div style={{ height: mainHeaderHeight }}>
          <MainHeader />
        </div>
      )}
      {image && <ImageHeader image={image} movie={movie} />}

      {!image && <MainHeader />}

      <main
        css={css`
          padding-top: ${image ? "0rem" : "5rem"};
          position: relative;
          flex: 1; /* 컨텐츠가 남은 공간을 모두 채우도록 설정 */
        `}
      >
        {props.children}
      </main>
      <Footer css={footerStyles} />
    </div>
  );
};

export default Layout;
const footerStyles = css`
  flex-shrink: 0; /* footer가 유연하게 크기를 조절하지 않도록 설정 */
`;
const conStyles = css`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 최소 높이를 브라우저 높이만큼 설정 */
`;
