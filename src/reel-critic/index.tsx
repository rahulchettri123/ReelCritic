import { Route, Routes, Navigate } from "react-router-dom";
import Navigation from "./navigations";
import Search from "./search";
import Account from "./account";
import Movies from "./movies";

export default function ReelCritic() {
  return (
    <div>
      <Navigation />
      <div>
        <Routes>
          {/* Redirect only ONCE to /account */}
          <Route path="/" element={<Navigate to="account"/>} />
          <Route path="account/*" element={<Account />} />
          <Route path="movies/*" element={<Movies />} />
          <Route path="search/*" element={<Search />} />
        </Routes>
      </div>
    </div>
  );
}
