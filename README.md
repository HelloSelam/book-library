# 📚 Book Library App

![React](https://img.shields.io/badge/React-17.0.2-blue?logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.2-blue?logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-4.4.9-purple?logo=vite&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-Repository-black?logo=github&logoColor=white)

A responsive web application built with **React** that allows users to search, browse, and view details of books using the **Google Books API**. Designed as a capstone project to demonstrate front-end development, state management, and API integration skills.

---

## **Features**

- **Browse by Categories**: Classic, Romance, Kids, Thrillers, and more.  
- **Search Books**: Search by title, author, or category.  
- **Book Details Modal**: Click on a book to view its description, publisher, pages, and published date.  
- **Responsive UI**: Works across desktop, tablet, and mobile.  
- **Fallback Cover Image**: Displays a local `no_cover.jpeg` when a book cover is missing.  
- **Smooth Horizontal Scrolling**: Category rows have hover arrows for easy navigation.  
- **Clean & Reusable Components**: Includes `BookCard`, `BookModal`, `SearchBar`, and `Categories`.  

---

## **Tech Stack**

- **Frontend**: React, Tailwind CSS  
- **API**: Google Books API  
- **State Management**: React Hooks (`useState`, `useEffect`, `useRef`)  
- **Deployment**: Vercel  

---

## **Project Structure**

```text
src/
│
├─ assets/           # Images and other static assets
├─ components/       # Reusable React components
│   ├─ BookCard.jsx
│   ├─ BookModal.jsx
│   ├─ Categories.jsx
│   ├─ Header.jsx
│   ├─ Hero.jsx
│   ├─ SearchBar.jsx
│   └─ WhyChooseNovare.jsx
├─ pages/            # Page-level components / routes
│   ├─ BrowsePage.jsx
│   ├─ LandingPage.jsx
│   └─ MyLibrary.jsx
├─ App.jsx           # Main App component
└─ main.jsx          # Entry point

---

## **Notes**

- All books are fetched in real-time from the **Google Books API**.  
- Missing book covers use a local placeholder `no_cover.jpeg`.  
- The app is fully responsive and tested on multiple screen sizes.  

---

## **Author**

**Selamawit Yeruk**  
- Front-End & Back-End Developer (ALX Programs)  
- Passionate about building clean, responsive web apps  
