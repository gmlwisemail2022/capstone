const express = require("express");
const router = express.Router();
const userauth = require("./controller/userauth");
const dashboard = require("./controller/dashboard");
const product = require("./controller/product");

// Define user routes
router.post("/register", userauth.register);
router.post("/login", userauth.login);

// Define dashboard routes
router.get("/dashboard", dashboard.verify);

// Define product routes
router.post("/upload", product.upload);

module.exports = router;
