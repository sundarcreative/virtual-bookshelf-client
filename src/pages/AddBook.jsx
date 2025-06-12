import { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthProvider';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    book_title: '',
    cover_photo: '',
    total_page: '',
    book_author: '',
    book_category: 'Fiction',
    reading_status: 'Want-to-Read',
    book_overview: '',
    upvote: 0,
    user_email: user.email,
    user_name: user.displayName
  });

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('https://your-server-url/api/books', formData)
      .then(() => {
        toast.success('Book added!');
        navigate('/my-books');
      })
      .catch(() => toast.error('Error adding book'));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-200 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Book</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input className="input input-bordered" name="book_title" placeholder="Book Title" required onChange={handleChange} />
        <input className="input input-bordered" name="cover_photo" placeholder="Cover Photo URL" required onChange={handleChange} />
        <input className="input input-bordered" name="book_author" placeholder="Author" required onChange={handleChange} />
        <input className="input input-bordered" name="total_page" type="number" placeholder="Total Pages" required onChange={handleChange} />
        <textarea className="textarea textarea-bordered" name="book_overview" placeholder="Overview" required onChange={handleChange} />
        <select className="select select-bordered" name="book_category" onChange={handleChange}>
          <option>Fiction</option>
          <option>Non-Fiction</option>
          <option>Fantasy</option>
        </select>
        <select className="select select-bordered" name="reading_status" onChange={handleChange}>
          <option>Want-to-Read</option>
          <option>Reading</option>
          <option>Read</option>
        </select>
        <button className="btn btn-primary mt-2">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
