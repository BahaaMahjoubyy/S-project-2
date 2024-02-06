// Post.js
import React from 'react';
import './Post.css'; // Import your CSS file for styling

const Post = ({ post, onDelete, onUpdate, onAddToFavorites }) => {
  const { id, title, content, date, user, image } = post;

  const handleDelete = () => {
    onDelete(id);
  };

  const handleUpdate = () => {
    onUpdate(id);
  };

  const handleAddToFavorites = () => {
    onAddToFavorites(id);
  };

  return (
    <div className="post-container">
      <div className="user-info">
        <img className="user-image" src={user.image} alt="User" />
        <span className="username">{user.username}</span>
      </div>
      <div className="post-content">
        <h3>{title}</h3>
        <p>{content.length > 100 ? `${content.slice(0, 100)}...` : content}</p>
        {content.length > 100 && <button className="read-more">Read more</button>}
      </div>
      <div className="post-footer">
        <span className="post-date">{date}</span>
        <div className="actions">
          <button className="delete-btn" onClick={handleDelete}>Delete</button>
          <button className="update-btn" onClick={handleUpdate}>Update</button>
          <button className="favorite-btn" onClick={handleAddToFavorites}>Add to Favorites</button>
        </div>
      </div>
    </div>
  );
};

export default Post;
