
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';
import Lottie from 'lottie-react';
import why from '../assets/animation/review.json'

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [editingReview, setEditingReview] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`https://virtual-bookshelf-server-nine.vercel.app/books/${id}`).then(res => setBook(res.data));
    axios.get(`https://virtual-bookshelf-server-nine.vercel.app/reviews/${id}`).then(res => setReviews(res.data));
  }, [id]);

  const handleUpvote = () => {
    axios.patch(`https://virtual-bookshelf-server-nine.vercel.app/books/upvote/${id}`, { email: user.email })
      .then(() => {
        toast.success('Upvoted!');
        // Refetch the updated book data
        axios.get(`https://virtual-bookshelf-server-nine.vercel.app/books/${id}`).then(res => setBook(res.data));
      })
      .catch(err => toast.error(err.response?.data?.message));
  };


  const handleReview = () => {
    if (editingReview) {
      axios.put(`https://virtual-bookshelf-server-nine.vercel.app/reviews/${editingReview._id}`, {
        review_text: reviewText
      }).then(() => {
        toast.success("Review updated");
        const updated = reviews.map(r =>
          r._id === editingReview._id ? { ...r, review_text: reviewText } : r
        );
        setReviews(updated);
        setEditingReview(null);
        setReviewText('');
        //console.log(res.data);
      });
    } else {
      axios.post(`https://virtual-bookshelf-server-nine.vercel.app/reviews`, {
        book_id: id,
        user_email: user.email,
        review_text: reviewText
      })
        .then(res => {
          toast.success('Review posted');
          setReviews([res.data, ...reviews]);
          setReviewText('');
        })
        .catch(err => toast.error(err.response?.data?.message));
    }
  };



  const handleEdit = (review) => {
    setReviewText(review.review_text);
    setEditingReview(review);
  };

  const handleDelete = (reviewId) => {
    if (confirm("Delete this review?")) {
      axios.delete(`https://virtual-bookshelf-server-nine.vercel.app/reviews/${reviewId}`)
        .then(() => {
          toast.success("Review deleted");
          setReviews(reviews.filter(r => r._id !== reviewId));
        });
    }
  };
  const updateStatus = (newStatus) => {
    axios.put(`https://virtual-bookshelf-server-nine.vercel.app/books/${id}`, { reading_status: newStatus })
      .then(res => {
        if (res.data.modifiedCount > 0) {
          toast.success('Reading status updated');
          setBook({ ...book, reading_status: newStatus });
        }
      });
  };



  if (!book) return <div className="p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="card lg:card-side bg-base-100 gap-5 justify-center items-center shadow-xl mb-6 p-6">
        <figure className="h-[600px]"><img src={book.cover_photo} alt={book.book_title} /></figure>
        <div className="flex flex-col justify-center gap-3 p-2">
          <h2 className="card-title text-3xl">{book.book_title}</h2>
          <p className='text-lg'><strong>Author:</strong> {book.book_author}</p>
          <p className='text-lg'><strong>Category:</strong> {book.book_category}</p>
          <p className='text-lg'><strong>Pages:</strong> {book.total_page}</p>
          <p className='text-lg'><strong>Status:</strong> {book.reading_status}</p>
          <p className='text-lg'>{book.book_overview}</p>
          <div className="flex items-center justify-between">
            <p className="font-semibold text-primary">Upvotes: {book.upvote}</p>
            {user?.email && user.email !== book.user_email &&
              <button onClick={handleUpvote} className="btn btn-primary btn-sm">Upvote</button>}
          </div>
        </div>
      </div>
      {/* Reading Progress Tracker */}
      <div className="my-10">
        <h4 className="font-semibold mb-2 text-lg">📖 Reading Progress</h4>
        <progress
          className="progress progress-primary w-full"
          value={
            book.reading_status === 'Want-to-Read'
              ? 0
              : book.reading_status === 'Reading'
                ? 50
                : 100
          }
          max="100"
        ></progress>

        <div className="text-sm mt-1 text-green-500">
          {book.reading_status === 'Want-to-Read' && 'You plan to read this book.'}
          {book.reading_status === 'Reading' && 'You are currently reading this book.'}
          {book.reading_status === 'Read' && 'You have finished reading this book.'}
        </div>
      </div>


      {user?.email === book.user_email && (
        <div className="mt-4 flex gap-3">
          {book.reading_status === 'Want-to-Read' && (
            <button
              onClick={() => updateStatus('Reading')}
              className="btn btn-sm btn-primary"
            >
              Mark as Reading
            </button>
          )}
          {book.reading_status === 'Reading' && (
            <button
              onClick={() => updateStatus('Read')}
              className="btn btn-sm btn-success"
            >
              Mark as Read
            </button>
          )}
        </div>
      )}


       <h3 className="text-3xl font-bold text-center text-primary mt-10">Give Your Thoughts & Opinions</h3>
      <div className='container mx-auto my-10 px-4 grid md:grid-cols-2 gap-10 items-start bg-base-200 shadow-lg rounded-xl'>
        <div className="flex justify-center items-center">
          <Lottie animationData={why} className="w-full max-w-xl h-auto" ></Lottie>
        </div>
        <div className="mb-4 lg:mt-10 ">
        <h3 className="text-2xl font-bold ">Review</h3>
        {user &&
          <div className="flex flex-col gap-3 mb-6">
            <textarea className="textarea textarea-bordered h-60 w-full resize-none" placeholder="Write a review..." value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
            <button className="btn btn-secondary btn-sm w-32" onClick={handleReview}>Submit</button>
          </div>
        }
        <ul className="space-y-4">
          {reviews.map(r => (
            <li key={r._id} className="bg-base-300 p-3 rounded relative">
              <p className="text-sm font-semibold">{r.user_email}</p>
              <p>{r.review_text}</p>

              {user?.email === r.user_email && (
                <div className="mt-2 flex gap-2">
                  <button
                    className="btn btn-xs btn-secondary"
                    onClick={() => handleEdit(r)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-xs bg-red-500"
                    onClick={() => handleDelete(r._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>

      </div>
      </div>
    </div>
  );
};

export default BookDetails;
