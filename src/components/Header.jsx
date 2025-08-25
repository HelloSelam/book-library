import { Link } from "react-router-dom"
import React from "react"

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-bold text-indigo-600">
          <Link to="/">Novare</Link>
        </h1>

        <nav className="space-x-6">
          <Link to="/" className="text-gray-700 hover:text-indigo-600">Home</Link>
          <Link to="/browse" className="text-gray-700 hover:text-indigo-600">Browse</Link>
          <Link to="/login" className="text-gray-700 hover:text-indigo-600">Login</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header