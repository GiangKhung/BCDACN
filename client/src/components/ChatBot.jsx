import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './ChatBot.css';

function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Xin chào! Tôi là trợ lý AI bất động sản. Tôi có thể giúp bạn tìm hiểu về giá cả, khu vực, thủ tục mua bán... Bạn cần hỗ trợ gì ạ?'
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        fetchSuggestions();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const fetchSuggestions = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/chatbot/suggestions');
            setSuggestions(res.data.suggestions);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    const sendMessage = async (text) => {
        const messageText = text || input.trim();
        if (!messageText || loading) return;

        // Add user message
        const userMessage = { role: 'user', content: messageText };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};

            const res = await axios.post(
                'http://localhost:5000/api/chatbot/message',
                { message: messageText },
                { headers }
            );

            if (res.data.success) {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: res.data.response,
                    isAI: res.data.isAI
                }]);
            }
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.'
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Floating Button */}
            <button 
                className={`chatbot-toggle ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                title="Trợ lý AI"
            >
                {isOpen ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        <circle cx="9" cy="10" r="1" fill="currentColor"/>
                        <circle cx="12" cy="10" r="1" fill="currentColor"/>
                        <circle cx="15" cy="10" r="1" fill="currentColor"/>
                    </svg>
                )}
                <span className="chatbot-badge">AI</span>
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <div className="chatbot-header-info">
                            <div className="chatbot-avatar">🤖</div>
                            <div>
                                <h4>Trợ Lý BĐS</h4>
                                <span className="chatbot-status">
                                    <span className="status-dot"></span>
                                    Đang hoạt động
                                </span>
                            </div>
                        </div>
                        <button className="chatbot-close" onClick={() => setIsOpen(false)}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`chat-message ${msg.role}`}>
                                {msg.role === 'assistant' && (
                                    <div className="message-avatar">🤖</div>
                                )}
                                <div className="message-content">
                                    <p>{msg.content}</p>
                                    {msg.isAI === false && msg.role === 'assistant' && (
                                        <span className="ai-tag">Trả lời tự động</span>
                                    )}
                                </div>
                            </div>
                        ))}
                        
                        {loading && (
                            <div className="chat-message assistant">
                                <div className="message-avatar">🤖</div>
                                <div className="message-content typing">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Suggestions */}
                    {messages.length <= 2 && suggestions.length > 0 && (
                        <div className="chatbot-suggestions">
                            {suggestions.map((s, idx) => (
                                <button 
                                    key={idx} 
                                    onClick={() => sendMessage(s)}
                                    disabled={loading}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="chatbot-input">
                        <input
                            type="text"
                            placeholder="Nhập câu hỏi của bạn..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={loading}
                        />
                        <button 
                            onClick={() => sendMessage()} 
                            disabled={!input.trim() || loading}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default ChatBot;
