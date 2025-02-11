import { Route, Routes, Navigate } from "react-router-dom";
import Navigation from "./navigations";
import Home from "./home";
import Search from "./search";
import Account from "./account";
import Movies from "./movies";
import TrendingMovies from "./movies/trending_movies";
import TvShows from "./tvshows";

export default function ReelCritic() {
  return (
    <div>
      <Navigation />
      <div>
        <Routes>
          {/* ✅ Ensure Home is the first page when visiting the website */}
          <Route index element={<Navigate to="home" />} />
          
          {/* Home Page */}
          <Route path="home" element={<Home />} />

          {/* Other Pages */}
          <Route path="account/*" element={<Account />} />
          <Route path="movies/*" element={<Movies />} />
          <Route path="tvshows" element={<TvShows/>} />
          <Route path="trending_movies" element={<TrendingMovies />} />
          <Route path="search/*" element={<Search />} />

          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="home" replace />} />
        </Routes>
      </div>
    </div>
  );
}
