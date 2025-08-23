// src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom"
import BookList from "./components/BookList"
import SearchBar from "./components/SearchBar"
import BookModal from "./components/BookModal"
import LandingPage from "./pages/LandingPage"
import { useState, useEffect } from "react"

function App() {
  const location = useLocation() 
  const [books, setBooks] = useState([])         // Stores fetched books
  const [loading, setLoading] = useState(false)  // Loading state
  const [error, setError] = useState(null)       // Error state
  const [selectedBook, setSelectedBook] = useState(null) // Modal state
  const [searchTerm, setSearchTerm] = useState(location.state?.searchTerm || "") 

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
            id: item.id,
            title: item.volumeInfo.title || "No Title Available",
            author: item.volumeInfo.authors ? item.volumeInfo.authors[0] : "Unknown Author",
            publisher: item.volumeInfo.publisher || "Unknown Publisher",
            cover: item.volumeInfo.imageLinks?.thumbnail || null,
            publishedDate: item.volumeInfo.publishedDate || "",
            pageCount: item.volumeInfo.pageCount || "",
            description: item.volumeInfo.description || "",
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
    if (searchTerm) fetchBooks(searchTerm)
  }, [searchTerm])

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route
        path="/browse"
        element={
          <div className="min-h-screen bg-gray-100 p-6">
            <SearchBar
              onSearch={(term) => {
                setSearchTerm(term)
                fetchBooks(term)
              }}
            />
            {loading && <p className="text-center mt-4">Loading books...</p>}
            {error && <p className="text-center text-red-500 mt-4">{error}</p>}
            {!loading && !error && (
              <BookList books={books} onBookClick={setSelectedBook} />
            )}
            {selectedBook && (
              <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
            )}
          </div>
        }
      />
    </Routes>
  )
}

export default App