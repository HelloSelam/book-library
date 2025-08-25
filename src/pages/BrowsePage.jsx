// src/pages/BrowsePage.jsx
import { useState, useEffect, useRef } from "react"
import SearchBar from "../components/SearchBar"
import BookModal from "../components/BookModal"

// --- CategoryRow Component for horizontal scrolling ---
function CategoryRow({ title, query, onBookClick }) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const rowRef = useRef(null)

  // Fetch books for this category
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(
            query
          )}&maxResults=20&printType=books&orderBy=relevance&langRestrict=en`
        )
        const data = await response.json()
        const booksData =
          data.items?.map((item) => ({
            id: item.id,
            title: item.volumeInfo.title || "No Title Available",
            author: item.volumeInfo.authors
              ? item.volumeInfo.authors[0]
              : "Unknown Author",
            publisher: item.volumeInfo.publisher || "Unknown Publisher",
            cover: item.volumeInfo.imageLinks?.thumbnail || null,
            description: item.volumeInfo.description || "",
            publishedDate: item.volumeInfo.publishedDate || "",
            pageCount: item.volumeInfo.pageCount || "",
          })) || []
        setBooks(booksData)
      } catch (err) {
        console.error("Error fetching category:", title, err)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [query, title])

  // Scroll Left/Right handlers
  const scroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = direction === "left" ? -500 : 500
      rowRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold mb-3">{title}</h2>

      {loading ? (
        <p>Loading {title}...</p>
      ) : books.length > 0 ? (
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2 shadow z-10"
          >
            ◀
          </button>

          {/* Book List */}
          <div
            ref={rowRef}
            className="flex overflow-x-auto space-x-4 scrollbar-hide px-8"
          >
            {books.map((book) => (
              <div
                key={book.id}
                onClick={() => onBookClick(book)}
                className="flex-shrink-0 w-40 cursor-pointer hover:scale-105 transition-transform"
              >
                <img
                  src={
                    book.cover ||
                    "https://via.placeholder.com/128x192?text=No+Cover"
                  }
                  alt={book.title}
                  className="w-full h-56 object-cover rounded-lg shadow"
                />
                <h3 className="mt-2 text-sm font-semibold truncate">
                  {book.title}
                </h3>
                <p className="text-xs text-gray-600 truncate">{book.author}</p>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2 shadow z-10"
          >
            ▶
          </button>
        </div>
      ) : (
        <p>No books found for {title}.</p>
      )}
    </div>
  )
}

export default function BrowsePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [loadingSearch, setLoadingSearch] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)

  // Search functionality (works globally)
  const fetchSearchResults = async (query) => {
    setLoadingSearch(true)
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query
        )}&maxResults=24&printType=books&orderBy=relevance&langRestrict=en`
      )
      const data = await response.json()
      const results =
        data.items?.map((item) => ({
          id: item.id,
          title: item.volumeInfo.title || "No Title Available",
          author: item.volumeInfo.authors
            ? item.volumeInfo.authors[0]
            : "Unknown Author",
          publisher: item.volumeInfo.publisher || "Unknown Publisher",
          cover: item.volumeInfo.imageLinks?.thumbnail || null,
          description: item.volumeInfo.description || "",
          publishedDate: item.volumeInfo.publishedDate || "",
          pageCount: item.volumeInfo.pageCount || "",
        })) || []
      setSearchResults(results)
    } catch (err) {
      console.error("Error fetching search:", err)
      setSearchResults([])
    } finally {
      setLoadingSearch(false)
    }
  }

  // Handle search bar input
  const handleSearch = (term) => {
    setSearchTerm(term)
    if (term) fetchSearchResults(term)
    else setSearchResults([])
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      {/* Search Results */}
      {searchTerm ? (
        <div>
          <h2 className="text-2xl font-bold mt-6 mb-4">
            Search Results for: <span className="text-blue-600">{searchTerm}</span>
          </h2>
          {loadingSearch ? (
            <p>Loading...</p>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {searchResults.map((book) => (
                <div
                  key={book.id}
                  onClick={() => setSelectedBook(book)}
                  className="cursor-pointer hover:scale-105 transition-transform"
                >
                  <img
                    src={
                      book.cover ||
                      "https://via.placeholder.com/128x192?text=No+Cover"
                    }
                    alt={book.title}
                    className="w-full h-48 object-cover rounded shadow"
                  />
                  <h3 className="mt-2 text-sm font-semibold truncate">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-600 truncate">{book.author}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-gray-600">No results found.</p>
          )}
        </div>
      ) : (
        // Default Categories when not searching
        <div>
          <CategoryRow title="Classic Books" query="classic literature" onBookClick={setSelectedBook} />
          <CategoryRow title="Romance" query="romance" onBookClick={setSelectedBook} />
          <CategoryRow title="Kids" query="children" onBookClick={setSelectedBook} />
          <CategoryRow title="Thrillers" query="thriller" onBookClick={setSelectedBook} />
        </div>
      )}

      {/* Book Modal */}
      {selectedBook && (
        <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  )
}