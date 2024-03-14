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
    if (authToken.success) {
      console.log("Invalid credentials");
      setIsLoggedIn(false);
      return;
    }
    setIsLoggedIn(true);
    setToken(authToken);
    console.log("Auth : " + authToken);
  };

  const disconnectFromGame = () => {
    setIsLoggedIn(false);
    setToken(null);
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
