/*To remove this file - transferred to route.js
// Import required modules
const express = require("express");
const passport = require("passport");
const router = express.Router();

// Import your route handlers
const dashboard = require("../controller/dashboard");
const product = require("../controller/product");

// Dashboard route
router.get("/dashboard", dashboard.verify);
router.get("/upload", product.upload);

// Export the router
module.exports = router;
*/
