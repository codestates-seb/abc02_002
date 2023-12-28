import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
// import img1 from "../images/새벽저주.jpeg";
// import subImg from "../images/새벽저주썸네일.jpeg";
import MovieDetailContainer from "../components/Movie/MovieDetailContainer";
import ReviewContainer from "../components/Review/ReviewContainer";
import axios from "../axios";
// const DUMMY_MOVIE = {
//   id: 1,
//   image: img1,
//   title: "새벽의 저주",
//   year: 2004,
//   country: "미국, 캐나다, 일본, 프랑스",
//   rating: 3.7,
//   grade: "청불", //백엔드에서 어떻게 들어오는지?
//   subImg: subImg,
//   runningTime: 100, //백엔드에서 어떻게 들어오는지?
//   genre: "공포/액션",
//   plot: "위스콘신주의 한 마을에 한 아침, 애나의 이웃이 그녀의 남자친구를 공격하고 애나는 간신히 목숨을 건져 달아난다. 좀비들이 거리를 배회하고 동네가 불타는 상황에서 애나는 쇼핑몰 안에 피신하며 작은 그룹에 속하게 된다. 좀비 무리로부터 그들 자신을 보호하고 또한, 인류 최후의 보루로서 함께 공존하기 위해 가능한 모든 자원을 사용하고 생존하기 위해 힘을 합친다.",
// };
const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // useEffect에서 movieId를 가지고 해당 id를 가진 영화의 상세 정보를 가지고 와 movie에 넣는다.
  useEffect(() => {
    async function getMovie() {
      try {
        setIsLoading(true);
        const res = await axios.get(`/movies/${movieId}`);
        const movie = res.data;
        setMovie(movie);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movie data: ", error);
        setIsLoading(false);
      }
    }
    getMovie();
  }, [movieId]);
  const getReviews = async () => {
    try {
      const res = await axios.get(`/movies/${movieId}/reviews`);
      const reviews = res.data;
      console.log("reviews are updated successfully");
      setReviews(reviews);
    } catch (error) {
      console.error("Error fetching review datas: ", error);
    }
  };
  useEffect(() => {
    getReviews();
  }, []);
  useEffect(() => {
    async function getMovie() {
      try {
        const res = await axios.get(`/movies/${movieId}`);
        const movie = res.data;
        setMovie(movie);
      } catch (error) {
        console.error("Error fetching movie data: ", error);
      }
    }
    getMovie();
  }, [movieId]);
  return (
    // 코멘트 없을 때 p 안 뜸 수정 필요 isLoading 변수 만들기 - 완료
    // user 정보 가져와야 comment에 username 표시 가능
    // css style 분리하기
    <>
      {movie && (
        <Layout image={movie.subImg} movie={movie}>
          <MovieDetailContainer movie={movie} getReviews={getReviews} />
          {!isLoading && reviews && <ReviewContainer reviews={reviews} />}
          {!isLoading && (!reviews || reviews.length === 0) && (
            <p style={{ textAlign: "center", marginBottom: "10rem" }}>
              작성된 코멘트가 없습니다! 코멘트를 처음으로 남겨보세요☺️
            </p>
          )}
          {isLoading && <p>코멘트를 가져오고 있습니다...</p>}
        </Layout>
      )}
    </>
  );
};

export default MovieDetail;
