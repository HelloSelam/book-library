// src/pages/BookDetails.jsx
import { useLocation, useParams } from "react-router-dom"

export default function BookDetails() {
  const { id } = useParams()
  const location = useLocation()
  const book = location.state?.book

  if (!book) {
    return <p className="p-6 text-center">Loading book details...</p>
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-xl">
      <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
      <p className="text-lg font-medium">Author: {book.author}</p>
      <p className="text-md italic text-gray-600">Publisher: {book.publisher}</p>
      <p className="text-sm text-gray-500">Published: {book.publishedDate}</p>

      {/* Cover Image */}
      {book.cover && (
        <img
          src={book.cover}
          alt={book.title}
          className="my-6 w-48 h-auto rounded-lg shadow"
        />
      )}

      {/* Description */}
      <p className="mt-4 text-gray-700 leading-relaxed">
        {book.description || "No description available."}
      </p>
    </div>
  )
}