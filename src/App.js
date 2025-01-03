import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './components/Hero/Hero';
import BookDetails from './components/BookDetails/BookDetails'
import './App.css';
import Navigation from './components/Navigation/Navigation';

const App = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_BOOK_API_KEY;

  return (
    <Router>
      <Navigation apiKey={apiKey}/>
      <Routes>
        <Route path="/" element={<Hero apiKey={apiKey} />} />
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
