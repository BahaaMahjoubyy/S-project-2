import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you use axios for making HTTP requests
import "./Posts.css"

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from the server when the component mounts
    axios.get('http://localhost:8080/posts/AllPosts')
      .then(response => {
        setPosts(response.data); // Update state with fetched posts
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div className="posts-container">
      <h1 className="posts-heading">All Posts</h1>
      <div className="posts-list">
        {posts.map(post => (
          <div key={post.id} className="post">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-content">{post.content}</p>
            {post.image && <img className="post-image" src={post.image} alt={post.title} />}
            {/* Add additional post details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;
