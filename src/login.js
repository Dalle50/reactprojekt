import React, { useState } from "react";

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
    //   console.log(data)
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Invalid credentials");
      }

      // Login successful
      onLogin(data.data); // Pass the token to the parent component
    } catch (error) {
      setError(error.message || "Invalid username or password");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <div>{error}</div>}
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
