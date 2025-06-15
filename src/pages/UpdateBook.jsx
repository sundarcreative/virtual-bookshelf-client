import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-toastify';
import Lottie from 'lottie-react';
import update from '../assets/animation/update.json'
import Loading from '../components/Loading';
import { getFirebaseToken } from '../utils/getFirebaseToken';

const UpdateBook = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const token = await getFirebaseToken();
      axios.get(`https://virtual-bookshelf-server-nine.vercel.app/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          if (res.data.user_email !== user.email) {
            toast.error("Unauthorized");
            navigate('/');
          } else {
            setBook(res.data);
          }
        });
    };
    fetchBook();
  }, [id]);


  const handleChange = e => {
    setBook(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async e => {
    e.preventDefault();
    const token = await getFirebaseToken();
    axios.put(`https://virtual-bookshelf-server-nine.vercel.app/books/${id}`, book, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        toast.success('Book updated!');
        navigate('/my-books');
      })
      .catch(() => {
        toast.error('Update failed');

      });
  };


  if (!book) return <div><Loading></Loading></div>;

  return (
    <div className='container mx-auto my-10 px-4'>
      <div className="text-center mx-auto my-8 space-y-3">
        <h1 className="text-4xl font-bold text-primary">📖 Refine Your Story</h1>
        <p className="italic text-sm text-base-content max-w-2xl mx-auto">
          “You can’t go back and change the beginning, but you can start where you are and change the ending.” — C.S. Lewis
        </p>
      </div>
      <div className=' grid md:grid-cols-2 gap-10 items-start bg-neutral shadow-lg rounded-xl'>
        <div className="flex justify-center items-center">
          <Lottie animationData={update}></Lottie>
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
    </div>

  );
};

export default UpdateBook;
