//remove this (transferred to Login.jsx)
/*
import React, { useState } from "react";
import axios from "axios";

function UserAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    console.log("Username:", username);
    console.log("Password:", password);
    try {
      const response = await axios.post(
        "http://localhost:3000/register",
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
      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setMessage("Login successful");
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>User Authentication</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
*/
