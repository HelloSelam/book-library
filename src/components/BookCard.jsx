function BookCard({ cover, title, author, publisher }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
      <img 
        src={cover || "https://via.placeholder.com/150x220?text=No+Cover"} 
        alt={title} 
        className="w-32 h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800 text-center">{title}</h3>
      <p className="text-sm text-gray-600">{author || "Unknown Author"}</p>
      <p className="text-xs text-gray-500 italic">{publisher || "Unknown Publisher"}</p>
    </div>
  )
}

export default BookCard