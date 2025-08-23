// src/components/CategoryCard.jsx
function CategoryCard({ name, description, bookCount, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
    >
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <p className="text-gray-500 text-sm">
        {bookCount !== null ? `${bookCount}+ books` : "Loading..."}
      </p>
    </div>
  )
}

export default CategoryCard