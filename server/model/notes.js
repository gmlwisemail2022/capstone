const knex = require("../db");

class Note {
  // Function to get notes by user ID
  static async getNotesByUserId(userId) {
    try {
      return await knex("notes").where({ user_id: userId }).select("*");
    } catch (error) {
      throw error;
    }
  }

  // Function to create a new note
  static async createNote(data) {
    try {
      const note = await knex("notes").insert(data);
      return note;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  }

  // Function to update an existing note
  static async updateNote(noteId, newData) {
    try {
      await knex("notes").where({ note_id: noteId }).update(newData);
    } catch (error) {
      console.error("Error updating note:", error);
      throw error;
    }
  }

  // Function to delete an existing note
  static async deleteNote(noteId) {
    try {
      await knex("notes").where({ note_id: noteId }).del();
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  }
}
module.exports = Note;
