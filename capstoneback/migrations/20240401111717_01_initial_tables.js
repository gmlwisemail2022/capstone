/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 * TO RUN MIGRATIONS: npx knex migrate:latest --knexfile db/knexfile.js
 */
exports.up = function (knex) {
  return (
    knex.schema
      .createTable("users", (table) => {
        table.increments("user_id").primary();
        table.string("username", 20).notNullable().unique();
        table.string("password").notNullable();
        table.string("email").notNullable().unique();
        table.string("full_name").notNullable();
        table.boolean("admin").notNullable().defaultTo(false);
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
      // create promises - one table at a time
      .then(() => {
        return knex.schema.createTable("products", (table) => {
          table.increments("product_id").primary();
          table.string("product_name").notNullable().unique();
          table.string("description").notNullable();
          table.string("category").notNullable();
          table.timestamp("create_date").defaultTo(knex.fn.now());
          table.timestamp("update_date").defaultTo(knex.fn.now());
          //table.integer("user_id").references("users.user_id");
        });
      })
      .then(() => {
        return knex.schema.createTable("stocks", (table) => {
          table.increments("stock_id").primary();
          table.string("stock_count").notNullable();
          table.timestamp("create_date").defaultTo(knex.fn.now());
          table.timestamp("update_date").defaultTo(knex.fn.now());
          table.integer("product_id").references("product.product_id");
        });
      })
      .then(() => {
        return knex.schema.createTable("images", (table) => {
          table.increments("image_id").primary();
          table.string("image_url");
          table.timestamp("create_date").defaultTo(knex.fn.now());
          table.timestamp("update_date").defaultTo(knex.fn.now());
          table.integer("product_id").references("product.product_id");
        });
      })
      .then(() => {
        return knex.schema.createTable("prices", (table) => {
          table.increments("price_id").primary();
          table.integer("price").notNullable();
          table.integer("currency").notNullable();
          table.timestamp("create_date").defaultTo(knex.fn.now());
          table.timestamp("update_date").defaultTo(knex.fn.now());
          table.integer("product_id").references("product.product_id");
        });
      })
  );
};

/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("prices").then(() => {
    return knex.schema.dropTable("images").then(() => {
      return knex.schema.dropTable("stocks").then(() => {
        return knex.schema.dropTable("products").then(() => {
          return knex.schema.dropTable("users");
        });
      });
    });
  });
};
