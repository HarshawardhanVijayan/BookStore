import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './components/Hero/Hero';
import BookDetails from './components/BookDetails/BookDetails';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Navigation from './components/Navigation/Navigation';
import './App.css';
import WelcomePage from './components/Welcome/Welcome';
import User from './components/User/User';

const App = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_BOOK_API_KEY;

  return (
    <Router>
      {/* <Navigation apiKey={apiKey} /> */}
      {/* <Routes>
        <Route path="/" element={<Hero apiKey={apiKey} />} />
        <Route path="/book/:id" element={<BookDetails apiKey={apiKey} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes> */}
      <User apiKey={apiKey}/>
    </Router>
  );
};

export default App;
