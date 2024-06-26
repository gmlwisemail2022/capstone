/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  // return knex.schema.createTable("notes", (table) => {
  //   table.increments("note_id").primary();
  //   table.date("date").notNullable();
  //   table.time("time").notNullable();
  //   table.string("message").notNullable();
  //   table.timestamp("created_at").defaultTo(knex.fn.now());
  //   table.timestamp("updated_at").defaultTo(knex.fn.now());
  //   table.integer("user_id").references("users.user_id");
  // });
};

/**
 * @param { import('knex').Knex } knex
 * @returns { Promise<void> }
 * TO RUN MIGRATIONS: npx knex migrate:latest --knexfile db/knexfile.js
 */
exports.down = function (knex) {
  // return knex.schema.dropTableIfExists("notes");
};
