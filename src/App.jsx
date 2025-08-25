// src/App.jsx
import { Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import BrowsePage from "./pages/BrowsePage"

function App() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Browse Page */}
      <Route path="/browse" element={<BrowsePage />} />
    </Routes>
  )
}

export default App