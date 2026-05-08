import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Hello! I am the AP RERA Assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const toggleChat = () => setIsOpen(!isOpen);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input.trim();
        setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
        setInput('');

        try {
            // API call to our new backend endpoint
            const response = await fetch('http://localhost:8080/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage })
            });

            const data = await response.json();

            setMessages(prev => [...prev, {
                sender: 'bot',
                text: data.response || "Something went wrong."
            }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                sender: 'bot',
                text: "Error connecting to the server. Please try again."
            }]);
        }
    };

    return (
        <div className="chatbot-container">
            {isOpen ? (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <h4>AP RERA Assistant</h4>
                        <button onClick={toggleChat} className="close-btn">&times;</button>
                    </div>
                    <div className="chatbot-messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <form className="chatbot-input" onSubmit={sendMessage}>
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                        />
                        <button type="submit">
                            <svg fill="currentColor" viewBox="0 0 24 24" height="20" width="20"><path fill="none" d="M0 0h24v24H0z"></path><path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path></svg>
                        </button>
                    </form>
                </div>
            ) : (
                <button className="chatbot-trigger" onClick={toggleChat}>
                    💬 Support
                </button>
            )}
        </div>
    );
};

export default Chatbot;