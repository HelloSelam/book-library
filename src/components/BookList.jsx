// src/components/BookList.jsx
import React, { useState, useEffect } from "react";
import BookCard from "./BookCard";

const BookList = ({ query }) => {
  const [books, setBooks] = useState([]);       // Stores fetched book data
  const [loading, setLoading] = useState(false); // Indicates loading state
  const [error, setError] = useState(null);      // Stores any API errors

  useEffect(() => {
    // Only fetch if query is not empty
    if (!query) {
      setBooks([]);
      return;
    }

    const fetchBooks = async () => {
      setLoading(true);
      setError(null);

      try {
        // Google Books API endpoint
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=20`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const data = await response.json();

        // Map API response to our BookCard-friendly structure
        const mappedBooks = data.items?.map((item) => ({
          id: item.id,
          title: item.volumeInfo.title || "No Title Available",
          authors: item.volumeInfo.authors || ["Unknown Author"],
          publisher: item.volumeInfo.publisher || "Unknown Publisher",
          publishedDate: item.volumeInfo.publishedDate || "N/A",
          description: item.volumeInfo.description || "No description available",
          thumbnail: item.volumeInfo.imageLinks?.thumbnail || "/placeholder.png", // Add placeholder if no cover
        })) || [];

        setBooks(mappedBooks);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query]); // Re-run effect when the search query changes

  // Render loading, error, or book list
  return (
    <div className="book-list-container">
      {loading && <p>Loading books...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && books.length === 0 && query && <p>No books found.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookList;