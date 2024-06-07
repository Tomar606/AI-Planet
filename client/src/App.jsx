import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ChatWindow from './components/ChatWindow';
import ChatInputBar from './components/ChatInputBar';
import axios from 'axios';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (message) => {
    const newUserMessage = { text: message, isUser: true };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    
    try {
      setLoading(true);
      const response = await axios.post('http://127.0.0.1:8000/api/ask-question', {
        filename: localStorage.getItem('pdfName'), // Fetch the filename from localStorage
        question: message
      });
      const aiResponse = response.data.answer;
      setMessages((prevMessages) => [...prevMessages, { text: aiResponse, isUser: false }]);
      setLoading(false);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'There was a problem fetching the response.', isUser: false }
      ]);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-grow overflow-hidden">
        <ChatWindow messages={messages} loading={loading} />
      </div>
      <ChatInputBar onSendMessage={handleSendMessage} />
    </div>
  );
};

export default App;
