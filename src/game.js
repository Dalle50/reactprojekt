import React, { useState } from "react";
import useGameServer from "./useGameServer";
import Chat from "./chat";
import Gameboard from "./Gameboard";
import Combat from "./combatlog";

function Game({ token, onLogOut }) {
  const gameHubUrl = "http://react.tsanas.com/gamehub";
  const [gameIsConnected, setGameIsConnected] = useState(false);
  const [themeSong] = useState(new Audio("/sounds/themeSong.mp3"));
  const [themeIntervalId, setThemeIntervalId] = useState(null);
  const onConnectionClosed = (error) => {
    console.error("Connection closed:", error);
    setGameIsConnected(false);
    clearInterval(themeIntervalId);
    themeSong.pause();
  };

  const [server] = useState(useGameServer(gameHubUrl, token, onConnectionClosed));

  const connectToGame = () => {
    server.connect();
    themeSong.volume = 0.1;
    playSong();
    setGameIsConnected(true);
  };
  const playSong = () => {
    themeSong.loop = true; // Set the audio to loop
    themeSong.play();
    // Save the interval ID for clearing it later
    const intervalId = setInterval(() => {
      // No need to play the song here since it's set to loop
    }, themeSong.duration * 1000); // Use the duration of the audio as the interval
    setThemeIntervalId(intervalId);
  };

  const disconnectFromGame = () => {
    server.disconnect();
    onLogOut(); // Call the onLogOut function passed as prop from App component
    clearInterval(themeIntervalId);
    setGameIsConnected(false);
    
  };
  return (
    <div>
      <h2>Game</h2>
      {!gameIsConnected && (
        <>
          <button id="connectBtn" onClick={connectToGame}>
            Connect to game
          </button>
        </>
      )}
      {gameIsConnected && (
        <>
          <div>Game is connected</div>
          <Gameboard server={server} onLogOut={disconnectFromGame} onConnectionClosed={onConnectionClosed} />
          <Chat server={server} />
          <Combat server={server} />
          <button id="disconnectBtn" onClick={disconnectFromGame}>
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default Game;
