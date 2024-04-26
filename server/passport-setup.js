// Import required modules
const passport = require("passport");
const User = require("./model/user");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");

// Configure Google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.REACT_APP_SERVER_API + "/auth/google/callback", // Update with your callback URL
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("Google authentication successful");
      console.log("Profile:", profile);
      // Log the value of profile.displayName
      console.log("Display Name:", profile.displayName);
      try {
        // Check if the user already exists in the database by googleId
        let user = await User.findByUsername(profile.displayName);
        if (!user) {
          // If the user does not exist, create a new user
          await User.createUser(
            profile.displayName,
            "dummy-password",
            profile.id
          );
          user = await User.findByUsername(profile.displayName);
        }
        console.log("username found:", user);
        // You can save the user to your database here or pass it to the next middleware
        // Generate JWT token
        const token = jwt.sign({ username: user.username }, "secret", {
          expiresIn: "1h",
        });

        console.log("jwt created at :", token);
        // Set the token in the user object passed to done
        user.token = token;

        // Return the token and user information
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Define the handler for Google authentication callback
const handleGoogleAuthCallback = (req, res, next) => {
  passport.authenticate("google", async (err, user, info) => {
    console.log("google callback function:", user);
    if (err) {
      return next(err);
    }

    console.log("user checking:", user, user.token, user.username);
    try {
      if (!user || !user.token) {
        // Handle authentication failure
        return res.redirect(
          process.env.CLIENT_API + "login"
          //"http://localhost:3000/login"
        );
      }

      // Store token and username in the session

      req.session.token = user.token;
      req.session.username = user.username;
      //console.log("saving token from user.token", req.session.token);

      console.log(
        "sending token and username to dashboard:",
        user.token,
        user.username
      );
      // Redirect to the dashboard after successful authentication
      //res.redirect("http://localhost:3000/dashboard");

      res.redirect(
        //"http://localhost:3000/dashboard?token=" +
        process.env.CLIENT_API +
          "/dashboard?token=" +
          user.token +
          "&username=" +
          user.username
      );
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

// Configure Passport serialization and deserialization
passport.serializeUser((user, done) => {
  // Check if user has a username (for local authentication) or a Google ID (for Google authentication)
  console.log("Serialized user object:", user);
  console.log("serialize local user", user.username);
  done(null, { type: "local", id: user.username });
});

passport.deserializeUser(async (data, done) => {
  try {
    const user = await User.findByUsername(data.id);
    console.log("deserialize local user", user.username);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Modify the handleGoogleLogin function to initiate Google authentication
const initiateGoogleLogin = (req, res) => {
  try {
    // Construct the Google OAuth URL
    const authUrl =
      "https://accounts.google.com/o/oauth2/v2/auth" +
      "?response_type=code" +
      `&redirect_uri=http%3A%2F%2Flocalhost%3A3100%2Fauth%2Fgoogle%2Fcallback` +
      "&scope=profile%20email" +
      `&client_id=${process.env.GOOGLE_CLIENT_ID}`;

    // Send a response with the authentication URL to the client
    res.status(200).json({ authUrl });
  } catch (error) {
    console.error("Google login error:", error);
    // Handle error appropriately
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { initiateGoogleLogin, handleGoogleAuthCallback };
