/*This file covers all the product related functions in the dashboard
 List of product functions:
List All - Lists all the products (attanged by product_id)
Category - Lists all products by category
Search - Lists all products by search field (either product_name, external_id, or product_id)
Add Product - Form submits a new product
Upload - Form uploads a file to the database (file must be in CSV format)

Additional Per Product Functions:
Edit Product
View Product
Delete Product

 */

const csv = require("csv-parser");
const fs = require("fs");
const Product = require("../model/product");

// Product Related Features starts here:

// List All Products function - this function lists all the products and corresponding data via querying limited by pagination
async function listAll(req, res) {
  try {
    const page = req.query.page || 1;
    const pageSize = 30;
    const products = await Product.getPaginatedProducts(page, pageSize);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Search function - this function lets the user choose the selection criteria and specify the string to be searched in the database
async function search(req, res) {
  console.log("search function started");
  try {
    const { type, value } = req.query;
    let products;
    switch (type) {
      case "productName":
        console.log("value of productname is ", value);
        //temp for Gaming Merch while category of products not yet set
        if (value === "Gaming Merch") {
          console.log("search by product name started for Gaming Merch");
          const searchKeywords = [
            " pin",
            " postcard",
            " sticker",
            " figure",
            " keychain",
            " coaster",
            " strap",
          ];
          let allProducts = [];

          for (const keyword of searchKeywords) {
            const productsForKeyword = await Product.searchByName(keyword);
            allProducts = allProducts.concat(productsForKeyword);
          }
          products = allProducts;
        } else {
          console.log("search by product name started");
          products = await Product.searchByName(value);
        }
        break;
      case "externalId":
        console.log("search by product name external id");
        products = await Product.searchByExternalId(value);
        break;
      case "productId":
        console.log("search by product name product id");
        products = await Product.searchByProductId(value);
        break;
      default:
        products = [];
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Upload function - mass upload products to db using csv stream reader from the uploaded csv file
async function upload(req, res) {
  console.log("reading csv file - back end");
  try {
    console.log("file", req.files);
    if (!req.files || !req.files.file) {
      console.log("returning no file");
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = req.files.file;

    // Check if tempFilePath is empty
    if (!file.tempFilePath) {
      console.log("tempFilePath is empty");
      return res.status(500).json({ message: "Error uploading file" });
    }

    console.log("tempFilePath is present", file.tempFilePath);

    fs.createReadStream(file.tempFilePath)
      .pipe(csv())
      .on("data", async (row) => {
        try {
          // Extract the product data from the CSV row
          console.log("tranferring row data");

          //Skip the row that has invalid product ID
          if (isNaN(row["Product ID"]) || !row["Product ID"]) {
            console.log(
              `row with Product ID = ${row["Product ID"]} is invalid!`
            );
            return;
          }

          // Verify if product name already exists
          const isDuplicate = await Product.verifyProduct(row["Product Name"]);
          if (isDuplicate) {
            console.log(`Duplicate product: ${row["Product Name"]}`);
            return;
          }

          const productData = {
            external_id: row["Product ID"],
            product_name: row["Product Name"],
            description: row["Main Description"],
            category: row["catId"], // Map "catId" from CSV to "category" in the database
          };
          console.log("productData");
          // Insert the product data into the database
          const productId = await Product.createProduct(productData);

          // Optionally, insert image data into the "images" table
          const imageUrls = {
            image_url_1: row["Product Images1"],
            image_url_2: row["Product Images2"],
            image_url_3: row["Product Images3"],
            image_url_4: row["Product Images4"],
            image_url_5: row["Product Images5"],
          };

          // Insert the image data into the database
          await Product.createImage(imageUrls, productId.product_id);
        } catch (error) {
          console.error("Error inserting product:", error);
        }
      })
      .on("end", () => {
        res
          .status(200)
          .json({ message: "File uploaded and processed successfully" });
      });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Add a single product
async function addProduct(req, res) {
  try {
    //const { productId } = req.params;
    // Verify if product name already exists
    console.log("req - product name to check:", req.body.product_name);
    const isDuplicate = await Product.verifyProduct(req.body.product_name);
    if (isDuplicate) {
      console.log("temp-duplicate");
      return res
        .status(400)
        .json({ message: "Duplicate product - product name must be unique!" });
    }

    const productData = {
      external_id: req.body.external_id,
      product_name: req.body.product_name,
      description: req.body.description,
      category: req.body.category,
    };

    console.log("productData");
    // Insert the product data into the database
    const productId = await Product.createProduct(productData);

    // Optionally, insert image data into the "images" table
    const imageUrls = {
      image_url_1: req.body.image_url_1,
      image_url_2: req.body.image_url_2,
      image_url_3: req.body.image_url_3,
      image_url_4: req.body.image_url_4,
      image_url_5: req.body.image_url_5,
    };

    // Insert the image data into the database
    console.log("product_id created", productId.product_id);
    await Product.createImage(imageUrls, productId.product_id);
    res
      .status(201)
      .json({
        message: "Product created successfully",
        productId: productId.product_id,
      });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// View a single product
async function viewProduct(req, res) {
  console.log("view Product function started");
  try {
    const { productId } = req.params;
    const product = await Product.searchByProductId(productId);
    console.log("product is", product);
    //const product = await Product.getProduct(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error viewing product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Edit a single product
async function editProduct(req, res) {
  try {
    const { productId } = req.params;
    const newData = req.body; // Assuming the new data is sent in the request body
    await Product.editProduct(productId, newData);
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error editing product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Delete a single product
async function deleteProduct(req, res) {
  try {
    const { productId } = req.params;
    // Delete from images table first
    await Product.deleteImages(productId);
    // Then delete from products table
    await Product.deleteProduct(productId);
    res
      .status(200)
      .json({ message: "Product and associated images deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  upload, // Export the upload function
  listAll, // Export the upload function
  search, //Export the search function
  addProduct,
  viewProduct,
  editProduct,
  deleteProduct,
};
