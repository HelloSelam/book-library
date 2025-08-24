// src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom"
import BookList from "./components/BookList"
import SearchBar from "./components/SearchBar"
import BookModal from "./components/BookModal"
import LandingPage from "./pages/LandingPage"
import { useState, useEffect } from "react"

function App() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const category = queryParams.get("category") // ✅ Read category from URL

  // State variables
  const [books, setBooks] = useState([]) 
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedBook, setSelectedBook] = useState(null) 
  const [searchTerm, setSearchTerm] = useState(location.state?.searchTerm || "")

  // ✅ Fetch books from Google Books API
  const fetchBooks = async (query, isCategory = false) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${
          isCategory ? "subject:" + encodeURIComponent(query) : encodeURIComponent(query)
        }&maxResults=24`
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

  // ✅ Trigger fetch when search term or category changes
  useEffect(() => {
    if (category) {
      fetchBooks(category, true) // fetch by category
    } else if (searchTerm) {
      fetchBooks(searchTerm) // fetch by search term
    }
  }, [searchTerm, category])

  return (
    <Routes>
      {/* Landing Page Route */}
      <Route path="/" element={<LandingPage />} />

      {/* Browse Page Route */}
      <Route
        path="/browse"
        element={
          <div className="min-h-screen bg-gray-100 p-6">
            {/* ✅ Always show search bar at the top */}
            <SearchBar
              onSearch={(term) => {
                setSearchTerm(term)
                fetchBooks(term)
              }}
            />

            {/* ✅ If browsing by category, show heading */}
            {category && (
              <h2 className="text-2xl font-bold mb-4">
                Browsing Category: <span className="text-blue-600">{category}</span>
              </h2>
            )}

            {/* ✅ Handle states */}
            {loading && <p className="text-center mt-4">Loading books...</p>}
            {error && <p className="text-center text-red-500 mt-4">{error}</p>}
            {!loading && !error && (
              <BookList books={books} onBookClick={setSelectedBook} />
            )}

            {/* ✅ Show modal when a book is clicked */}
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