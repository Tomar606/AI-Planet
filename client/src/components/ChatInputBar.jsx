import { useState } from 'react';
import axios from 'axios';

const ChatInputBar = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');

      // Fetch the filename from local storage
      const pdfName = localStorage.getItem('pdfName');

      // Send user message to the backend along with the filename
      try {
        const response = await axios.post('https://ai-planet-kuz9.onrender.com/api/ask-question', {
          filename: pdfName || '', // If pdfName is null or undefined, send an empty string
          question: message
        });
        const aiResponse = response.data.answer; // Adjust this based on your backend response format
        // Display AI response as a message
        onSendMessage(aiResponse);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className='pb-12 pl-2 md:pl-24 pr-2 md:pr-24'>
      <div className="relative flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Send a message..."
          className={`flex-grow shadow-md p-4 pr-12 border rounded-lg items-center ${!message ? 'bg-gray-100' : 'bg-white'}`} // Increased padding for height
          style={{ height: '48px' }} // Additional inline style to increase height
        />
        <button
          onClick={handleSendMessage}
          className="absolute right-0 top-0 mt-1.5 mr-1.5 text-black p-2 rounded-lg flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatInputBar;
