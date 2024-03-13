import React, { useState } from "react";
import ReactDOM from "react-dom";
import Login from "./login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  var gameHubUrl = "http://react.tsanas.com/gamehub"
  const handleLogin = (token) => {
    setIsLoggedIn(true);
    setToken(token); // Store the token when the user is logged in
  };

  return (
    <div>
      {!isLoggedIn && <Login onLogin={handleLogin} />}
      {isLoggedIn && <div>You are logged in!</div>}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
