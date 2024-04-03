// Import required modules
const passport = require("passport");
const User = require("./model/user");

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
