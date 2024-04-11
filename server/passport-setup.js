// Import required modules
const passport = require("passport");
const User = require("./model/user");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");

// Define the handleGoogleLogin function
const handleGoogleLogin = passport.authenticate("google", {
  scope: ["profile", "email"], // Add additional scopes as needed
});

// Configure Google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3100/auth/google/callback", // Update with your callback URL
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
          user = await User.createUser(
            profile.displayName,
            "dummy-password",
            profile.id
          );
        }
        // You can save the user to your database here or pass it to the next middleware
        // Generate JWT token
        const token = jwt.sign({ username: user.username }, "secret", {
          expiresIn: "1h",
        });
        // Return the token and user information
        return done(null, { token, username: user.username });
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Define the handler for Google authentication callback
const handleGoogleCallback = passport.authenticate("google", {
  successRedirect: "http://localhost:3000/dashboard",
  failureRedirect: "http://localhost:3000/login",
  //scope: ["profile", "email"], // Add additional scopes as needed
});

/*
const handleGoogleCallback = (req, res) => {
  // Redirect to the client-side login route with the token and username
  console.log("request is", req.user);
  console.log("response is", res.user);
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: FAILURE_URL,
  res.redirect(`/login?token=${req.user.token}&username=${req.user.username}`);
};
*/
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

module.exports = { handleGoogleLogin, handleGoogleCallback };
