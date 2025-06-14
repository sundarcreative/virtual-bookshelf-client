import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-toastify';
import Lottie from 'lottie-react';
import add from '../assets/animation/addbook.json'

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
      console.log('Updating book with data:', book);
      navigate('/my-books');
    })
    .catch(err => {
      toast.error('Update failed');
      console.error(err.response?.data || err.message);
    });
};


  if (!book) return <div>Loading...</div>;

  return (
    <div className='container mx-auto my-10 px-4 grid md:grid-cols-2 gap-10 items-start bg-neutral shadow-lg rounded-xl'>
          <div  className="flex justify-center items-center">
            <Lottie animationData={add}></Lottie>
          </div>
    <div className="p-6 flex flex-col gap-3 rounded-lg">
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
    </div>
  );
};

export default UpdateBook;
