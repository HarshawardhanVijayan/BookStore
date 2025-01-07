import React, { useState, useEffect } from 'react';
import BookCard from '../BookCard/BookCard';
import '../User/User.css'

const BookList = ({ query, apiKey }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.items) {
          setBooks(data.items);
        }
      })
      .catch((error) => console.log(error));
  }, [query]);

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
