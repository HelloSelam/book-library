import { useState, useEffect } from "react"

function BookModal({ book, onClose, onRemove }) {
  if (!book) return null

  const cover = book.cover || "https://via.placeholder.com/150x220?text=No+Cover"
  const title = book.title || "No Title Available"
  const author = book.author || "Unknown Author"
  const publisher = book.publisher || "Unknown Publisher"
  const description = book.description || "No description available."
  const publishedDate = book.publishedDate || "Unknown"
  const pageCount = book.pageCount || "Unknown"

  const [inLibrary, setInLibrary] = useState(false)

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("myLibrary")) || []
    setInLibrary(stored.some((item) => item.id === book.id))
  }, [book.id])

  const handleAddToLibrary = () => {
    const stored = JSON.parse(localStorage.getItem("myLibrary")) || []
    if (!stored.some((item) => item.id === book.id)) {
      stored.push({
        id: book.id,
        title,
        author,
        cover,
        publisher,
        publishedDate,
        pageCount,
        description,
      })
      localStorage.setItem("myLibrary", JSON.stringify(stored))
      setInLibrary(true)
    }
  }

  const handleRemoveFromLibrary = () => {
    let stored = JSON.parse(localStorage.getItem("myLibrary")) || []
    stored = stored.filter((item) => item.id !== book.id)
    localStorage.setItem("myLibrary", JSON.stringify(stored))
    setInLibrary(false)

    // Notify parent if available
    if (onRemove) {
      onRemove(book.id)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
        >
          &times;
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Book cover */}
          <div className="flex-shrink-0 flex justify-center">
            <img
              src={cover}
              alt={title}
              className="w-44 h-64 object-cover rounded-xl shadow-md"
            />
          </div>

          {/* Book details */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Author:</span> {author}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Publisher:</span> {publisher}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Published:</span> {publishedDate}
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Pages:</span> {pageCount}
            </p>

            {/* Library actions */}
            {inLibrary ? (
              <button
                onClick={handleRemoveFromLibrary}
                className="px-4 py-2 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700"
              >
                Remove from My Library
              </button>
            ) : (
              <button
                onClick={handleAddToLibrary}
                className="px-4 py-2 rounded-lg font-medium bg-purple-600 text-white hover:bg-purple-700"
              >
                + Add to My Library
              </button>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mt-6 border-t pt-4">
          <h3 className="font-semibold text-lg mb-2">Description</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default BookModal