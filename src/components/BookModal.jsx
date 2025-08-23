function BookModal({ book, onClose }) {
  if (!book) return null

  const cover = book.cover || "https://via.placeholder.com/150x220?text=No+Cover"
  const title = book.title || "No Title Available"
  const author = book.author || "Unknown Author"
  const publisher = book.publisher || "Unknown Publisher"
  const description = book.description || "No description available."
  const publishedDate = book.publishedDate || "Unknown"
  const pageCount = book.pageCount || "Unknown"

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-6 relative overflow-y-auto max-h-[90vh]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        {/* Book cover */}
        <div className="flex justify-center mb-4">
          <img
            src={cover}
            alt={title}
            className="w-40 h-56 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Book details */}
        <h2 className="text-2xl font-semibold mb-2 text-center">{title}</h2>
        <p className="text-gray-700 mb-1">
          <span className="font-medium">Author:</span> {author}
        </p>
        <p className="text-gray-700 mb-1">
          <span className="font-medium">Publisher:</span> {publisher}
        </p>
        <p className="text-gray-700 mb-1">
          <span className="font-medium">Published:</span> {publishedDate}
        </p>
        <p className="text-gray-700 mb-1">
          <span className="font-medium">Pages:</span> {pageCount}
        </p>
        <p className="text-gray-600 mt-3 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

export default BookModal