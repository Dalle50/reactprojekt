import React, { useState } from "react";
import ReactDOM from "react-dom";
import Login from "./login";
import Chat from "./chat";
import useGameServer from "./useGameServer";
import Game from "./game";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setToken] = useState(null);

  const handleLogin = (authToken) => {
    if (!authToken.success) {
      console.log("Invalid credentials");
      setIsLoggedIn(false);
      return;
    }
    setIsLoggedIn(true);
    setToken(authToken.data);
    console.log("Auth : " + authToken.data);
  };

  const disconnectFromGame = () => {
    setIsLoggedIn(false);
    setToken(null);
    console.log("Disconnected from game")
    console.log("Auth : " + authToken.data)
    console.log("Has been logged out")
  };

  return (
    <div>
      {!isLoggedIn && <Login onLogin={handleLogin} />}
      {isLoggedIn && authToken && (
        <Game token={authToken} onLogOut={disconnectFromGame} />
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
