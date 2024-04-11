/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("user_id").primary();
      table.string("username", 20).notNullable().unique();
      table.string("password").notNullable();
      table.string("google_id").unique(); // New column for storing Google user ID
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .then(() => {
      return knex.schema.createTable("products", (table) => {
        table.increments("product_id").primary();
        table.string("external_id").notNullable();
        table.string("external_id_2");
        table.string("product_name").notNullable().unique();
        table.text("description", "longtext").notNullable();
        table.string("category").notNullable();
        table.timestamp("create_date").defaultTo(knex.fn.now());
        table.timestamp("update_date").defaultTo(knex.fn.now());
      });
    })
    .then(() => {
      return knex.schema.createTable("stocks", (table) => {
        table.increments("stock_id").primary();
        table.string("stock_count").notNullable();
        table.timestamp("create_date").defaultTo(knex.fn.now());
        table.timestamp("update_date").defaultTo(knex.fn.now());
        table.integer("product_id").references("products.product_id");
      });
    })
    .then(() => {
      return knex.schema.createTable("images", (table) => {
        table.increments("image_id").primary();
        table.string("image_url_1");
        table.string("image_url_2");
        table.string("image_url_3");
        table.string("image_url_4");
        table.string("image_url_5");
        table.timestamp("create_date").defaultTo(knex.fn.now());
        table.timestamp("update_date").defaultTo(knex.fn.now());
        table.integer("product_id").references("products.product_id");
      });
    })
    .then(() => {
      return knex.schema.createTable("prices", (table) => {
        table.increments("price_id").primary();
        table.integer("price").notNullable();
        table.integer("cost").notNullable();
        table.integer("currency").notNullable();
        table.timestamp("create_date").defaultTo(knex.fn.now());
        table.timestamp("update_date").defaultTo(knex.fn.now());
        table.integer("product_id").references("products.product_id");
      });
    });
};

/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 * TO RUN MIGRATIONS: npx knex migrate:latest --knexfile db/knexfile.js
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("prices")
    .then(() => knex.schema.dropTableIfExists("images"))
    .then(() => knex.schema.dropTableIfExists("stocks"))
    .then(() => knex.schema.dropTableIfExists("products"))
    .then(() => knex.schema.dropTableIfExists("users"));
};
