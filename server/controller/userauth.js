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
function login(req, res, next) {
  console.log("login user logic started - ", req.body);
  //passport.authenticate("local", { session: false }, (err, user, info) => {
  passport.authenticate("local", (err, user, info) => {
    console.log("passport error-", err);
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!user) {
      console.log("passport not same user", user);
      return res.status(401).json({ message: info.message });
    }
    //req.login(user, { session: false }, (err) => {
    req.login(user, (err) => {
      if (err) {
        console.log("Login error:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      const token = jwt.sign({ username: user.username }, "secret", {
        expiresIn: "1h",
      });
      //return res.status(200).json({ token });
      // Set the token in cookies
      console.log("req.login done - user", user.username);
      res.cookie("token", token, { httpOnly: true });

      // Redirect to /dashboard
      return res.redirect("/dashboard");
    });
  })(req, res, next);
}

module.exports = { register, login };
