import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BookDetails.css';

const BookDetails = () => {
  const { id } = useParams(); // Retrieve the book ID (ISBN) from the URL parameters
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch book details based on the ISBN
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${id}&format=json&jscmd=data`);
        const data = await response.json();

        const bookData = data[`ISBN:${id}`];

        if (bookData) {
          setBook(bookData);
        } else {
          setError('Book not found');
        }
      } catch (err) {
        setError('Failed to load book details');
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  // Show loading or error state if necessary
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="book-details">
      <h1>{book.title}</h1>
      <h3>By {book.authors ? book.authors.map(author => author.name).join(', ') : 'Unknown Author'}</h3>
      <img src={book.cover ? book.cover.large : 'https://via.placeholder.com/150'} alt={book.title} />
      <p><strong>Publisher:</strong> {book.publishers ? book.publishers[0] : 'Not available'}</p>
      <p><strong>Published Date:</strong> {book.publish_date || 'Not available'}</p>
      <p><strong>Description:</strong> {book.description || 'No description available.'}</p>
      <p><strong>Page Count:</strong> {book.number_of_pages || 'Not available'}</p>
      <p><strong>Categories:</strong> {book.subjects ? book.subjects.join(', ') : 'Not available'}</p>
      {/* Open Library doesn't provide a direct preview link, but you can link to the Open Library page */}
      <p><a href={`https://openlibrary.org${book.key}`} target="_blank" rel="noopener noreferrer">More details on Open Library</a></p>
    </div>
  );
};

export default BookDetails;
