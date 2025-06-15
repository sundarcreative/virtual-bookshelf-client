import { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import { motion } from 'framer-motion';
import { Fade } from 'react-awesome-reveal';

const PopularBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('https://virtual-bookshelf-server-nine.vercel.app/books')
      .then(res => {
        const sorted = res.data.sort((a, b) => b.upvote - a.upvote);
        setBooks(sorted.slice(0, 9)); // Top 9 books
      });
  }, []);

  return (
    <section className="container mx-auto px-4 my-24">
      <h2 className="text-4xl font-bold mb-6 text-center">📚 Popular Books</h2>
      <Fade direction='up' delay={300} triggerOnce>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map((book, i) => (
          <motion.div
            key={book._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.03 }}
          >
            <BookCard book={book} />
          </motion.div>
        ))}
      </div>
      </Fade>
      
    </section>
  );
};

export default PopularBooks;
