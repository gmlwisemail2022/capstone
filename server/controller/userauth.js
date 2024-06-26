//This covers user registration, login, and user authentication

const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/user");

// Create an instance of Express router
const router = express.Router();

// Use body-parser middleware to parse request bodies
router.use(bodyParser.json());

// Configure Passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await User.findByUsername(username);
        if (!user) {
          return done(null, false, { message: "Invalid credentials" });
        }
        // Check if the password matches the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("password valid after bcrypt?", isPasswordValid);
        if (isPasswordValid) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Invalid credentials" });
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Register function
async function register(req, res) {
  console.log("register user logic started");
  console.log(req.body); // Add this line to check the request body
  const { username, password } = req.body;
  // also validated in FE (may remove this one)
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  try {
    // Check if username already exists
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(409).json({ message: "User already registered" });
    }

    // registers the new user
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.createUser(username, hashedPassword);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Login function using Passport authentication
async function login(req, res, next) {
  console.log("login user logic started - ", req.body);
  const { username, password } = req.body;
  try {
    // Check if the user exists in the database
    const existingUser = await User.findByUsername(username);
    if (!existingUser) {
      return res.status(401).json({ message: "User not registered" });
    }

    // Proceed with authentication if the user exists
    passport.authenticate("local", async (err, user, info) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
      req.login(user, async (err) => {
        if (err) {
          console.log("Login error:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
        const token = jwt.sign({ username: user.username }, "secret", {
          expiresIn: "1h",
        });
        //res.cookie("token", token, { httpOnly: true }); //note: username not saved in the cookie!
        //console.log("res cookie is", res.cookie);
        return res.status(200).json({ token, username: username });
      });
    })(req, res, next);
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { register, login };
