/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'Inter', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        'card': '1rem', // rounded corners for book cards
      },
      boxShadow: {
        'card': '0 8px 24px rgba(0,0,0,0.08)', // soft card shadow
      },
    },
  },
  plugins: [],
}

