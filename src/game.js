import React, { useState } from "react";
import useGameServer from "./useGameServer";

function Game(token) {
    const gameHubUrl = "http://react.tsanas.com/gamehub";
    const onConnectionClosed = (error) => {
      console.error("Connection closed:", error);
    };
    const [server] = useState(useGameServer(gameHubUrl, token.token, onConnectionClosed));
    function connectToGame() {
        server.connect();
    }
  return (
    <div>
      <h2>Game</h2>
      <button onClick={connectToGame}>Connect to game</button>
    </div>
  );
}

export default Game;
