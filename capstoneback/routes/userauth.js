const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connectDB = require("./MongoConnect/connectMyMongo.js");
const RegisterSchema = require("./models/register.js");
const morgan = require("morgan");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
connectDB();

// Configure Passport
app.use(passport.initialize());
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await RegisterSchema.findOne({ email });
        if (!user) {
          return done(null, false, { message: "Invalid credentials" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
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

// Register endpoint
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await RegisterSchema.create({
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login endpoint using Passport authentication
app.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      const token = jwt.sign({ email: user.email }, "secret", {
        expiresIn: "1h",
      });
      return res.status(200).json({ token });
    });
  })(req, res, next);
});

module.exports = authRouter;
