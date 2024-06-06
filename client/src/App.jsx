import { useState } from 'react';
import Navbar from './components/Navbar';
import ChatWindow from './components/ChatWindow';
import ChatInputBar from './components/ChatInputBar';

const App = () => {
  const [messages, setMessages] = useState([]); // Initialize messages with an empty array

  const handleSendMessage = (message) => {
    setMessages([...messages, { text: message, isUser: true }]);
    // Add response from AI here
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: 'AI response here...', isUser: false },
    ]);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-grow overflow-hidden">
        <ChatWindow messages={messages} />
      </div>
      <ChatInputBar onSendMessage={handleSendMessage} />
    </div>
  );
};

export default App;
