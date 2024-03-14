import React, { useState } from "react";
import "./login.css";


function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const handleLogin = async () => {
    try {
      const response = await fetch("http://react.tsanas.com/authentication/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log(data)
      if (!response.ok || !data.success) {
        onLogin(data);
        throw new Error(data.error || "Invalid credentials");
      }

      onLogin(data);
    } catch (error) {
      setError(error.message || "Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div>{error}</div>}
      <div className="login-input">
        <label>Username: </label>
        <input 
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br/>
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div >
      <div className= "login-button">
              <button onClick={handleLogin}>Login</button>
      </div>

    </div>
  );
}

export default Login;
