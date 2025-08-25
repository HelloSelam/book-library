// src/components/Categories.jsx
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

// Map categories to Google Books subjects
const categoriesList = [
  { name: "Fiction", description: "Explore imaginative stories across all genres.", subject: "fiction" },
  { name: "Science", description: "Dive into discoveries, inventions, and the natural world.", subject: "science" },
  { name: "History", description: "Learn from the past, explore events and cultures.", subject: "history" },
  { name: "Technology", description: "Stay ahead with books on innovation and progress.", subject: "computers" },
]

export default function Categories() {
  const [categories, setCategories] = useState(categoriesList)
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch total number of books per category from Google Books API
    async function fetchCategoryData() {
      const updated = await Promise.all(
        categoriesList.map(async (cat) => {
          try {
            const res = await fetch(
              `https://www.googleapis.com/books/v1/volumes?q=subject:${cat.subject}&maxResults=1`
            )
            const data = await res.json()
            return {
              ...cat,
              count: data.totalItems ? data.totalItems.toLocaleString() : "N/A",
            }
          } catch (error) {
            console.error("Error fetching category:", cat.name, error)
            return { ...cat, count: "N/A" }
          }
        })
      )
      setCategories(updated)
    }

    fetchCategoryData()
  }, [])

  // Navigate to browse page with query parameter using valid subject
  const handleCategoryClick = (category) => {
    navigate(`/browse?category=${encodeURIComponent(category.subject)}`)
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Popular Categories</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => handleCategoryClick(cat)}
              className="p-6 bg-white shadow-lg rounded-2xl hover:shadow-xl transition cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-2">{cat.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{cat.description}</p>
              <p className="text-gray-800 font-medium">
                {cat.count ? `${cat.count} books` : "Loading..."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
