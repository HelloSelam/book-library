// src/components/BookCard.jsx
function BookCard({ book }) {
  const placeholder = "https://via.placeholder.com/150x220?text=No+Cover"
  const cover = book?.cover || placeholder
  const title = book?.title || "No Title Available"
  const author = book?.author || "Unknown Author"
  const publisher = book?.publisher || "Unknown Publisher"

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
      <img
        src={cover}
        alt={title}
        className="w-32 h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800 text-center">{title}</h3>
      <p className="text-sm text-gray-600">{author}</p>
      <p className="text-xs text-gray-500 italic">{publisher}</p>
    </div>
  )
}

export default BookCard