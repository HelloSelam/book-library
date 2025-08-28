// src/App.jsx
import { Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import BrowsePage from "./pages/BrowsePage"
import Header from "./components/Header"

function App() {
  return (
    <>
      {/* Global Header always visible */}
      <Header />

      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Browse Page */}
        <Route path="/browse" element={<BrowsePage />} />
      </Routes>
    </>
  )
}

export default App