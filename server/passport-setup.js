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
        console.log("username found:", user);
        // You can save the user to your database here or pass it to the next middleware
        // Generate JWT token

        //console.log("storing token via jwt.sign");
        const token = jwt.sign({ username: user.username }, "secret", {
          expiresIn: "1h",
        });

        console.log("jwt created at :", token);
        // Set the token in the user object passed to done
        user.token = token;
        //user.username = username;
        //res.cookie("token", token, { httpOnly: true }); //note: username not saved in the cookie!

        // Return the token and user information
        //return done(null, { token, username: user.username });
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Define the handler for Google authentication callback
const handleGoogleCallback = (req, res, next) => {
  passport.authenticate("google", async (err, user, info) => {
    console.log("google callback function:", user);
    if (err) {
      return next(err);
    }
    /*
    if (!user || !user.token || !user.username) {
      // Handle authentication failure
      return res.redirect("http://localhost:3000/login");
    }
*/
    try {
      // Generate a token

      //const token = jwt.sign({ username: user.username }, "secret_key");

      // Set the token as a cookie
      res.cookie("token", user.token, { httpOnly: true });
      console.log("cookie generated:", user.token);
      // Redirect to the dashboard
      /*
      return res.redirect(
        `http://localhost:3000/dashboard?token=${user.token}&username=${user.username}`
      );
      */
      //return res.status(200).json({ user.token, user.username });
      return res.redirect(`http://localhost:3000/login`);
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

/*
const handleGoogleCallback = passport.authenticate("google", {
  successRedirect: "http://localhost:3000/dashboard",
  failureRedirect: "http://localhost:3000/login",
  });

*/
/*
const handleGoogleCallback = (req, res, next) => {
  console.log("handling google callback");
  passport.authenticate("google", async (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user || !user.token || !user.username) {
      // Handle authentication failure
      return res.redirect("http://localhost:3000/login");
    }
    console.log("user to sign:", user, username);
    try {
      // Generate a token
      const token = jwt.sign({ username: user.username }, "secret_key");

      // Set the token as a cookie
      res.cookie("token", token, { httpOnly: true });

      // Redirect to the dashboard
      return res.redirect("http://localhost:3000/dashboard");
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

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
