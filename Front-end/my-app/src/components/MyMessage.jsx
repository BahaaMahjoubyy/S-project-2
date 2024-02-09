import React, { useState, useEffect } from 'react';
import axios from 'axios';


const MyMessage  = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    
    axios.get('http://localhost:8080/chat/')
      .then(response => setMessages(response.data))
      .catch(error => console.error('Error fetching messages:', error));
  }, []);

  const handleDelete = (messageId) => {
    // Make a delete request to the server
    axios.delete(`http://localhost:3001/messages/${messageId}`)
      .then(response => {
        if (response.data.success) {
          // Update the state to reflect the deletion
          setMessages(messages.filter(message => message.id !== messageId));
        }
      })
      .catch(error => console.error('Error deleting message:', error));
  };

  const handleUpdate = (messageId, updatedMessage) => {
    // Make a put request to the server
    axios.put(`http://localhost:3001/messages/${messageId}`, { updatedMessage })
      .then(response => {
        if (response.data.success) {
          // Update the state to reflect the update
          setMessages(messages.map(message =>
            message.id === messageId ? { ...message, text: updatedMessage } : message
          ));
        }
      })
      .catch(error => console.error('Error updating message:', error));
  };

  return (
    <div>
      {messages.map(message => (
        <MyMessage
          key={message.id}
          message={message}
          onDelete={() => handleDelete(message.id)}
          onUpdate={(updatedMessage) => handleUpdate(message.id, updatedMessage)}
        />
      ))}
    </div>
  );
};

export default MyMessage ;
