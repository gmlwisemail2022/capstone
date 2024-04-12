//This file contains all the dashboard related functionalities
//This covers navbar navigations of the dashboard including Landing Page, Whats New, About Me, etc

// Import any required modules
const express = require("express");
const passport = require("passport");

// Create an instance of Express router
const router = express.Router();

// Define the route handler for the "/dashboard" route
async function verify(req, res) {
  console.log("VERIFY IF AUTHENTICATED!!");
  try {
    console.log("is authenticated?", req.isAuthenticated());
    // Check if user is authenticated
    if (req.isAuthenticated()) {
      // User is authenticated, send a JSON response
      res
        .status(200)
        .json({ message: "User authenticated. Welcome to the dashboard!" });
    } else {
      // User is not authenticated, redirect to login page
      res.redirect("/login");
    }
  } catch (error) {
    // Handle any errors
    console.error("Error in /dashboard route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Export the route handler
module.exports = { verify };
