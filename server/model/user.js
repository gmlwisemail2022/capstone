// This file involves all user related database access

const knex = require("../db");

class User {
  static async createUser(username, password, googleId = null) {
    try {
      const userData = { username, password };
      if (googleId) {
        userData.google_id = googleId;
      }
      return await knex("users").insert(userData);
    } catch (error) {
      throw error;
    }
  }

  static async findByUsername(username) {
    try {
      return await knex("users").where({ username }).first();
    } catch (error) {
      throw error;
    }
  }

  static async findByGoogleId(googleId) {
    try {
      return await knex("users").where({ googleId }).first();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
