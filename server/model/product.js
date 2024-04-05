// This file involves all product related database access
const knex = require("../db");

class Product {
  static async verifyProduct(productName) {
    try {
      const existingProduct = await knex("products")
        .where({ product_name: productName })
        //.orWhere("product_id", productID);  (commented for now, if comment remove add product_id paramaeter to be passed)
        .first();
      return !!existingProduct; // Return true if product exists (duplicate)
    } catch (error) {
      console.error("Error verifying product:", error);
      throw error;
    }
  }
  static async createProduct(data) {
    try {
      const [productId] = await knex("products").insert(data, "product_id");
      return productId;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  }

  static async createImage(data, product_id) {
    try {
      console.log("image data:", data, "product_id", product_id);

      // Insert the image data into the database along with the product_id
      return await knex("images").insert({ ...data, product_id });
    } catch (error) {
      console.error("Error creating image:", error);
      throw error;
    }
  }
}

module.exports = Product;
