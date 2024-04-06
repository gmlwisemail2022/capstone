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

module.exports = {
  upload, // Export the upload function
  listAll, // Export the upload function
};
