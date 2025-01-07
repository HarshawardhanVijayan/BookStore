import React from 'react';
import { motion } from 'framer-motion';
import '../User/User.css'

const BookCard = ({ book }) => {
  const bookInfo = book.volumeInfo;

  return (
    <motion.div
      className="book-card"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img
        className="book-image"
        src={
          bookInfo.imageLinks?.thumbnail ||
          'https://via.placeholder.com/150x200'
        }
        alt={bookInfo.title}
      />
      <div className="book-info">
        <h3 className="book-title">{bookInfo.title}</h3>
        <p className="book-author">
          {bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown Author'}
        </p>
      </div>
    </motion.div>
  );
};

export default BookCard;
