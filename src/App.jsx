import { useState, useEffect } from "react"
import BookList from "./components/BookList"
import SearchBar from "./components/SearchBar"

function App() {
  const [books, setBooks] = useState([])

  const fetchBooks = async (searchTerm) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=12`
      )
      const data = await response.json()
      const booksData = data.items?.map((item) => ({
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors ? item.volumeInfo.authors[0] : "Unknown Author",
        publisher: item.volumeInfo.publisher || "Unknown Publisher",
        cover: item.volumeInfo.imageLinks?.thumbnail || null,
      })) || []
      setBooks(booksData)
    } catch (error) {
      console.error("Error fetching books:", error)
    }
  }

  // Fetch default books on load
  useEffect(() => {
    fetchBooks("harry potter")
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <SearchBar onSearch={fetchBooks} />
      <BookList books={books} />
    </div>
  )
}

export default App