import {  Routes, Route} from "react-router-dom";

import Login from "./login";
import Register from "./register";
import Profile from "./profile";

export default function Account() {
  return (
   
      <Routes>  
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
   
  );
}
