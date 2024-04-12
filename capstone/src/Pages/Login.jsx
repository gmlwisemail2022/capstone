import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserAuth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // added google login
  const handleGoogleLogin = async () => {
    try {
      //const response = await axios.get("http://localhost:3100/auth/google");
      //console.log(response.data);
      // Redirect to dashboard after successful login
      //navigate("/dashboard");

      /*
      const response = await axios.get("http://localhost:3100/auth/google");
      console.log(response.data);
      */
      //window.location.href = response.data.authUrl; // Redirect to Google authentication URL
      window.location.href = "http://localhost:3100/auth/google";
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

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
