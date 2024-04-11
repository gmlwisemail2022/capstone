// Import required modules
const passport = require("passport");
const User = require("./model/user");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

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
    (accessToken, refreshToken, profile, done) => {
      // Extract user information from the Google profile
      const user = {
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value, // Assuming the first email is primary
      };
      // You can save the user to your database here or pass it to the next middleware
      return done(null, user);
    }
  )
);

// Define the handler for Google authentication callback
const handleGoogleCallback = passport.authenticate("google", {
  successRedirect: "/dashboard",
  failureRedirect: "/login", // Redirect to login page if authentication fails
});

// Configure Passport serialization and deserialization
passport.serializeUser((user, done) => {
  console.log("serialize", user.username);
  done(null, user.username); // Serialize the user's id
});

passport.deserializeUser(async (username, done) => {
  try {
    const user = await User.findByUsername(username); // Fetch user from database based on id
    console.log("deserialize", user.username);
    done(null, user); // Deserialize the user object
  } catch (err) {
    done(err); // Handle error
  }
});

module.exports = { handleGoogleLogin, handleGoogleCallback };
