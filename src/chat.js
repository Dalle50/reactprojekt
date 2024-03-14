import React, { useState, useEffect } from 'react';
import "./chat.css";

function Chat({server}) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleReceivedMessage = (message) => {
        setMessages(prevMessages => [...prevMessages, message]);
    };

    useEffect(() => {
        if (server) {
            server.onEvent("ChatMessage", handleReceivedMessage);
        }
    }, [server]);

    const handleSendMessage = () => {
        if (server && message.trim() !== '') {
            server.invoke("Chat", message);
            setMessage('');
        }
    };

    return (
        <div className="chat-container">
            <div className="message-container">
                {messages.map((message, index) => (
                    <div key={index} className="message">{message}
            </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chat;
