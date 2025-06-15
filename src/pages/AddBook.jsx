import { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import Lottie from 'lottie-react';
import add from '../assets/animation/addbook.json'
import { getFirebaseToken } from '../utils/getFirebaseToken';

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

  const handleSubmit = async e => {
  e.preventDefault();
  const token = await getFirebaseToken();

  axios.post('https://virtual-bookshelf-server-nine.vercel.app/books', formData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(() => {
    toast.success('Book added!');
    navigate('/my-books');
  })
  .catch(() => toast.error('Error adding book'));
};

  return (
    <div className='container mx-auto my-10 px-4'>
      <div className="text-center mx-auto mb-10 space-y-3">
      <h1 className="text-4xl font-bold text-primary">📘 Your Next Favorite Book Lives Here</h1>
      <p className="italic text-sm text-base-content max-w-2xl mx-auto">
        “A reader lives a thousand lives before he dies. The man who never reads lives only one.” — George R.R. Martin
      </p>
    </div>

      <div className='grid md:grid-cols-2 gap-10 items-start bg-base-200 shadow-lg rounded-xl'>
      <div  className="flex justify-center items-center">
        <Lottie animationData={add}></Lottie>
      </div>
      <div className="p-6 flex flex-col gap-3 rounded-lg">
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
    </div>
    </div>
    
  );
};

export default AddBook;
