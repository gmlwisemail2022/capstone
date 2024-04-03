const knex = require("../db");

class User {
  static async createUser(username, password) {
    console.log("user data:", username, password);
    return await knex("users").insert({ username, password });
  }

  static async findByUsername(username) {
    console.log("user data:", username);
    return await knex("users").where({ username }).first();
  }
}

module.exports = User;
