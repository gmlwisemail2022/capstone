//for reference only (app.js will be trnsferred to react front end)

// express package
const express = require("express");
// Add this line to import the express-session module

// routes for CRUD operations
const router = require("../routes/index.js");

// app
const app = express();

// ROUTES (for now template only - need to change this to use react app as front end)
// Home
app.get("/", (req, res) => {
  res.redirect("/login");
});

app.get("/dashboard", (req, res) => {
  // Render dashboard page
  res.render("dashboard.hbs");
});
/*
app.get("/auth/login", (req, res) => {
    es.render("login.hbs");
});
  */
app.get("/register", (req, res) => {
  res.render("register.hbs");
});

// module is exported to the server
module.exports = app;
