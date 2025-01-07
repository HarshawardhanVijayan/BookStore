import React, { useState } from 'react';
import Welcome from '../Welcome/Welcome';
import BookList from '../BookList/BookList';
import './User.css';

const User = ({apiKey}) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <Welcome />
      <div className="page-container">
        <BookList query="fiction" apiKey={apiKey}/>
      </div>
    </div>
  );
};

export default User;
