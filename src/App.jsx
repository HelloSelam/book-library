import BookList from "./components/BookList"

function App() {
  const sampleBooks = [
    {
      cover: "https://covers.openlibrary.org/b/id/10523353-L.jpg",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      publisher: "Charles Scribner's Sons",
    },
    {
      cover: "https://covers.openlibrary.org/b/id/240727-L.jpg",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      publisher: "T. Egerton",
    },
    {
      cover: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
      title: "1984",
      author: "George Orwell",
      publisher: "Secker & Warburg",
    },
  ]

  return (
    <>
      <main className="container-page py-6">
        {/* Header reflects the clean, roomy style from your design */}
        <header className="mb-6">
          <h1 className="text-2xl font-bold">Book Library</h1>
          <p className="text-gray-600">Search and explore books from Open Library.</p>
        </header>

        <div className="min-h-screen bg-gray-100 p-6">
          <BookList books={sampleBooks} />
        </div>

      </main>
    </>
  )
}

export default App