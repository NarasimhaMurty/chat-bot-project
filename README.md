# AI Chatbot Interface

A modern, responsive AI chatbot interface built with React, Vite, and Tailwind CSS.

## Features

- 🌙 Dark/Light theme toggle
- 💬 Real-time chat interface
- 📱 Fully responsive design
- ⚡ Fast and lightweight
- 🎨 Modern UI with smooth animations
- 🔧 Easy to customize and extend

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **ESLint** - Code linting

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd ai-chatbot-interface
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── ChatMessage.jsx
│   ├── ThemeProvider.jsx
│   └── TypingIndicator.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Customization

### Adding Your Own API

Replace the placeholder `callOpenAIAPI` function in `App.jsx` with your actual API endpoint:

```javascript
const callOpenAIAPI = async (userMessage) => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: userMessage }),
  });
  const data = await response.json();
  return data.response;
};
```

### Styling

The project uses Tailwind CSS for styling. You can customize the theme by modifying `tailwind.config.js`.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.