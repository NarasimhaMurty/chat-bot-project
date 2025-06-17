import React, { useState, useEffect, useRef } from 'react';
import { Send, Moon, Sun, MessageCircle } from 'lucide-react';
import ChatMessage from './components/ChatMessage';
import TypingIndicator from './components/TypingIndicator';
import { ThemeProvider, useTheme } from './components/ThemeProvider';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hello! I\'m your AI assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { isDarkMode, toggleTheme } = useTheme();

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  // Placeholder function for API call to .NET Core backend
  const callOpenAIAPI = async (userMessage) => {
    // 1️⃣ URL
const url = "https://api.openai.com/v1/chat/completions";

// 3️⃣ JSON data (body)
const data = {
  model: "gpt-4o-mini",
  store: true,
  messages: [
    { role: "user", content: userMessage }
  ]
};
    // TODO: Replace this with actual API call to your .NET Core backend
    // Example:
     const response = await fetch(url, {
       method: 'POST',
       headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
       body: JSON.stringify(data),
     });
     const json = await response.json();
     return json.choices[0].message.content;

    // Simulated API delay and response
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const responses = [
      "I understand your question. Let me help you with that.",
      "That's an interesting point. Here's what I think about it...",
      "Based on what you've asked, I can provide some insights.",
      "Great question! Let me break this down for you.",
      "I'd be happy to help you with that. Here's my response...",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Call the placeholder API function
      const botResponse = await callOpenAIAPI(userMessage.text);
      
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error calling API:', error);
      
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`h-screen flex flex-col ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    } transition-colors duration-300`}>
      {/* Header */}
      <header className={`flex items-center justify-between px-4 py-4 border-b ${
        isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
      } transition-colors duration-300`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
          } transition-colors duration-300`}>
            <MessageCircle className="text-white" size={24} />
          </div>
          <h1 className="text-xl font-semibold">Narasimha.ai</h1>
        </div>
        
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
            isDarkMode 
              ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isDarkMode={isDarkMode}
            />
          ))}
          
          {isTyping && <TypingIndicator isDarkMode={isDarkMode} />}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <footer className={`border-t ${
        isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
      } transition-colors duration-300`}>
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                disabled={isTyping}
              />
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                (!inputMessage.trim() || isTyping)
                  ? isDarkMode 
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg hover:scale-105 active:scale-95'
              }`}
            >
              <Send size={18} />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
          
          <p className={`text-xs text-center mt-2 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Press Enter to send • Shift+Enter for new line
          </p>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ChatInterface />
    </ThemeProvider>
  );
}

export default App;