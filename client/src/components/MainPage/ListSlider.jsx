import classes from '../../styles/components/ListSlider.module.css';
import Slider from 'react-slick';
import ListCard from './ListCard';

/*
  새로운 모임을 위한 슬라이더 컴포넌트
  3개의 게시글이 보이며 슬라이더 버튼을 통해 옆으로 넘길 수 있다.
*/
const ListSlider = () => {
  const settings = {
    dots: false, // 페이지 점 표시 여부
    infinite: true, // 무한 반복 여부
    speed: 500, // 전환 속도
    slidesToShow: 3, // 보여질 슬라이드 수
    slidesToScroll: 3, // 스크롤 시 이동할 슬라이드 수
    arrows: true, // 화살표 표시 여부
    accessibility: true, // 접근성 활성화 여부
    autoplay: true, // 자동 재생 여부
  };
  return (
    <section className={classes.slider}>
      {/* 제목을 나타내는 h1 태그, 스타일은 글자 크기와 색상 설정 */}
      <h1 style={{ fontSize: '24px', color: 'black' }}>새로운 모임</h1>
      {/* react-slick의 Slider 컴포넌트, 설정은 settings 객체로 전달 */}
      <Slider {...settings}>
        {/* 각각의 아이템에 대해 ItemCard 컴포넌트를 렌더링 */}
        <ListCard />
      </Slider>
    </section>
  );
};

export default ListSlider;