import { Link, useLocation } from "react-router-dom";
import React from "react";

const Header = () => {
  const location = useLocation();

  // Dynamic background: transparent on Home, white on other pages
  const isHome = location.pathname === "/";

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all ${
        isHome ? "bg-transparent shadow-none" : "bg-white shadow-md"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <Link
            to="/"
            className={isHome ? "text-indigo-600 hover:text-indigo-200" : "text-indigo-600 hover:text-indigo-800"}
          >
            Novare
          </Link>
        </h1>

        {/* Navigation */}
        <nav className="space-x-6">
          <Link
            to="/"
            className={isHome ? "text-indigo-600 hover:text-indigo-200" : "text-gray-700 hover:text-indigo-600"}
          >
            Home
          </Link>
          <Link
            to="/browse"
            className={isHome ? "text-indigo-600 hover:text-indigo-200" : "text-gray-700 hover:text-indigo-600"}
          >
            Browse
          </Link>
          <Link
            to="/login"
            className={isHome ? "text-indigo-600 hover:text-indigo-200" : "text-gray-700 hover:text-indigo-600"}
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;