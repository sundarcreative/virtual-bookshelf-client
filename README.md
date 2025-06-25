# 📚 Virtual Bookshelf – Client

A responsive, animation-rich frontend React application that allows users to create and manage a personal digital bookshelf. This includes reading progress, reviews, filtering, and search — all integrated with Firebase authentication and MongoDB-backed API.

## 🔗 Live Site

👉 [https://vrbookshelf.netlify.app/](https://vrbookshelf.netlify.app/)

## 📸 Screenshot
![image](https://github.com/user-attachments/assets/63376271-d5f6-42d8-99b3-ab003b2760d2)
![image](https://github.com/user-attachments/assets/1ec7ed16-f069-4636-ad8f-ee25ace2f1ee)
![image](https://github.com/user-attachments/assets/72e2be02-5a69-4c97-9091-e0ce633f76d5)
![image](https://github.com/user-attachments/assets/d201d019-07d5-412b-8d49-a60b3c137e01)

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

## 💻 Local Setup Instructions

To run this project locally, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Diya-Purkayastha/virtual-bookshelf-client.git
   cd virtual-bookshelf-client
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Start the Development Server:**

   ```bash
   npm run dev
   ```

4. **Visit the App:**
   Open your browser and go to `http://localhost:5173`

---

## 🙌 Thank You for Visiting the Project!

I hope you enjoyed exploring this project. If you found it useful or inspiring, feel free to give it a ⭐ on GitHub. Your feedback is always welcome!

---

Happy Coding 🚀
