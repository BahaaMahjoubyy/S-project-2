// components/Message.jsx
import React from 'react';

function Message({ message }) {
  const { username, text } = message;

  return (
    <div className="message">
      <p className="message-username">{username}:</p>
      <p className="message-text">{text}</p>
    </div>
  );
}

export default Message;
