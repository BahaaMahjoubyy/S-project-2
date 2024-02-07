// CommunityHighlight.jsx

import React from 'react';
import '../css/highlight.css'

const CommunityHighlight = ({ highlight }) => {
  const { title, description, imageSrc } = highlight;

  return (
    <div className="community-highlight">
      <img src={imageSrc} alt={title} />
      <div className="highlight-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default CommunityHighlight;


