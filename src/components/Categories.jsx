import React from "react";

const categories = [
  { name: "Science Fiction", desc: "Explore futuristic worlds & ideas", count: "1200+" },
  { name: "Romance", desc: "Love stories that touch your heart", count: "950+" },
  { name: "History", desc: "Dive into the past & learn from it", count: "700+" },
  { name: "Mystery", desc: "Uncover thrilling secrets & puzzles", count: "800+" },
];

const Categories = () => {
  return (
    <section id="categories" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">Explore Popular Categories</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-indigo-600">{cat.name}</h3>
              <p className="text-gray-600 mt-2">{cat.desc}</p>
              <p className="mt-4 text-sm text-gray-500">{cat.count} books</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;