import React, { useState, useEffect } from "react"; // Importing useEffect
import ReactDOM from "react-dom";
import Login from "./login";
import useGameServer from "./useGameServer"; // Importing useGameServer hook

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  var gameHubUrl = "http://react.tsanas.com/gamehub"
  const gameServer = useGameServer(gameHubUrl, token); // Initialize the game server and pass token

  useEffect(() => {
    // Call the connect method of the game server when token changes
    if (token) {
      gameServer.connect();
    }
  }, [token, gameServer]);

  const handleLogin = (token) => {
    setIsLoggedIn(true);
    setToken(token); // Store the token when the user is logged in
    console.log(token);
  };

  return (
    <div>
      {!isLoggedIn && <Login onLogin={handleLogin} />}
      {isLoggedIn && <div>You are logged in!</div>}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
