const express = require("express");
const router = express.Router();
const userauth = require("./controller/userauth");
const dashboard = require("./controller/dashboard");
const product = require("./controller/product");
const notes = require("./controller/notes");
//const { handleGoogleLogin, handleGoogleCallback } = require("./passport-setup"); // Import handleGoogleLogin
const {
  initiateGoogleLogin,
  handleGoogleAuthCallback,
} = require("./passport-setup"); // Import handleGoogleLogin

// Define user routes
router.post("/register", userauth.register);
router.post("/login", userauth.login);
// Define route for initiating Google authentication
router.get("/auth/google", initiateGoogleLogin);
// Define the route to handle the Google authentication callback
router.get("/auth/google/callback", handleGoogleAuthCallback);

// Define dashboard routes
router.get("/dashboard", dashboard.verify);
router.get("/notes/:username", notes.listNotes);
router.post("/notes", notes.addNote);
router.put("/notes/:noteId", notes.editNote);
router.delete("/notes/:noteId", notes.deleteNote);

// Define product routes
router.get("/listall", product.listAll);
router.post("/search", product.search);
router.post("/add/product", product.addProduct);
router.get("/view/product/:productId", product.viewProduct);
router.put("/edit/product/:productId", product.editProduct);
router.delete("/delete/product/:productId", product.deleteProduct);
//router.post("/category", product.category);
//router.post("/add", product.add);
router.post("/upload", product.upload);

module.exports = router;
