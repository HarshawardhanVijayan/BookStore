import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // Import framer-motion for animations
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Hero.css'; // Import the corresponding CSS

const Hero = ({ apiKey }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('fiction'); // Default genre query
  const [error, setError] = useState(null);

  // Function to fetch books based on the genre (query)
  const fetchBooks = async (categoryQuery) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${categoryQuery}&key=${apiKey}`
      );
      const data = await response.json();

      // Check if books were found and set them
      if (data.items) {
        setBooks(data.items);
      } else {
        setError('No books found for the selected category.');
      }
    } catch (err) {
      setError('An error occurred while fetching books.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch books when the genre changes
  useEffect(() => {
    fetchBooks(query);
  }, [query]);

  // Genres to display for selection
  const genres = [
    { name: 'Fiction', query: 'fiction' },
    { name: 'Non-fiction', query: 'nonfiction' },
    { name: 'Science Fiction', query: 'science+fiction' },
    { name: 'Fantasy', query: 'fantasy' },
    { name: 'Mystery', query: 'mystery' },
    { name: 'Romance', query: 'romance' },
    { name: 'Thriller', query: 'thriller' },
    { name: 'Historical Fiction', query: 'historical+fiction' },
    { name: 'Biography', query: 'biography' },
    { name: 'Self-Help', query: 'self+help' }
  ];

  return (
    <div className="hero">
      <div className="hero-header">
        <h1>Discover Amazing Books</h1>
        <p>Explore curated categories of books that might interest you.</p>
      </div>

      {/* Genre Dropdown Selection */}
      <div className="category-dropdown">
        <label htmlFor="genre-select">Select Genre: </label>
        <select
          id="genre-select"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="genre-select"
        >
          {genres.map((genre) => (
            <option key={genre.query} value={genre.query}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      {/* Recommended Books Section */}
      <motion.div
        className="recommended-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Recommended Books</h2>
        <div className="book-list">
          {books.length > 0 ? (
            books.map((book, index) => (
              <div key={index} className="book-item">
                <Link to={`/book/${book.id}`} className="book-link">
                  <img
                    src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
                    alt={book.volumeInfo.title}
                    className="book-cover"
                  />
                  <h3>{book.volumeInfo.title}</h3>
                  <p>{book.volumeInfo.authors?.join(', ') || 'Unknown Author'}</p>
                </Link>
              </div>
            ))
          ) : (
            <div>No books found for the selected genre.</div>
          )}
        </div>
      </motion.div>

      {/* Loading/Error States */}
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Hero;
