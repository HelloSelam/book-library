import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="container-page py-6">
      {/* Header reflects the clean, roomy style from your design */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Book Library</h1>
        <p className="text-gray-600">Search and explore books from Open Library.</p>
      </header>

      {/* Sample card to verify shadows, rounding, spacing */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <article className="card p-4">
          <h2 className="card-title">Sample Book Title</h2>
          <p className="card-subtle">Author Name</p>
        </article>
      </section>
    </main>
  )
}

export default App