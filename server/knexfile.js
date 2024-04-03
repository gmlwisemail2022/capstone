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
      database: "capstone",
      user: "postgres",
      password: "shadowace",
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
