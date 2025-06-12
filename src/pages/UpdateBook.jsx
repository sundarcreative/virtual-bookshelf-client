import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-toastify';

const UpdateBook = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/books/${id}`).then(res => {
      if (res.data.user_email !== user.email) {
        toast.error("Unauthorized");
        navigate('/');
      } else {
        setBook(res.data);
      }
    });
  }, [id]);

  const handleChange = e => {
    setBook(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = e => {
    e.preventDefault();
    axios.put(`http://localhost:3000/books/${id}`, book)
      .then(() => {
        toast.success('Book updated!');
        navigate('/my-books');
      });
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-200 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Update Book</h2>
      <form onSubmit={handleUpdate} className="grid grid-cols-1 gap-4">
        <input className="input input-bordered" name="book_title" value={book.book_title} onChange={handleChange} />
        <input className="input input-bordered" name="cover_photo" value={book.cover_photo} onChange={handleChange} />
        <input className="input input-bordered" name="book_author" value={book.book_author} onChange={handleChange} />
        <input className="input input-bordered" name="total_page" type="number" value={book.total_page} onChange={handleChange} />
        <textarea className="textarea textarea-bordered" name="book_overview" value={book.book_overview} onChange={handleChange} />
        <select className="select select-bordered" name="book_category" value={book.book_category} onChange={handleChange}>
          <option>Fiction</option>
          <option>Non-Fiction</option>
          <option>Fantasy</option>
        </select>
        <select className="select select-bordered" name="reading_status" value={book.reading_status} onChange={handleChange}>
          <option>Want-to-Read</option>
          <option>Reading</option>
          <option>Read</option>
        </select>
        <button className="btn btn-primary mt-2">Update Book</button>
      </form>
    </div>
  );
};

export default UpdateBook;
