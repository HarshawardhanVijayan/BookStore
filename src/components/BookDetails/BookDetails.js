import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BookDetails.css';

const BookDetails = ({ apiKey }) => {
  const { id } = useParams(); // Retrieve the book ID (ISBN or volume ID) from the URL parameters
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch book details based on the book ID (this is the volume ID from Google Books API)
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`
        );
        const data = await response.json();
        setBook(data.volumeInfo);
      } catch (err) {
        setError('Failed to load book details');
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id, apiKey]);

  // Show loading or error state if necessary
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="book-details">
      <h1>{book.title}</h1>
      <h3>By {book.authors ? book.authors.join(', ') : 'Unknown Author'}</h3>

      {/* Display book cover image */}
      <img
        src={book.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
        alt={book.title}
        className="book-cover"
      />

      <p><strong>Publisher:</strong> {book.publisher || 'Not available'}</p>
      <p><strong>Published Date:</strong> {book.publishedDate || 'Not available'}</p>
      
      {/* Render the description with HTML content */}
      <div className="book-description" dangerouslySetInnerHTML={{ __html: book.description || 'No description available.' }} />
      
      <p><strong>Page Count:</strong> {book.pageCount || 'Not available'}</p>
      <p><strong>Categories:</strong> {book.categories ? book.categories.join(', ') : 'Not available'}</p>

      {/* Open Google Books page */}
      <p>
        <a
          href={book.infoLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          More details on Google Books
        </a>
      </p>
    </div>
  );
};

export default BookDetails;
