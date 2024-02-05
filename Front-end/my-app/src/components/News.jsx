// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './News.css'; // Import the CSS file

const News = () => {
  // State to store the list of news
  const [newsList, setNewsList] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch all news from the backend
  const fetchAllNews = async () => {
    try {
      // Make a GET request to your backend endpoint for getting all news
      const response = await axios.get('http://localhost:8080/news/getAll');
      console.log('Backend Response:', response.data);

      // Check if the response data is an array
      if (Array.isArray(response.data)) {
        // Update the newsList state with the response data
        setNewsList(response.data);
      } else {
        // Handle unexpected response structure
        setError('Unexpected response structure');
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      // Update the error state
      setError('Error fetching news');
    }
  };

  // useEffect hook to fetch news when the component mounts
  useEffect(() => {
    fetchAllNews();
  }, []); // Empty dependency array to fetch news only once when the component mounts

  return (
    <div className="news-container">
      <h2>All News:</h2>
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
