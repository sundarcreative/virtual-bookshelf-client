import { useParams } from 'react';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-toastify';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:3000/books/${id}`).then(res => setBook(res.data));
    axios.get(`http://localhost:3000/reviews/${id}`).then(res => setReviews(res.data));
  }, [id]);

  const handleUpvote = () => {
    axios.patch(`http://localhost:3000/books/${id}/upvote`, { email: user.email })
      .then(res => {
        toast.success('Upvoted!');
        setBook(res.data);
      })
      .catch(err => toast.error(err.response?.data?.message));
  };

  const handleReview = () => {
    axios.post(`http://localhost:3000/reviews`, {
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
  };

  if (!book) return <div className="p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="card lg:card-side bg-base-100 shadow-xl mb-6">
        <figure><img src={book.cover_photo} alt={book.book_title} className="h-64" /></figure>
        <div className="card-body">
          <h2 className="card-title">{book.book_title}</h2>
          <p><strong>Author:</strong> {book.book_author}</p>
          <p><strong>Category:</strong> {book.book_category}</p>
          <p><strong>Status:</strong> {book.reading_status}</p>
          <p>{book.book_overview}</p>
          <div className="flex items-center justify-between">
            <p className="font-semibold text-primary">Upvotes: {book.upvote}</p>
            {user?.email && user.email !== book.user_email &&
              <button onClick={handleUpvote} className="btn btn-primary btn-sm">Upvote</button>}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-bold">Reviews</h3>
        {user &&
          <div className="flex flex-col gap-2 mb-4">
            <textarea className="textarea textarea-bordered" placeholder="Write a review..." value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
            <button className="btn btn-accent btn-sm w-32" onClick={handleReview}>Submit</button>
          </div>
        }
        <ul className="space-y-2">
          {reviews.map(r => (
            <li key={r._id} className="bg-base-200 p-3 rounded">
              <p className="text-sm font-semibold">{r.user_email}</p>
              <p>{r.review_text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookDetails;
