// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './News.css'; // Import the CSS file

const News = () => {

  const [newsList, setNewsList] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');


  const fetchAllNews = async () => {
    try {

      const response = await axios.get('http://localhost:8080/news/getAll');
      console.log('Backend Response:', response.data);


      if (Array.isArray(response.data)) {

        setNewsList(response.data);
      } else {

        setError('Unexpected response structure');
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      // Update the error state
      setError('Error fetching news');
    }
  };

  // Function to fetch news by title from the backend
  const fetchNewsByTitle = async () => {
    try {
      // Make a GET request to your backend endpoint for searching news by title
      const response = await axios.get(`http://localhost:8080/news/search?title=${searchTerm}`);
      console.log('Search Response:', response.data);

      // Check if the response data is an array
      if (Array.isArray(response.data)) {
        // Update the newsList state with the search results
        setNewsList(response.data);
      } else {
        // Handle unexpected response structure
        setError('Unexpected response structure');
      }
    } catch (error) {
      console.error('Error searching news:', error);
      // Update the error state
      setError('Error searching news');
    }
  };

  // useEffect hook to fetch news when the component mounts
  useEffect(() => {
    fetchAllNews();
  }, []); // Empty dependency array to fetch news only once when the component mounts

  // Function to handle search term changes
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to handle search button click
  const handleSearchButtonClick = () => {
    fetchNewsByTitle();
  };

  return (
    <div className='news-containerr'>
      <h2 className="news-title-heading">All News:</h2>
      <div className="search-barr">
        <input className='search-inputt'
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <button className='search-buttonn' onClick={handleSearchButtonClick}>Search</button>
      </div>
      {error ? (
        <p>{error}</p>
      ) : newsList.length > 0 ? (
        <div className="news-cards-container">
          {newsList.map((news) => (
            <div key={news.id} className="news-card">
              {news.image && <img src={news.image} alt={news.title} className="news-image" />}
              <div className="news-details">
                <p className="news-title">{news.title}</p>
                <p className="news-description">{news.description}</p>
                {/* Add more fields as needed */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No news available.</p>
      )}
    </div>
  );
};

export default News;
