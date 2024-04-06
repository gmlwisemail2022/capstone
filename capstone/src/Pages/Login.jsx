import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserAuth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    console.log("Username:", username);
    console.log("Password:", password);
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
    try {
      console.log("user", username, password);
      const response = await axios.post("http://localhost:3100/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setMessage("Login successful");
      // Redirect to dashboard after successful login
      //window.location.href = "/dashboard";
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>User Authentication</h1>
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
