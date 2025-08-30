import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import booksImage from "../assets/cover_image.jpg";

const Hero = () => {
  return (
    <section className="bg-purple-300 px-4 md:px-20 pt-20">
      {/* Hero Card */}
      <div className="bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between px-8 md:px-16 mt-3 py-14">
        
        {/* Left Side */}
        <div className="mb-10 max-w-xl md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold font-sans text-gray-900 leading-snug py-0">
            Innovate Your Book Shelf
          </h1>
          <p className="mt-4 text-base font-sans text-gray-700 italic">
            Welcome to your personal digital library. Discover, organize & enjoy
            thousands of books across every genre imaginable.
          </p>
          <div className="mt-16">
            <Link
              to="/browse"   // Navigate to browse page
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-colors"
            >
              Start Exploring
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="mt-10 md:mt-0">
          <img
            src={booksImage}
            alt="Bookshelf"
            className="w-[350px] md:w-[450px] h-auto rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;