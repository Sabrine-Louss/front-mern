import React, { useState, useEffect } from 'react';
import { FaComments } from 'react-icons/fa';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const ChatApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== '') {
      const newMessage = { text: inputMessage, sender: 'user' };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      socket.emit('sendMessage', newMessage);
      setInputMessage('');
    }
  };

  return (
    <div style={styles.container}>
      {isOpen ? (
        <div style={styles.chatWindow}>
          <div style={styles.chatHeader}>
            <h3>Chat with us</h3>
            <button onClick={toggleChat} style={styles.closeButton}>X</button>
          </div>
          <div style={styles.messageArea}>
            {messages.map((msg, index) => (
              <div key={index} style={msg.sender === 'user' ? styles.userMessage : styles.botMessage}>
                {msg.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} style={styles.inputArea}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
              style={styles.input}
            />
            <button type="submit" style={styles.sendButton}>Send</button>
          </form>
        </div>
      ) : (
        <div onClick={toggleChat} style={styles.chatIcon}>
          <FaComments />
        </div>
      )}
    </div>
  );
};


const styles = {
  container: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000,
  },
  chatIcon: {
    backgroundColor: '#e60000',
    color: 'white',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: '24px',
  },
  chatWindow: {
    width: '300px',
    height: '400px',
    backgroundColor: '#1a1a1a',
    borderRadius: '10px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  chatHeader: {
    backgroundColor: '#e60000',
    color: 'white',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '18px',
    cursor: 'pointer',
  },
  messageArea: {
    flex: 1,
    overflowY: 'auto',
    padding: '10px',
  },
  userMessage: {
    backgroundColor: '#333',
    color: 'white',
    padding: '8px',
    borderRadius: '10px',
    marginBottom: '5px',
    maxWidth: '70%',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#555',
    color: 'white',
    padding: '8px',
    borderRadius: '10px',
    marginBottom: '5px',
    maxWidth: '70%',
    alignSelf: 'flex-start',
  },
  inputArea: {
    display: 'flex',
    padding: '10px',
  },
  input: {
    flex: 1,
    padding: '8px',
    borderRadius: '20px',
    border: 'none',
    marginRight: '5px',
  },
  sendButton: {
    backgroundColor: '#e60000',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    padding: '8px 15px',
    cursor: 'pointer',
  },
};

export default ChatApp; 