import React, { useState } from 'react';
import useGameServer from './useGameServer';
import "./chat.css";


function Chat() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    // const gameHubUrl = "http://react.tsanas.com/gamehub";
    const gameServer = useGameServer(/*gameHubUrl, token*/);

    const handleSendMessage = () => {

      };

      const handleRecievedMessage = (message) => {
        setMessages([...messages, message]);
      };

 return (
        <div className="chat-container">
            <div className="message-container">
                {messages.map((message, index) => (
                    <div key={index} className="message">
                        <strong>{/*Username here I guess*/}: </strong>
                        {message}
                    </div>
                ))}
            </div>

            <div className="input-container">
                <input
                    type="text"
                    // value={}
                    // onChange={}
                    placeholder="Type your message here..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chat;