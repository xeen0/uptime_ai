import { HashRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:username/*" element={<ProfilePage />} />
      </Routes>
    </HashRouter>
  );
}
