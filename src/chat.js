import React, { useState, useEffect, useRef } from 'react';
import "./chat.css";

function Chat({server}) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const messageContainerRef = useRef(null);


    const handleReceivedMessage = (message) => {
        setMessages(prevMessages => [...prevMessages, message]);
    };

    useEffect(() => {
        if (server) {
            server.onEvent("ChatMessage", handleReceivedMessage);
        }
    }, [server]);


    useEffect(() => {
        //Scrolls to the bottom so that user don't have to do that manually.
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (server && message.trim() !== '') {
            server.invoke("Chat", message);
            setMessage('');
        }
    };
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="chat-container">
            <div className="message-container" ref={messageContainerRef}>
                {messages.map((message, index) => (
                    <div key={index} className="message">{message}
            </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={message}
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chat;
