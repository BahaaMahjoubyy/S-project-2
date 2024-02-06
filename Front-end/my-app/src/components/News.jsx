import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './News.css'; // Import the CSS file

const News = () => {

  const [newsList, setNewsList] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNews, setSelectedNews] = useState(null); // State to store the selected news item
  const [blurBackground, setBlurBackground] = useState(false); // State to toggle background blur


  const fetchAllNews = async () => {
    try {
      const response = await axios.get('http://localhost:8080/news/getAll');
      console.log('Backend Response:', response.data);

      if (Array.isArray(response.data)) {
        setNewsList(response.data);
      } else {

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
      setError('Error fetching news');
    }
  };

  useEffect(() => {
    fetchAllNews();
  }, []);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchButtonClick = () => {
    fetchNewsByTitle();
  };

  // Function to handle click on a news card to show detailed view
  const handleNewsCardClick = (news) => {
    setSelectedNews(news);
    setBlurBackground(true); // Apply background blur when detailed view is active
  };

  // Function to handle closing the detailed view
  const handleCloseDetailedView = () => {
    setSelectedNews(null);
    setBlurBackground(false); // Remove background blur when detailed view is closed
  };

  // Function to fetch news by title from the backend
  const fetchNewsByTitle = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/news/search?title=${searchTerm}`);
      console.log('Search Response:', response.data);

      if (Array.isArray(response.data)) {
        setNewsList(response.data);
      } else {
        setError('Unexpected response structure');
      }
    } catch (error) {
      console.error('Error searching news:', error);
      setError('Error searching news');
    }
  };

  return (
    <div className={`news-containerr ${blurBackground ? 'blur-background' : ''}`}>
      <h2 className="news-title-heading">All News:</h2>
      <div className="search-barr">
        <input
          className='search-inputt'
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
            <div key={news.id} className={`news-card ${selectedNews === news ? 'selected-card' : ''}`} onClick={() => handleNewsCardClick(news)}>
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

      {/* Detailed view */}
      {selectedNews && (
        <div className="detailed-view">
          <img src={selectedNews.image} alt={selectedNews.title} className="detailed-image" />
          <div className="detailed-details">
            <p className="detailed-title">{selectedNews.title}</p>
            <p className="detailed-description">{selectedNews.description}</p>
            {/* Add more fields as needed */}
          </div>
          <button className="close-button" onClick={handleCloseDetailedView}>Close</button>
        </div>
      )}
    </div>
  );
};

export default News;
