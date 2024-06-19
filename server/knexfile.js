// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

//const dotenv = require("dotenv");
//dotenv.config({ path: "../.env" });
require("dotenv").config();

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: process.env.DB_DATABASE,
      // database: "capstone",
      user: process.env.DB_USERNAME,
      // user: "postgres",
      password: process.env.DB_PASSWORD,
      // password: "shadowace",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
