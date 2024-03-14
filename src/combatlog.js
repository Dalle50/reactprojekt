import React, { useState, useEffect, useRef } from 'react';
import "./combat.css";

function Combat({ server }) {
    const [combatMessages, setCombatMessages] = useState([]);
    const combatMessageContainerRef = useRef(null);

    const handleReceivedCombatMessage = (message) => {
        setCombatMessages(prevCombatMessages => [...prevCombatMessages, message]);
    };

    useEffect(() => {
        if (server) {
            server.onEvent("CombatMessage", handleReceivedCombatMessage);
        }
    }, [server]);

    useEffect(() => {
        if (combatMessageContainerRef.current) {
            combatMessageContainerRef.current.scrollTop = combatMessageContainerRef.current.scrollHeight;
        }
    }, [combatMessages]);

    return (
        <div className="combat-container">
            <div className="combat-message-container" ref={combatMessageContainerRef}>
                {combatMessages.map((message, index) => (
                    <div key={index} className="combat-message">{message}</div>
                ))}
            </div>
        </div>
    );
}

export default Combat;
