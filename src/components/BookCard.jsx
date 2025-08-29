// src/components/BookCard.jsx
function BookCard({ book, onClick }) {
  const placeholder = "https://via.placeholder.com/150x220?text=No+Cover"

  const cover = book.cover || placeholder
  const title = book.title || "No Title Available"
  const author = book.author || "Unknown Author"
  const publisher = book.publisher || "Unknown Publisher"

  const handleAddToLibrary = (e) => {
    e.stopPropagation() // prevents triggering parent onClick when button is clicked
    let current = JSON.parse(localStorage.getItem("myLibrary")) || []
    if (!current.some((item) => item.id === book.id)) {
      current.push(book)
      localStorage.setItem("myLibrary", JSON.stringify(current))
      alert("✅ Book added to your library")
    } else {
      alert("⚠️ This book is already in your library")
    }
  }

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <img
        src={cover}
        alt={title}
        className="w-32 h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800 text-center line-clamp-2">
        {title}
      </h3>
      <p className="text-sm text-gray-600 text-center">{author}</p>
      <p className="text-xs text-gray-500 italic">{publisher}</p>
    </div>
  )
}

export default BookCard