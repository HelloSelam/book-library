// src/pages/BrowsePage.jsx
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import SearchBar from "../components/SearchBar"
import BookList from "../components/BookList"
import BookModal from "../components/BookModal"

export default function BrowsePage() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const category = queryParams.get("category") || "fiction" // default to fiction if no category

  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedBook, setSelectedBook] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const fetchBooks = async (query, isCategory = false) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${
          isCategory ? "subject:" + encodeURIComponent(query) : encodeURIComponent(query)
        }&maxResults=24&printType=books&orderBy=relevance&langRestrict=en`
      )

      if (!response.ok) throw new Error("Failed to fetch books")
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

  // Fetch books on load and when search/category changes
  useEffect(() => {
    if (searchTerm) {
      fetchBooks(searchTerm)
    } else {
      fetchBooks(category, true)
    }
  }, [searchTerm, category])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Search Bar */}
      <SearchBar
        onSearch={(term) => setSearchTerm(term)}
      />

      {/* Category heading */}
      {category && (
        <h2 className="text-2xl font-bold mb-4">
          Browsing Category: <span className="text-blue-600">{category}</span>
        </h2>
      )}

      {/* Loading/Error */}
      {loading && <p className="text-center mt-6">Loading books...</p>}
      {error && <p className="text-center text-red-500 mt-6">{error}</p>}

      {/* Book List */}
      {!loading && !error && books.length > 0 && (
        <BookList books={books} onBookClick={setSelectedBook} />
      )}
      {!loading && !error && books.length === 0 && (
        <p className="text-center mt-6 text-gray-600">No books found.</p>
      )}

      {/* Book Modal */}
      {selectedBook && (
        <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  )
}