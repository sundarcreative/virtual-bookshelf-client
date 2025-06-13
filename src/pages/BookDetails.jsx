
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [editingReview, setEditingReview] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:3000/books/${id}`).then(res => setBook(res.data));
    axios.get(`http://localhost:3000/reviews/${id}`).then(res => setReviews(res.data));
  }, [id]);

  const handleUpvote = () => {
    axios.patch(`http://localhost:3000/books/upvote/${id}`, { email: user.email })
      .then(() => {
        toast.success('Upvoted!');
        // Refetch the updated book data
        axios.get(`http://localhost:3000/books/${id}`).then(res => setBook(res.data));
      })
      .catch(err => toast.error(err.response?.data?.message));
  };


  const handleReview = () => {
    if (editingReview) {
      axios.put(`http://localhost:3000/reviews/${editingReview._id}`, {
        review_text: reviewText
      }).then(res => {
        toast.success("Review updated");
        const updated = reviews.map(r =>
          r._id === editingReview._id ? { ...r, review_text: reviewText } : r
        );
        setReviews(updated);
        setEditingReview(null);
        setReviewText('');
        console.log(res.data);
      });
    } else {
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
    }
  };



  const handleEdit = (review) => {
    setReviewText(review.review_text);
    setEditingReview(review);
  };

  const handleDelete = (reviewId) => {
    if (confirm("Delete this review?")) {
      axios.delete(`http://localhost:3000/reviews/${reviewId}`)
        .then(() => {
          toast.success("Review deleted");
          setReviews(reviews.filter(r => r._id !== reviewId));
        });
    }
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
            <li key={r._id} className="bg-base-200 p-3 rounded relative">
              <p className="text-sm font-semibold">{r.user_email}</p>
              <p>{r.review_text}</p>

              {user?.email === r.user_email && (
                <div className="mt-2 flex gap-2">
                  <button
                    className="btn btn-xs btn-warning"
                    onClick={() => handleEdit(r)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-xs btn-error"
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
  );
};

export default BookDetails;
