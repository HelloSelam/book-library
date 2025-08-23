// src/components/BookList.jsx
import React from "react"
import BookCard from "./BookCard"

const BookList = ({ books }) => {
  if (!books || books.length === 0) {
    return <p className="text-center mt-4">No books found.</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {books.map((book, index) => (
        <BookCard key={index} book={book} />
      ))}
    </div>
  )
}

export default BookList