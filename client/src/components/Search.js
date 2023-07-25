import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import placeholder from '../assets/placeholder.png';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchStatus, setSearchStatus] = useState('');
  const searchContainerRef = useRef(null);

  const handleSearchChange = async (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    try {
      const response = await axios.get(`http://localhost:5051/search/${searchTerm}`, {
        withCredentials: true,
      });

      if (searchTerm.trim() === '') {
        setSearchStatus('');
        setSearchResults([]);
      } else if (response.data.data.length === 0) {
        setSearchStatus('User not available');
        setSearchResults([]);
      } else {
        setSearchStatus('');
        setSearchResults(response.data.data);
      }
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleDocumentClick = (event) => {
    if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Find friends, communities here..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {searchStatus && <p>{searchStatus}</p>}

      {searchResults.length > 0 && (
        <div ref={searchContainerRef} className="search-results">
          <ul className="search-results">
            {searchResults.map((result) => (
              <li key={result.UserID} className="search-result">
                <img src={result.dp_url ? result.dp_url : placeholder} alt="profile" />
                <div className='result-content'>
                <p>{result.full_name}</p>
                <p>@{result.username}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
