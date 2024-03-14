import React, { useState } from "react";
import useGameServer from "./useGameServer";
import Chat from "./chat";
import Gameboard from "./Gameboard";

function Game({ token, onLogOut }) {
  const gameHubUrl = "http://react.tsanas.com/gamehub";
  const [gameIsConnected, setGameIsConnected] = useState(false);

  const onConnectionClosed = (error) => {
    console.error("Connection closed:", error);
    setGameIsConnected(false);
  };

  const [server] = useState(useGameServer(gameHubUrl, token, onConnectionClosed));

  const connectToGame = () => {
    server.connect();
    setGameIsConnected(true);
  };

  const disconnectFromGame = () => {
    server.disconnect();
    onLogOut(); // Call the onLogOut function passed as prop from App component
    setGameIsConnected(false);
  };
  return (
    <div>
      <h2>Game</h2>
      <button onClick={connectToGame}>Connect to game</button>

      {!gameIsConnected && (
        <>
          <button id="connectBtn" onClick={connectToGame}>
            Connect to game
          </button>
      <Chat server={server} />
        </>
      )}
      {gameIsConnected && (
        <>
          <div>Game is connected</div>
          <Gameboard server={server} />
          <button id="disconnectBtn" onClick={disconnectFromGame}>
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default Game;
