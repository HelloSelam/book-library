// src/App.jsx
import { useState, useEffect } from "react"
import BookList from "./components/BookList"
import SearchBar from "./components/SearchBar"

function App() {
  const [books, setBooks] = useState([])         // Stores fetched books
  const [loading, setLoading] = useState(false)  // Loading state
  const [error, setError] = useState(null)       // Error state

  const fetchBooks = async (searchTerm) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          searchTerm
        )}&maxResults=12`
      )
      if (!response.ok) {
        throw new Error("Failed to fetch books")
      }

      const data = await response.json()
      const booksData =
        data.items?.map((item) => ({
            title: item.volumeInfo.title || "No Title Available",
            author: item.volumeInfo.authors ? item.volumeInfo.authors[0] : "Unknown Author",
            publisher: item.volumeInfo.publisher || "Unknown Publisher",
            cover: item.volumeInfo.imageLinks?.thumbnail || null,
        })) || []

      setBooks(booksData)
    } catch (err) {
      console.error(err)
      setError(err.message)
      setBooks([])
    } finally {
      setLoading(false)
    }
  }

  // Fetch default books on load
  useEffect(() => {
    fetchBooks("harry potter")
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* SearchBar triggers fetchBooks */}
      <SearchBar onSearch={fetchBooks} />

      {/* Loading and error messages */}
      {loading && <p className="text-center mt-4">Loading books...</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      {/* BookList displays books */}
      {!loading && !error && <BookList books={books} />}
    </div>
  )
}

export default App