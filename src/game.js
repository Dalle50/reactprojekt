import React, { useState } from "react";
import useGameServer from "./useGameServer";
import Chat from "./chat";

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
      <Chat server={server} />
    </div>
  );
}

export default Game;
