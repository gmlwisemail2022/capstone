//routes only
const express = require("express");
const router = express.Router();

// Import your route handlers
const userauth = require("../controller/userauth");

// Define your routes
console.log("defining routes via userParams.js");
router.post("/register", userauth.register);
router.post("/login", userauth.login);

module.exports = router;
