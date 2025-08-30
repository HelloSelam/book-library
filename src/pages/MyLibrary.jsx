import { useState, useEffect } from "react"
import BookCard from "../components/BookCard"
import BookModal from "../components/BookModal"

function MyLibrary() {
  const [library, setLibrary] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("myLibrary")) || []
    setLibrary(saved)
  }, [])

  const handleRemove = (id) => {
    const updated = library.filter((book) => book.id !== id)
    setLibrary(updated)
    localStorage.setItem("myLibrary", JSON.stringify(updated))
  }

  return (
    <div className="bg-purple-300 mt-6 p-20 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">📚 My Library</h1>
      {library.length === 0 ? (
        <p className="text-gray-600">No books saved yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {library.map((book) => (
            <div
              key={book.id}
              onClick={() => setSelectedBook(book)}
              className="relative cursor-pointer"
            >
              <BookCard book={book} />
            </div>
          ))}
        </div>
      )}

      {/* Modal for details */}
      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onRemove={handleRemove}
        />
      )}
    </div>
  )
}

export default MyLibrary