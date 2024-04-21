import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function UserAuth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Function to handle Google login initiation
  const handleGoogleLogin = async () => {
    try {
      const response = await axios.get("http://localhost:3100/auth/google");
      console.log("Google authentication initiated", response.data);
      // After successful authentication, redirect to Google login page
      window.location.href = response.data.authUrl;
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  // Check for success message in URL query parameters
  React.useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("success")) {
      setMessage("Google authentication successful.");
    }
  }, [location.search]);

  const handleRegister = async () => {
    console.log("Username:", username);
    console.log("Password:", password);
    if (!username || !password) {
      setMessage("Username and password are required");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3100/register",
        //"/register",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const handleLogin = async () => {
    // Check for null or empty username/password
    if (!username || !password) {
      setMessage("Username and password are required");
      return;
    }
    try {
      let loginData;
      if (password) {
        // Local login
        loginData = { username, password };
      } else {
        // Google login
        loginData = { username };
      }

      const response = await axios.post(
        "http://localhost:3100/login",
        loginData
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      setMessage("Login successful");
      navigate("/dashboard");
      window.location.reload(); // Refresh the page
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>User Authentication</h1>
      <button onClick={handleGoogleLogin}>Login with Google</button>
      <h2>Or</h2>
      <input
        type="username"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogin}>Login</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UserAuth;
