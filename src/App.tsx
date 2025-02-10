
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import ReelCritic from "./reel-critic";
function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/reel-critic" />} />
         
          <Route path="/reel-critic/*" element={<ReelCritic />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
