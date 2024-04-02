/* SET UP ROUTER FOR CRUD OPERATIONS
 */
const express = require("express");
// imports module for handling user related CRUD operations
const userController = require("../controller/users.js");
const router = express.Router();

// CRUD operations for users table
// Create a user in the browser. Make sure to use the correct URL: http://localhost:3000/user
router.post("/register", userController.createUser);
// Read a user in the browser. Make sure to use the correct URL: http://localhost:3000/user/:username
router.get("/user/:username", userController.getUser);

// imports module for handling product related CRUD operations
const productController = require("../controller/product.js");

// CRUD operations for products related operation
// list all the products via url http://localhost:3000/product/list
router.get("/product", recipeController.listAll);

// Export the router to be used in the app.js file
module.exports = router;
