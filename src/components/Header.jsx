import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  
  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all ${
        isHome ? "bg-transparent shadow-none" : "bg-white shadow-md"
      }`}
    >
      <div className="container mx-auto mt-1 flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <h1 className="text-3xl font-extrabold font-mono bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
          <Link
            to="/"
            className={
              isHome
                ? "text-indigo-600 hover:text-indigo-200"
                : "text-indigo-600 hover:text-indigo-800"
            }
          >
            Novare
          </Link>
        </h1>

        {/* Navigation */}
        <nav className="flex items-center space-x-6 relative">
          <Link
            to="/"
            className={
              isHome
                ? "text-indigo-600 hover:text-indigo-200"
                : "text-gray-700 hover:text-indigo-600"
            }
          >
            Home
          </Link>
          <Link
            to="/browse"
            className={
              isHome
                ? "text-indigo-600 hover:text-indigo-200"
                : "text-gray-700 hover:text-indigo-600"
            }
          >
            Browse
          </Link>
          <Link
            to="/mylibrary"
            className={
              isHome
                ? "text-indigo-600 hover:text-indigo-200"
                : "text-gray-700 hover:text-indigo-600"
            }
          >
            My Library
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;