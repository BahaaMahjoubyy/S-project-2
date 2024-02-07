// components/Chat.jsx
import React, { useState, useEffect } from 'react';
import Message from './Message';
import io from 'socket.io-client';

const socket = io.connect('/');

function Chat({ username }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    socket.on('chat message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (inputMessage.trim()) {
      const newMessage = {
        username,
        text: inputMessage,
      };

      socket.emit('chat message', newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <p>Welcome to the Chat room, {username}!</p>
      </div>
      <div className="chat-messages">
        {messages.map((message, i) => (
          <Message key={i} message={message} />
        ))}
      </div>
      <div className="chat-input">
        <form onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(event) => setInputMessage(event.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
