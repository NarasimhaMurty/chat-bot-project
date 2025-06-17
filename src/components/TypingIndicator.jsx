import React from 'react';
import { Bot } from 'lucide-react';

const TypingIndicator = ({ isDarkMode }) => {
  return (
    <div className={`flex w-full py-4 px-4 justify-start ${
      isDarkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'
    } transition-colors duration-200`}>
      <div className="flex max-w-[85%] sm:max-w-[70%] gap-3">
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
        } transition-colors duration-200`}>
          <Bot size={16} />
        </div>
        
        {/* Typing Animation */}
        <div className={`px-4 py-3 rounded-2xl rounded-bl-sm ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
        } transition-all duration-200`}>
          <div className="flex space-x-1">
            <div className={`w-2 h-2 rounded-full animate-bounce ${
              isDarkMode ? 'bg-gray-400' : 'bg-gray-500'
            }`} style={{ animationDelay: '0ms' }}></div>
            <div className={`w-2 h-2 rounded-full animate-bounce ${
              isDarkMode ? 'bg-gray-400' : 'bg-gray-500'
            }`} style={{ animationDelay: '150ms' }}></div>
            <div className={`w-2 h-2 rounded-full animate-bounce ${
              isDarkMode ? 'bg-gray-400' : 'bg-gray-500'
            }`} style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;