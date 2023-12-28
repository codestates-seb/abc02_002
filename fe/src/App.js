import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import MovieDetail from "./pages/MovieDetail";
function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movies/:movieId" element={<MovieDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
