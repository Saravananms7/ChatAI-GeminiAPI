import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [model, setModel] = useState("gemini-2.5-flash");
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const chatBoxRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [chatInput]);

  const sendMessage = async () => {
    if (!chatInput.trim() || loading) return;

    const newUserMessage = { 
      text: chatInput, 
      sender: "user", 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setChatInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3600/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat: chatInput, model }),
      });

      const data = await res.json();

      if (res.ok) {
        const aiMessage = { 
          text: data.response, 
          sender: "ai", 
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        const errorMessage = { 
          text: "Error: " + data.error, 
          sender: "ai", 
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage = { 
        text: "Server error: " + error.message, 
        sender: "ai", 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const copyMessage = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleExampleClick = (exampleText) => {
    setChatInput(exampleText);
    // Focus the textarea after setting the text
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 100);
  };

  const formatMessage = (text) => {
    return text
      .replace(/\n/g, "<br/>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/`(.*?)`/g, "<code>$1</code>")
      .replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
      .replace(/\* (.*?)(?=\n|$)/g, "<li>$1</li>")
      .replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>");
  };

  const SendIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="22" y1="2" x2="11" y2="13"></line>
      <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
    </svg>
  );

  const CopyIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
  );

  const ClearIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3,6 5,6 21,6"></polyline>
      <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
  );

  return (
    <div className="chat-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h1>ChatAI</h1>
          <p>Powered by Google's Gemini AI</p>
        </div>
        
        <div className="sidebar-content">
          <div className="model-section">
            <h3>Model Selection</h3>
            <div className="model-select">
              <label>Choose Model:</label>
              <select value={model} onChange={(e) => setModel(e.target.value)}>
                <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
                <option value="gemini-2.5-flash-lite">Gemini 2.5 Flash Lite</option>
                <option value="gemini-2.5-pro">Gemini 2.5 Pro</option>
              </select>
            </div>
          </div>
          
          {messages.length > 0 && (
            <button 
              onClick={clearChat} 
              className="clear-button"
              title="Clear chat"
            >
              <ClearIcon />
              Clear Chat
            </button>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="main-chat">
        <div className="chat-header">
          <h2 className="chat-title">Chat with Gemini</h2>
          <div className="chat-status">
            <div className="status-dot"></div>
            <span>Online</span>
          </div>
        </div>

        <div className="chat-box" ref={chatBoxRef}>
          {messages.length === 0 && (
            <div className="welcome-message">
              <div className="welcome-content">
                <h3>👋 Welcome to ChatAI!</h3>
                <p>Start a conversation with Gemini AI. Ask questions, get help with coding, or just chat!</p>
                <div className="example-prompts">
                  <p>Try asking:</p>
                  <ul>
                    <li onClick={() => handleExampleClick("Explain quantum computing in simple terms")}>
                      "Explain quantum computing in simple terms"
                    </li>
                    <li onClick={() => handleExampleClick("Help me write a Python function")}>
                      "Help me write a Python function"
                    </li>
                    <li onClick={() => handleExampleClick("What's the weather like today?")}>
                      "What's the weather like today?"
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === "user" ? "user-msg" : "ai-msg"}`}
            >
              <div className="message-content">
                {msg.sender === "ai" ? (
                  <div dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }} />
                ) : (
                  msg.text
                )}
              </div>
              <div className="message-footer">
                <span className="timestamp">{msg.timestamp}</span>
                <button 
                  className="copy-button"
                  onClick={() => copyMessage(msg.text, index)}
                  title="Copy message"
                >
                  <CopyIcon />
                  {copiedIndex === index ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="ai-msg typing">
              <div className="typing-content">
                <span>Gemini is thinking</span>
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="input-area">
          <textarea
            ref={textareaRef}
            placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
          <button 
            onClick={sendMessage} 
            disabled={loading || !chatInput.trim()}
            className="send-button"
          >
            <SendIcon />
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
