import React from "react";

const Hero = () => {
  return (
    <section
      className="relative bg-cover bg-center h-[80vh] flex items-center justify-center text-center text-white"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512820790803-83ca734da794')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative z-10 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Innovate Your Book Shelf
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Welcome to your personal digital library. Discover, organize & enjoy
          thousands of books across every genre imaginable.
        </p>
        <a
          href="#categories"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg"
        >
          Start Exploring
        </a>
      </div>
    </section>
  );
};

export default Hero;