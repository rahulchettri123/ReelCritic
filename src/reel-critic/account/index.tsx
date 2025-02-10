import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import Profile from "./profile";

export default function Account() {
  return (
    <Routes>
      {/* Redirect only ONCE to login */}
      <Route path="/" element={<Navigate to="login" />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="profile" element={<Profile />} />
    </Routes>
  );
}
