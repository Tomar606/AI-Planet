import React from 'react';
import logoai2 from '../assets/logoai2.png'

const ChatWindow = ({ messages, loading }) => {
  return (
    <div className="flex flex-col p-4 space-y-4 overflow-y-auto h-full relative pt-12">
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
          <p>Loading...</p>
        </div>
      )}
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex items-center p-4 rounded-lg m-4 ${
            msg.isUser ? 'bg-white text-left' : 'bg-white text-right'
          }`}
        >
          {msg.isUser ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7 mr-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          
          ) : (
            <img src={logoai2} alt="AI" className="h-7 w-7 mr-4" />
          )}
          <p className="text-lg">{msg.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
