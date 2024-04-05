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
router.get("/listall", product.listAll);
//router.post("/search", product.search);
//router.post("/category", product.category);
//router.post("/add", product.add);
//router.post("/edit", product.edit);
//router.post("/delete", product.delete);
router.post("/upload", product.upload);

module.exports = router;
