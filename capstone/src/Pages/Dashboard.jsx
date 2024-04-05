import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode library for decoding JWT tokens

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Check if token exists and is not expired
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
      console.log("token exists");

      // Check if token is expired
      if (decodedToken.exp < currentTime) {
        // Token is expired, redirect to login page
        console.log("token expired");
        navigate("/login");
      }
    } else {
      // Token doesn't exist, redirect to login page
      console.log("token does not exist");
      navigate("/login");
    }
  }, [navigate]);

  // Render the dashboard content here
  return (
    <div>
      <p>This is Dashboard Page!</p>
    </div>
  );
}
