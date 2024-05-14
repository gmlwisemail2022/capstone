const express = require("express");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bodyParser = require("body-parser"); // Import body-parser module
const cors = require("cors");
const routes = require("./routes");
const fileUpload = require("express-fileupload"); // Import express-fileupload

const PORT = process.env.PORT || 3100;
const app = express();

// Require the Passport setup file
//require("./passport-setup");

// Session middleware
// Enable CORS
app.use(cors());
/*
app.use(
  cors({
    origin: [
      "https://curious-gnome-b84263.netlify.app",
      "https://main--ecim.netlify.app"
      "https://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
*/
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport and session middleware
app.use(passport.initialize());
app.use(passport.session());

// Middleware to log request URL before redirection (for debugging)
app.use((req, res, next) => {
  console.log("Request URL:", req.originalUrl);
  next();
});

// Middleware

app.use(bodyParser.json()); // Parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // Parse application/x-www-form-urlencoded
// Use express-fileupload middleware with configuration
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 50 * 1024 * 1024 }, // Example: Limit file size to 50MB
  })
);

// Routes
app.use("/", routes);

// Require the Passport setup file after initializing app
require("./passport-setup");

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
