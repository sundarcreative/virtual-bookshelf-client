# 📚 Virtual Bookshelf – Client

A responsive, animation-rich frontend React application that allows users to create and manage a personal digital bookshelf. This includes reading progress, reviews, filtering, and search — all integrated with Firebase authentication and MongoDB-backed API.

## 🔗 Live Site

👉 [https://vrbookshelf.netlify.app/](https://vrbookshelf.netlify.app/)

## 🚀 Tech Stack

- React
- Tailwind CSS
- DaisyUI
- React Router DOM
- Firebase Authentication (Google + Email/Password)
- Axios
- Framer Motion
- React Toastify
- SweetAlert2
- Swiper.js (slider)
- Lottie-react
- Recharts
- React Icons

## 🔐 Features

- 🔐 Firebase Authentication (Google & Email/Password)
- 📚 Add, update, delete books (with reading status)
- ✨ Animation-enhanced UI with Framer Motion and Lottie
- 🎨 Dark mode friendly with DaisyUI themes
- 📊 Profile dashboard with charts (Recharts)
- 🔍 Book filtering by title, author & reading status
- 💬 Reviews system (add/edit/delete per user)
- ⏫ Upvote system to highlight popular books
- 📱 Fully responsive for mobile, tablet, and desktop
- 🌈 Modern design inspired by Goodreads/LibraryThing

## 📄 Pages & Routes

- `/` – Home (slider, popular books, featured categories, extras)
- `/bookshelf` – Public book list with filters
- `/books/:id` – Book details (upvote + reviews + reading tracker)
- `/add-book` 🔒 – Add a new book (private)
- `/my-books` 🔒 – View and manage own books (update/delete)
- `/update-book/:id` 🔒 – Update specific book
- `/profile` 🔒 – Personal dashboard with stats
- `/login`, `/register` – Auth pages
- `*` – 404 not found
