import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import BookModal from "../components/BookModal";

// --- CategoryRow Component with hover arrows & placeholder covers ---
function CategoryRow({ title, query, onBookClick }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const rowRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  // Fetch books for this category
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
            query
          )}&maxResults=20&printType=books&orderBy=relevance&langRestrict=en`
        );
        const data = await response.json();
        const booksData =
          data.items?.map((item) => ({
            id: item.id,
            title: item.volumeInfo.title || "No Title Available",
            author: item.volumeInfo.authors
              ? item.volumeInfo.authors[0]
              : "Unknown Author",
            publisher: item.volumeInfo.publisher || "Unknown Publisher",
            cover:
              item.volumeInfo.imageLinks?.thumbnail ||
              "/no-cover.png" ||
              "https://via.placeholder.com/128x192?text=No+Cover",
            description: item.volumeInfo.description || "",
            publishedDate: item.volumeInfo.publishedDate || "",
            pageCount: item.volumeInfo.pageCount || "",
          })) || [];
        setBooks(booksData);
      } catch (err) {
        console.error("Error fetching category:", title, err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query, title]);

  // Scroll Left/Right handlers
  const scroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold mb-3">{title}</h2>

      {loading ? (
        <p>Loading {title}...</p>
      ) : books.length > 0 ? (
        <div
          className="relative"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {/* Left Arrow */}
          {hovering && (
            <button
              onClick={() => scroll("left")}
              className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-200 rounded-full p-2 shadow z-10"
            >
              ◀
            </button>
          )}

          {/* Book List */}
          <div
            ref={rowRef}
            className="flex overflow-x-auto space-x-5 no-scrollbar px-6 md:px-8"
          >
            {books.map((book) => (
              <div
                key={book.id}
                onClick={() => onBookClick(book)}
                className="flex-shrink-0 w-25 sm:w-36 md:w-40 cursor-pointer hover:scale-105 transition-transform"
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-40 sm:h-44 md:h-48 object-cover rounded-lg shadow"
                  onError={(e) => {
                    e.target.src = "/no-cover.png";
                  }}
                />
                <h3 className="mt-2 text-xs sm:text-sm font-semibold truncate">
                  {book.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-600 truncate">
                  {book.author}
                </p>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          {hovering && (
            <button
              onClick={() => scroll("right")}
              className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-200 rounded-full p-2 shadow z-10"
            >
              ▶
            </button>
          )}
        </div>
      ) : (
        <p>No books found for {title}.</p>
      )}
    </div>
  );
}

export default function BrowsePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  // ✅ Read category from query params
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");

  // Search functionality
  const fetchSearchResults = async (query) => {
    setLoadingSearch(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query
        )}&maxResults=24&printType=books&orderBy=relevance&langRestrict=en`
      );
      const data = await response.json();
      const results =
        data.items?.map((item) => ({
          id: item.id,
          title: item.volumeInfo.title || "No Title Available",
          author: item.volumeInfo.authors
            ? item.volumeInfo.authors[0]
            : "Unknown Author",
          publisher: item.volumeInfo.publisher || "Unknown Publisher",
          cover:
            item.volumeInfo.imageLinks?.thumbnail ||
            "/no-cover.png" ||
            "https://via.placeholder.com/128x192?text=No+Cover",
          description: item.volumeInfo.description || "",
          publishedDate: item.volumeInfo.publishedDate || "",
          pageCount: item.volumeInfo.pageCount || "",
        })) || [];
      setSearchResults(results);
    } catch (err) {
      console.error("Error fetching search:", err);
      setSearchResults([]);
    } finally {
      setLoadingSearch(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term) fetchSearchResults(term);
    else setSearchResults([]);
  };

  return (
    <div className="min-h-screen bg-purple-200 p-6 pt-24">
      {/* ✅ added pt-24 so content starts below the fixed header */}

      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      {/* Search Results */}
      {searchTerm ? (
        <div>
          <h2 className="text-2xl font-bold mt-6 mb-4">
            Search Results for:{" "}
            <span className="text-blue-600">{searchTerm}</span>
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
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-44 sm:h-48 object-cover rounded shadow"
                    onError={(e) => {
                      e.target.src = "/no-cover.png";
                    }}
                  />
                  <h3 className="mt-2 text-sm font-semibold truncate">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-600 truncate">
                    {book.author}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-gray-600">No results found.</p>
          )}
        </div>
      ) : (
        <div>
          {/* ✅ If category param exists, show it at the top */}
          {category && (
            <CategoryRow
              title={`${category.charAt(0).toUpperCase() + category.slice(1)} Books`}
              query={category}
              onBookClick={setSelectedBook}
            />
          )}

          {/* ✅ Preloaded categories (always shown) */}
          <CategoryRow
            title="Classic Books"
            query="classic literature"
            onBookClick={setSelectedBook}
          />
          <CategoryRow
            title="Romance"
            query="romance"
            onBookClick={setSelectedBook}
          />
          <CategoryRow
            title="Kids"
            query="children"
            onBookClick={setSelectedBook}
          />
          <CategoryRow
            title="Thrillers"
            query="thriller"
            onBookClick={setSelectedBook}
          />
        </div>
      )}

      {/* Book Modal */}
      {selectedBook && (
        <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
}