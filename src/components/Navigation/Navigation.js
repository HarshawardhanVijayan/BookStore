import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Navigation.css';

const BookstoreIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="40" height="40">
    <rect x="15" y="20" width="70" height="12" fill="#007bff" />
    <rect x="15" y="35" width="60" height="12" fill="#0056b3" />
    <rect x="15" y="50" width="50" height="12" fill="#003366" />
    <line x1="15" y1="20" x2="15" y2="32" stroke="#fff" strokeWidth="1" />
    <line x1="15" y1="35" x2="15" y2="47" stroke="#fff" strokeWidth="1" />
    <line x1="15" y1="50" x2="15" y2="62" stroke="#fff" strokeWidth="1" />
    <rect x="15" y="20" width="70" height="12" fill="transparent" stroke="#fff" strokeWidth="2" />
    <rect x="15" y="35" width="60" height="12" fill="transparent" stroke="#fff" strokeWidth="2" />
    <rect x="15" y="50" width="50" height="12" fill="transparent" stroke="#fff" strokeWidth="2" />
    <path d="M 50 10 Q 55 15, 60 10 Q 65 15, 70 10" fill="transparent" stroke="#007bff" strokeWidth="2" />
  </svg>
);

const Navigation = ({ apiKey }) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  const handleSearch = async (event) => {
    const query = event.target.value;
    setSearch(query);

    if (query.length > 2) { // Fetch results only for queries with more than 2 characters
      try {
        if (!apiKey) {
          console.error("Google Books API key is missing!");
        }

        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`
        );
        const data = await response.json();
        setResults(data.items || []);
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    } else {
      setResults([]); // Clear results for short queries
    }
  };

  // Limit the results to 3
  const limitedResults = results.slice(0, 3);

  const handleResultClick = (bookId) => {
    setResults([]); // Clear search results when clicking a book
    navigate(`/book/${bookId}`); // Navigate to the BookDetails page
    setSearch('')
  };

  return (
    <div className="nav">
      <ul className="nav-list">
        {/* Bookstore Icon placed before the search bar */}
        <li className="icon-container">
          <BookstoreIcon />
        </li>
        <li className="search-container">
          <input
            type="text"
            placeholder="Search for books"
            value={search}
            onChange={handleSearch}
          />
          {limitedResults.length > 0 && (
            <div className="search-results">
              <ul>
                {limitedResults.map((book) => (
                  <li
                    key={book.id}
                    className="search-result-item"
                    onClick={() => handleResultClick(book.id)} // Handle click to navigate to book details
                  >
                    <span className="book-title">{book.volumeInfo.title}</span>
                    <p className="book-author">
                      {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
        <li>Home</li>
        <li>About us</li>
        <li>Contact</li>
        <li>Login/Signup</li>
      </ul>
    </div>
  );
};

export default Navigation;
