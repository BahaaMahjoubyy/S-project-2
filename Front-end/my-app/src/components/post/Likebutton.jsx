// LikeButton.js
import React, { useState } from 'react';

const LikeButton = ({ onLike }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (!liked) {
      onLike();
      setLiked(true);
    }
  };

  return (
    <button className={`like-btn ${liked ? 'liked' : ''}`} onClick={handleLike}>
      {liked ? 'Liked' : 'Like'}
    </button>
  );
};

export default LikeButton;
