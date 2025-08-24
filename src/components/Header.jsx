import React from "react";

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-indigo-600">Novare</h1>

        {/* Nav Links */}
        <nav className="space-x-6">
          <a href="/" className="text-gray-700 hover:text-indigo-600">Home</a>
          <a href="/browse" className="text-gray-700 hover:text-indigo-600">Browse</a>
          <a href="/login" className="text-gray-700 hover:text-indigo-600">Login</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;