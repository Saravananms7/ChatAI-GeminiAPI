# ChatAI - Gemini API

A modern, full-screen chat interface powered by Google's Gemini AI. Built with React and Node.js, this application provides a beautiful and intuitive way to interact with Gemini's advanced language models.

![ChatAI Interface](https://img.shields.io/badge/React-19.1.0-blue) ![Node.js](https://img.shields.io/badge/Node.js-Latest-green) ![Gemini AI](https://img.shields.io/badge/Gemini-AI-orange)

## ✨ Features

### 🎨 Modern UI/UX
- **Full-screen chat interface** with sidebar layout
- **Responsive design** that works on desktop, tablet, and mobile
- **Dark mode support** with automatic system preference detection
- **Smooth animations** and transitions throughout
- **Professional styling** with modern color schemes and typography

### 💬 Chat Features
- **Real-time messaging** with Gemini AI models
- **Multiple model support** (Gemini 2.5 Flash, Flash Lite, Pro)
- **Message timestamps** for conversation tracking
- **Copy functionality** for each message
- **Auto-scrolling** to latest messages
- **Typing indicators** with animated dots
- **Message formatting** with markdown-like syntax support

### 🚀 User Experience
- **Interactive example prompts** to get started quickly
- **Auto-resizing textarea** that grows with content
- **Keyboard shortcuts** (Enter to send, Shift+Enter for new line)
- **Clear chat functionality** to reset conversations
- **Welcome screen** with helpful getting started tips
- **Status indicators** showing online status

### 📱 Responsive Design
- **Desktop**: Full sidebar with chat area
- **Tablet**: Collapsible sidebar with optimized layout
- **Mobile**: Slide-out sidebar with full-width chat

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **CSS3** - Modern styling with custom properties
- **ESLint** - Code linting and formatting

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **Google Gemini API** - AI language model integration

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd ChatAI-Gemini-API
```

### 2. Backend Setup
```bash
cd Backend
npm install
```

Create a `.env` file in the Backend directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3600
```

### 3. Frontend Setup
```bash
cd ../Frontend/chat-App
npm install
```

### 4. Get Your Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your Backend `.env` file

## 🚀 Running the Application

### Start the Backend Server
```bash
cd Backend
npm start
```
The backend will run on `http://localhost:3600`

### Start the Frontend Development Server
```bash
cd Frontend/chat-App
npm run dev
```
The frontend will run on `http://localhost:5173`

### Production Build
```bash
# Build the frontend
cd Frontend/chat-App
npm run build

# The built files will be in the 'dist' directory
```

## 🎯 Usage

### Getting Started
1. **Open the application** in your browser
2. **Select a model** from the sidebar (Gemini 2.5 Flash recommended for most use cases)
3. **Click on example prompts** or type your own message
4. **Press Enter** to send your message
5. **Wait for Gemini's response** and continue the conversation

### Model Selection
- **Gemini 2.5 Flash**: Fast and efficient for most tasks
- **Gemini 2.5 Flash Lite**: Ultra-fast for simple queries
- **Gemini 2.5 Pro**: Most capable for complex reasoning

### Keyboard Shortcuts
- **Enter**: Send message
- **Shift + Enter**: New line in message
- **Click example prompts**: Auto-fill input field

### Features
- **Copy messages**: Click the copy button on any message
- **Clear chat**: Use the "Clear Chat" button in the sidebar
- **View timestamps**: See when each message was sent
- **Responsive design**: Works on all screen sizes

## 🎨 Customization

### Styling
The application uses CSS custom properties for easy theming. Modify the variables in `src/index.css`:

```css
:root {
  --primary-color: #6366f1;
  --primary-hover: #4f46e5;
  --accent-color: #10b981;
  /* ... other variables */
}
```

### Adding New Models
To add support for new Gemini models, update the select options in `src/App.jsx`:

```jsx
<select value={model} onChange={(e) => setModel(e.target.value)}>
  <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
  <option value="your-new-model">Your New Model</option>
</select>
```

## 🔧 Configuration

### Backend Configuration
The backend server can be configured through environment variables:

```env
GEMINI_API_KEY=your_api_key
PORT=3600
NODE_ENV=development
```

### Frontend Configuration
Frontend configuration is handled through Vite. See `vite.config.js` for build settings.

## 📱 Mobile Support

The application is fully responsive and includes:
- **Touch-friendly interface** with proper button sizes
- **Mobile-optimized sidebar** that slides in/out
- **Responsive typography** that scales appropriately
- **Optimized input handling** for mobile keyboards

## 🐛 Troubleshooting

### Common Issues

**Backend not starting:**
- Check if port 3600 is available
- Verify your Gemini API key is correct
- Ensure all dependencies are installed

**Frontend not connecting to backend:**
- Verify backend is running on port 3600
- Check browser console for CORS errors
- Ensure API endpoints are correct

**Messages not sending:**
- Check your internet connection
- Verify Gemini API key has proper permissions
- Check browser console for error messages

### Debug Mode
Enable debug logging by setting `NODE_ENV=development` in your backend `.env` file.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for providing the powerful language models
- **React Team** for the amazing framework
- **Vite Team** for the fast build tool
- **Inter Font** for the beautiful typography

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Search existing [Issues](../../issues)
3. Create a new issue with detailed information
4. Include your system information and error messages

## 🔮 Future Enhancements

- [ ] Chat history persistence
- [ ] Multiple conversation threads
- [ ] File upload support
- [ ] Voice input/output
- [ ] Custom themes
- [ ] Export conversations
- [ ] User authentication
- [ ] Rate limiting
- [ ] Message search
- [ ] Keyboard shortcuts panel

---

**Made with ❤️ using React and Gemini AI**
