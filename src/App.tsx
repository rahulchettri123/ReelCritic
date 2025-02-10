import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ReelCritic from "./reel-critic";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/reel-critic" />} />
        <Route path="/reel-critic/*" element={<ReelCritic />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
