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
  static async getPaginatedProducts(page, pageSize) {
    try {
      const offset = (page - 1) * pageSize;
      const products = await knex("products")
        .select(
          "products.*",
          "images.image_url_1",
          "images.image_url_2",
          "images.image_url_3",
          "images.image_url_4",
          "images.image_url_5"
        )
        .leftJoin("images", "products.product_id", "images.product_id")
        .orderBy("products.product_id")
        .offset(offset)
        .limit(pageSize);
      return products;
    } catch (error) {
      console.error("Error fetching paginated products with images:", error);
      throw error;
    }
  }

  static async getProduct(productId) {
    try {
      const product = await knex("products")
        .where({ product_id: productId })
        .first();
      return product;
    } catch (error) {
      console.error("Error getting product:", error);
      throw error;
    }
  }

  static async searchByName(name) {
    try {
      const products = await knex("products")
        .select(
          "products.*",
          "images.image_url_1",
          "images.image_url_2",
          "images.image_url_3",
          "images.image_url_4",
          "images.image_url_5"
        )
        .leftJoin("images", "products.product_id", "images.product_id")
        .whereRaw("LOWER(product_name) LIKE ?", `%${name.toLowerCase()}%`);
      console.log("products.length", products.length);
      if (products.length === 0) {
        console.log("no product found. product length is", products.length);
        return [{ message: "Search returned 0 Results" }];
      }

      //console.log("products returned by product name search:", products);
      return products;
    } catch (error) {
      console.error("Error searching products by name:", error);
      throw error;
    }
  }

  static async searchByExternalId(externalId) {
    try {
      const products = await knex("products").where("external_id", externalId);
      return products;
    } catch (error) {
      console.error("Error searching products by external ID:", error);
      throw error;
    }
  }

  static async searchByProductId(productId) {
    try {
      const products = await knex("products").where("product_id", productId);
      return products;
    } catch (error) {
      console.error("Error searching products by ID:", error);
      throw error;
    }
  }

  static async search(query) {
    try {
      const products = await knex("products")
        .where("product_name", "like", `%${query}%`)
        .orWhere("description", "like", `%${query}%`);
      return products;
    } catch (error) {
      console.error("Error searching products:", error);
      throw error;
    }
  }

  static async editProduct(productId, newData) {
    try {
      await knex("products").where({ product_id: productId }).update(newData);
    } catch (error) {
      console.error("Error editing product:", error);
      throw error;
    }
  }

  static async deleteProduct(productId) {
    try {
      await knex("products").where({ product_id: productId }).del();
    } catch (error) {
      console.error("Error deleting product:", error);
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
