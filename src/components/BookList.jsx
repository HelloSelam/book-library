import BookCard from "./BookCard"

function BookList({ books }) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {books.map((book, index) => (
        <BookCard
          key={index}
          cover={book.cover}
          title={book.title}
          author={book.author}
          publisher={book.publisher}
        />
      ))}
    </div>
  )
}

export default BookList