import { useEffect, useState } from 'react';
import BookCard from '../components/BookCard.jsx'
import axios from 'axios';

const Bookshelf = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/books')
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  const filtered = books.filter(book =>
    (book.book_title.toLowerCase().includes(query.toLowerCase()) ||
     book.book_author.toLowerCase().includes(query.toLowerCase())) &&
    (status ? book.reading_status === status : true)
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className='text-3xl font-bold my-8 text-center'>All Books</h1>
      <div className="mb-4 flex flex-col md:flex-row items-center justify-center gap-4">
        <input
          type="text"
          placeholder="Search by title or author"
          className="input input-bordered w-full md:w-1/2"
          onChange={(e) => setQuery(e.target.value)}
        />
        <select className="select select-bordered" onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="Read">Read</option>
          <option value="Reading">Reading</option>
          <option value="Want-to-Read">Want-to-Read</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map(book => <BookCard key={book._id} book={book}></BookCard>)}
      </div>
    </div>
  );
};

export default Bookshelf;
