import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import ReelCritic from "./reel-critic";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/reel-critic" />} />
        <Route path="/reel-critic/*" element={<ReelCritic />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
