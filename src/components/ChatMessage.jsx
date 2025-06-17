import React from 'react';
import { Bot, User } from 'lucide-react';

const ChatMessage = ({ message, isDarkMode }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex w-full py-4 px-4 ${isUser ? 'justify-end' : 'justify-start'} ${
      isDarkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'
    } transition-colors duration-200`}>
      <div className={`flex max-w-[85%] sm:max-w-[70%] ${isUser ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser 
            ? 'bg-blue-500 text-white' 
            : isDarkMode 
              ? 'bg-gray-700 text-gray-300' 
              : 'bg-gray-200 text-gray-600'
        } transition-colors duration-200`}>
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </div>
        
        {/* Message Bubble */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`px-4 py-3 rounded-2xl max-w-full break-words ${
            isUser
              ? 'bg-blue-500 text-white rounded-br-sm'
              : isDarkMode
                ? 'bg-gray-700 text-gray-100 rounded-bl-sm'
                : 'bg-gray-200 text-gray-800 rounded-bl-sm'
          } transition-all duration-200 hover:shadow-md`}>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
          </div>
          
          {/* Timestamp */}
          <span className={`text-xs mt-1 px-2 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;