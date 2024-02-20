import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "../css/LoginPage.css"; // Import your CSS file for styling

const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === "walid" && password === "walid") {
      setIsLoggedIn(true);
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="left-half">
        <h1 className="logo">IDO</h1>
        <p className="slogan">i can do it !</p>
      </div>
      <div className="right-half">
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="sign-in-button">
            Login
          </button>
          {isLoggedIn && <Navigate to="/dashboard" replace={true} />}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
