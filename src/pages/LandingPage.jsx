import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import CategoryCard from "../components/CategoryCard"

const categories = [
  {
    name: "Fiction",
    description: "Explore imaginative worlds and captivating stories.",
  },
  {
    name: "Science",
    description: "Dive into the world of discoveries and innovations.",
  },
  {
    name: "History",
    description: "Learn from the past with historical insights.",
  },
  {
    name: "Technology",
    description: "Stay updated with the latest tech trends and books.",
  },
]

function LandingPage() {
  const navigate = useNavigate()
  const [bookCounts, setBookCounts] = useState(Array(categories.length).fill(null))

  useEffect(() => {
    categories.forEach(async (cat, index) => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(
            cat.name
          )}&maxResults=1`
        )
        const data = await response.json()
        setBookCounts((prev) => {
          const updated = [...prev]
          updated[index] = data.totalItems
          return updated
        })
      } catch (error) {
        console.error(`Error fetching books for category ${cat.name}:`, error)
        setBookCounts((prev) => {
          const updated = [...prev]
          updated[index] = 0
          return updated
        })
      }
    })
  }, [])

  const handleCategoryClick = (categoryName) => {
    // Navigate to browse page with category pre-filled
    navigate("/browse", { state: { searchTerm: categoryName } })
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Hero Section */}
      <section className="text-center my-12">
        <h1 className="text-4xl font-bold mb-4">Discover Your Next Favorite Book</h1>
        <p className="text-gray-700 mb-6">
          Browse thousands of books across genres, authors, and categories.
        </p>
        <button
          onClick={() => navigate("/browse")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Explore Books
        </button>
      </section>

      {/* Popular Categories */}
      <section className="my-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">Explore Popular Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <CategoryCard
              key={cat.name}
              name={cat.name}
              description={cat.description}
              bookCount={bookCounts[index]}
              onClick={() => handleCategoryClick(cat.name)}
            />
          ))}
        </div>
      </section>

      {/* Why Choose Novare */}
      <section className="my-12 text-center">
        <h2 className="text-2xl font-semibold mb-6">Why Choose Novare?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold mb-2">Vast Library</h3>
            <p className="text-gray-600 text-sm">Thousands of books across multiple genres.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold mb-2">Easy Search</h3>
            <p className="text-gray-600 text-sm">Find books quickly and effortlessly.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold mb-2">Detailed Info</h3>
            <p className="text-gray-600 text-sm">Get full book details at your fingertips.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold mb-2">Personalized Experience</h3>
            <p className="text-gray-600 text-sm">Discover books suited to your interests.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage