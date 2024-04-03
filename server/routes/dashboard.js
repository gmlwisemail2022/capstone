// Import required modules
const express = require("express");
const passport = require("passport");
const router = express.Router();

/*
router.get(
  "/dashboard",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    // If this callback is reached, it means the user is authenticated
    // Render the dashboard page or return a success response
    res
      .status(200)
      .json({ message: "User authenticated. Welcome to the dashboard!" });
  }
);
*/

// Dashboard route
router.get("/dashboard", (req, res) => {
  console.log("is authenticated?", req.isAuthenticated());
  // Check if user is authenticated
  if (req.isAuthenticated()) {
    // User is authenticated, render the dashboard page
    res
      .status(200)
      .json({ message: "User authenticated. Welcome to the dashboard!" });
  } else {
    // User is not authenticated, redirect to login page
    res.redirect("/login");
  }
});

// Export the router
module.exports = router;
