import React from 'react';
import { Link } from 'react-router';


const BookCard = ({ book }) => {
  const {
    _id,
    book_title,
    cover_photo,
    book_author,
    book_category,
    upvote,
  } = book;

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all">
      <figure className="h-48">
        <img src={cover_photo} alt={book_title} className="object-cover w-full h-full" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{book_title}</h2>
        <p className="text-sm text-gray-500">by {book_author}</p>
        <p className="badge  badge-secondary">{book_category}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm font-medium text-primary">Upvotes: {upvote}</span>
          <Link to={`/books/${_id}`} className="btn btn-sm btn-primary">Details</Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
