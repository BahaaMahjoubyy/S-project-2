// Comment.js
import React from 'react';

const Comment = ({ comment }) => {
  const { id, text, user } = comment;

  return (
    <div className="comment-container">
      <div className="user-info">
        <img className="user-image" src={user.image} alt="User" />
        <span className="username">{user.username}</span>
      </div>
      <p className="comment-text">{text}</p>
    </div>
  );
};

export default Comment;
