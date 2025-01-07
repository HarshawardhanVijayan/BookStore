import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navigation.css';

const Navigation = ({ apiKey }) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    const query = event.target.value;
    setSearch(query);

    if (query.length > 2) {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`
        );
        const data = await response.json();
        setResults(data.items || []);
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    } else {
      setResults([]);
    }
  };

  const handleResultClick = (bookId) => {
    setResults([]);
    navigate(`/book/${bookId}`);
    setSearch('');
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="nav"
    >
      <div className="nav-grid">
        <div className="brand" onClick={() => navigate("/")}>
          Book<span className="buddy">Buddy</span>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={handleSearch}
          />
          {results.length > 0 && (
            <div className="search-results">
              <ul>
                {results.slice(0, 5).map((book) => (
                  <li
                    key={book.id}
                    onClick={() => handleResultClick(book.id)}
                  >
                    <span className="book-title">{book.volumeInfo.title}</span>
                    <p className="book-author">
                      {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="nav-buttons">
          <motion.button
            className="nav-btn sign-in"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
          >
            Sign In
          </motion.button>

          <motion.button
            className="nav-btn register"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/register")}
          >
            Register
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
