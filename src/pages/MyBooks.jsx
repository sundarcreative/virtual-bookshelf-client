import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import axios from 'axios';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { getFirebaseToken } from '../utils/getFirebaseToken';

const MyBooks = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);

 useEffect(() => {
  const fetchBooks = async () => {
    const token = await getFirebaseToken();
    axios.get(`https://virtual-bookshelf-server-nine.vercel.app/books/user/${user.email}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setBooks(res.data));
  };
  fetchBooks();
}, [user.email]);

  const handleDelete = async (id) => {
      const token = await getFirebaseToken();
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://virtual-bookshelf-server-nine.vercel.app/books/${id}`, {
           headers: {
          Authorization: `Bearer ${token}`
        }
        })
          .then(() => {
            setBooks(prevBooks => prevBooks.filter(b => b._id !== id));
            Swal.fire('Deleted!', 'Your book has been deleted.', 'success');
          });
      }
    });
  };

  return (
    <div className="container mx-auto p-4 ">
      <h1 className='text-3xl font-bold my-8 text-center'>My Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-neutral p-2 md:p-6 shadow-xl" >
        {books.map(book => (
          <div key={book._id} className="card bg-base-100 shadow-md">
            <figure><img src={book.cover_photo} alt={book.book_title} className="h-48 w-full object-cover" /></figure>
            <div className="card-body">
              <h3 className="card-title">{book.book_title}</h3>
              <h3 className="">{book.book_author}</h3>
              <h3 className="">{book.book_overview}</h3>
              <div className="flex justify-between mt-3">
                <Link to={`/update-book/${book._id}`} className="btn  btn-secondary">Update</Link>
                <button onClick={() => handleDelete(book._id)} className="btn  bg-red-500">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBooks;
