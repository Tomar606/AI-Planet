import React from 'react';

const Message = ({ text, isUser }) => {
  const userProfile = 'path/to/user-profile.png'; // Replace with the actual path to user profile icon
  const aiProfile = 'path/to/ai-profile.png'; // Replace with the actual path to AI profile icon

  return (
    <div className={`flex items-start ${isUser ? 'justify-start' : 'justify-start'}`}>
      <img
        src={isUser ? userProfile : aiProfile}
        alt="Profile"
        className="h-8 w-8 rounded-full mr-2"
      />
      <div className={`p-2 rounded-lg ${isUser ? 'bg-blue-100 text-left' : 'bg-green-100 text-left'}`}>
        {text}
      </div>
    </div>
  );
};

export default Message;
