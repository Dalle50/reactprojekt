import React, { useState, useEffect, useSyncExternalStore, useCallback } from "react"; // Importing useEffect
import ReactDOM from "react-dom";
import Login from "./login";
import useGameServer from "./useGameServer";
import Game from "./game";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setToken] = useState(null);
  const gameHubUrl = "http://react.tsanas.com/gamehub";
  const onConnectionClosed = (error) => {
    console.error("Connection closed:", error);
  };
  const [gameServer, setGameServer] = useState(null); // Declaring gameServer
  const handleLogin = (authToken) => {
    setIsLoggedIn(true);
    setToken(authToken);
    console.log("Auth : " + authToken);
  };
  
  return (
    <div>
      {!isLoggedIn && <Login onLogin={handleLogin} />}
      {isLoggedIn && authToken  && <Game token={ authToken } />}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
