// src/components/BookList.jsx
import React from "react"
import BookCard from "./BookCard"

const BookList = ({ books, onBookClick }) => {
  if (!books || books.length === 0) {
    return <p className="text-center mt-4">No books found.</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onClick={() => onBookClick(book)} />
      ))}
    </div>
  )
}

export default BookList